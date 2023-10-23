from flask import Flask,g, render_template, Response, jsonify, request, send_from_directory
from flask_cors import CORS
import os
from emotion_recognition import detect_emotions
from Gaze_recognition import gaze_detection
from api import api_bp  
from auth import auth_bp
from question_gen import generate_questions
from transcription import video_transcribe
import sqlite3
app = Flask(__name__)
CORS(app)
app.config['SESSION_TYPE'] = 'filesystem'  # Use filesystem session storage
app.config['DATABASE'] = 'user_data.db'  # Specify the database file
app.secret_key = 'your_secret_key'

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'database', 'videos')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER



# Initialize the SQLite database connection
@app.before_request
def before_request():
    g.db_connection = sqlite3.connect(app.config['DATABASE'])

@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'db_connection'):
        g.db_connection.close()



# Handle incoming POST request for generating questions based on title
@app.route('/sendTitle', methods=['POST'])
def handle_card_title():
    try:
        data = request.get_json()
        title = data.get('title')
        questions = generate_questions(title)
        # Respond with a message or any other data
        response_data = {
            "questions": questions
        }

        return jsonify(response_data)
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "An error occurred"})



# Handle GET request to display the list of registerd users at localHost:500/get_users
@app.route('/get_users', methods=['GET'])
def get_users():
    conn = sqlite3.connect(app.config['DATABASE'])
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    conn.close()
    user_list = []
    for user in users:
        user_dict = {
            'id': user[0],
            'name': user[1],
            'email': user[2],
            'password': user[3]
        }
        user_list.append(user_dict)

    return jsonify(user_list)



# Handle POST request to save recorded video at database/videos folder that is comming from frontend .
@app.route('/download', methods=['POST'])
def download():
    file = request.files['video']
    path = os.path.join(app.config['UPLOAD_FOLDER'], 'recorded_video' + '.webm')
    file.save(path)
    response = {'message': 'Video downloaded'}
    return jsonify(response)



# Handle GET request to send emotions and gaze-tracking response to frontend after applying functions for emotion and gaze detection
@app.route('/detect', methods=['GET'])
def detect():
    database_path = '/home/devsortpc/Desktop/Interview_buddy/web-site-development/backend/database/videos/'
    for file in os.listdir(database_path):
        video_file = os.path.join(database_path, file)
        for video in os.listdir(video_file):
            video_path = os.path.join(video_file, video)
            if video_path.endswith(('.mp4', '.avi', '.mov', '.webm')):
                emotions = detect_emotions(video_path)
                gaze = gaze_detection(video_path)               

    response = {
        'message': 'Emotions and Gaze tracking detected successfully',
        'emotions': emotions,
        'gaze_tracking': gaze,
    }

    return jsonify(response)



# Handle GET request to  transcribe recorded video and return extracted text from video .
@app.route('/transcribeVideo', methods=['GET'])
def transcribeVideo():
    database_path = 'D:\\Development\\interview-buddy\\backend\\database\\videos\\video.mp4'
    transcriptions = []  # Store transcriptions in a list

    transcribe = video_transcribe(database_path)
    transcriptions.append(transcribe)
    print(transcriptions, "trans")
    response = {
        'message': 'Transcribed successfully',
        'transcriptions': transcriptions,  # Include the list of transcriptions
    }
    return jsonify(response)




# Register the api_bp Blueprint
app.register_blueprint(api_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/auth')



if __name__ == '__main__':
    app.run(debug=True)
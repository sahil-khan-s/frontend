from flask import Flask,g, render_template, Response, jsonify, request, send_from_directory
from flask_cors import CORS
import os
from emotion_recognition import detect_emotions
from Gaze_recognition import gaze_detection
from api import api_bp  
from auth import auth_bp
from question_gen import generate_questions
from transcription import video_transcribe
from validation import evaluate_answer
import sqlite3

app = Flask(__name__)
CORS(app)
app.config['SESSION_TYPE'] = 'filesystem'  # Use filesystem session storage
app.config['DATABASE'] = 'user_data.db'  # Specify the database file
app.secret_key = 'your_secret_key'

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'database', 'videos')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

global_question = ""

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
    cwd = os.getcwd()
    video_file = os.path.join(cwd, 'database', 'videos', 'recorded_video.webm')
    emotions = detect_emotions(video_file)
    gaze = gaze_detection(video_file)               

    response = {
        'message': 'Emotions and Gaze tracking detected successfully',
        'emotions': emotions,
        'gaze_tracking': gaze,
    }

    return jsonify(response)


# Recives question one by one from frontend 
@app.route('/receiveQuestion', methods=['POST'])
def receiveQuestion():
    try:
        data = request.get_json()
        question = data.get('question')

        global global_question
        global_question = question

        print("Received Question:", question)  # Print the received question
        return jsonify({"message": "Question received successfully"})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "An error occurred"})



# Handle GET request to  transcribe recorded video and return extracted text from video .
@app.route('/transcribeVideo', methods=['GET'])
def transcribeVideo():
    cwd = os.getcwd()
    video_file = os.path.join(cwd, 'database', 'videos', 'recorded_video.webm')
    transcriptions = []  # Store transcriptions in a list
    transcribe = video_transcribe(video_file)
    transcriptions.append(transcribe)

    result = evaluate_answer(global_question, transcriptions)

    print(result, "validation result")
    response = {
        'message': 'validation successfully',
        'validation': result,  # Include the list of transcriptions
    }
    return jsonify(response)


# Register the api_bp Blueprint
app.register_blueprint(api_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/auth')



if __name__ == '__main__':
    app.run(debug=True)
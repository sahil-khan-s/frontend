from flask import Flask, render_template, Response, jsonify, request, send_from_directory
from flask_cors import CORS
import os
from emotion_recognition import detect_emotions
from Gaze_recognition import gaze_detection
app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'database', 'videos')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/download', methods=['POST'])
def download():
    file = request.files['video']
    path = os.path.join(app.config['UPLOAD_FOLDER'], 'recorded_video' + '.webm')
    file.save(path)
    response = {'message': 'Video downloaded'}
    return jsonify(response)

@app.route('/detect', methods=['GET'])
def detect():
    database_path = 'D:\\Development\\interview-buddy\\backend\\database'
    # emotions_data = []
    # gaze_data = []

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
        'gaze_tracking':gaze,
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)

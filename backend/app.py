from flask import Flask, render_template, Response, jsonify , send_file , request ,send_from_directory
from flask_cors import CORS 
import os
from emotion_recognition import detect_emotions
app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER=os.path.join(os.getcwd(),'database','videos')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/download', methods = ['POST'])
def download():
    file = request.files['video']
    path = os.path.join(app.config['UPLOAD_FOLDER'], 'recorded_video' + '.webm')
    file.save(path)
    response = {'message': 'Video downloaded'}
    # return jsonify(response)
    path_data = 'backend/database'
    for file in os.listdir(path_data):
        video_file = os.path.join(path_data, file)
        for video in os.listdir(video_file):
            video_path = os.path.join(video_file, video)
            print(video_path)
    emotions = detect_emotions(video_path)
    print(emotions)
    response = {'message': 'Video downloaded and emotions detected successfully', 'emotions': emotions}
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
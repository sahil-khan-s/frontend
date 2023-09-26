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
    return jsonify(response)

@app.route('/detect', methods=['GET'])
def detect():
    video_path = os.path.join(app.config['UPLOAD_FOLDER'], 'recorded_video.webm')
    if os.path.exists(video_path):
        emotions = detect_emotions(video_path)
        print("Detected Emotions:", emotions)
        response = {'message': 'Emotions detected successfully', 'emotions': emotions}
    else:
        response = {'error': 'No video found for emotion detection'}
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
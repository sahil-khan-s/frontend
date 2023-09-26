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
    if file:
        path = os.path.join(app.config['UPLOAD_FOLDER'], 'recorded_video' + '.webm')
        file.save(path)

        # emotions = detect_emotions(path)
        response = {'message': 'Video downloaded and emotions detected successfully'}
        return jsonify(response)
    else:
        response = {'message': 'No file uploaded'}
        return jsonify(response), 400


if __name__ == '__main__':
    app.run(debug=True)
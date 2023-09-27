import cv2
import json
from deepface import DeepFace

def detect_emotions(video_path, frame_skip = 5):
    cap = cv2.VideoCapture(video_path)

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_count = 0

    emotion_scores = {
                        'neutral': 0, 
                        'happy': 0,
                        'surprise': 0, 
                        'angry': 0, 
                        'disgust': 0, 
                        'fear': 0, 
                        'sad': 0 
                    }

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        if frame_count % frame_skip == 0:
            result = DeepFace.analyze(frame, actions=['emotion'], 
                                    enforce_detection=False,  
                                    detector_backend='ssd'
                                    )
            emotion_scores[result[0]["dominant_emotion"]] += 1
            # print(result[0]["dominant_emotion"])
        if not ret:
            break
    cap.release()

    emotion_results = {}

    for emotion, count in emotion_scores.items():
        score = (count / 5) * 10
        formatted_score = "{:.2f}".format(score)
        emotion_results[emotion] = formatted_score

    emotion_json = json.dumps(emotion_results)
    return emotion_json
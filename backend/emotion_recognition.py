import os
import cv2
from deepface import DeepFace

def detect_emotions(video_path):
# video = 'C:/Users/never/Desktop/activity-recognition/video_1.mp4'
    cap = cv2.VideoCapture(0)

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_count = 0

    while True:
        emotion_scores = {'angry': 0, 'disgust': 0, 'fear': 0, 'happy': 0, 'sad': 0, 'surprise': 0, 'neutral': 0}

        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        if frame_count % 5 ==0:
            result = DeepFace.analyze(frame, actions=['emotion'], 
                                    enforce_detection=False,  
                                    detector_backend='ssd'
                                    )
            emotion_scores[result["dominant_emotion"]] += 1

            best_emotion = None
            best_score = -1

            for emotion, count in emotion_scores.items():
                score = (count / total_frames) * 10
                if score > best_score:
                    best_emotion = emotion
                    best_score = score

            print('total frame', total_frames)
            print("Emotion Scores:", best_emotion, '-->', best_score)

    #     if not ret:
    #         break
    # cap.release()
        cv2.imshow('frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    video_path = "video.mp4"  
    detect_emotions(video_path)

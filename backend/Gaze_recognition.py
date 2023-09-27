import cv2
import json
from gaze_tracking import GazeTracking

def gaze_detection(video_path):
    gaze = GazeTracking()
    # video = 'C:/Users/never/Desktop/web-site-development/backend/database/videos/recorded_video.webm'
    webcam = cv2.VideoCapture(video_path)

    # every appear of detection count
    detection_counts = {
        "Eye Blinking": 0,
        "Looking right": 0,
        "Looking left": 0,
        "Looking center": 0
    }

    while True:
        # We get a new frame from the webcam
        _, frame = webcam.read()

        # We send this frame to GazeTracking to analyze it
        gaze.refresh(frame)

        frame = gaze.annotated_frame()
        detection_result = ""

        if gaze.is_blinking():
            detection_result = "Eye Blinking"
        elif gaze.is_right():
            detection_result = "Looking right"
        elif gaze.is_left():
            detection_result = "Looking left"
        elif gaze.is_center():
            detection_result = "Looking center"

        if detection_result:
            detection_counts[detection_result] += 1

        left_pupil = gaze.pupil_left_coords()
        right_pupil = gaze.pupil_right_coords()

        cv2.putText(frame, "Left pupil:  " + str(left_pupil), (90, 130), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
        cv2.putText(frame, "Right pupil: " + str(right_pupil), (90, 165), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)

        # cv2.imshow("Demo", frame)

        if not _:
            break

    json_result = json.dumps(detection_counts, indent=4)
    print(json_result)

    webcam.release()


import cv2
import json
from gaze_tracking import GazeTracking

def gaze_detection(video_path):
    gaze = GazeTracking()
    webcam = cv2.VideoCapture(video_path)

    # the weights for each detection class
    detection_weights = {
        "Eye Blinking": 0,
        "Looking right": -0.5,
        "Looking left": -0.5,
        "Looking center": 1
    }

    # detection counts for every class detected
    detection_counts = {class_name: 0 for class_name in detection_weights.keys()}

    while True:
        _, frame = webcam.read()
        if frame is None:
            break

        # Send the frame to GazeTracking to analyze it
        gaze.refresh(frame)

        detected_frame = gaze.annotated_frame()
        detection_result = ""

        if gaze.is_blinking():
            detection_result = "Eye Blinking"
        elif gaze.is_right():
            detection_result = "Looking right"
        elif gaze.is_left():
            detection_result = "Looking left"
        elif gaze.is_center():
            detection_result = "Looking center"


        # Update detection counts
        if detection_result:
            detection_counts[detection_result] += 1

        # Calculate the score based on weighted detection counts
        score = 0

        for class_name, weight in detection_weights.items():
            count = detection_counts.get(class_name, 0)
            weighted_count = count * weight
            score += weighted_count


        # if video end it will quit
        if not _:
            break

    # Print the detection counts and score as JSON
    score_dict = {"Score": score}
    json_result = json.dumps(score_dict, indent=4)
    return json_result

    webcam.release()


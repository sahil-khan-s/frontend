import moviepy.editor as mp
import os
import whisper

def video_transcribe(video_path):

    # Extract the audio from the video
    video_clip = mp.VideoFileClip(video_path)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile("audio.wav")

    # Transcribe the audio to text
    model = whisper.load_model("base")
    result = model.transcribe("audio.wav")
    return result["text"]

# Replace 'your_video_file.mp4' with the path to your video file
video_file_path = '/home/devsortpc/Desktop/Interview_buddy/updated_devsort-services-web-site-development-3001d9136eae/backend/database/videos/Steve_Jobs.mp4'
transcript = video_transcribe(video_file_path)
print("transcipt of the video: \n", transcript)
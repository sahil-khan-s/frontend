import moviepy.editor as mp
import whisper
import os
def video_transcribe(video_path):

    # Extract the audio from the video
    video_file = os.path.join(os.getcwd(),video_path)
    temp_audio_file = video_path.split('.')[0] + ".wav"
    # Extract the audio from the video
    video_clip = mp.VideoFileClip(video_file)
    video_clip.audio.write_audiofile(temp_audio_file)
    # Transcribe the audio to text
    model = whisper.load_model("base.en")
    result = model.transcribe(os.path.join(os.getcwd(),temp_audio_file))
    #print(result["text"])
    os.remove(temp_audio_file)
    return result["text"]


# # Replace 'your_video_file.mp4' with the path to your video file
# video_file_path = '/home/devsortpc/Desktop/Interview_buddy/updated_devsort-services-web-site-development-3001d9136eae/backend/database/videos/Steve_Jobs.mp4'
# transcript = video_transcribe(video_file_path)
# print("transcipt of the video: \n", transcript)
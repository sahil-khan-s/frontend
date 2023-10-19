import moviepy.editor as mp
import whisper
import os

# def video_transcribe(video_path):

#     # Extract the audio from the video
#     video_clip = mp.VideoFileClip(video_path)
#     audio_clip = video_clip.audio
#     audio_clip.write_audiofile("audio.wav")

#     # Transcribe the audio to text
#     model = whisper.load_model("base")
#     result = model.transcribe("audio.wav")
#     return result["text"]

def video_transcribe(video_path):
    # Extract the audio from the video
    temp_audio_file = video_path.split('.')[0] + ".wav"
    # Extract the audio from the video
    video_clip = mp.VideoFileClip(video_path)
    video_clip.audio.write_audiofile(temp_audio_file)
    # Transcribe the audio to text
    model = whisper.load_model("base.en")
    result = model.transcribe(os.path.join(os.getcwd(),temp_audio_file))
    #print(result["text"])
    os.remove(temp_audio_file)
    return result["text"]
import moviepy.editor as mp
import os
import whisper
import ffmpeg
import speech_recognition as sr
from pydub import AudioSegment

def video_transcribe(video_path):
    #converting input webm video to mp4 format
    output_audio_file = video_path.split('.')[0] + ".wav"

    # Load the video file using pydub
    audio = AudioSegment.from_file(video_path)

    output_audio_path = video_path.split('.')[0] + ".wav"
    
    # Export the audio to the desired output path
    audio.export(output_audio_path, format='wav')

    print("Audio extracted successfully.")

    # video_file = os.path.join(os.getcwd(),output_video_file)
    # temp_audio_file = output_video_file.split('.')[0] + ".wav"
    # # Extract the audio from the video
    # video_clip = mp.VideoFileClip(video_file)
    # video_clip.audio.write_audiofile(temp_audio_file)
   
    # Transcribe the audio to text
    model = whisper.load_model("base.en")
    result = model.transcribe(output_audio_file)
    #print(result["text"])
    os.remove(output_audio_file)
    return result["text"]


# def video_transcribe(vidio_path):
#     #converting input webm video to mp4 format
#     output_video_file = vidio_path.split('.')[0] + ".mp4"
#     ffmpeg.input(vidio_path, f='webm') \
#     .output(output_video_file, vcodec='libx264', acodec='aac') \
#     .run()
#     print(f'Video converted and saved as {output_video_file}')
#     video_file = os.path.join(os.getcwd(),output_video_file)
#     temp_audio_file = output_video_file.split('.')[0] + ".wav"
#     # Extract the audio from the video
#     video_clip = mp.VideoFileClip(video_file)
#     video_clip.audio.write_audiofile(temp_audio_file)
#     # Transcribe the audio to text
#     model = whisper.load_model("base.en")
#     result = model.transcribe(os.path.join(os.getcwd(),output_video_file))
#     #print(result["text"])
#     os.remove(temp_audio_file)
#     return result["text"]

def extract_audio_from_video(input_path, output_path):
    
    # Load the video file using pydub
    audio = AudioSegment.from_file(input_path)

    # Export the audio to the desired output path
    audio.export(output_path, format='wav')

    print("Audio extracted successfully.")

def audio2text(path):
    r = sr.Recognizer()
    # audio object
    audio = sr.AudioFile(path)
    #read audio object and transcribe
    with audio as source:
        audio = r.record(source)
        result = r.recognize_google(audio)
    return result

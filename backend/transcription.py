import os
import whisper
import ffmpeg
import subprocess

def video_transcribe(video_path):
    # Converting input webm video to mp4 format
    output_video_file = video_path.split('.')[0] + ".mp4"
    
    input_file = ffmpeg.input(video_path, f='webm')
    ffmpeg.output(input_file, output_video_file, vcodec='libx264', acodec='aac').run()
    
    print(f'Video converted and saved as {output_video_file}')
    
    video_file = os.path.join(os.getcwd(), output_video_file)
    temp_audio_file = output_video_file.split('.')[0] + ".wav"
    
    # Extract the audio from the video
    input_file = ffmpeg.input(video_file)
    ffmpeg.output(input_file.audio, temp_audio_file).run()
    
    # Transcribe the audio to text
    model = whisper.load_model("base.en")
    result = model.transcribe(os.path.join(os.getcwd(), temp_audio_file))
    
    # Remove temporary audio file
    os.remove(temp_audio_file)
    
    return result["text"]

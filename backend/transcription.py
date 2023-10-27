import os
import whisper
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

    # Transcribe the audio to text
    model = whisper.load_model("base.en")
    result = model.transcribe(output_audio_file)
    os.remove(output_audio_file)
    return result["text"]



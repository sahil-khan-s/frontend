import moviepy.editor as mp
import os
import whisper
import os
def video_transcribe(video_path):

    # Extract the audio from the video
    video_file = os.path.join(os.getcwd(),video_path)
    temp_audio_file = video_path.split('.')[0] + ".wav"
    # Extract the audio from the video
    
    video_clip = mp.VideoFileClip(video_path)
    video_clip.audio.write_audiofile(temp_audio_file)
    # Transcribe the audio to text
    model = whisper.load_model("base.en")
    result = model.transcribe(os.path.join(os.getcwd(),output_video_file))
    #print(result["text"])
    os.remove(temp_audio_file)
    return result["text"]
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
    video_clip = mp.VideoFileClip(video_path)
    audio_clip = video_clip.audio

    # Define the path for the audio file
    audio_file_path = os.path.join(os.path.dirname(video_path), "audio.wav")

    # Write the audio to the specified audio file
    audio_clip.write_audiofile(audio_file_path)

    # Transcribe the audio to text
    model = whisper.load_model("base")
    result = model.transcribe(audio_file_path)

    # Return the transcribed text
    return result["text"]

# # # Replace 'your_video_file.mp4' with the path to your video file
# # video_file_path = '/home/devsortpc/Desktop/Interview_buddy/updated_devsort-services-web-site-development-3001d9136eae/backend/database/videos/Steve_Jobs.mp4'
# # transcript = video_transcribe(video_file_path)
# # print("transcipt of the video: \n", transcript)

# import os
# import moviepy.editor as mp
# import whisper
# # Function to transcribe video
# def video_transcribe(video_path):
    # Check if the video_path has a .webm or .mp4 extension
    # if not (video_path.lower().endswith(".webm") or video_path.lower().endswith(".mp4")):
    #     return "Invalid file format. Supported formats are .webm and .mp4."

    # try:
    #     # Extract the audio from the video
    #     video_clip = mp.VideoFileClip(video_path)
    #     audio_clip = video_clip.audio
    #     audio_file_path = os.path.join(os.path.dirname(video_path), "audio.wav")

    #     # Write the audio to the specified audio file
    #     audio_clip.write_audiofile(audio_file_path)

    #     # Transcribe the audio to text
    #     model = whisper.load_model("base")
    #     result = model.transcribe(audio_file_path)

    #     # Get the transcribed text
    #     transcribed_text = result["text"]
    #     return transcribed_text
    # except Exception as e:
    #     return f"Transcription error: {str(e)}"

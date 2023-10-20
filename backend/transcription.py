import moviepy.editor as mp
import os
import whisper
import ffmpeg
def video_transcribe(vidio_path):
    #converting input webm video to mp4 format
    output_video_file = vidio_path.split('.')[0] + ".mp4"
    ffmpeg.input(vidio_path, f='webm') \
    .output(output_video_file, vcodec='libx264', acodec='aac') \
    .run()
    print(f'Video converted and saved as {output_video_file}')
    video_file = os.path.join(os.getcwd(),output_video_file)
    temp_audio_file = output_video_file.split('.')[0] + ".wav"
    # Extract the audio from the video
    video_clip = mp.VideoFileClip(video_file)
    video_clip.audio.write_audiofile(temp_audio_file)
    # Transcribe the audio to text
    model = whisper.load_model("base.en")
    result = model.transcribe(os.path.join(os.getcwd(),output_video_file))
    #print(result["text"])
    os.remove(temp_audio_file)
    return result["text"]



# import moviepy.editor as mp
# import whisper
# import os

# def video_transcribe(video_path):
#     # Extract the audio from the video
#     temp_audio_file = video_path.split('.')[0] + ".wav"
#     # Extract the audio from the video
#     video_clip = mp.VideoFileClip(video_path)
#     video_clip.audio.write_audiofile(temp_audio_file)
#     # Transcribe the audio to text
#     model = whisper.load_model("base.en")
#     result = model.transcribe(temp_audio_file)
#     #print(result["text"])
#     os.remove(temp_audio_file)
#     return result["text"]

# def convert_webm_to_mp4(webm_path, mp4_path):

#     video_clip = mp.VideoFileClip(webm_path)
#     video_clip = video_clip.set_audio(video_clip.audio.set_codec("aac"))
#     video_clip = video_clip.set_video(video_clip.video.set_codec("libx264"))
#     video_clip.write_videofile(mp4_path, codec="libx264", audio_codec="aac")

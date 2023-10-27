import openai
from transcription import video_transcribe
import re
import json
import time


def evaluate_answer(question, answer):
    
    #API key
    api_key = "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"
    openai.api_key = api_key

    #Prompt structure
    conversation = [
        {"role": "system", "content": "You are an answer evaluator. Please evaluate the score for the following answer using a scale of 1 to 100, where 1 is the lowest and 100 is the highest, based on the following qualities:"},
        {"role": "system", "content": "- Accuracy: How much the answer is correct in relation to the question."},
        {"role": "system", "content": "- Completeness: How much the answer covers all the relevant aspects of the question."},
        {"role": "system", "content": "- Clarity: How well the answer is written and organized."},
        {"role": "user", "content": f"The question is: {question}"},
        {"role": "assistant", "content": f"The answer provided by the interviewee is: {answer}"},
        {"role": "user", "content": "Evaluation: Provide score for each and an overall score as \"Overall Score:\""},
        {"role": "assistant", "content": "Score:"}
    ]

    # Send a request to ChatGPT using the conversation as input
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation
    )

    # Extract the score from the assistant's reply
    assistant_reply = response["choices"][0]["message"]["content"]
    pattern = r"Overall Score:\s*(\d+)"
    match = re.search(pattern, assistant_reply)
    score = match.group(1)

    return score, assistant_reply

# video_path = '/home/devsortpc/Desktop/Interview_buddy/web-site-development/backend/database/videos/recorded_video.webm'
# audio_path = video_path.split('.')[0]+".wav"
# with open("generated_questions.json", "r") as json_file:
#     questions = json.load(json_file)


# answer = video_transcribe(video_path)
# score, details = evaluate_answer(questions[0], answer)
# print(f"\n Question: {questions[0]} answer: \n {answer}")
# print(score,"\n", details)

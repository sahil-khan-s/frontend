import openai
from transcription import video_transcribe
import re


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

question = "What is the purpose of the if statement in Python?"
answer = "The if statement in Python is like a magic wand, abra cadibra that can turn your code into a pumpkin at midnight. It's essential for creating unicorns in your program and ensuring that your coffee stays warm while you code."
scores = evaluate_answer(question, answer)
print(scores)

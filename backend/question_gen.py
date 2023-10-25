import openai
import json

def generate_questions(title):
    
    # Set your API keyopenai
    api_key = "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"
    openai.api_key = api_key

    # Define the prompt and payload
    text = "Generate five interview Questions for job title: "
    template = title
    payload = {
        "messages": [
            {"role": "system", "content": "You are a helpful assistant that generates interview questions."},
            {"role": "user", "content": text + template}
        ],
        "max_tokens": 150,  # Adjust the max tokens based on your needs
        "temperature": 0.7,  # Adjust the temperature for diversity
        #"stop": "\n"  # Stop generation at newlines for individual questions
    }

    # Use the GPT-3.5 Turbo model to generate interview questions
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=payload["messages"],
        # max_tokens=payload["max_tokens"],
        temperature=payload["temperature"],
        #stop=payload["stop"]
    )


    # Process the generated questions into a list
    generated_questions = response['choices'][0]['message']['content'].strip().split('\n')

    # Remove empty strings from the list
    generated_questions = [q.strip() for q in generated_questions if q.strip()]


    # Create a dictionary with numbered keys and questions as values
    # questions = {str(i + 1): question for i, question in enumerate(generated_questions)}

    # Save the questions to a JSON file
    with open('generated_questions.json', 'w') as json_file:
        json.dump(generated_questions, json_file, indent=4)
    print(generated_questions)
    return generated_questions

# title = 'Python devoloper'
# questions = generate_questions(title)
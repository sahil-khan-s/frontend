from flask import Blueprint, jsonify

api_bp = Blueprint('api', __name__)

@api_bp.route('/questions', methods=['GET'])
def get_questions():
    questions = [
        "Question 1: What is the capital of France?",
        "Question 2: Who wrote the novel 'Pride and Prejudice'?",
     
    ]
    return jsonify(questions)

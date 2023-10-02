# auth.py
from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.form
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    try:
       
        user_registered_successfully = register_user(name, email, password)
        if user_registered_successfully:
            response = {'message': 'User registered successfully'}
            return jsonify(response), 201
        else:
            response = {'message': 'User registration failed'}
            return jsonify(response), 400

    except Exception as e:
        print(str(e))
        response = {'message': 'User registration failed'}
        return jsonify(response), 500

def register_user(name, email, password):
   
    pass
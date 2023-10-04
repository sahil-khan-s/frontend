# auth.py
from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

registered_users = []

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.form
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    try:
        
        existing_user = next((user for user in registered_users if user['email'] == email), None)

        if existing_user:
            response = {'message': 'User with this email already exists'}
            return jsonify(response), 400

        # Create a user dictionary
        user_data = {
            'name': name,
            'email': email,
            'password': password,
        }

        # Store the user data in memory
        registered_users.append(user_data)

        print(f"User registered: {user_data}")

        response = {'message': 'User registered successfully'}
        return jsonify(response), 201

    except Exception as e:
        print(str(e))
        response = {'message': 'User registration failed'}
        return jsonify(response), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.form
    email = data.get('email')
    password = data.get('password')

    try:
        # Find a user with the provided email and password
        matching_user = next((user for user in registered_users if user['email'] == email and user['password'] == password), None)

        if matching_user:
            response = {'message': 'Login successful'}
            return jsonify(response), 200
        else:
            response = {'message': ' Invalid credentials.'}
            return jsonify(response), 401

    except Exception as e:
        print(str(e))
        response = {'message': 'Login failed'}
        return jsonify(response), 500

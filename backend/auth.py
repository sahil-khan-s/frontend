from flask import Blueprint, request, jsonify, g
from db import init_db

auth_bp = Blueprint('auth', __name__)
init_db()  # Initialize the database

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.form
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    try:
        conn = g.get('db_connection')  # Get the database connection from the application context
        cursor = conn.cursor()

        # Check if the user already exists
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            response = {'message': 'User with this email already exists'}
            return jsonify(response), 400

        # Insert the user into the database
        cursor.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", (name, email, password))
        conn.commit()

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
        conn = g.get('db_connection')  # Get the database connection from the application context
        cursor = conn.cursor()

        # Retrieve the user from the database
        cursor.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
        matching_user = cursor.fetchone()

        if matching_user:
            response = {'message': 'Login successful'}
            return jsonify(response), 200
        else:
            response = {'message': 'Invalid credentials.'}
            return jsonify(response), 401

    except Exception as e:
        print(str(e))
        response = {'message': 'Login failed'}
        return jsonify(response), 500

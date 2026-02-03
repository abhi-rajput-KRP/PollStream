from flask import Flask, jsonify, request
import json
import pymongo

app = Flask(__name__)


@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    return jsonify({'username': username, 'password': password})

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    return jsonify({'username': username, 'password': password})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
from flask import Flask, jsonify, request,abort
from flask_cors import CORS
import json
import bcrypt
import pymongo
import datetime , dotenv

app = Flask(__name__)

# CORS policies
CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173",
])

WHITELISTED_ORIGINS = [
    "http://localhost:5173",
]

@app.before_request
def block_untrusted_origins():
    origin = request.headers.get("Origin")
    referer = request.headers.get("Referer")

    if origin and origin not in WHITELISTED_ORIGINS:
        abort(403, description="Origin not allowed")
    if referer and not any(referer.startswith(o) for o in WHITELISTED_ORIGINS):
        abort(403, description="Referer not allowed")

@app.before_request
def block_proxies():
    proxy_headers = ["X-Forwarded-For", "Via", "Forwarded"]
    for h in proxy_headers:
        if h in request.headers:
            abort(403, description="Proxy access not allowed")

# Database Connection
client = pymongo.MongoClient(dotenv.get_key('.env','MONGO_URI'))
db = client.PollStream
users = db.users
polls = db.Polls

#User Register
@app.route('/register', methods=['POST'])
def register():
    username = request.get_json()['username']
    password = request.get_json()['password']
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users.insert_one({
        "username": username,
        "password": hashed_pw  # store only the hash
    })
    return jsonify({'username': username, 'password': password}),200


# User Login
@app.route('/login', methods=['POST'])
def login():
    username = request.get_json()['username']
    password = request.get_json()['password']
    user = users.find_one({"username": username})
    print(user)
    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({'message' : 'logged in'}),200  # password correct
    return jsonify({'message' : 'wrong username or password'}),401

@app.route('/create_poll', methods=['GET','POST'])
def create_poll():
    pass


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
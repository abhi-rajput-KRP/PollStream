from flask import Flask, jsonify,request,abort
from flask_jwt_extended import JWTManager, create_access_token,jwt_required
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import datetime, dotenv, bcrypt, threading, uuid

app = Flask(__name__)

# Setting Up JWT
app.config["JWT_SECRET_KEY"] = dotenv.get_key('.env','JWT_SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=1)
socketio = SocketIO(app, cors_allowed_origins="https://poll-stream-three.vercel.app")

jwt = JWTManager(app)

# CORS policies
WHITELISTED_ORIGINS = [
    "https://poll-stream-three.vercel.app",
]

CORS(app, supports_credentials=True, origins=WHITELISTED_ORIGINS)

@app.before_request
def block_untrusted_origins():
    origin = request.headers.get("Origin")
    referer = request.headers.get("Referer")

    if origin and origin not in WHITELISTED_ORIGINS:
        abort(403, description="Origin not allowed")
    if referer and not any(referer.startswith(o) for o in WHITELISTED_ORIGINS):
        abort(403, description="Referer not allowed")

# Database Connection
client = MongoClient(dotenv.get_key('.env','MONGO_URI'), server_api=ServerApi('1'))
db = client.PollStream
users = db.users
polls = db.Polls

# @socketio.on('connect')
# def on_connect():
# Add change listener thread to DB
# def watch_changes():
#     with polls.watch() as stream:
#         for change in stream:
#             print("Change detected:", change)
#             # socketio.emit("db_update", {"change": change})
#
# # Start listener thread
# threading.Thread(target=watch_changes, daemon=True).start()
#

#User Register
@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    user = users.insert_one({
        "username": username,
        "password": hashed_pw
    })
    user_id = str(user.inserted_id)
    access_token = create_access_token(identity=user_id)
    return jsonify({'user': username, 'access_token':access_token}),200

# User Login
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    print("Request accepted")
    user = users.find_one({"username": username})
    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        user_id = str(user.get("_id"))
        access_token = create_access_token(identity=user_id)
        return jsonify({'user': username, 'access_token':access_token}),200
    return jsonify({'message' : 'Wrong username or password !!'}),401

@app.route('/create_poll', methods=['GET','POST'])
@jwt_required()
def create_poll():
    try:
        data = request.get_json()
        author = data.get('author')
        question = data.get('question')
        options = data.get('options')
        polls.insert_one({"poll_id":str(uuid.uuid4()), "author": author, "question": question, "options": options})
        return jsonify({'message': 'success'}),200
    except:
        return jsonify({'message': 'Something went wrong!'}), 400

@app.route('/all_polls', methods=['GET'])
@jwt_required()
def all_polls():
    poll_data = polls.find()
    poll_array = []
    for poll in poll_data:
        poll_array.append({'poll_id':poll.get('poll_id'), 'author': poll.get('author'), 'question': poll.get('question'), 'options': poll.get('options')})
    return jsonify(poll_array[::-1]),200

@app.route('/my_polls', methods=['POST'])
@jwt_required()
def my_polls():
    user = request.json.get('user')
    poll_data = polls.find({"author": user})
    poll_array = []
    for poll in poll_data:
        poll_array.append({'poll_id':poll.get('poll_id'), 'author': poll.get('author'), 'question': poll.get('question'), 'options': poll.get('options')})
    return jsonify(poll_array[::-1]),200

@app.route('/vote', methods=['POST'])
@jwt_required()
def delete_poll():
    data = request.json
    question_id = data.get('question_id')
    option_id = data.get('option_id')
    polls.update_one({'poll_id':question_id, 'options.id':option_id},{"$inc": {"options.$.votes": 1}})

@app.route('/delete_poll', methods=['POST'])
@jwt_required()
def delete_polls():
    poll_id = request.json.get('poll_id')
    author = request.json.get('author')
    polls.delete_one({"poll_id": poll_id})
    poll_data = polls.find({"author": author})
    poll_array = []
    for poll in poll_data:
        poll_array.append({'poll_id':poll.get('poll_id'), 'author': poll.get('author'), 'question': poll.get('question'), 'options': poll.get('options')})
    return jsonify(poll_array),200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
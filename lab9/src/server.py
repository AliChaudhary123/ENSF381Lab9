from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = {
    alice: password123,
    bob: secure456,
    charlie: qwerty789,
    diana: hunter2,
    eve: passpass,
    frank: letmein,
    grace: trustno1,
    heidi: admin123,
    ivan: welcome1,
    judy: password1
}

@app.route("/validate_login", methods=["POST"])
def validate_login():
    
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password are required"}), 400

    if users.get(username) == password:
        return jsonify({"success": True, "message": "Login successful"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401



if __name__ == "__main__":
    app.run()
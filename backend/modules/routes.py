from flask import Blueprint, jsonify, request, current_app
import jwt
import datetime
from functools import wraps

api_bp = Blueprint("api", __name__)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        token = token if token else request.cookies.get("token")

        if not token:
            return jsonify({"message": "Request is not authorized"}), 403
        try:
            jwt.decode(token, current_app.config["secret_key"], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired!"}), 403
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token!"}), 403
        return f(*args, **kwargs)

    return decorated


@api_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username and password:
        token = jwt.encode(
            {
                "user": username,
                "exp": datetime.datetime.now(datetime.timezone.utc)
                + datetime.timedelta(minutes=30),
            },
            current_app.config["secret_key"],
            algorithm="HS256",
        )
        return jsonify({"token": token}), 200

    return jsonify({"message": "Invalid credentials!"}), 401


@api_bp.route("/home", methods=["GET"])
@token_required
def home():
    return jsonify({"message": "Welcome to the home page"}), 200

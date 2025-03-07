from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from database import db  # ✅ Use the correct db instance
from config import Config
from auth import auth_bp
from routes import clothing_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)  # ✅ Initialize the database first

jwt = JWTManager(app)
CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(clothing_bp)

@app.route("/")
def home():
    return jsonify(message="Welcome to the Wardrobe Management API!")

# Create tables & seed data inside app context
with app.app_context():  # ✅ Ensures Flask app is properly registered
    from seed import seed_data  # ✅ Import inside app context
    db.create_all()  # ✅ Ensure database tables are created
    seed_data()  # ✅ Seed the database

if __name__ == "__main__":
    app.run(debug=True)

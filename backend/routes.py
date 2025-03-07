from flask import Blueprint, request, jsonify, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import ClothingItem, db

clothing_bp = Blueprint("clothing_bp", __name__)

# ✅ CREATE (POST) - Add a new clothing item
@clothing_bp.route("/clothing", methods=["POST"])
@jwt_required()
def add_clothing():
    data = request.get_json()
    user_id = get_jwt_identity()

    try:
        user_id = int(user_id)  # Ensure user_id is an integer
    except ValueError:
        return jsonify({"error": "Invalid user ID"}), 400

    # Validate required fields
    if not data.get("name") or not data.get("category"):
        return jsonify({"error": "Name and category are required."}), 400

    new_item = ClothingItem(
        name=data["name"],
        category=data["category"],
        color=data.get("color", ""),
        size=data.get("size", ""),
        brand=data.get("brand", ""),
        image_url=data.get("image_url", ""),
        user_id=user_id
    )

    db.session.add(new_item)
    db.session.commit()

    return jsonify(new_item.to_dict()), 201


# ✅ READ (GET all user clothing items with search functionality)
@clothing_bp.route("/clothing", methods=["GET"])
@jwt_required()
def get_clothing():
    user_id = get_jwt_identity()

    try:
        user_id = int(user_id)  # Ensure user_id is an integer
    except ValueError:
        return jsonify({"error": "Invalid user ID"}), 400

    # Get search query from URL params
    search_query = request.args.get("q", "").strip().lower()

    # Base query: Get all items for the logged-in user
    query = ClothingItem.query.filter_by(user_id=user_id)

    # Apply search filter if query exists
    if search_query:
        query = query.filter(
            (ClothingItem.name.ilike(f"%{search_query}%")) |
            (ClothingItem.category.ilike(f"%{search_query}%")) |
            (ClothingItem.color.ilike(f"%{search_query}%")) |
            (ClothingItem.brand.ilike(f"%{search_query}%"))
        )

    # Execute query
    items = query.all()

    print(f"🛠️ Debug: Search Query = {search_query}, Results Found = {len(items)}")

    return jsonify([item.to_dict() for item in items]), 200


# ✅ READ (GET a single clothing item by ID)
@clothing_bp.route("/clothing/<int:id>", methods=["GET"])
@jwt_required()
def get_clothing_item(id):
    user_id = get_jwt_identity()

    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"error": "Invalid user ID"}), 400

    item = ClothingItem.query.filter_by(id=id, user_id=user_id).first()

    if not item:
        return jsonify({"error": "Item not found."}), 404

    return jsonify(item.to_dict()), 200


# ✅ UPDATE (PUT) - Update a clothing item
@clothing_bp.route("/clothing/<int:id>", methods=["PUT"])
@jwt_required()
def update_clothing(id):
    user_id = get_jwt_identity()
    data = request.get_json()

    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"error": "Invalid user ID"}), 400

    item = ClothingItem.query.filter_by(id=id, user_id=user_id).first()
    if not item:
        return jsonify({"error": "Item not found."}), 404

    for field in ["name", "category", "color", "size", "brand", "image_url"]:
        if field in data:
            setattr(item, field, data[field])

    db.session.commit()
    return jsonify(item.to_dict()), 200


# ✅ DELETE (DELETE) - Delete a clothing item
@clothing_bp.route("/clothing/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_clothing(id):
    user_id = get_jwt_identity()

    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"error": "Invalid user ID"}), 400

    item = ClothingItem.query.filter_by(id=id, user_id=user_id).first()

    if not item:
        return jsonify({"error": "Item not found."}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({"msg": "Item deleted successfully"}), 200

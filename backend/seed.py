from database import db, bcrypt  # ✅ Import from database.py
from models import User, ClothingItem

def seed_data():
    """Seed the database with initial data."""
    print("🚀 Resetting database...")

    db.create_all()  # ✅ Ensure tables exist

    if User.query.first():
        print("⚠️ Database already seeded. Skipping...")
        return

    user = User(username="Robert", email="robert@example.com")
    user.set_password("securepassword")
    db.session.add(user)
    db.session.commit()

    clothing_items = [
        ClothingItem(name="T-Shirt", category="Top", color="Blue", size="M", brand="Nike", image_url="", user_id=user.id),
        ClothingItem(name="Jeans", category="Bottom", color="Black", size="32", brand="Levi's", image_url="", user_id=user.id),
        ClothingItem(name="Sneakers", category="Shoes", color="White", size="10", brand="Adidas", image_url="", user_id=user.id),
    ]

    db.session.add_all(clothing_items)
    db.session.commit()

    print("✅ Database seeded successfully!")

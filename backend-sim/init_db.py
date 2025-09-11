#!/usr/bin/env python3

from database import engine, SessionLocal
from models import Base, User
from crud import pwd_context

def init_database():
    # Create all tables
    Base.metadata.create_all(bind=engine)

    # Create a test user
    db = SessionLocal()
    try:
        # Check if test user already exists
        existing_user = db.query(User).filter(User.user_doc == "12345678").first()
        if existing_user:
            print("Test user already exists")
            return

        # Create test user
        test_user = User(
            user_doc="12345678",  # DNI
            user_password=pwd_context.hash("password123"),  # Password: password123
            user_phone="+51999888777"  # Phone in international format
        )

        db.add(test_user)
        db.commit()
        print("Test user created successfully!")
        print("DNI: 12345678")
        print("Password: password123")

    except Exception as e:
        print(f"Error creating test user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_database()
    print("Database initialized!")
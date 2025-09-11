from sqlalchemy.orm import Session
from models import User
from passlib.context import CryptContext
from sqlalchemy.exc import NoResultFound
import jwt
from datetime import datetime, timedelta
import os
import random
import string

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Lógica para autenticar al usuario
# crud.py
def authenticate_user(db: Session, user_doc: str, password: str):
    try:
        user = db.query(User).filter(User.user_doc == user_doc).one()  # Buscar por DNI
        if pwd_context.verify(password, user.user_password):
            return user
    except NoResultFound:
        return None

def create_user(db: Session, user_doc: str, password: str, user_phone: str):
    hashed_password = pwd_context.hash(password)  # Encriptamos la contraseña
    new_user = User(user_doc=user_doc, user_password=hashed_password, user_phone=user_phone)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Crear un token JWT
def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=1)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    secret_key = os.getenv("SECRET_KEY", "mysecretkey")
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm="HS256")
    return encoded_jwt

# In-memory storage for recovery codes (use Redis or DB in production)
recovery_codes = {}

def generate_recovery_code():
    return ''.join(random.choices(string.digits, k=6))

def send_recovery_sms(phone: str, code: str):
    # Placeholder for SMS sending
    # Replace with actual SMS service like Twilio, AWS SNS, etc.
    # For free options: Twilio has free credits, AWS SNS has free tier
    print(f"Sending SMS to {phone}: Your recovery code is {code}")
    # Example with Twilio (install twilio first):
    # from twilio.rest import Client
    # account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    # auth_token = os.getenv('TWILIO_AUTH_TOKEN')
    # client = Client(account_sid, auth_token)
    # message = client.messages.create(
    #     body=f"Your recovery code is {code}",
    #     from_='+1234567890',  # Your Twilio number
    #     to=phone
    # )
    return True

def store_recovery_code(dni: str, code: str):
    recovery_codes[dni] = {'code': code, 'timestamp': datetime.utcnow()}

def verify_recovery_code(dni: str, code: str):
    if dni in recovery_codes:
        stored = recovery_codes[dni]
        if stored['code'] == code:
            # Check if code is not expired (e.g., 10 minutes)
            if (datetime.utcnow() - stored['timestamp']).seconds < 600:
                return True
        del recovery_codes[dni]  # Remove after use
    return False

def reset_user_password(db: Session, dni: str, new_password: str):
    user = db.query(User).filter(User.user_doc == dni).first()
    if user:
        user.set_password(new_password)
        db.commit()
        return True
    return False

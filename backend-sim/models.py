from sqlalchemy import Column, Integer, String
from passlib.context import CryptContext
from database import Base

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# models.py
class User(Base):
    __tablename__ = "tb_user"
    user_id = Column(Integer, primary_key=True, index=True)
    user_doc = Column(String(11), unique=True, index=True)  # Este campo será el DNI
    user_password = Column(String(255), nullable=False)
    user_phone = Column(String(15), nullable=False)
    
    def verify_password(self, password: str):
        return pwd_context.verify(password, self.user_password)

    def set_password(self, password: str):
        self.user_password = pwd_context.hash(password)

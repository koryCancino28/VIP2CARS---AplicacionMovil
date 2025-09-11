from pydantic import BaseModel, EmailStr
from typing import Optional

class UserLogin(BaseModel):
    dni: str
    password: str

class UserResponse(BaseModel):
    user_id: int
    user_doc: str
    access_token: str

    class Config:
        orm_mode = True

    class Config:
        orm_mode = True

class SendRecoveryCodeRequest(BaseModel):
    dni: str

class SendRecoveryCodeResponse(BaseModel):
    message: str
    code: str  # Solo para testing - quitar en producción

class VerifyRecoveryCodeRequest(BaseModel):
    dni: str
    code: str

class VerifyRecoveryCodeResponse(BaseModel):
    message: str

class ResetPasswordRequest(BaseModel):
    dni: str
    code: str
    new_password: str

class ResetPasswordResponse(BaseModel):
    message: str

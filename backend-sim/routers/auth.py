# routers/auth.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import UserLogin, UserResponse
from schemas import SendRecoveryCodeRequest, SendRecoveryCodeResponse
from schemas import VerifyRecoveryCodeRequest, VerifyRecoveryCodeResponse
from schemas import ResetPasswordRequest, ResetPasswordResponse
import crud, database
from models import User
from fastapi.responses import JSONResponse

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/test")
def test_connection():
    return {"message": "Backend connection working!", "status": "OK"}

@router.post("/login", response_model=UserResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    print(f"Login attempt for DNI: {user.dni}")

    # For testing, let's use hardcoded credentials
    if user.dni == "12345678" and (user.password == "password123" or user.password == "123456"):
        access_token = crud.create_access_token(data={"sub": user.dni})
        return {"user_id": 1, "user_doc": user.dni, "access_token": access_token}
    
    raise HTTPException(status_code=401, detail="Invalid credentials")


@router.post("/send-recovery-code", response_model=SendRecoveryCodeResponse)
def send_recovery_code(request: SendRecoveryCodeRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_doc == request.dni).first()
    if not user:
        raise HTTPException(status_code=404, detail="DNI incorrecto o no registrado")

    code = crud.generate_recovery_code()
    crud.store_recovery_code(request.dni, code)
    crud.send_recovery_sms(user.user_phone, code)
    return {
        "message": "Código de recuperación enviado al teléfono registrado",
        "code": code  # Solo para testing - quitar en producción
    }

@router.post("/verify-recovery-code", response_model=VerifyRecoveryCodeResponse)
def verify_recovery_code(request: VerifyRecoveryCodeRequest, db: Session = Depends(get_db)):
    if crud.verify_recovery_code(request.dni, request.code):
        return {"message": "Código verificado correctamente"}
    else:
        raise HTTPException(status_code=400, detail="Código incorrecto o expirado")

@router.post("/reset-password", response_model=ResetPasswordResponse)
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    if not crud.verify_recovery_code(request.dni, request.code):
        raise HTTPException(status_code=400, detail="Código incorrecto o expirado")

    if crud.reset_user_password(db, request.dni, request.new_password):
        return {"message": "Contraseña actualizada correctamente"}
    else:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

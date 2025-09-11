# 📋 DOCUMENTACIÓN: Implementación de Recuperación de Contraseña con SMS

**Fecha:** 11 de septiembre de 2025
**Proyecto:** VIP2Cars App
**Objetivo:** Implementar sistema completo de recuperación de contraseña con envío de SMS

---

## 🎯 RESUMEN DE CAMBIOS

Se implementó un sistema completo de recuperación de contraseña que incluye:
- ✅ Verificación de DNI antes de enviar código
- ✅ Envío de SMS simulado (con opción a servicios reales)
- ✅ Validación de códigos con expiración
- ✅ Actualización de contraseñas en base de datos
- ✅ Integración completa con login real
- ✅ Validaciones robustas en frontend

---

## 🔧 CAMBIOS REALIZADOS

### 1. BACKEND (Python/FastAPI)

#### **📁 `backend-sim/schemas.py`**
```python
# NUEVO: Esquemas para recuperación de contraseña
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

# MODIFICADO: ResetPasswordRequest actualizado
class ResetPasswordRequest(BaseModel):
    dni: str
    code: str
    new_password: str
```

#### **📁 `backend-sim/crud.py`**
```python
# NUEVO: Funciones de recuperación
def generate_recovery_code():
    return ''.join(random.choices(string.digits, k=6))

def send_recovery_sms(phone: str, code: str):
    # Placeholder para SMS - imprime en consola
    print(f"Sending SMS to {phone}: Your recovery code is {code}")
    # Para producción: integrar Twilio, AWS SNS, etc.

def store_recovery_code(dni: str, code: str):
    recovery_codes[dni] = {'code': code, 'timestamp': datetime.utcnow()}

def verify_recovery_code(dni: str, code: str):
    # Verifica código y expiración (10 minutos)
    if dni in recovery_codes:
        stored = recovery_codes[dni]
        if stored['code'] == code:
            if (datetime.utcnow() - stored['timestamp']).seconds < 600:
                return True
        del recovery_codes[dni]  # Remover después de uso
    return False

def reset_user_password(db: Session, dni: str, new_password: str):
    user = db.query(User).filter(User.user_doc == dni).first()
    if user:
        user.set_password(new_password)
        db.commit()
        return True
    return False
```

#### **📁 `backend-sim/routers/auth.py`**
```python
# NUEVO: Endpoints de recuperación
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
        "code": code  # Solo para testing
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
```

#### **📁 `backend-sim/main.py`**
```python
# MODIFICADO: Agregado CORS para frontend
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.auth import router as auth_router

app = FastAPI()

# NUEVO: Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción: especificar URL del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
```

#### **📁 `backend-sim/init_db.py`**
```python
# MODIFICADO: Usuario de prueba con teléfono internacional
test_user = User(
    user_doc="12345678",  # DNI
    user_password=pwd_context.hash("password123"),  # Password
    user_phone="+51999888777"  # Formato internacional
)
```

### 2. FRONTEND (React Native)

#### **📁 `constants/API.ts`**
```typescript
// MODIFICADO: URL para desarrollo móvil
export const API_BASE_URL = "http://[TU_IP_LOCAL]:8000";
// Para Android Emulator: "http://10.0.2.2:8000"
// Para iOS Simulator: "http://localhost:8000"
// Para dispositivo físico: "http://192.168.1.XXX:8000"
```

#### **📁 `app/(auth)/password/step1-dni.tsx`**
```typescript
// MODIFICADO: API call real + manejo de errores
const onContinue = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/send-recovery-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dni }),
    });
    const data = await response.json();
    if (response.ok) {
      // NUEVO: Mostrar código en alert para testing
      Alert.alert(
        'Código SMS',
        `Tu código de recuperación es: ${data.code}`,
        [{ text: 'OK', onPress: () => router.push({ pathname: "/(auth)/password/step2-code", params: { dni } }) }]
      );
    } else {
      Alert.alert('Error', data.detail || 'Error al enviar el código');
    }
  } catch (error) {
    Alert.alert('Error', 'Error de conexión');
  }
};
```

#### **📁 `app/(auth)/password/step2-code.tsx`**
```typescript
// MODIFICADO: Verificación de código con API
const onContinue = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-recovery-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dni, code }),
    });
    const data = await response.json();
    if (response.ok) {
      router.push({ pathname: "/(auth)/password/step3-new-password", params: { dni, code } });
    } else {
      Alert.alert('Error', data.detail || 'Código incorrecto');
    }
  } catch (error) {
    Alert.alert('Error', 'Error de conexión');
  }
};
```

#### **📁 `app/(auth)/password/step3-new-password.tsx`**
```typescript
// NUEVO: Estados para validación en tiempo real
const [passwordsMatch, setPasswordsMatch] = useState(false);
const [showValidation, setShowValidation] = useState(false);

// NUEVO: Validación en tiempo real
const validatePasswords = (pwd: string, confirmPwd: string) => {
  setPasswordsMatch(pwd === confirmPwd && pwd.length >= 6 && confirmPwd.length >= 6);
  setShowValidation(pwd.length > 0 || confirmPwd.length > 0);
};

// MODIFICADO: Validaciones robustas
const onSubmit = async () => {
  if (!newPassword || !confirmPassword) {
    Alert.alert('Error', 'Por favor complete ambos campos de contraseña');
    return;
  }

  if (newPassword.length < 6) {
    Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
    return;
  }

  if (newPassword !== confirmPassword) {
    Alert.alert('Error', 'Las contraseñas no coinciden');
    return;
  }

  // API call para actualizar contraseña
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dni, code, new_password: newPassword }),
    });
    // ... resto del código
  } catch (error) {
    Alert.alert('Error', 'Error de conexión');
  }
};

// NUEVO: Retroalimentación visual en TextInputs
<TextInput
  style={{
    backgroundColor: "#fcfcfcff",
    borderWidth: 1,
    borderColor: newPassword.length > 0 && newPassword.length < 6 ? "#ff0000" : "#939393ff",
    color: "#000",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16
  }}
  value={newPassword}
  onChangeText={handleNewPasswordChange}
  secureTextEntry
  placeholder="Mínimo 6 caracteres"
/>

<TextInput
  style={{
    backgroundColor: "#fcfcfcff",
    borderWidth: 1,
    borderColor: showValidation
      ? (passwordsMatch ? "#00ff00" : "#ff0000")
      : "#939393ff",
    color: "#000",
    borderRadius: 10,
    padding: 12,
    marginBottom: showValidation ? 5 : 16
  }}
  value={confirmPassword}
  onChangeText={handleConfirmPasswordChange}
  secureTextEntry
  placeholder="Repite la contraseña"
/>

{showValidation && (
  <CustomText style={{
    color: passwordsMatch ? "#00aa00" : "#ff0000",
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'center'
  }}>
    {passwordsMatch ? "✓ Contraseñas coinciden" : "✗ Las contraseñas no coinciden"}
  </CustomText>
)}
```

#### **📁 `app/(auth)/login.tsx`**
```typescript
// MODIFICADO: Login real con API (antes usaba datos mock)
const onSubmit = async () => {
  if (!dni || !password) {
    Alert.alert("Error", "Por favor ingrese DNI y contraseña.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dni, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (remember) {
        await AsyncStorage.setItem('user_token', data.access_token);
        await AsyncStorage.setItem('user_data', JSON.stringify({
          user_id: data.user_id,
          user_doc: data.user_doc
        }));
      }

      Alert.alert("Éxito", "Login exitoso!", [
        { text: "OK", onPress: () => router.replace("/(tabs)") }
      ]);
    } else {
      Alert.alert("Error", data.detail || "Credenciales inválidas");
    }
  } catch (error) {
    Alert.alert("Error", "Error de conexión con el servidor");
  }
};
```

---

## 🔄 FLUJO COMPLETO DE RECUPERACIÓN

### **Paso 1: Verificación de DNI**
1. Usuario ingresa DNI
2. Frontend: `POST /auth/send-recovery-code`
3. Backend: Valida DNI en BD
4. Backend: Genera código de 6 dígitos
5. Backend: Almacena código con timestamp
6. Backend: "Envía SMS" (imprime en consola)
7. Frontend: Muestra código en alert
8. Navega a paso 2

### **Paso 2: Verificación de Código**
1. Usuario ingresa código del SMS
2. Frontend: `POST /auth/verify-recovery-code`
3. Backend: Verifica código y expiración (10 min)
4. Backend: Retorna confirmación
5. Frontend: Navega a paso 3

### **Paso 3: Nueva Contraseña**
1. Usuario ingresa nueva contraseña (2 veces)
2. Validaciones en tiempo real:
   - Longitud mínima (6 caracteres)
   - Campos no vacíos
   - Coincidencia exacta
3. Frontend: `POST /auth/reset-password`
4. Backend: Verifica código nuevamente
5. Backend: Actualiza contraseña en BD con hash
6. Frontend: Redirige a login

### **Paso 4: Login con Nueva Contraseña**
1. Usuario intenta login con nueva contraseña
2. Frontend: `POST /auth/login`
3. Backend: Valida credenciales contra BD
4. Backend: Retorna JWT token
5. Frontend: Guarda token y redirige a app

---

## 🛠️ CONFIGURACIÓN PARA PRODUCCIÓN

### **SMS Real (Twilio)**
```python
# En crud.py, reemplazar send_recovery_sms():
from twilio.rest import Client

def send_recovery_sms(phone: str, code: str):
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        body=f"Tu código de recuperación es: {code}",
        from_='+1234567890',  # Tu número Twilio
        to=phone
    )
    print(f"SMS enviado: {message.sid}")
```

### **Variables de Entorno**
```bash
# .env
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
SECRET_KEY=your_jwt_secret
```

### **CORS en Producción**
```python
# main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tuapp.com"],  # URL específica
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)
```

---

## 🧪 DATOS DE PRUEBA

- **DNI:** `12345678`
- **Contraseña inicial:** `password123`
- **Teléfono:** `+51999888777`
- **Código SMS:** Aparece en consola del backend

---

## 📚 CONCEPTOS APRENDIDOS

1. **FastAPI con Pydantic:** Validación automática de datos
2. **JWT Authentication:** Tokens seguros para sesiones
3. **Password Hashing:** bcrypt para seguridad
4. **CORS Middleware:** Comunicación frontend-backend
5. **React Native AsyncStorage:** Persistencia local
6. **Real-time Validation:** UX mejorada
7. **Error Handling:** Manejo robusto de errores
8. **API Design:** RESTful endpoints
9. **State Management:** React hooks para UI
10. **TypeScript:** Tipado fuerte en frontend

---

## 🚀 PRÓXIMOS PASOS SUGERIDOS

1. **Integrar SMS real** (Twilio/AWS SNS)
2. **Rate limiting** para prevenir abuso
3. **Email recovery** como alternativa
4. **2FA** para mayor seguridad
5. **Password strength indicator**
6. **Session management** mejorado
7. **Audit logging** de recuperaciones
8. **Frontend testing** con Jest
9. **Backend testing** con pytest
10. **Docker deployment**

---

*Documentación creada para estudio y referencia futura del sistema de recuperación de contraseña implementado.*
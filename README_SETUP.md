# VIP2Cars - Setup Instructions

## 🚀 Quick Start

### Option 1: Mock Data (Recommended for Development)
The app is configured to work with mock data by default. No backend required!

1. **Install frontend dependencies:**
```bash
npm install
```

2. **Run the app:**
```bash
npm start
# or
npx expo start
```

3. **Test Login with these credentials:**
   - DNI: `12345678` | Password: `password123`
   - DNI: `87654321` | Password: `test123`

### Option 2: Full Backend Setup
If you want to use the real API with SQLite database:

#### Backend Setup:
```bash
cd backend-sim

# Install Python dependencies
pip install -r requeriments.txt

# Initialize database with test user
python init_db.py

# Run the server
python run_server.py
```

#### Frontend Setup:
```bash
# Install dependencies
npm install

# Update login.tsx to use real API (uncomment the fetch call)
# Change the IP in login.tsx from mock to: http://127.0.0.1:8000/auth/login

# Run the app
npm start
```

## 📱 App Features

- ✅ User authentication (DNI + Password)
- ✅ Remember me functionality
- ✅ Password recovery flow
- ✅ SQLite database integration
- ✅ Mock data for offline development

## 🔧 Configuration

### Database
- **Type**: SQLite
- **File**: `backend-sim/vip2cars.db`
- **Auto-created**: Yes

### Test Users
- DNI: `12345678` | Password: `password123`
- DNI: `87654321` | Password: `test123`

### API Endpoints (when using backend)
- `POST /auth/login` - User authentication
- `POST /auth/reset-password` - Password reset

## 🐛 Troubleshooting

### Login Issues
1. **"Credenciales inválidas"**: Check DNI and password
2. **Network errors**: Make sure backend is running on port 8000
3. **Database errors**: Run `python init_db.py` to create test user

### Common Commands
```bash
# Reset database
cd backend-sim && rm vip2cars.db && python init_db.py

# Clear React Native cache
npx react-native start --reset-cache

# Clear Expo cache
npx expo r -c
```

## 📂 Project Structure

```
vip2cars/
├── app/                    # React Native app
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main app tabs
│   └── _layout.tsx        # Root layout
├── backend-sim/           # FastAPI backend
│   ├── models.py          # Database models
│   ├── schemas.py         # Pydantic schemas
│   ├── crud.py            # Database operations
│   ├── routers/           # API endpoints
│   └── vip2cars.db        # SQLite database
├── components/            # Reusable components
└── assets/               # Images and fonts
```

## 🎯 Development Notes

- **Frontend**: React Native with Expo
- **Backend**: FastAPI with SQLAlchemy
- **Database**: SQLite for development
- **Authentication**: JWT tokens
- **Password Hashing**: bcrypt

Happy coding! 🚗💨
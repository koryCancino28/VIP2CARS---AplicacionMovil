# VIP2Cars Backend API

## Setup

1. Install dependencies:
```bash
pip install -r requeriments.txt
```

2. Initialize database:
```bash
python init_db.py
```

3. Run server:
```bash
python run_server.py
```

## Test Credentials

- **DNI**: 12345678
- **Password**: password123

## API Endpoints

- `POST /auth/login` - User login
- `POST /auth/reset-password` - Password reset

## Database

- SQLite database: `vip2cars.db`
- Tables created automatically on first run

## Notes

- Uses bcrypt for password hashing
- JWT tokens for authentication
- SQLite for local development
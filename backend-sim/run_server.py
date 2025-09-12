#!/usr/bin/env python3

import uvicorn
from main import app

if __name__ == "__main__":
    print("Starting VIP2Cars API Server...")
    print("Test credentials:")
    print("DNI: 12345678")
    print("Password: 123456")
    print("\nServer will be available at: http://localhost:8000")
    print("API docs at: http://localhost:8000/docs")

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
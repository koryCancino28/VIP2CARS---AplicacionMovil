#!/usr/bin/env python3

import uvicorn
from main import app

if __name__ == "__main__":
    print("Starting VIP2Cars API Server...")
    print("Test credentials:")
    print("DNI: 12345678")
    print("Password: 123456")
    print("\nServer will be available at: http://192.168.137.1:8000")
    print("API docs at: http://192.168.137.1:8000/docs")

    uvicorn.run(
        "main:app",
        host="192.168.137.1",
        port=8000,
        reload=True,
        log_level="info"
    )
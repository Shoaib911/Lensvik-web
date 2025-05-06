# main_app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from image_processor import app as image_app
from tryon_service import app as tryon_app

main_app = FastAPI()

# ✅ CORS for entire API
main_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Mount routers
main_app.mount("/image", image_app)
main_app.mount("/tryon", tryon_app)

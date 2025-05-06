from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
from PIL import Image
import io
import base64
import mediapipe as mp

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mp_face_mesh = mp.solutions.face_mesh

@app.post("/detect")  # ✅ Correct
async def detect_landmarks(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    face_mesh = mp_face_mesh.FaceMesh(
        static_image_mode=True,
        max_num_faces=1,
        refine_landmarks=True,
        min_detection_confidence=0.5
    )

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result = face_mesh.process(img_rgb)

    if not result.multi_face_landmarks:
        return JSONResponse(status_code=400, content={"error": "No face detected"})

    landmarks = result.multi_face_landmarks[0].landmark
    key_points = {
        "leftTemple": {"x": landmarks[234].x, "y": landmarks[234].y},
        "rightTemple": {"x": landmarks[454].x, "y": landmarks[454].y},
        "nose": {"x": landmarks[6].x, "y": landmarks[6].y}
    }

    return {"success": True, "landmarks": key_points}

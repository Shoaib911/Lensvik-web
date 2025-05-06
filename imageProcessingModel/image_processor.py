from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from PIL import Image
import numpy as np
import io
import cv2
from rembg import remove

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process-image")
async def process_image(file: UploadFile = File(...)):
    contents = await file.read()
    result = remove(contents)
    result_image = Image.open(io.BytesIO(result)).convert("RGBA")
    result_np = np.array(result_image)

    rgb = result_np[:, :, :3]
    alpha = result_np[:, :, 3]
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
    h, s, v = cv2.split(hsv)

    glare_mask = ((v > 140) & (s < 60) & (alpha > 0)).astype(np.uint8) * 255
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    glare_mask = cv2.morphologyEx(glare_mask, cv2.MORPH_CLOSE, kernel, iterations=2)

    cleaned = result_np.copy()
    cleaned[glare_mask > 0] = [0, 0, 0, 0]

    cleaned_img = Image.fromarray(cleaned)
    img_byte_arr = io.BytesIO()
    cleaned_img.save(img_byte_arr, format="PNG")
    img_byte_arr.seek(0)

    return StreamingResponse(img_byte_arr, media_type="image/png")
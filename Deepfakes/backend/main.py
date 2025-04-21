from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import shutil
import uuid
from pathlib import Path
import sqlite3
import os

from checker import DeepfakeDetector

detector = DeepfakeDetector()

app = FastAPI()

app.mount("/images", StaticFiles(directory="Dataset"), name="images")
app.mount("/videos", StaticFiles(directory="Dataset/Videos"), name="videos")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "images.db"
TEMP_DIR = Path("/tmp/deepfake_check")
TEMP_DIR.mkdir(parents=True, exist_ok=True)

@app.post("/api/check")
async def check(file: UploadFile = File(...)):
    if file.content_type != "image/jpeg":
        raise HTTPException(status_code=400, detail="Only JPEG files are allowed")

    # Save to a unique file in the temp directory
    file_id = str(uuid.uuid4())
    temp_path = TEMP_DIR / f"{file_id}.jpg"
    
    try:
        with temp_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Run detection logic
        label, confidence = detector.predict_image(temp_path)

        # Return structured JSON
        return {
            "label": label,
            "confidence": confidence
        }
    finally:
        # Clean up the file after processing
        if temp_path.exists():
            temp_path.unlink()

@app.get("/api/images/random-batch")
def get_random_images(count: int = 50, split: str = None, label: str = None):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    query = "SELECT path FROM images"
    filters = []
    params = []

    if split:
        filters.append("split = ?")
        params.append(split)
    if label:
        filters.append("label = ?")
        params.append(label)

    if filters:
        query += " WHERE " + " AND ".join(filters)

    query += " ORDER BY RANDOM() LIMIT ?"
    params.append(count)

    c.execute(query, params)
    results = c.fetchall()
    conn.close()

    return [{"url": f"/images/{row[0]}"} for row in results]


@app.get("/api/image/random")
def get_random_image(split: str = None, label: str = None):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    query = "SELECT path FROM images"
    filters = []
    params = []

    if split:
        filters.append("split = ?")
        params.append(split)
    if label:
        filters.append("label = ?")
        params.append(label)

    if filters:
        query += " WHERE " + " AND ".join(filters)

    query += " ORDER BY RANDOM() LIMIT 1"
    c.execute(query, params)
    row = c.fetchone()
    conn.close()

    if row:
        return {"url": f"/images/{row[0]}"}
    return {"error": "No image found"}

VIDEO_DB_PATH = "videos.db"

@app.get("/api/video/random")
def get_random_video(label: str = None):
    conn = sqlite3.connect(VIDEO_DB_PATH)
    c = conn.cursor()

    query = "SELECT path FROM videos"
    filters = []
    params = []

    if label:
        filters.append("label = ?")
        params.append(label)

    if filters:
        query += " WHERE " + " AND ".join(filters)

    query += " ORDER BY RANDOM() LIMIT 1"
    c.execute(query, params)
    row = c.fetchone()
    conn.close()

    if row:
        return {"url": f"/videos/{row[0]}"}
    return {"error": "No video found"}

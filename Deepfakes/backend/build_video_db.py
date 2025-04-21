import os
import sqlite3

ROOT = "./Dataset/Videos"
DB_PATH = "videos.db"

conn = sqlite3.connect(DB_PATH)
c = conn.cursor()

c.execute("DROP TABLE IF EXISTS videos")
c.execute("""
    CREATE TABLE videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT NOT NULL,
        label TEXT NOT NULL
    )
""")

for label in ["Real", "Fake"]:
    dir_path = os.path.join(ROOT, label)
    for fname in os.listdir(dir_path):
        if fname.lower().endswith((".mp4", ".mov", ".avi", ".mkv", ".webm")):
            rel_path = os.path.join(label, fname)
            c.execute("INSERT INTO videos (path, label) VALUES (?, ?)", (rel_path, label))

conn.commit()
conn.close()

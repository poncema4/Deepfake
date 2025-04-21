import os
import sqlite3

ROOT = "./Dataset"
DB_PATH = "images.db"
conn = sqlite3.connect(DB_PATH)
c = conn.cursor()

c.execute("DROP TABLE IF EXISTS images")
c.execute("""
    CREATE TABLE images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT NOT NULL,
        split TEXT NOT NULL,
        label TEXT NOT NULL
    )
""")

for split in ["Train", "Test", "Validation"]:
    for label in ["Real", "Fake"]:
        dir_path = os.path.join(ROOT, split, label)
        for fname in os.listdir(dir_path):
            if fname.lower().endswith((".jpg", ".jpeg", ".png")):
                rel_path = os.path.join(split, label, fname)
                c.execute("INSERT INTO images (path, split, label) VALUES (?, ?, ?)", (rel_path, split, label))

conn.commit()
conn.close()

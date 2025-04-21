import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
from efficientnet_pytorch import EfficientNet
import cv2
import random
import numpy as np

class DeepfakeDetector:
    def __init__(self, model_path="BestDFModel.pth", device=None):
        self.device = device or torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = EfficientNet.from_pretrained("efficientnet-b4")
        self.model._fc = nn.Sequential(
            nn.Linear(self.model._fc.in_features, 256),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(256, 1)
        )
        self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        self.model.to(self.device)
        self.model.eval()

        self.transform = transforms.Compose([
            transforms.Resize((256, 256)),
            transforms.ToTensor(),
            transforms.Normalize([0.5]*3, [0.5]*3)
        ])

    def predict_image(self, image_path):
        image = Image.open(image_path).convert("RGB")
        image = self.transform(image).unsqueeze(0).to(self.device)

        with torch.no_grad():
            output = self.model(image)
            prob = torch.sigmoid(output).item()

        label = "Real" if prob > 0.5 else "Fake"
        confidence = round(prob if label == "Real" else 1 - prob, 4)
        return label, confidence

    def predict_video(self, video_path, num_frames=3):
        cap = cv2.VideoCapture(video_path)
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

        if frame_count < num_frames:
            sampled_idxs = list(range(frame_count))
        else:
            sampled_idxs = sorted(random.sample(range(frame_count), num_frames))

        confidences = []
        for idx in sampled_idxs:
            cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
            success, frame = cap.read()
            if success:
                image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
                image = self.transform(image).unsqueeze(0).to(self.device)
                with torch.no_grad():
                    output = self.model(image)
                    prob = torch.sigmoid(output).item()
                    confidence = prob if prob > 0.5 else 1 - prob
                    confidences.append(confidence)

        cap.release()

        if not confidences:
            return "Unknown", 0.0

        avg_conf = sum(confidences) / len(confidences)
        label = "Real" if avg_conf > 0.5 else "Fake"
        return label, round(avg_conf, 4)

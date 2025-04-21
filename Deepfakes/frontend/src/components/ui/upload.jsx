import React, { useState } from "react";

export default function UploadWindow() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && (uploadedFile.type === "image/jpeg" || uploadedFile.type === "video/mp4")) {
      setFile(uploadedFile);
    } else {
      alert("Only JPG images or MP4 videos are allowed.");
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-md bg-white max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload a JPG or MP4 File</h2>
      <input
        type="file"
        accept=".jpg, .jpeg, .mp4"
        onChange={handleFileChange}
        className="mb-4"
      />
      {file && (
        <div className="text-sm text-gray-700">
          <p><strong>File Name:</strong> {file.name}</p>
          <p><strong>Type:</strong> {file.type}</p>
          <p><strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}
    </div>
  );
}

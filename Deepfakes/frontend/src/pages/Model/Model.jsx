import '../Model/model.css';
import UploadWindow from '../../components/ui/upload';
import React, { useState } from "react";

export default function Model() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/jpeg") {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Only JPEG images are supported.");
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to upload or process the file.");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto text-white leading-relaxed">
    <h1 className="text-3xl font-bold mb-6 text-center">Deepfake Detection Model Summary</h1>
    
    <section id="what">
    <h2 className="text-2xl font-semibold mb-2">1. Model Architecture: EfficientNetB4 with Head</h2>
    <ul className="list-disc ml-10 space-y-2 text-justify">
    <li>A pretrained model on ImageNet provides strong feature extraction for visual patterns.</li>
    <li>
    Custom Head allowing for binary classification:
    <pre className="bg-gray-800 text-green-300 p-3 rounded mt-2 overflow-x-auto">
    {`nn.Sequential(
  nn.Linear(in_features, 256),
  nn.ReLU(),
  nn.Dropout(0.3),
  nn.Linear(256, 1)
)`}
      </pre>
      </li>
      </ul>
      </section>
      
      <section id="what">
      <h2 className="text-2xl font-semibold mb-2">2. Dataset and Pre-Processing</h2>
      <ul className="list-disc ml-10 space-y-2 text-justify">
      <li>
      Transformations on the train set include resizing, random horizontal flip, rotation,
      color jitter, and resized crop. Normalizes mean and standard deviation to 0.5 each.
      This increases data variability to reflect real-world image variance.
      </li>
      <li>
      Transformations on the test/validation set include only resizing and normalization,
      without any augmentation.
      </li>
      </ul>
      </section>
      
      <section id="what">
      <h2 className="text-2xl font-semibold mb-2">3. Label Smoothing and MixUp Augmentation</h2>
      <ul className="list-disc ml-10 space-y-2 text-justify">
      <li>Label smoothing reduces sharp decision boundaries and prevents overfitting on noisy data.</li>
      <li>MixUp augmentation blends image-label pairs, improving generalization and boundary smoothing.</li>
      </ul>
      </section>
      
      <section id="what">
      <h2 className="text-2xl font-semibold mb-2">4. Training Loop</h2>
      <ul className="list-disc ml-10 space-y-2 text-justify">
      <li>Uses mixed precision training with <code>torch.cuda.amp</code> and <code>GradScaler()</code> for efficient GPU usage.</li>
      <li>Tracks training loss and accuracy in real time for monitoring progress.</li>
      <li>
      Employs early stopping and learning rate scheduling. Saves the best model by tracking
      validation AUC and reduces learning rate when AUC plateaus.
      </li>
      </ul>
      </section>
      
      <section id="what">
      <h2 className="text-2xl font-semibold mb-2">5. Performance</h2>
      <ul className="list-disc ml-10 space-y-2 text-justify">
      <li>Test Accuracy: <strong>0.8937</strong></li>
      <li>AUC Score: <strong>0.9548</strong></li>
      <li>
      <strong>Fake Class:</strong>
      <div>
      <ul className="list-disc ml-8 space-y-1">
      <li>Precision: 0.84</li>
      <li>Recall: 0.97</li>
      </ul>
      </div>
      </li>
      <li>
      <strong>Real Class:</strong>
      <div>
      <ul className="list-disc ml-8 space-y-1">
      <li>Precision: 0.96</li>
      <li>Recall: 0.82</li>
      </ul>
      </div>
      </li>
      <li>
      <strong>Confusion Matrix:</strong>
      <pre className="bg-gray-800 text-green-300 p-3 rounded overflow-x-auto">
      {`[[5315  177]]   ← Fake predicted correctly most of the time
[[ 982 4431]]   ← Real had more misclassifications`}
        </pre>
        </li>
        </ul>
        </section>

        <section id="upload">
  <h2>Upload Image for Analysis</h2>
  
  <div className="upload-container">
  <label className="upload-box relative cursor-pointer block w-fit mx-auto">
  <input 
    type="file" 
    accept="image/jpeg" 
    onChange={handleFileChange} 
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
  />

  {selectedFile ? (
    <>
      <img 
        src={URL.createObjectURL(selectedFile)} 
        alt="Preview" 
        className="upload-preview rounded-md w-48 h-48 object-cover"
      />
      <div className="upload-placeholder absolute inset-0 flex items-end justify-center bg-black bg-opacity-30 text-white text-sm rounded-md">
        <span className="mb-2">Click to change</span>
      </div>
    </>
  ) : (
    <div className="upload-placeholder flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 w-64 h-48 text-center text-gray-400">
      <svg 
        className="mb-2"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        width="40"
        height="40"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p>Click to upload JPEG</p>
      <p className="text-sm">(Max size: 5MB)</p>
    </div>
  )}
</label>


    <button 
      onClick={handleUpload} 
      className="upload-button"
      disabled={!selectedFile}
    >
      Analyze Image
    </button>

    {error && (
      <div className="result-box" style={{border: '1px solid #ff6464'}}>
        <p className="text-center" style={{color: '#ff6464'}}>⚠️ {error}</p>
      </div>
    )}

    {result && (
      <div className="result-box">
        <h3 className="text-center mb-3" style={{color: '#646cff'}}>Analysis Results</h3>
        <div className="result-item">
          <span>Label:</span>
          <span style={{color: result.label === 'Fake' ? '#ff6464' : '#64ff88'}}>
            {result.label}
          </span>
        </div>
        <div className="result-item">
          <span>Confidence:</span>
          <span style={{color: '#646cff'}}>
            {(result.confidence * 100).toFixed(2)}%
          </span>
        </div>
      </div>
    )}
  </div>
</section>
        </div>
      );
    } 

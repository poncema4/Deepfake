import { useEffect, useState } from 'react';
import './ImageStream.css';

const IMAGE_HEIGHT = 256;
const GAP = 20;
const SCROLL_SPEED = 500;

const ImageStream = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/images/random-batch?count=50")
      .then(res => res.json())
      .then(data => {
        const urls = data.map(item => item.url);
        setImages([...urls, ...urls]);
      });
  }, []);
  

  const containerHeight = (IMAGE_HEIGHT + GAP) * images.length;

  return (
    <div className="image-stream">
      <div 
        className="scrolling-container"
        style={{
          height: `${containerHeight}px`,
          animationDuration: `${containerHeight / SCROLL_SPEED}s`
        }}
      >
        {images.map((img, index) => (
          <div 
            key={`img-${index}`}
            className="image-wrapper"
            style={{
              height: `${IMAGE_HEIGHT}px`,
              marginBottom: `${GAP}px`
            }}
          >
            <img 
              src={img} 
              alt={`Deepfake ${index}`}
              className="stream-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageStream;

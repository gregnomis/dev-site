import React, { useState, useEffect, useMemo } from 'react';
import './ImageCarousel.css';
import { images } from '../../config/images';

const ImageCarousel = ({ projectId }) => {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if (projectId !== 'AiQArt') {
    return null;
  }
  
  // Use useMemo to prevent unnecessary recalculation
  const aiqartImages = useMemo(() => images.aiqart, []);
  
  // Load images progressively to improve performance
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    
    // Load first 4 images immediately for faster initial render
    setLoadedImages(aiqartImages.slice(0, 4));
    
    // Load remaining images after a small delay
    const timer = setTimeout(() => {
      if (mounted) {
        setLoadedImages(aiqartImages);
        setIsLoading(false);
      }
    }, 500);
    
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [aiqartImages]);
  
  const allImages = useMemo(() => [...loadedImages, ...loadedImages], [loadedImages]);
  
  const handleImageClick = (imageSrc) => {
    setEnlargedImage(imageSrc);
  };
  
  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  return (
    <>
      <div 
        className={`image-carousel ${isPaused ? 'paused' : ''} ${isLoading ? 'loading' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {isLoading && <div className="carousel-loader">Loading images...</div>}
        <div className="image-content">
          {allImages.map((image, index) => (
            <div 
              key={index} 
              className="image-item"
              onClick={() => handleImageClick(image)}
            >
              <img 
                src={image} 
                alt={`AiQArt Generated QR Code ${index % loadedImages.length + 1}`} 
                loading="lazy" 
                width="200" 
                height="200"
              />
            </div>
          ))}
        </div>
      </div>
      
      {enlargedImage && (
        <div className="enlarged-image-overlay" onClick={closeEnlargedImage}>
          <div className="enlarged-image-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" aria-label="Close image" onClick={closeEnlargedImage}>×</button>
            <img src={enlargedImage} alt="Enlarged AiQArt QR Code" />
            <div className="tap-to-close-hint">Tap outside to close</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;

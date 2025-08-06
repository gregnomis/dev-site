import { useState, useEffect } from 'react';

/**
 * Hook that tracks when an image is loaded.
 * @param {string} src - Image source URL
 * @returns {boolean} - Whether the image is loaded
 */
export const useImageLoad = (src) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (!src) return;
    
    setIsLoaded(false);
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    // Clean up if component unmounts
    return () => {
      img.onload = null;
    };
  }, [src]);
  
  return isLoaded;
};

export default useImageLoad;

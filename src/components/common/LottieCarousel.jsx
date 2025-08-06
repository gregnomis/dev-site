import React, { useState, useEffect } from 'react';
import './LottieCarousel.css';
import { useLottie } from 'lottie-react';

// Individual Lottie item component with consistent sizing
const LottieItem = ({ animationData, index }) => {
  const options = {
    animationData,
    loop: true,
    autoplay: true
  };
  
  const { View } = useLottie(options);
  
  return (
    <div className="lottie-item">
      <div className="lottie-wrapper">{View}</div>
    </div>
  );
};

const LottieCarousel = () => {
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    // Fetch the animations from public folder
    const loadAnimations = async () => {
      const animationFiles = [
        '/assets/lotties/lockchain/blockchain.json',
        '/assets/lotties/lockchain/data_upload_success_bitcoin.json',
        '/assets/lotties/lockchain/scan_file.json',
        '/assets/lotties/lockchain/searching_blockchain.json',
        '/assets/lotties/lockchain/success_animation.json',
        '/assets/lotties/lockchain/verify_others_lottie.json',
        '/assets/lotties/lockchain/upload_animation.json',
        '/assets/lotties/lockchain/ai_icon_lottie_2.json'
      ];

      const loadedAnimations = await Promise.all(
        animationFiles.map(async (file) => {
          try {
            const response = await fetch(file);
            return await response.json();
          } catch (error) {
            console.error(`Failed to load ${file}:`, error);
            return null;
          }
        })
      );

      setAnimations(loadedAnimations.filter(anim => anim !== null));
    };

    loadAnimations();
  }, []);

  // Create enough copies for seamless loop (3 sets = 24 total items)
  const allAnimations = [...animations, ...animations, ...animations];

  return (
    <div className="lottie-carousel">
      <div className="lottie-content">
        {allAnimations.map((animation, index) => (
          <LottieItem key={index} animationData={animation} index={index} />
        ))}
      </div>
    </div>
  );
};

export default LottieCarousel;

import { useState, useEffect } from 'react';

export const useTypewriter = (text, initialDelay = 800) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setTypedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        
        let randomInterval;
        if (Math.random() < 0.2) {
          randomInterval = Math.floor(Math.random() * 400) + 200; 
        } else {
          randomInterval = Math.floor(Math.random() * 220) + 80;
        }
        timeoutId = setTimeout(typeNextCharacter, randomInterval);
      }
    };

    timeoutId = setTimeout(typeNextCharacter, initialDelay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, initialDelay]);

  return typedText;
};

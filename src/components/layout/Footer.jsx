import React from 'react';
import { useLottie } from 'lottie-react';

const Footer = () => {
  const [emailAnimation, setEmailAnimation] = React.useState(null);
  const [animationLoaded, setAnimationLoaded] = React.useState(false);

  // Load email animation
  React.useEffect(() => {
    console.log('Loading email animation...');
    const loadEmailAnimation = async () => {
      try {
        const response = await fetch('/assets/lotties/lockchain/email_sent.json');
        if (!response.ok) {
          throw new Error(`Failed to load animation: ${response.status}`);
        }
        const animationData = await response.json();
        console.log('Animation data loaded successfully');
        setEmailAnimation(animationData);
        setAnimationLoaded(true);
      } catch (error) {
        console.error('Failed to load email animation:', error);
        // Try alternative path as fallback
        try {
          const altResponse = await fetch('/public/assets/lotties/lockchain/email_sent.json');
          if (altResponse.ok) {
            const altData = await altResponse.json();
            setEmailAnimation(altData);
            setAnimationLoaded(true);
          }
        } catch (fallbackError) {
          console.error('Fallback animation also failed:', fallbackError);
        }
      }
    };
    loadEmailAnimation();
  }, []);
  
  const { View: EmailView } = useLottie({
    animationData: emailAnimation,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      clearCanvas: false
    }
  });

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="email-animation">
          {EmailView}
        </div>
        <div className="footer-contact">
          <a href="mailto:greg.simon@lockchain.ca" className="footer-email">
            greg.simon@lockchain.ca
          </a>
        </div>
        <p>© {new Date().getFullYear()} Greg Simon. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

export function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function isPortraitOrientation() {
  return window.matchMedia("(orientation: portrait)").matches;
}

export function optimizeForMobile() {
  if (isMobileDevice()) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    }
    
    document.addEventListener('touchstart', handleTouchStart, {passive: true});
  }
}

function handleTouchStart(e) {
  // placeholder for touch-specific optimizations
}

export function isRunningAsPWA() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
}

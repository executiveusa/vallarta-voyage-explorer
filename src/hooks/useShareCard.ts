import { useRef, useEffect } from "react";

export const useShareCard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawForecastCard = async (timeLeft: string, sunsetTime: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630; // OG Image standard
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#f97316'); // Orange-500
    gradient.addColorStop(0.5, '#9333ea'); // Purple-600
    gradient.addColorStop(1, '#312e81'); // Indigo-900
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, 1200, 630);

    // Text - Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 80px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Today's Sunset in Vallarta", 600, 180);

    // Text - Countdown
    ctx.font = 'bold 120px Inter, sans-serif';
    ctx.fillText(timeLeft, 600, 350);

    // Text - Time
    ctx.font = '50px Inter, sans-serif';
    ctx.fillText(`Sunset at ${sunsetTime}`, 600, 450);

    // Footer - Logo / Brand
    ctx.font = 'bold 40px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText('SUNSET VALLARTA', 600, 560);

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  };

  const drawSpotCard = async (spotName: string, area: string, imageUrl: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Load Image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    }).catch(() => null); // Fallback if image fails

    // Draw Image (Cover)
    let drawWidth = 1200;
    let drawHeight = 630;
    if (img.width && img.height) {
        // simple cover validation
        const ratio = Math.max(1200 / img.width, 630 / img.height);
        drawWidth = img.width * ratio;
        drawHeight = img.height * ratio;
    }
    ctx.drawImage(img, (1200 - drawWidth) / 2, (630 - drawHeight) / 2, drawWidth, drawHeight);

    // Gradient Overlay for Text
    const gradient = ctx.createLinearGradient(0, 300, 0, 630);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.9)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Text - Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 80px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(spotName, 80, 500);

    // Text - Area
    ctx.font = '50px Inter, sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(area, 80, 570);

    // Branding
    ctx.textAlign = 'right';
    ctx.font = 'bold 40px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('SUNSET VALLARTA', 1120, 570);

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  };

  return { drawForecastCard, drawSpotCard };
};

import { FC, useRef, useEffect } from 'react';

interface ChannelDiagramProps {
  width: number;
  depth: number;
  flowRate: number;
  velocity: number;
  flowType: string;
}

const ChannelDiagram: FC<ChannelDiagramProps> = ({
  width,
  depth,
  flowRate,
  velocity,
  flowType
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Set flow color based on flow type
  const getFlowColor = () => {
    switch (flowType) {
      case 'Subcritical': return '#3B82F6'; // Blue
      case 'Supercritical': return '#F97316'; // Orange
      case 'Critical': return '#10B981'; // Green
      default: return '#3B82F6'; // Default blue
    }
  };

  // Calculate number of arrows based on flow rate
  const getArrowCount = () => {
    return Math.max(3, Math.min(Math.floor(flowRate * 2), 15));
  };

  // Draw the channel diagram
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set dimensions and scale
    const maxWidth = 300;
    const maxHeight = 200;
    const padding = 40;
    
    // Calculate scale to fit canvas
    const scaleW = (maxWidth - 2 * padding) / width;
    const scaleH = (maxHeight - 2 * padding) / depth;
    const scale = Math.min(scaleW, scaleH);

    // Calculate center positions
    const centerX = maxWidth / 2;
    const bottomY = maxHeight - padding;
    
    // Draw channel (rectangle)
    const scaledWidth = width * scale;
    const scaledDepth = depth * scale;
    const startX = centerX - scaledWidth / 2;
    const startY = bottomY - scaledDepth;

    // Draw channel walls
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#888888';
    
    // Bottom
    ctx.beginPath();
    ctx.moveTo(startX, bottomY);
    ctx.lineTo(startX + scaledWidth, bottomY);
    ctx.stroke();
    
    // Left wall
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, bottomY);
    ctx.stroke();
    
    // Right wall
    ctx.beginPath();
    ctx.moveTo(startX + scaledWidth, startY);
    ctx.lineTo(startX + scaledWidth, bottomY);
    ctx.stroke();

    // Draw water
    ctx.fillStyle = getFlowColor();
    ctx.globalAlpha = 0.6;
    ctx.fillRect(startX, startY, scaledWidth, scaledDepth);
    ctx.globalAlpha = 1.0;

    // Draw flow arrows
    const arrowCount = getArrowCount();
    const arrowSpacing = scaledWidth / (arrowCount + 1);
    const arrowY = startY + scaledDepth / 2;
    const arrowLength = 15 + velocity * 2; // Base length plus velocity factor
    
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    
    for (let i = 1; i <= arrowCount; i++) {
      const arrowX = startX + i * arrowSpacing;
      
      // Draw arrow line
      ctx.beginPath();
      ctx.moveTo(arrowX - arrowLength / 2, arrowY);
      ctx.lineTo(arrowX + arrowLength / 2, arrowY);
      ctx.stroke();
      
      // Draw arrow head
      ctx.beginPath();
      ctx.moveTo(arrowX + arrowLength / 2, arrowY);
      ctx.lineTo(arrowX + arrowLength / 2 - 8, arrowY - 4);
      ctx.lineTo(arrowX + arrowLength / 2 - 8, arrowY + 4);
      ctx.closePath();
      ctx.fill();
    }

    // Draw dimensions
    ctx.fillStyle = '#666666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // Width dimension
    ctx.fillText(`Width: ${width} m`, centerX, bottomY + 20);
    
    // Depth dimension
    ctx.save();
    ctx.translate(startX - 20, startY + scaledDepth / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`Depth: ${depth} m`, 0, 0);
    ctx.restore();
  }, [width, depth, flowRate, velocity, flowType]);

  return (
    <div className="w-full">
      <canvas 
        ref={canvasRef}
        className="w-full h-[200px]"
        style={{ maxWidth: '300px', margin: '0 auto' }}
      />
      <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
        <p>Flow Type: <span className="font-medium">{flowType}</span></p>
        <p>Velocity: <span className="font-medium">{velocity.toFixed(2)} m/s</span></p>
      </div>
    </div>
  );
};

export default ChannelDiagram;
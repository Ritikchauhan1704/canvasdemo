import {useDraw} from './hooks/useDraw';

export default function App() {
  const {canvasRef, onMouseDown} = useDraw(drawLine);

  function drawLine({prevPoint, currPoint, ctx}: Draw) {
    const {x: currX, y: currY} = currPoint;
    const lineColor = '#000';
    const lineWidth = 5;

    const startPoint = prevPoint ?? currPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center border">
      A canvas drawing demo
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={750}
        height={500}
        className="border-2 border-black"
      ></canvas>
    </div>
  );
}

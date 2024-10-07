import {useEffect, useRef, useState} from 'react';

export const useDraw = (
  OnDraw: ({ctx, currPoint, prevPoint}: Draw) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);

  const [mouseDown, setMouseDown] = useState(false);
  const onMouseDown = () => {
    setMouseDown((prev) => !prev);
    prevPoint.current=null
  }
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;
      const currPoint = computePointInCanvas(e);
      console.log(currPoint);
      const ctx = canvasRef.current?.getContext('2d');
      if (!currPoint || !ctx) return;

      OnDraw({ctx, currPoint, prevPoint: prevPoint.current});
      prevPoint.current = currPoint;
    };
    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return {x, y};
    };
    // add event listener
    canvasRef.current?.addEventListener('mousemove', handler);

    // remove event listener
    return () => canvasRef.current?.removeEventListener('mousemove', handler);
  }, [OnDraw]);
  return {canvasRef, onMouseDown};
};

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y);
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        setIsPointer(
          computedStyle.cursor === 'pointer' ||
          hoveredElement.tagName === 'A' ||
          hoveredElement.tagName === 'BUTTON' ||
          hoveredElement.closest('a') ||
          hoveredElement.closest('button')
        );
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', updateCursorType);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', updateCursorType);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Main cursor dot - no lag, instant follow */}
      <div
        className="fixed w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          transform: `scale(${isPointer ? 0.5 : 1})`,
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.1s ease, opacity 0.2s ease',
        }}
      />

      {/* Cursor ring - no lag, instant follow */}
      <div
        className="fixed w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          transform: `scale(${isPointer ? 1.5 : 1})`,
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.15s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
}

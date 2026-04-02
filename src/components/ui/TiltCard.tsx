'use client';

import { useRef, useCallback, useState, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [hasHoverCapability, setHasHoverCapability] = useState(false);

  useEffect(() => {
    setHasHoverCapability(window.matchMedia('(hover: hover)').matches);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !hasHoverCapability) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);

    const maxAngle = 4;

    setTilt({
      rotateX: -offsetY * maxAngle,
      rotateY: offsetX * maxAngle,
    });

    setShine({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, [hasHoverCapability]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setShine({ x: 50, y: 50 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (hasHoverCapability) {
      setIsHovering(true);
    }
  }, [hasHoverCapability]);

  if (!hasHoverCapability) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative squircle ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transformStyle: 'preserve-3d',
        transition: isHovering
          ? 'none'
          : 'transform 0.5s ease-out',
      }}
    >
      {children}

      {/* Shine overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        style={{
          background: isHovering
            ? `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.05) 0%, transparent 60%)`
            : 'none',
        }}
      />
    </div>
  );
}

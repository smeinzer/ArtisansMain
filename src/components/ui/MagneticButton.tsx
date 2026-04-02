'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: 'div' | 'span';
}

export default function MagneticButton({
  children,
  className,
  strength = 0.3,
  as: Tag = 'div',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [hasHover, setHasHover] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setHasHover(true);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;
      setOffset({ x: dx, y: dy });
      setIsHovering(true);
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  if (!hasHover) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement> & React.RefObject<HTMLSpanElement>}
      className={className}
      style={{
        display: 'inline-block',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: isHovering
          ? 'transform 0.1s ease-out'
          : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        willChange: isHovering ? 'transform' : 'auto',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Tag>
  );
}

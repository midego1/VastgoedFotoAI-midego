"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
      {/* Visual: Image Enhancement Mockup */}
      <div className="bg-white rounded-[2rem] shadow-2xl p-4 border border-gray-100 relative z-20 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="text-xs font-bold text-[#F16529] bg-[#F16529]/10 px-3 py-1 rounded-full">
            AI Processing
          </div>
        </div>
        
        <div
          ref={containerRef}
          className="flex-1 bg-gray-100 rounded-xl relative overflow-hidden cursor-ew-resize select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={handleClick}
        >
          {/* Before Image */}
          <Image
            src="/images/comparison-before.jpg"
            alt="Before AI enhancement"
            fill
            className="object-cover"
            priority
          />
          
          {/* After Image with clip-path */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src="/images/comparison-after-scandinavian.jpg"
              alt="After AI enhancement"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Labels */}
          <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
            Before
          </div>
          <div className="absolute bottom-3 right-3 bg-[#F16529]/90 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
            After
          </div>

          {/* Slider Line */}
          <div
            className="absolute inset-y-0 w-1 bg-white cursor-ew-resize shadow-lg"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#221E68]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#221E68"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 9l-4 3 4 3" />
                <path d="M16 9l4 3-4 3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

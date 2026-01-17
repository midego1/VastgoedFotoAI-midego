"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

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
    <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
      {/* Visual: Image Enhancement Mockup */}
      <div className="relative z-20 flex h-full flex-col rounded-[2rem] border border-gray-100 bg-white p-4 shadow-2xl">
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="rounded-full bg-[#F16529]/10 px-3 py-1 font-bold text-[#F16529] text-xs">
            AI Processing
          </div>
        </div>

        <div
          className="relative flex-1 cursor-ew-resize select-none overflow-hidden rounded-xl bg-gray-100 touch-none"
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          ref={containerRef}
        >
          {/* Before Image */}
          <Image
            alt="Before AI enhancement"
            className="object-cover"
            fill
            priority
            src="/images/comparison-after-scandinavian.jpg"
          />

          {/* After Image with clip-path */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              alt="After AI enhancement"
              className="object-cover"
              fill
              priority
              src="/images/comparison-before.jpg"
            />
          </div>

          {/* Labels */}
          <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 font-bold text-white text-xs backdrop-blur-sm">
            Before
          </div>
          <div className="absolute right-3 bottom-3 rounded-md bg-[#F16529]/90 px-2 py-1 font-bold text-white text-xs backdrop-blur-sm">
            After
          </div>

          {/* Slider Line */}
          <div
            className="absolute inset-y-0 w-1 cursor-ew-resize bg-white shadow-lg"
            style={{
              left: `${sliderPosition}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#221E68] bg-white shadow-xl">
              <svg
                fill="none"
                height="20"
                stroke="#221E68"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                width="20"
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

"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Sofa } from "lucide-react";
import { useTranslations } from "next-intl";

export function VirtualStagingPreview() {
  const t = useTranslations("landing.features.virtualStagingPreview");
  const [selectedStyle, setSelectedStyle] = useState<
    "scandi" | "modern" | "industrial"
  >("scandi");
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getStagedImageSrc = () => {
    switch (selectedStyle) {
      case "scandi":
        return "/images/comparison-after-scandinavian.jpg";
      case "industrial":
        return "/images/comparison-after-industrial.jpg";
      case "modern":
        return "/images/comparison-after-modern.jpg";
      default:
        return "/images/comparison-after-scandinavian.jpg";
    }
  };

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };
  const handleClick = (e: React.MouseEvent) => {
    // Only handle click if we are in compare mode and not clicking controls
    if (isCompareMode) handleMove(e.clientX);
  };

  return (
    <div className="relative w-full">
      {/* Mobile Compare Toggle (Above Card) */}
      <div className="mb-4 flex justify-center md:hidden">
        <label className="flex cursor-pointer items-center gap-3 rounded-full bg-white/95 px-4 py-2 font-bold text-[#221E68] text-sm shadow-sm backdrop-blur-md transition-transform hover:scale-105 select-none">
          <span className="text-xs uppercase tracking-wider">{t("compare")}</span>
          <div className="relative flex items-center">
            <input 
              type="checkbox" 
              className="peer sr-only" 
              checked={isCompareMode}
              onChange={(e) => {
                setIsCompareMode(e.target.checked);
                if (!e.target.checked) setSliderPosition(50);
              }}
            />
            <div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[#E7385E] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none ring-offset-2 peer-focus:ring-2 peer-focus:ring-[#E7385E]/20"></div>
          </div>
        </label>
      </div>

      {/* Card Container with Aspect Ratio */}
      <div className="relative w-full overflow-hidden rounded-[2rem] bg-gray-100 shadow-2xl ring-1 ring-black/5">
        <div 
          className="relative aspect-[4/3] w-full touch-none select-none"
          ref={containerRef}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          {/* Base Layer: Staged Image (Right side in slider / Main image) */}
          <Image
            alt={`${selectedStyle} style room`}
            className="object-cover transition-all duration-500"
            src={getStagedImageSrc()}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />

          {/* Overlay Layer: Empty Room (Left side in slider) */}
          {/* Only visible in compare mode, masked by clip-path */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ 
              clipPath: isCompareMode 
                ? `inset(0 ${100 - sliderPosition}% 0 0)` 
                : "inset(0 100% 0 0)", // Hidden when not verifying
              transition: isDragging ? "none" : "clip-path 0.3s ease-out"
            }}
          >
            <Image
              alt="Original empty room"
              className="object-cover"
              src="/images/comparison-before.jpg"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            
            {/* Labels for Slider */}
            {isCompareMode && (
              <div className="absolute bottom-6 left-6 rounded-md bg-black/60 px-2 py-1 font-bold text-white text-xs backdrop-blur-sm z-20">
                {t("before")}
              </div>
            )}
          </div>
          
          {/* Standard Labels (When not comparing) */}
          {!isCompareMode && (
            <div className="absolute top-6 left-6 hidden items-center gap-2 rounded-full bg-white/95 px-4 py-2 font-bold text-[#221E68] text-sm shadow-sm backdrop-blur-md md:flex">
               <Sofa size={16} className="text-[#E7385E]" />
               <span>{t("virtualStaging")}</span>
             </div>
          )}

          {/* Labels for Slider (Right Side) */}
          {isCompareMode && (
             <div className="absolute right-6 bottom-6 rounded-md bg-[#F16529]/90 px-2 py-1 font-bold text-white text-xs backdrop-blur-sm z-20">
               {t("after")}
             </div>
          )}

          {/* Slider Handle */}
          {isCompareMode && (
            <div
              className="absolute inset-y-0 w-1 cursor-ew-resize bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] z-10"
              style={{
                left: `${sliderPosition}%`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#221E68] bg-white shadow-xl">
                <svg
                  fill="none"
                  height="14"
                  stroke="#221E68"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  width="14"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                <svg
                  fill="none"
                  height="14"
                  stroke="#221E68"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  width="14"
                  className="ml-[-6px]"
                >
                   <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          )}

           {/* Compare Toggle (Desktop) */}
           <div className="absolute top-6 right-6 z-30 hidden md:block">
              <label className="flex cursor-pointer items-center gap-3 rounded-full bg-white/95 px-4 py-2 font-bold text-[#221E68] text-sm shadow-sm backdrop-blur-md transition-transform hover:scale-105 select-none">
                <span className="text-xs uppercase tracking-wider">{t("compare")}</span>
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    className="peer sr-only" 
                    checked={isCompareMode}
                    onChange={(e) => {
                      setIsCompareMode(e.target.checked);
                      // Reset position when opening
                      if (!e.target.checked) setSliderPosition(50);
                    }}
                  />
                  <div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[#E7385E] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none ring-offset-2 peer-focus:ring-2 peer-focus:ring-[#E7385E]/20"></div>
                </div>
              </label>
           </div>
        </div>
      </div>

      {/* Floating Style Selector */}
      <div 
        className="mt-6 flex justify-center md:absolute md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:transform md:mt-0 z-30"
      >
        <div className="flex gap-1 rounded-full bg-white/90 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/20 transition-opacity duration-300">
          {["scandi", "modern", "industrial"].map((style) => (
            <button
              key={style}
              onClick={(e) => {
                e.stopPropagation(); // Prevent slider move
                setSelectedStyle(style as "scandi" | "modern" | "industrial");
              }}
              className={`rounded-full px-5 py-2.5 font-bold text-sm transition-all duration-300 active:scale-95 ${
                selectedStyle === style
                  ? "bg-[#221E68] text-white shadow-lg scale-105"
                  : "text-gray-500 hover:text-[#221E68] hover:bg-gray-100/50"
              }`}
            >
              {t(`styles.${style}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { BannerSlide } from '../types';

interface RotatingBannerProps {
  slides: BannerSlide[];
}

const RotatingBanner: React.FC<RotatingBannerProps> = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, slides, isHovered]);

  if (!slides || slides.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section 
      className="relative w-full h-[280px] md:h-[320px] bg-brandPrussian border-y border-brandSoftBlue/10 overflow-hidden group/banner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id || index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Slide Image */}
              <img
                src={slide.imageUrl}
                alt={slide.title || 'Banner Slide'}
                className="w-full h-full object-cover grayscale contrast-110 brightness-95 transition-transform duration-[4000ms] ease-out"
                style={{ transform: isActive ? 'scale(1.03)' : 'scale(1.0)' }}
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows - Only visible on hover */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2 bg-brandPrussian/10 hover:bg-brandPrussian/60 border border-brandCream/10 hover:border-brandCream/30 text-brandCream rounded-none transition-all opacity-0 group-hover/banner:opacity-100 duration-300 pointer-events-auto"
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2 bg-brandPrussian/10 hover:bg-brandPrussian/60 border border-brandCream/10 hover:border-brandCream/30 text-brandCream rounded-none transition-all opacity-0 group-hover/banner:opacity-100 duration-300 pointer-events-auto"
            aria-label="Próximo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* Slide Indicators / Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 right-8 md:right-12 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-brandRed w-6' 
                  : 'bg-brandCream/40 hover:bg-brandCream'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RotatingBanner;

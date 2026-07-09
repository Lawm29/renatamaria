'use client';

import { useState, useEffect, useCallback } from 'react';

const fotos = [
  { src: '/images/bolos/Captura de tela 2026-07-09 113755.png', alt: 'Bolo personalizado' },
  { src: '/images/doces/Captura de tela 2026-07-09 114146.png', alt: 'Doces finos' },
  { src: '/images/bolos/Captura de tela 2026-07-09 113859.png', alt: 'Bolo decorado' },
  { src: '/images/doces/Captura de tela 2026-07-09 114345.png', alt: 'Brigadeiros gourmet' },
  { src: '/images/bolos/Captura de tela 2026-07-09 113914.png', alt: 'Bolo de aniversário' },
  { src: '/images/doces/Captura de tela 2026-07-09 114350.png', alt: 'Bombons especiais' },
  { src: '/images/bolos/Captura de tela 2026-07-09 113925.png', alt: 'Bolo temático' },
  { src: '/images/doces/Captura de tela 2026-07-09 114403.png', alt: 'Doces para festa' },
  { src: '/images/bolos/Captura de tela 2026-07-09 113939.png', alt: 'Bolo artístico' },
  { src: '/images/doces/Captura de tela 2026-07-09 114409.png', alt: 'Paleta de doces' },
  { src: '/images/bolos/Captura de tela 2026-07-09 113947.png', alt: 'Bolo casamento' },
  { src: '/images/doces/Captura de tela 2026-07-09 114418.png', alt: 'Doces finos' },
  { src: '/images/bolos/Captura de tela 2026-07-09 114000.png', alt: 'Bolo formatura' },
  { src: '/images/doces/Captura de tela 2026-07-09 114424.png', alt: 'Bombons variados' },
  { src: '/images/bolos/Captura de tela 2026-07-09 114015.png', alt: 'Bolo infantil' },
  { src: '/images/doces/Captura de tela 2026-07-09 114429.png', alt: 'Doces coloridos' },
  { src: '/images/bolos/Captura de tela 2026-07-09 114110.png', alt: 'Bolo minimalista' },
  { src: '/images/doces/Captura de tela 2026-07-09 114511.png', alt: 'Caixa de doces' },
  { src: '/images/bolos/Captura de tela 2026-07-09 114120.png', alt: 'Bolo rústico' },
  { src: '/images/doces/Captura de tela 2026-07-09 114516.png', alt: 'Doces para casamento' },
  { src: '/images/bolos/Captura de tela 2026-07-09 114159.png', alt: 'Bolo temático' },
  { src: '/images/doces/Captura de tela 2026-07-09 114538.png', alt: 'Brigadeiros especiais' },
];

export default function GaleriaCarrossel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, fotos.length - visibleCount);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  const totalDots = maxIndex + 1;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#5f9ea0] mb-8">
          Nossa Arte
        </h2>
        
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#b8f0ed] hover:text-white transition-all"
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div className="overflow-hidden rounded-xl mx-8">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {fotos.map((foto, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 p-2"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <img
                      src={foto.src}
                      alt={foto.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#b8f0ed] hover:text-white transition-all"
            aria-label="Próximo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[#5f9ea0] w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

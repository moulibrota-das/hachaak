
import { useState, useEffect } from 'react';
import Button from '../../../components/base/Button';

const heroSlides = [
  {
    id: 1,
    title: "Street Style",
    subtitle: "Redefined",
    description: "Discover our premium collection of t-shirts and hoodies designed for the modern urban lifestyle. Quality meets comfort in every stitch.",
    backgroundImage: "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    primaryButton: "Shop Now",
    secondaryButton: "View Collection"
  },
  {
    id: 2,
    title: "Premium",
    subtitle: "T-Shirts",
    description: "Crafted from the finest materials, our t-shirts offer unmatched comfort and style. Perfect for everyday wear or special occasions.",
    backgroundImage: "https://plus.unsplash.com/premium_photo-1690349404248-3ddd9be40eb1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    primaryButton: "Shop T-Shirts",
    secondaryButton: "Learn More"
  },
  {
    id: 3,
    title: "Cozy",
    subtitle: "Hoodies",
    description: "Stay warm and stylish with our collection of premium hoodies. Designed for comfort without compromising on style.",
    backgroundImage: "https://plus.unsplash.com/premium_photo-1688497830977-f9ab9f958ca7?q=80&w=751&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    primaryButton: "Shop Hoodies",
    secondaryButton: "Size Guide"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative h-[800px] sm:h-[700px] lg:min-h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 h-full flex items-center justify-center bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${slide.backgroundImage}')`
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  {slide.title}
                  <br />
                  <span className="text-gray-200">{slide.subtitle}</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Button variant="primary" size="lg" className="bg-white text-black hover:bg-gray-100 whitespace-nowrap cursor-pointer w-full sm:w-auto">
                    {slide.primaryButton}
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black whitespace-nowrap cursor-pointer w-full sm:w-auto">
                    {slide.secondaryButton}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 cursor-pointer w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
        aria-label="Previous slide"
      >
        <i className="ri-arrow-left-line text-xl sm:text-2xl"></i>
      </button>
      
      <button
        onClick={goToNextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 cursor-pointer w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
        aria-label="Next slide"
      >
        <i className="ri-arrow-right-line text-xl sm:text-2xl"></i>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 cursor-pointer w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          <i className={`${isAutoPlaying ? 'ri-pause-line' : 'ri-play-line'} text-base sm:text-lg`}></i>
        </button>
      </div>
    </section>
  );
}

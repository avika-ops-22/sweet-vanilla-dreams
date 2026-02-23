import { useState, useEffect } from "react";
import heroBg from "@/assets/hero-bakery.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const taglines = [
    "Baked with Love, Served with Sweetness",
    "Every Slice Tells a Story",
    "Where Flavors Meet Elegance",
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % taglines.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Cake Heaven bakery display" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/40" />
      </div>

      <div ref={ref} className="container mx-auto px-4 relative z-10 py-32">
        <div className={`max-w-2xl transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/40 text-secondary text-sm font-medium mb-6 font-body">
            ✨ Premium Artisan Bakery
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
            Welcome to{" "}
            <span className="text-gradient">Cake Heaven</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-body mb-2 h-8 transition-all duration-500">
            {taglines[currentSlide]}
          </p>
          <div className="flex gap-1 mb-8">
            {taglines.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-secondary" : "w-2 bg-primary"}`} />
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#shop"
              className="px-8 py-3.5 rounded-full bg-secondary text-secondary-foreground font-body font-semibold text-sm hover:opacity-90 transition-all shadow-bakery-lg hover:shadow-bakery hover:scale-105 active:scale-95"
            >
              Order Now
            </a>
            <a
              href="#customize"
              className="px-8 py-3.5 rounded-full bg-primary/50 text-secondary font-body font-semibold text-sm hover:bg-primary/70 transition-all border border-secondary/20 hover:scale-105 active:scale-95"
            >
              Customize Cake
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

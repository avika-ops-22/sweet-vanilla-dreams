import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", text: "The chocolate truffle cake was absolutely divine! Best bakery in town.", rating: 5 },
  { name: "Rahul Mehta", text: "Ordered a custom wedding cake and it exceeded all expectations. Stunning work!", rating: 5 },
  { name: "Anita Desai", text: "Fresh, flavorful, and beautifully decorated. My go-to for every celebration!", rating: 4 },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-background">
      <div ref={ref} className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">What Our Customers Say</h2>
          <p className="text-muted-foreground font-body">Love in every bite, joy in every review</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card rounded-2xl p-6 shadow-bakery hover:shadow-bakery-lg transition-all duration-300 hover:-translate-y-1">
              <Quote className="w-8 h-8 text-primary mb-3" />
              <p className="text-foreground/80 font-body text-sm mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-3.5 h-3.5 ${j < t.rating ? "fill-gold text-gold" : "text-border"}`} />
                ))}
              </div>
              <p className="font-body font-semibold text-sm text-foreground">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

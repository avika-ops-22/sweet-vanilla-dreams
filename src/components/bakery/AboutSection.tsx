import { useScrollReveal } from "@/hooks/useScrollReveal";
import bakeryInterior from "@/assets/bakery-interior.jpg";

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-20 bg-cream/50">
      <div ref={ref} className="container mx-auto px-4">
        <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="rounded-2xl overflow-hidden shadow-bakery-lg">
            <img src={bakeryInterior} alt="Cake Heaven bakery interior" className="w-full h-80 md:h-96 object-cover" />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground font-body mb-4 leading-relaxed">
              Founded in 2015, Cake Heaven began as a small home bakery with a big dream — to bring joy through every slice. Today, we're the city's most loved artisan bakery, crafting cakes that turn ordinary moments into extraordinary memories.
            </p>
            <p className="text-muted-foreground font-body mb-6 leading-relaxed">
              Our mission is simple: use the finest ingredients, bake with passion, and deliver happiness. Every cake is handcrafted by our skilled pastry chefs who treat each creation as a work of art.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "10K+", label: "Cakes Delivered" },
                { value: "50+", label: "Unique Flavors" },
                { value: "4.9★", label: "Customer Rating" },
              ].map(stat => (
                <div key={stat.label} className="text-center bg-card rounded-xl p-4 shadow-bakery">
                  <p className="font-display text-2xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-body mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

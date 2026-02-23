import { useState, useMemo } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { cakes, categories, CakeCategory } from "@/data/cakes";
import { useCart } from "@/contexts/CartContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";

const ShopSection = () => {
  const [activeCategory, setActiveCategory] = useState<CakeCategory | "all">("all");
  const [sortOrder, setSortOrder] = useState<"default" | "low" | "high">("default");
  const { addToCart } = useCart();
  const { ref, isVisible } = useScrollReveal();

  const filteredCakes = useMemo(() => {
    let result = activeCategory === "all" ? cakes : cakes.filter(c => c.category === activeCategory);
    if (sortOrder === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sortOrder === "high") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [activeCategory, sortOrder]);

  const handleAdd = (cake: typeof cakes[0]) => {
    addToCart(cake);
    toast.success(`${cake.name} added to cart!`);
  };

  return (
    <section id="shop" className="py-20 bg-cream/50">
      <div ref={ref} className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">Our Cakes</h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">Handcrafted with the finest ingredients for every celebration</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                  activeCategory === cat.value
                    ? "bg-secondary text-secondary-foreground shadow-bakery"
                    : "bg-card text-muted-foreground hover:bg-primary/30 border border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value as any)}
            className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="default">Sort by</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCakes.map((cake, i) => (
            <div
              key={cake.id}
              className="bg-card rounded-2xl overflow-hidden shadow-bakery hover:shadow-bakery-lg transition-all duration-300 hover:-translate-y-1 group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-sm font-body font-bold text-secondary">
                  ₹{cake.price}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{cake.name}</h3>
                <p className="text-sm text-muted-foreground font-body mb-3 line-clamp-2">{cake.description}</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${j < Math.floor(cake.rating) ? "fill-gold text-gold" : "text-border"}`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">({cake.rating})</span>
                </div>
                <button
                  onClick={() => handleAdd(cake)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-body font-semibold hover:opacity-90 transition-all active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;

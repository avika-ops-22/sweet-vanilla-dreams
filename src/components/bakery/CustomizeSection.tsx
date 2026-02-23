import { useState, useMemo } from "react";
import { useCart } from "@/contexts/CartContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";
import cakeChocolate from "@/assets/cake-chocolate.jpg";

const flavors = ["Chocolate", "Vanilla", "Red Velvet", "Butterscotch", "Strawberry", "Pineapple"];
const sizes = [
  { label: "1 kg", multiplier: 1 },
  { label: "2 kg", multiplier: 1.8 },
  { label: "3 kg", multiplier: 2.5 },
];
const shapes = ["Round", "Heart", "Square"];
const basePrice = 699;

const CustomizeSection = () => {
  const [flavor, setFlavor] = useState("Chocolate");
  const [size, setSize] = useState(sizes[0]);
  const [shape, setShape] = useState("Round");
  const [eggless, setEggless] = useState(false);
  const [message, setMessage] = useState("");
  const { addToCart } = useCart();
  const { ref, isVisible } = useScrollReveal();

  const price = useMemo(() => {
    let p = basePrice * size.multiplier;
    if (eggless) p += 100;
    return Math.round(p);
  }, [size, eggless]);

  const handleAddCustom = () => {
    addToCart({
      id: Date.now(),
      name: `Custom ${flavor} (${shape}, ${size.label})`,
      price,
      description: message || "Custom cake",
      rating: 5,
      image: cakeChocolate,
      category: "chocolate",
    });
    toast.success("Custom cake added to cart!");
  };

  return (
    <section id="customize" className="py-20 bg-background">
      <div ref={ref} className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">Customize Your Cake</h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">Design your dream cake exactly how you want it</p>
        </div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-5">
            {/* Flavor */}
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">Cake Flavor</label>
              <select value={flavor} onChange={e => setFlavor(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-ring">
                {flavors.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">Size</label>
              <div className="flex gap-3">
                {sizes.map(s => (
                  <button key={s.label} onClick={() => setSize(s)} className={`flex-1 py-3 rounded-xl text-sm font-body font-medium transition-all ${size.label === s.label ? "bg-secondary text-secondary-foreground shadow-bakery" : "bg-card border border-border text-foreground hover:bg-primary/20"}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Shape */}
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">Shape</label>
              <div className="flex gap-3">
                {shapes.map(s => (
                  <button key={s} onClick={() => setShape(s)} className={`flex-1 py-3 rounded-xl text-sm font-body font-medium transition-all ${shape === s ? "bg-secondary text-secondary-foreground shadow-bakery" : "bg-card border border-border text-foreground hover:bg-primary/20"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Eggless */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEggless(!eggless)}
                className={`w-12 h-6 rounded-full transition-all ${eggless ? "bg-secondary" : "bg-border"} relative`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-all ${eggless ? "left-6" : "left-0.5"}`} />
              </button>
              <span className="text-sm font-body text-foreground">Eggless (+₹100)</span>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">Custom Message (optional)</label>
              <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Happy Birthday!" maxLength={50} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-card rounded-2xl p-6 shadow-bakery flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm font-body">
                <div className="flex justify-between"><span className="text-muted-foreground">Flavor</span><span className="font-medium text-foreground">{flavor}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Size</span><span className="font-medium text-foreground">{size.label}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shape</span><span className="font-medium text-foreground">{shape}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Egg Option</span><span className="font-medium text-foreground">{eggless ? "Eggless" : "With Egg"}</span></div>
                {message && <div className="flex justify-between"><span className="text-muted-foreground">Message</span><span className="font-medium text-foreground">"{message}"</span></div>}
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-secondary">₹{price}</span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={handleAddCustom} className="mt-6 w-full py-3 rounded-full bg-secondary text-secondary-foreground font-body font-semibold hover:opacity-90 transition-all active:scale-95">
              Add Custom Cake to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizeSection;

import { useState } from "react";
import { Instagram, Facebook, Twitter, Heart, Send } from "lucide-react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed! Sweet deals coming your way 🧁");
    setEmail("");
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter */}
      <div className="border-b border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-12 text-center">
          <h3 className="font-display text-2xl font-bold mb-2">Stay in the Sweet Loop</h3>
          <p className="text-secondary-foreground/70 font-body text-sm mb-6">Get exclusive offers, new flavors, and baking tips delivered to your inbox</p>
          <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-full bg-secondary-foreground/10 border border-secondary-foreground/20 text-secondary-foreground font-body text-sm placeholder:text-secondary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary" />
            <button type="submit" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-all active:scale-95 flex items-center gap-2">
              <Send className="w-4 h-4" />
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-display text-lg font-bold mb-3">🎂 Cake Heaven</h4>
            <p className="text-secondary-foreground/70 font-body text-sm leading-relaxed">Baked with love, served with sweetness. Making celebrations sweeter since 2015.</p>
          </div>
          <div>
            <h4 className="font-body font-semibold text-sm mb-3 uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "Shop", "Customize", "About", "Contact"].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="block text-sm text-secondary-foreground/70 font-body hover:text-secondary-foreground transition-colors">{link}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-body font-semibold text-sm mb-3 uppercase tracking-wider">Contact</h4>
            <div className="space-y-2 text-sm text-secondary-foreground/70 font-body">
              <p>+91 98765 43210</p>
              <p>hello@cakeheaven.in</p>
              <p>42 Baker Street, Mumbai</p>
            </div>
          </div>
          <div>
            <h4 className="font-body font-semibold text-sm mb-3 uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/20 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/10 mt-8 pt-6 text-center">
          <p className="text-sm text-secondary-foreground/50 font-body flex items-center justify-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 fill-primary text-primary" /> by Cake Heaven © 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

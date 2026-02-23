import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div ref={ref} className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">Get in Touch</h2>
          <p className="text-muted-foreground font-body">We'd love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: MapPin, label: "Address", value: "42 Baker Street, Sweet Lane, Mumbai 400001" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: Mail, label: "Email", value: "hello@cakeheaven.in" },
              { icon: Clock, label: "Hours", value: "Mon-Sun: 9AM - 10PM" },
            ].map(info => (
              <div key={info.label} className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/30">
                  <info.icon className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-foreground">{info.label}</p>
                  <p className="text-sm text-muted-foreground font-body">{info.value}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden shadow-bakery h-48">
              <iframe
                title="Cake Heaven Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.755851051!2d72.8311!3d19.0176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAxJzAzLjQiTiA3MsKwNDknNTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 shadow-bakery space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your cake needs..." rows={4} className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-secondary text-secondary-foreground font-body font-semibold hover:opacity-90 transition-all active:scale-95">
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

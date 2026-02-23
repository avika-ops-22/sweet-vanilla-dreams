import { useState } from "react";
import Navbar from "@/components/bakery/Navbar";
import HeroSection from "@/components/bakery/HeroSection";
import ShopSection from "@/components/bakery/ShopSection";
import CustomizeSection from "@/components/bakery/CustomizeSection";
import TestimonialsSection from "@/components/bakery/TestimonialsSection";
import AboutSection from "@/components/bakery/AboutSection";
import ContactSection from "@/components/bakery/ContactSection";
import Footer from "@/components/bakery/Footer";
import CartPanel from "@/components/bakery/CartPanel";
import BackToTop from "@/components/bakery/BackToTop";

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <main>
        <HeroSection />
        <ShopSection />
        <CustomizeSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <CartPanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <BackToTop />
    </div>
  );
};

export default Index;

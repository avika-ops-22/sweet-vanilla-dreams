import { useState } from "react";
import { Minus, Plus, Trash2, X, CreditCard, Smartphone, Truck, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPanel = ({ isOpen, onClose }: CartPanelProps) => {
  const { items, updateQuantity, removeFromCart, totalPrice, discountCode, setDiscountCode, discountApplied, applyDiscount, clearCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const handleApplyDiscount = () => {
    if (applyDiscount()) {
      toast.success("Discount applied! 10% off!");
    } else {
      toast.error("Invalid discount code. Try SWEET10");
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length !== 16) { toast.error("Enter a valid 16-digit card number"); return; }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) { toast.error("Enter expiry as MM/YY"); return; }
      if (cardCvv.length !== 3) { toast.error("Enter a valid 3-digit CVV"); return; }
    }
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setOrderPlaced(false);
      setShowPayment(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-card h-full overflow-y-auto shadow-bakery-lg animate-slide-in-left">
        <div className="sticky top-0 bg-card z-10 p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-foreground">
            {orderPlaced ? "Order Confirmed!" : showPayment ? "Payment" : "Your Cart"}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-primary/20 transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-4">
          {orderPlaced ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
              <CheckCircle className="w-20 h-20 text-secondary mb-4 animate-pulse-glow rounded-full" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Thank You!</h3>
              <p className="text-muted-foreground font-body">Your order has been placed. We'll start baking right away! 🎂</p>
            </div>
          ) : showPayment ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground font-body">Total: <span className="font-bold text-secondary text-lg">₹{Math.round(totalPrice)}</span></p>
              {/* Payment Methods */}
              <div className="space-y-3">
                {[
                  { id: "upi", label: "UPI Payment", icon: Smartphone },
                  { id: "card", label: "Card Payment", icon: CreditCard },
                  { id: "cod", label: "Cash on Delivery", icon: Truck },
                ].map(method => (
                  <button key={method.id} onClick={() => setPaymentMethod(method.id)} className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${paymentMethod === method.id ? "border-secondary bg-primary/20 shadow-bakery" : "border-border hover:bg-primary/10"}`}>
                    <method.icon className="w-5 h-5 text-secondary" />
                    <span className="font-body font-medium text-foreground">{method.label}</span>
                  </button>
                ))}
              </div>
              {paymentMethod === "card" && (
                <div className="space-y-3 animate-fade-in-up">
                  <input type="text" placeholder="Card Number" value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))} className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  <div className="flex gap-3">
                    <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(e.target.value.slice(0, 5))} className="flex-1 px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    <input type="text" placeholder="CVV" value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} className="w-24 px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
              )}
              {paymentMethod === "upi" && (
                <div className="animate-fade-in-up">
                  <input type="text" placeholder="Enter UPI ID (e.g. name@upi)" className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowPayment(false)} className="flex-1 py-3 rounded-full border border-border text-foreground font-body font-medium hover:bg-primary/10 transition-all">Back</button>
                <button onClick={handlePlaceOrder} disabled={!paymentMethod} className="flex-1 py-3 rounded-full bg-secondary text-secondary-foreground font-body font-semibold hover:opacity-90 transition-all disabled:opacity-50 active:scale-95">Place Order</button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🧁</p>
              <p className="text-muted-foreground font-body">Your cart is empty</p>
              <button onClick={onClose} className="mt-4 px-6 py-2 rounded-full bg-primary/30 text-secondary font-body font-medium hover:bg-primary/50 transition-all">Browse Cakes</button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.cake.id} className="flex gap-3 bg-background rounded-xl p-3">
                    <img src={item.cake.image} alt={item.cake.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-body text-sm font-semibold text-foreground truncate">{item.cake.name}</h4>
                      <p className="text-sm text-secondary font-body font-bold">₹{item.cake.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => updateQuantity(item.cake.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center hover:bg-primary/50 transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm font-body font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cake.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center hover:bg-primary/50 transition-colors"><Plus className="w-3 h-3" /></button>
                        <button onClick={() => removeFromCart(item.cake.id)} className="ml-auto p-1 text-destructive hover:bg-destructive/10 rounded-full transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount */}
              <div className="flex gap-2 mb-4">
                <input type="text" value={discountCode} onChange={e => setDiscountCode(e.target.value)} placeholder="Discount code" className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                <button onClick={handleApplyDiscount} disabled={discountApplied} className="px-5 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-body text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all">
                  {discountApplied ? "Applied ✓" : "Apply"}
                </button>
              </div>

              {discountApplied && <p className="text-sm text-secondary font-body mb-3">🎉 10% discount applied!</p>}

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between font-body text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₹{Math.round(totalPrice / (discountApplied ? 0.9 : 1))}</span></div>
                {discountApplied && <div className="flex justify-between font-body text-sm"><span className="text-muted-foreground">Discount (10%)</span><span className="text-secondary">-₹{Math.round(totalPrice / 0.9 * 0.1)}</span></div>}
                <div className="flex justify-between font-body text-lg font-bold"><span className="text-foreground">Total</span><span className="text-secondary">₹{Math.round(totalPrice)}</span></div>
              </div>

              <button onClick={() => setShowPayment(true)} className="w-full mt-4 py-3.5 rounded-full bg-secondary text-secondary-foreground font-body font-semibold hover:opacity-90 transition-all shadow-bakery active:scale-95">
                Proceed to Payment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPanel;

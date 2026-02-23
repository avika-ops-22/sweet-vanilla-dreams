import cakeChocolate from "@/assets/cake-chocolate.jpg";
import cakeVanilla from "@/assets/cake-vanilla.jpg";
import cakeRedvelvet from "@/assets/cake-redvelvet.jpg";
import cakeFruit from "@/assets/cake-fruit.jpg";
import cakeDesigner from "@/assets/cake-designer.jpg";

export type CakeCategory = "chocolate" | "vanilla" | "red-velvet" | "fruit" | "designer";

export interface Cake {
  id: number;
  name: string;
  price: number;
  description: string;
  rating: number;
  image: string;
  category: CakeCategory;
}

export const cakes: Cake[] = [
  { id: 1, name: "Dark Chocolate Truffle", price: 899, description: "Rich Belgian chocolate layers with ganache filling and chocolate curls", rating: 5, image: cakeChocolate, category: "chocolate" },
  { id: 2, name: "Classic Vanilla Dream", price: 749, description: "Fluffy vanilla sponge with silky buttercream and edible flowers", rating: 4.5, image: cakeVanilla, category: "vanilla" },
  { id: 3, name: "Red Velvet Royale", price: 949, description: "Southern-style red velvet with cream cheese frosting layers", rating: 5, image: cakeRedvelvet, category: "red-velvet" },
  { id: 4, name: "Tropical Fruit Paradise", price: 849, description: "Fresh seasonal fruits atop a light sponge with whipped cream", rating: 4, image: cakeFruit, category: "fruit" },
  { id: 5, name: "Royal Wedding Elegance", price: 2499, description: "Four-tier designer cake with fondant, gold leaf, and sugar flowers", rating: 5, image: cakeDesigner, category: "designer" },
  { id: 6, name: "Chocolate Hazelnut Bliss", price: 999, description: "Nutella-infused chocolate cake with roasted hazelnut praline", rating: 4.5, image: cakeChocolate, category: "chocolate" },
  { id: 7, name: "Vanilla Bean Cheesecake", price: 799, description: "New York-style cheesecake with real vanilla bean specks", rating: 4, image: cakeVanilla, category: "vanilla" },
  { id: 8, name: "Berry Fruit Fusion", price: 879, description: "Mixed berry compote with vanilla cream on a buttery base", rating: 4.5, image: cakeFruit, category: "fruit" },
  { id: 9, name: "Designer Floral Cascade", price: 1999, description: "Handcrafted sugar flowers cascading over three elegant tiers", rating: 5, image: cakeDesigner, category: "designer" },
  { id: 10, name: "Red Velvet Cupcake Tower", price: 1199, description: "24 mini red velvet cupcakes arranged in an elegant tower", rating: 4.5, image: cakeRedvelvet, category: "red-velvet" },
];

export const categories: { value: CakeCategory | "all"; label: string }[] = [
  { value: "all", label: "All Cakes" },
  { value: "chocolate", label: "Chocolate" },
  { value: "vanilla", label: "Vanilla" },
  { value: "red-velvet", label: "Red Velvet" },
  { value: "fruit", label: "Fruit Cakes" },
  { value: "designer", label: "Designer Cakes" },
];

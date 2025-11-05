import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

// Mock menu data simulating a WooCommerce response
const mockMenu = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 250,
    image: "https://placehold.co/600x400/222/FFD700?text=Pizza",
    description: "Classic delight with 100% real mozzarella cheese.",
  },
  {
    id: 2,
    name: "Chicken Zinger Burger",
    category: "Burgers",
    price: 180,
    image: "https://placehold.co/600x400/222/FFD700?text=Burger",
    description: "Crispy chicken patty with a spicy sauce.",
  },
  {
    id: 3,
    name: "Paneer Tikka Roll",
    category: "Rolls",
    price: 160,
    image: "https://placehold.co/600x400/222/FFD700?text=Roll",
    description: "Smoky paneer wrapped in soft rumali roti.",
  },
  {
    id: 4,
    name: "Veggie Supreme Pizza",
    category: "Pizza",
    price: 320,
    image: "https://placehold.co/600x400/222/FFD700?text=Pizza",
    description: "Loaded with fresh veggies and signature sauce.",
  },
  {
    id: 5,
    name: "Double Cheese Burger",
    category: "Burgers",
    price: 210,
    image: "https://placehold.co/600x400/222/FFD700?text=Burger",
    description: "Two patties with melted cheese and house sauce.",
  },
  {
    id: 6,
    name: "Cold Coffee",
    category: "Cool Drinks",
    price: 120,
    image: "https://placehold.co/600x400/222/FFD700?text=Drink",
    description: "Chilled, creamy, perfectly sweetened.",
  },
  {
    id: 7,
    name: "Pepsi (500ml)",
    category: "Cool Drinks",
    price: 60,
    image: "https://placehold.co/600x400/222/FFD700?text=Drink",
    description: "Classic fizz to pair with your meal.",
  },
  {
    id: 8,
    name: "Chicken Kathi Roll",
    category: "Rolls",
    price: 190,
    image: "https://placehold.co/600x400/222/FFD700?text=Roll",
    description: "Juicy chicken, onions, and tangy chutney.",
  },
  {
    id: 9,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 350,
    image: "https://placehold.co/600x400/222/FFD700?text=Pizza",
    description: "Pepperoni, mozzarella, and rich tomato sauce.",
  },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cart, setCart] = useState([]); // {id, name, price, image, qty}

  const menuRef = useRef(null);

  // Simulate API call to fetch products
  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(mockMenu);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    if (selected === "All") return items;
    return items.filter((it) => it.category === selected);
  }, [items, selected]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, image: item.image, qty: 1 }];
    });
    setCartOpen(true);
  };

  const incQty = (id) => setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  const decQty = (id) =>
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, p.qty - 1) } : p))
        .filter((p) => p.qty > 0)
    );
  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const costs = useMemo(() => {
    const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
    const taxes = Math.round(subtotal * 0.05);
    const delivery = subtotal >= 1000 || subtotal === 0 ? 0 : 40;
    const total = subtotal + taxes + delivery;
    return { subtotal, taxes, delivery, total };
  }, [cart]);

  const handleOrderPlaced = () => {
    setCart([]);
  };

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen font-inter">
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        onCartClick={() => setCartOpen(true)}
        onMenuClick={scrollToMenu}
      />

      <Hero onViewMenu={scrollToMenu} />

      <div ref={menuRef} />

      {loading ? (
        <div className="py-24 text-center text-white/80">Loading menu...</div>
      ) : (
        <Menu
          items={filtered}
          selected={selected}
          onSelect={setSelected}
          onAdd={addToCart}
        />
      )}

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onInc={incQty}
        onDec={decQty}
        onRemove={removeItem}
        costs={costs}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <Checkout
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        onOrderPlaced={handleOrderPlaced}
      />

      <footer className="py-10 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} Aurora Grand • Crafted with care.
      </footer>
    </div>
  );
}

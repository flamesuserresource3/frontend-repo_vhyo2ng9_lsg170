import { ShoppingCart } from "lucide-react";

export default function Navbar({ cartCount = 0, onCartClick, onMenuClick }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow ring-1 ring-white/20" />
            <div className="leading-tight">
              <p className="text-white font-semibold tracking-wide">Aurora Grand</p>
              <p className="text-xs text-white/60">Food Delivery</p>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-6">
            <button
              onClick={onMenuClick}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Menu
            </button>
          </nav>

          <button
            onClick={onCartClick}
            className="relative inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="text-sm hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-6 min-w-[1.5rem] px-1 rounded-full bg-yellow-500 text-black text-xs font-bold grid place-items-center shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

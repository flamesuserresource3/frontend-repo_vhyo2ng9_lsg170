import { X, Plus, Minus } from "lucide-react";

export default function Cart({
  open,
  onClose,
  items = [],
  onInc,
  onDec,
  onRemove,
  costs,
  onCheckout,
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#0b0b0b] text-white border-l border-white/10 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[calc(100%-220px)] overflow-auto">
          {items.length === 0 && (
            <p className="text-white/70">Your cart is empty.</p>
          )}

          {items.map((it) => (
            <div
              key={it.id}
              className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-xl p-3"
            >
              <img
                src={it.image}
                alt={it.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{it.name}</p>
                <p className="text-sm text-white/60">₹{it.price} • Qty {it.qty}</p>
                <div className="mt-2 inline-flex items-center gap-2">
                  <button
                    onClick={() => onDec(it.id)}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[2ch] text-center">{it.qty}</span>
                  <button
                    onClick={() => onInc(it.id)}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onRemove(it.id)}
                    className="ml-3 text-xs text-red-300 hover:text-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="font-semibold">₹{it.price * it.qty}</div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#0b0b0b]">
          <div className="space-y-2 text-sm text-white/80">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{costs.subtotal}</span></div>
            <div className="flex justify-between"><span>Taxes (5%)</span><span>₹{costs.taxes}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>₹{costs.delivery}</span></div>
            <div className="flex justify-between font-semibold text-white"><span>Total</span><span>₹{costs.total}</span></div>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="mt-4 w-full rounded-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:hover:bg-yellow-500 text-black font-semibold py-3"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}

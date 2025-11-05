import { useEffect, useMemo, useState } from "react";
import { X, Loader2, CreditCard, Wallet, CheckCircle } from "lucide-react";

export default function Checkout({ open, onClose, items = [], onOrderPlaced }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payMethod, setPayMethod] = useState("ONLINE");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!open) {
      // reset state when closing
      setName("");
      setPhone("");
      setAddress("");
      setPayMethod("ONLINE");
      setLoading(false);
      setSuccess(null);
    }
  }, [open]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    const taxes = Math.round(subtotal * 0.05);
    const delivery = subtotal >= 1000 || subtotal === 0 ? 0 : 40;
    const total = subtotal + taxes + delivery;
    return { subtotal, taxes, delivery, total };
  }, [items]);

  const validName = name.trim().length > 0;
  const validPhone = /^\d{10}$/.test(phone);
  const validAddress = address.trim().length > 8;
  const formValid = validName && validPhone && validAddress && items.length > 0;

  const placeOrder = async () => {
    if (!formValid) return;
    setLoading(true);

    // Simulate POST to WooCommerce orders endpoint
    const payload = {
      payment_method: payMethod === "COD" ? "cod" : "online",
      billing: { first_name: name, phone, address_1: address },
      line_items: items.map((it) => ({ product_id: it.id, quantity: it.qty })),
      meta_data: [
        { key: "platform", value: "AuroraGrand-Web" },
        { key: "totals", value: JSON.stringify(totals) },
      ],
    };

    await new Promise((r) => setTimeout(r, 1400));

    const fakeOrderId = Math.floor(10000 + Math.random() * 90000);
    setSuccess({ id: fakeOrderId, payload });
    setLoading(false);

    // notify parent to clear cart
    onOrderPlaced?.({ id: fakeOrderId, total: totals.total });
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <div
        className={`absolute left-1/2 top-1/2 w-[95vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden border border-white/10 bg-[#0b0b0b] text-white shadow-2xl transition-transform ${
          open ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold">Checkout</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[70vh] overflow-auto">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle className="h-14 w-14 text-green-400 mx-auto" />
              <h4 className="mt-4 text-2xl font-bold">Thank You!</h4>
              <p className="mt-2 text-white/80">
                Your order has been placed successfully.
              </p>
              <p className="mt-1 text-white">Order ID: #{success.id}</p>
              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm text-white/70">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="John Doe"
                  />
                  {!validName && (
                    <p className="text-xs text-red-400 mt-1">Name is required.</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-white/70">Mobile Number</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="9876543210"
                    inputMode="numeric"
                    maxLength={10}
                  />
                  {!validPhone && (
                    <p className="text-xs text-red-400 mt-1">Enter a valid 10 digit number.</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-white/70">Delivery Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-500"
                    rows={4}
                    placeholder="Room 402, Aurora Grand, MG Road, Bengaluru, 560001"
                  />
                  {!validAddress && (
                    <p className="text-xs text-red-400 mt-1">Please enter a complete address.</p>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <p className="text-sm text-white/70 mb-2">Payment Options</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPayMethod("ONLINE")}
                    className={`flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-3 transition ${
                      payMethod === "ONLINE" ? "bg-yellow-500 text-black" : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <CreditCard className="h-5 w-5" /> Pay Online
                  </button>
                  <button
                    onClick={() => setPayMethod("COD")}
                    className={`flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-3 transition ${
                      payMethod === "COD" ? "bg-yellow-500 text-black" : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Wallet className="h-5 w-5" /> Cash on Delivery
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{totals.subtotal}</span></div>
                <div className="flex justify-between"><span>Taxes (5%)</span><span>₹{totals.taxes}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>₹{totals.delivery}</span></div>
                <div className="flex justify-between font-semibold text-white mt-2"><span>Total</span><span>₹{totals.total}</span></div>
              </div>

              <button
                onClick={placeOrder}
                disabled={!formValid || loading}
                className="mt-4 w-full rounded-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-semibold py-3 inline-flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" /> Placing Order...
                  </>
                ) : (
                  <>Place Order</>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

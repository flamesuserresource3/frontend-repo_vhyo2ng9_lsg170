const categories = ["All", "Pizza", "Burgers", "Rolls", "Cool Drinks"];

export default function Menu({ items = [], selected = "All", onSelect, onAdd }) {
  return (
    <section id="menu" className="bg-[#0f0f0f] text-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Our Menu</h2>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-colors border border-white/10 ${
                  selected === cat
                    ? "bg-yellow-500 text-black"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.length === 0 && (
            <p className="text-white/70">No items available.</p>
          )}
          {items.map((item) => (
            <article
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-black/40 transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-44 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="mt-1 text-sm text-white/70 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-yellow-400 font-bold">₹{item.price}</span>
                  <button
                    onClick={() => onAdd(item)}
                    className="rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 text-sm transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

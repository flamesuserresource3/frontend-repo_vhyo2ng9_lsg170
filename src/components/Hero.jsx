export default function Hero({ onViewMenu }) {
  return (
    <section className="relative h-[92vh] w-full">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="https://videos.pexels.com/video-files/853875/853875-hd.mp4"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 h-full w-full grid place-items-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Aurora Grand
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/90">
            Your cravings, delivered.
          </p>
          <div className="mt-8">
            <button
              onClick={onViewMenu}
              className="inline-flex items-center gap-2 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 shadow-lg shadow-yellow-500/20 transition-colors"
            >
              View Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

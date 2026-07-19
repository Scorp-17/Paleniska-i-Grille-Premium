import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { GalleryItem } from "../types";
import { GALLERY } from "../data";

export default function InspirationGallery() {
  const [activeTab, setActiveTab] = useState<
    "wszystkie" | "paleniska" | "grille" | "drewutnie" | "meble"
  >("wszystkie");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeTab === "wszystkie"
      ? GALLERY
      : GALLERY.filter((item) => item.category === activeTab);

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length,
      );
    }
  };

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id: "wszystkie", label: "Wszystkie aranżacje" },
    { id: "paleniska", label: "Paleniska" },
    { id: "grille", label: "Grille premium" },
    { id: "drewutnie", label: "Drewutnie i stojaki" },
    { id: "meble", label: "Ekskluzywne meble" },
  ];

  return (
    <section
      id="galeria"
      className="py-24 bg-brand-charcoal relative overflow-hidden"
    >
      {/* Decorative wood and coal texture blur backdrop */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-wood/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-amber/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-amber/10 border border-brand-amber/30 rounded-full text-xs text-brand-amber font-mono font-bold uppercase tracking-wider mb-4">
            <Compass
              size={12}
              className="animate-spin"
              style={{ animationDuration: "6s" }}
            />
            <span>Inspiracje ogrodowe</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold font-display text-white tracking-tight leading-tight">
            Galeria Rzemiosła w Realnym Świecie
          </h2>
          <p className="text-zinc-400 mt-4 text-base md:text-lg leading-relaxed">
            Zobacz, jak nasze rzemieślnicze paleniska, grille i meble
            przeobrażają ogrody i tarasy naszych klientów w luksusowe oazy
            ciepła i spokoju.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-medium transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-linear-to-r from-brand-amber to-brand-gold text-brand-charcoal font-bold shadow-md shadow-brand-amber/10"
                  : "bg-brand-dark/60 text-zinc-400 hover:text-white border border-brand-gray/40 hover:border-zinc-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Gallery Grid with Layout Animations */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // find absolute index in filtered array for lightbox
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative aspect-4/3 bg-brand-dark border border-brand-gray/30 rounded-xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Subtle Gradient Cover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Title details shown on hover or touch */}
                  <div className="absolute inset-x-0 bottom-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end">
                    <span className="text-[10px] font-mono text-brand-amber uppercase tracking-widest font-bold">
                      {item.category}
                    </span>
                    <h5 className="text-white text-sm font-semibold mt-1 leading-snug">
                      {item.title}
                    </h5>
                    <div className="mt-2 text-zinc-400 text-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      <Maximize2 size={12} className="text-brand-amber" />
                      <span>Powiększ zdjęcie</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Immersive Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div
            id="lightbox-overlay"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            {/* Background close click */}
            <div
              className="absolute inset-0"
              onClick={() => setLightboxIndex(null)}
            />

            {/* Top Toolbar */}
            <div className="absolute top-4 inset-x-0 px-6 flex justify-between items-center text-white z-10">
              <span className="text-xs font-mono text-zinc-400">
                Aranżacja {lightboxIndex + 1} z {filteredItems.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 bg-brand-gray/50 hover:bg-zinc-800 text-white rounded-full transition-colors cursor-pointer"
                title="Zamknij"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-3 bg-brand-gray/50 hover:bg-zinc-800 text-white rounded-full transition-all z-10 cursor-pointer hidden sm:flex"
              title="Poprzednie"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3 bg-brand-gray/50 hover:bg-zinc-800 text-white rounded-full transition-all z-10 cursor-pointer hidden sm:flex"
              title="Następne"
            >
              <ChevronRight size={24} />
            </button>

            {/* Immersive Image Display Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[80vh] flex flex-col items-center justify-center"
            >
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[70vh] object-contain rounded-lg border border-brand-gray/30 shadow-2xl"
              />

              {/* Subtitle Card */}
              <div className="mt-4 text-center max-w-2xl px-4">
                <span className="text-xs uppercase font-mono tracking-widest text-brand-amber font-bold">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h4 className="text-lg text-white font-medium font-display mt-1 leading-snug">
                  {filteredItems[lightboxIndex].title}
                </h4>
              </div>
            </motion.div>

            {/* Mobile navigation row (visible only on tiny screens) */}
            <div className="flex sm:hidden absolute bottom-6 gap-6 z-10">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 bg-brand-gray/70 text-white rounded-full flex items-center gap-1.5 font-medium text-xs cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>Wstecz</span>
              </button>
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-brand-gray/70 text-white rounded-full flex items-center gap-1.5 font-medium text-xs cursor-pointer"
              >
                <span>Dalej</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

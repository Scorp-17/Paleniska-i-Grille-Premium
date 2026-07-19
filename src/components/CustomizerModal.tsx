import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Product, CartItem } from "../types";
import { PRODUCTS } from "../data";

interface CustomizerModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, "id">) => void;
  onNavigateProduct?: (product: Product) => void;
}

export default function CustomizerModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onNavigateProduct,
}: CustomizerModalProps) {
  if (!product) return null;

  const [selectedMaterial, setSelectedMaterial] = useState(
    product.materials[0]?.name || "",
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0]?.name || "",
  );
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  // Reset states when product changes
  useEffect(() => {
    if (product) {
      setSelectedMaterial(product.materials[0]?.name || "");
      setSelectedSize(product.sizes[0]?.name || "");
      setQuantity(1);
      setAddedMessage(false);
    }
  }, [product]);

  const materialModifier =
    product.materials.find((m) => m.name === selectedMaterial)?.priceModifier ||
    0;
  const sizeModifier =
    product.sizes.find((s) => s.name === selectedSize)?.priceModifier || 0;

  const unitPrice = product.price + materialModifier + sizeModifier;
  const totalInquiryPrice = unitPrice * quantity;

  const currentIndex = PRODUCTS.findIndex((p) => p.id === product.id);

  const handleNext = () => {
    if (onNavigateProduct && currentIndex > -1) {
      setDirection(1);
      const nextIndex = (currentIndex + 1) % PRODUCTS.length;
      onNavigateProduct(PRODUCTS[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (onNavigateProduct && currentIndex > -1) {
      setDirection(-1);
      const prevIndex = (currentIndex - 1 + PRODUCTS.length) % PRODUCTS.length;
      onNavigateProduct(PRODUCTS[prevIndex]);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      product,
      quantity,
      selectedMaterial,
      selectedSize,
      totalPrice: totalInquiryPrice,
    });
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      onClose();
    }, 1500);
  };

  // Spring animation variants for the sliding transition between items
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "40%" : "-40%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-40%" : "40%",
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="customizer-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-hidden"
        >
          {/* Backdrop Click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-brand-dark border border-brand-gray/50 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          >
            {/* Top Close Button */}
            <button
              id="close-customizer"
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2 text-zinc-400 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Next / Prev Floating Navigation Arrows */}
            {PRODUCTS.length > 1 && onNavigateProduct && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-brand-charcoal/80 border border-brand-gray/50 text-zinc-300 hover:text-brand-charcoal hover:bg-linear-to-r hover:from-brand-amber hover:to-brand-gold rounded-full transition-all duration-300 shadow-2xl cursor-pointer"
                  title="Poprzedni produkt"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-brand-charcoal/80 border border-brand-gray/50 text-zinc-300 hover:text-brand-charcoal hover:bg-linear-to-r hover:from-brand-amber hover:to-brand-gold rounded-full transition-all duration-300 shadow-2xl cursor-pointer"
                  title="Następny produkt"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Sliding Contents Wrapper */}
            <div className="relative w-full overflow-hidden flex flex-col md:flex-row h-full max-h-[90vh]">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={product.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
                >
                  {/* Product Visual Area */}
                  <div className="w-full md:w-1/2 bg-brand-charcoal relative flex flex-col justify-between p-6 md:p-8 border-b md:border-b-0 md:border-r border-brand-gray/30 shrink-0">
                    <div className="absolute top-6 left-6 md:left-8 bg-brand-amber/15 text-brand-amber text-xs font-semibold px-3 py-1 rounded-full border border-brand-amber/30 flex items-center gap-1.5">
                      <Sparkles size={12} className="animate-pulse" />
                      Dostosowywanie produktu
                    </div>

                    <div className="h-48 md:h-96 flex items-center justify-center my-6 md:my-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="max-h-40 md:max-h-72 w-auto object-cover rounded-xl shadow-xl border border-brand-gray/30"
                      />
                    </div>

                    {/* Service trust badges */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-gray/20 text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-brand-amber" />
                        <span>5 lat gwarancji</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck size={16} className="text-brand-amber" />
                        <span>Dostawa z rozładunkiem</span>
                      </div>
                    </div>
                  </div>

                  {/* Configurator Controls */}
                  <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-brand-amber font-semibold font-mono">
                        Kolekcja rzemieślnicza
                      </span>
                      <h3 className="text-2xl font-semibold font-display text-white mt-1 leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-2">
                        {product.description}
                      </p>

                      {/* Configuration: Material */}
                      <div className="mt-6">
                        <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                          1. Wybierz materiał
                        </label>
                        <div className="grid grid-cols-1 gap-2.5 mt-2">
                          {product.materials.map((m) => (
                            <button
                              key={m.name}
                              onClick={() => setSelectedMaterial(m.name)}
                              className={`flex items-center justify-between p-3 rounded-lg border text-left text-sm transition-all cursor-pointer ${
                                selectedMaterial === m.name
                                  ? "bg-brand-amber/10 border-brand-amber text-white shadow-md"
                                  : "bg-brand-charcoal border-brand-gray/40 text-zinc-300 hover:border-zinc-500 hover:bg-brand-dark"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedMaterial === m.name ? "border-brand-amber" : "border-zinc-500"}`}
                                >
                                  {selectedMaterial === m.name && (
                                    <div className="w-2 h-2 rounded-full bg-brand-amber" />
                                  )}
                                </div>
                                <span>{m.name}</span>
                              </div>
                              <span className="font-mono text-xs text-zinc-400">
                                {m.priceModifier === 0
                                  ? "W cenie"
                                  : `${m.priceModifier > 0 ? "+" : ""}${m.priceModifier} zł`}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Configuration: Size */}
                      <div className="mt-6">
                        <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                          2. Wybierz rozmiar / wariant
                        </label>
                        <div className="grid grid-cols-1 gap-2.5 mt-2">
                          {product.sizes.map((s) => (
                            <button
                              key={s.name}
                              onClick={() => setSelectedSize(s.name)}
                              className={`flex items-center justify-between p-3 rounded-lg border text-left text-sm transition-all cursor-pointer ${
                                selectedSize === s.name
                                  ? "bg-brand-amber/10 border-brand-amber text-white shadow-md"
                                  : "bg-brand-charcoal border-brand-gray/40 text-zinc-300 hover:border-zinc-500 hover:bg-brand-dark"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedSize === s.name ? "border-brand-amber" : "border-zinc-500"}`}
                                >
                                  {selectedSize === s.name && (
                                    <div className="w-2 h-2 rounded-full bg-brand-amber" />
                                  )}
                                </div>
                                <span>{s.name}</span>
                              </div>
                              <span className="font-mono text-xs text-zinc-400">
                                {s.priceModifier === 0
                                  ? "W cenie"
                                  : `+${s.priceModifier} zł`}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Specs bullets inside configurator */}
                      <div className="mt-6 p-4 bg-brand-charcoal/55 rounded-xl border border-brand-gray/30">
                        <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-2">
                          Specyfikacja techniczna
                        </span>
                        <ul className="space-y-1 text-xs text-zinc-300">
                          {product.features.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check
                                size={12}
                                className="text-brand-amber mt-0.5 shrink-0"
                              />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Price and Action Section */}
                    <div className="mt-8 pt-6 border-t border-brand-gray/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-zinc-400 font-mono block">
                            Szacowana cena (netto)
                          </span>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="text-3xl font-semibold font-display text-white">
                              {totalInquiryPrice.toLocaleString("pl-PL")}
                            </span>
                            <span className="text-brand-amber font-medium text-sm">
                              PLN
                            </span>
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center bg-brand-charcoal border border-brand-gray/50 rounded-lg p-1">
                          <button
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-brand-dark rounded transition-all cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm font-mono font-bold text-white">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-brand-dark rounded transition-all cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Add Action Button */}
                      <div className="mt-4">
                        <button
                          id="add-to-cart-action"
                          onClick={handleAddToCart}
                          disabled={addedMessage}
                          className={`w-full py-3.5 px-6 rounded-xl font-medium tracking-wide shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                            addedMessage
                              ? "bg-emerald-600 text-white"
                              : "bg-linear-to-r from-brand-amber to-brand-gold text-brand-charcoal hover:brightness-110 active:scale-[0.98]"
                          }`}
                        >
                          {addedMessage ? (
                            <>
                              <Check size={18} className="animate-bounce" />
                              <span>Dodano do konfiguracji zapytania!</span>
                            </>
                          ) : (
                            <>
                              <Sparkles size={18} />
                              <span>Dodaj do koszyka wyceny</span>
                            </>
                          )}
                        </button>
                        <p className="text-[10px] text-zinc-500 text-center mt-2.5 flex items-center justify-center gap-1">
                          <AlertCircle size={10} />
                          Wszystkie ceny są szacunkowe. Ostateczną wycenę
                          otrzymasz po przesłaniu formularza.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

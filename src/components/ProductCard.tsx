import React from "react";
import { motion } from "motion/react";
import { Sparkles, Eye, ShieldCheck, Flame } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onOpenCustomizer: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export default function ProductCard({
  product,
  onOpenCustomizer,
  onQuickAdd,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group relative bg-brand-dark border border-brand-gray/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-brand-amber/30 transition-all duration-300"
    >
      {/* Decorative Warm Ambient Glow Behind Card */}
      <div className="absolute inset-0 bg-linear-to-t from-brand-amber/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Product Image Stage */}
      <div className="relative aspect-4/3 bg-brand-charcoal overflow-hidden border-b border-brand-gray/20">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Hover overlay with interaction triggers */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onOpenCustomizer(product)}
            className="p-3 bg-brand-amber hover:bg-brand-gold text-brand-charcoal rounded-full font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg cursor-pointer"
            title="Dostosuj parametry"
          >
            <Sparkles size={18} />
            <span className="text-xs tracking-wider uppercase font-bold px-1">
              Konfiguruj
            </span>
          </button>

          <button
            onClick={() => onOpenCustomizer(product)}
            className="p-3 bg-brand-gray hover:bg-zinc-700 text-white rounded-full font-semibold flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 shadow-lg cursor-pointer"
            title="Podgląd szczegółów"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Category Label Badge */}
        <div className="absolute top-4 left-4 bg-brand-charcoal/90 text-zinc-300 text-[10px] uppercase font-mono tracking-widest font-bold px-3 py-1.5 rounded-full border border-brand-gray/50 flex items-center gap-1.5 backdrop-blur-sm">
          <Flame size={10} className="text-brand-amber" />
          <span>{product.category}</span>
        </div>
      </div>

      {/* Details Compartment */}
      <div className="p-6 flex flex-col justify-between h-75">
        <div>
          {/* Rating / Trust Line */}
          <div className="flex items-center gap-1.5 text-xs text-brand-amber font-mono font-semibold">
            <ShieldCheck size={14} />
            <span>Rzemiosło najwyższej próby</span>
          </div>

          <h4 className="text-lg font-semibold font-display text-white mt-1.5 line-clamp-2 leading-snug group-hover:text-brand-amber transition-colors duration-300">
            {product.name}
          </h4>

          <p className="text-sm text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
            {product.description}
          </p>

          {/* Quick specs preview */}
          <div className="mt-4 flex flex-wrap gap-2">
            {product.features.slice(0, 2).map((feat, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-brand-charcoal border border-brand-gray/40 text-zinc-400 px-2.5 py-1 rounded-md font-mono"
              >
                {feat.split(" ")[0]} {feat.split(" ").slice(1, 3).join(" ")}...
              </span>
            ))}
          </div>
        </div>

        {/* Action Panel with Price and Buttons */}
        <div className="mt-6 pt-5 border-t border-brand-gray/30 flex items-center justify-between gap-4">
          <div className="flex-1 rounded-xl bg-brand-charcoal/80 border border-brand-amber/20 px-3 py-2.5 shadow-sm">
            <span className="block text-[10px] text-zinc-400 uppercase font-mono tracking-wider font-semibold">
              Cena od
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold font-display text-white group-hover:text-brand-amber transition-colors duration-300">
                {product.price.toLocaleString("pl-PL")}
              </span>
              <span className="text-sm text-brand-amber font-mono font-semibold">
                PLN
              </span>
            </div>
          </div>

          <button
            onClick={() => onOpenCustomizer(product)}
            className="px-5 py-2.5 bg-brand-amber hover:bg-brand-gold hover:text-brand-charcoal text-brand-charcoal rounded-xl font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Dostosuj</span>
            <Sparkles size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

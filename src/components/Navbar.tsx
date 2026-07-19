import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingBag, Flame, Sparkles } from "lucide-react";
import { CartItem } from "../types";

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Navbar({
  cartItems,
  onOpenCart,
  onNavigateToSection,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const menuItems = [
    { label: "O nas", href: "o-nas" },
    { label: "Kolekcja", href: "kolekcja" },
    { label: "Zalety", href: "zalety" },
    { label: "Galeria", href: "galeria" },
    { label: "Kontakt", href: "kontakt" },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigateToSection(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-brand-charcoal/85 border-b border-brand-gray/40 py-3.5 backdrop-blur-md shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <div
            onClick={() => handleLinkClick("hero")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative w-9 h-9 rounded-xl bg-linear-to-br from-brand-amber to-brand-gold flex items-center justify-center shadow-lg shadow-brand-amber/10 group-hover:shadow-brand-amber/35 transition-all duration-300">
              <Flame
                size={20}
                className="text-brand-charcoal fill-brand-charcoal transform group-hover:scale-110 transition-transform"
              />
              {/* Little sparkle element */}
              <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 border border-brand-amber">
                <Sparkles size={8} className="text-brand-gold animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold font-display tracking-widest text-white leading-none group-hover:text-brand-amber transition-colors duration-300">
                OGIEN I STAL
              </span>
              <span className="text-[9px] uppercase tracking-widest text-brand-amber font-mono font-bold leading-tight">
                ogrodowa
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleLinkClick(item.href)}
                className="text-zinc-400 hover:text-white transition-colors duration-300 relative py-1.5 cursor-pointer font-medium tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Cart Icon & Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-brand-dark hover:bg-brand-gray border border-brand-gray/60 hover:border-brand-amber rounded-xl text-white transition-all cursor-pointer group"
              title="Zobacz wyceny"
            >
              <ShoppingBag
                size={18}
                className="group-hover:scale-110 transition-transform"
              />

              <AnimatePresence>
                {totalCartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-brand-amber text-brand-charcoal text-[10px] font-bold w-5.5 h-5.5 rounded-full border-2 border-brand-dark flex items-center justify-center font-mono"
                  >
                    {totalCartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-zinc-400 hover:text-white bg-brand-dark/40 hover:bg-brand-gray rounded-xl border border-brand-gray/30 transition-all cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-md flex flex-col justify-center px-8 md:hidden"
          >
            <div className="space-y-6 flex flex-col text-left">
              <span className="text-xs uppercase tracking-widest text-brand-amber font-mono font-bold">
                Nawigacja
              </span>

              <div className="h-px bg-brand-gray/50 w-12" />

              <nav className="flex flex-col gap-6">
                {menuItems.map((item, idx) => (
                  <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className="text-2xl font-bold font-display text-white text-left hover:text-brand-amber transition-colors cursor-pointer"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              <div className="h-px bg-brand-gray/30 w-full pt-6" />

              {/* Mobile Quick Contact details */}
              <div className="text-xs text-zinc-500 space-y-1.5 font-mono">
                <p>● Biuro: Konstancin-Jeziorna</p>
                <p>● Telefon: +48 501 234 567</p>
                <p>● Email: kontakt@ogienistal.pl</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

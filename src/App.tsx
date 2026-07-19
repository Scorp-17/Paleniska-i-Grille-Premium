import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  CloudSun,
  Sparkles,
  Flame,
  ArrowRight,
  ChevronRight,
  Star,
  Award,
  Clock,
  Compass,
  ShoppingBag,
  HelpCircle,
  Wrench,
} from "lucide-react";

import { Product, CartItem, Inquiry } from "./types";
import {
  PRODUCTS,
  FEATURES,
  TESTIMONIALS,
  HERO_IMAGE,
  withBaseUrl,
} from "./data";

import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CustomizerModal from "./components/CustomizerModal";
import CartDrawer from "./components/CartDrawer";
import InspirationGallery from "./components/InspirationGallery";
import ContactForm from "./components/ContactForm";
import InquiryList from "./components/InquiryList";
import FireParticles from "./components/FireParticles";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [activeProductCategory, setActiveProductCategory] = useState<
    "wszystkie" | "paleniska" | "grille" | "drewutnie" | "meble"
  >("wszystkie");

  // LocalStorage state for requested quotes
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Computed filtered products
  const filteredProducts =
    activeProductCategory === "wszystkie"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeProductCategory);

  // Load cart and inquiries on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("kuznia_cart");
    const savedInquiries = localStorage.getItem("kuznia_inquiries");
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
  }, []);

  // Save cart to local storage whenever it updates
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem("kuznia_cart", JSON.stringify(updatedCart));
  };

  const handleAddToCart = (newItem: Omit<CartItem, "id">) => {
    // Generate unique composite key based on product id, material, and size
    const optionId = `${newItem.product.id}-${newItem.selectedMaterial.replace(/\s+/g, "")}-${newItem.selectedSize.replace(/\s+/g, "")}`;

    const existingIndex = cartItems.findIndex((item) => item.id === optionId);
    let updatedCart = [...cartItems];

    if (existingIndex > -1) {
      // increase quantity and update price
      const existingItem = updatedCart[existingIndex];
      const newQuantity = existingItem.quantity + newItem.quantity;
      updatedCart[existingIndex] = {
        ...existingItem,
        quantity: newQuantity,
        totalPrice:
          (existingItem.totalPrice / existingItem.quantity) * newQuantity,
      };
    } else {
      updatedCart.push({
        ...newItem,
        id: optionId,
      });
    }

    saveCartToStorage(updatedCart);
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart({
      product,
      quantity: 1,
      selectedMaterial: product.materials[0]?.name || "",
      selectedSize: product.sizes[0]?.name || "",
      totalPrice: product.price,
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        const unitPrice = item.totalPrice / item.quantity;
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: unitPrice * newQuantity,
        };
      }
      return item;
    });
    saveCartToStorage(updatedCart);
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    saveCartToStorage(updatedCart);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  const handleInquirySubmitted = (newInquiry: Inquiry) => {
    const updatedInquiries = [newInquiry, ...inquiries];
    setInquiries(updatedInquiries);
    localStorage.setItem("kuznia_inquiries", JSON.stringify(updatedInquiries));
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((i) => i.id !== id);
    setInquiries(updated);
    localStorage.setItem("kuznia_inquiries", JSON.stringify(updated));
  };

  const handleClearAllInquiries = () => {
    setInquiries([]);
    localStorage.removeItem("kuznia_inquiries");
  };

  // Helper scroll function
  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenCustomizer = (product: Product) => {
    setSelectedProduct(product);
    setIsCustomizerOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-charcoal text-zinc-100 flex flex-col font-sans overflow-x-hidden antialiased select-none">
      {/* Premium Sticky Navigation Bar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateToSection={navigateToSection}
      />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section
          id="hero"
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Atmospheric Background Image with Sunset Glow overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={HERO_IMAGE}
              alt="Ekskluzywne palenisko o zachodzie słońca"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform scale-100 animate-pulse-slow"
              style={{ animationDuration: "10s" }}
            />
            {/* Deep color grading overlays representing warm fires and steel */}
            <div className="absolute inset-0 bg-linear-to-t from-brand-charcoal via-brand-charcoal/75 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-brand-charcoal/90 via-transparent to-brand-charcoal/30" />

            {/* Visual warm sparks particles effect */}
            <div
              className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-brand-amber rounded-full animate-ping blur-[1px]"
              style={{ animationDuration: "4s" }}
            />
            <div
              className="absolute bottom-1/2 right-1/4 w-1 h-1 bg-brand-gold rounded-full animate-ping blur-[1.5px]"
              style={{ animationDuration: "3s" }}
            />

            {/* Animated Framer Motion Fire/Flame Particles simulation */}
            <FireParticles />
          </div>

          {/* Hero Content Container */}
          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-left pt-20">
            <div className="max-w-3xl space-y-6">
              {/* Little label badge */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-brand-amber/15 border border-brand-amber/30 rounded-full text-xs text-brand-amber font-mono font-bold uppercase tracking-widest"
              >
                <Flame size={12} className="animate-pulse" />
                <span>Rękodzieło ze stali i drewna</span>
              </motion.div>

              {/* Catchy head line */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-semibold font-display tracking-tight text-white leading-[1.1] md:leading-tight"
              >
                Ciepło i styl w Twoim ogrodzie
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-zinc-300 text-base md:text-xl font-light leading-relaxed max-w-2xl"
              >
                Tworzymy ekskluzywne, rzemieślnicze paleniska, nowoczesne
                drewutnie oraz meble tarasowe z najszlachetniejszych stopów
                stali i naturalnego drewna. Początek przytulnych wieczorów
                zaczyna się tutaj.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pt-4 flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => navigateToSection("kolekcja")}
                  className="px-8 py-4 bg-linear-to-r from-brand-amber to-brand-gold hover:brightness-110 text-brand-charcoal font-bold rounded-xl tracking-wider uppercase text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-brand-amber/15 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>Zobacz kolekcję</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => navigateToSection("kontakt")}
                  className="px-8 py-4 bg-brand-charcoal/60 hover:bg-brand-gray text-white border border-brand-gray hover:border-zinc-500 font-semibold rounded-xl tracking-wider uppercase text-xs flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>Projekt na wymiar</span>
                  <Wrench size={13} className="text-brand-amber" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Bottom Fade out block */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-linear-to-t from-brand-charcoal to-transparent pointer-events-none" />
        </section>

        {/* 2. ABOUT US (O NAS) SECTION */}
        <section id="o-nas" className="py-24 bg-brand-charcoal relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side: Elegant Images Block representing craftsmanship */}
              <div className="grid grid-cols-2 gap-4 relative">
                {/* Decorative background circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-wood/10 rounded-full blur-[90px] pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4"
                >
                  <img
                    src={withBaseUrl(
                      "assets/images/palenisko_corten_geo_1784467056806.jpg",
                    )}
                    alt="Praca rzemieślnicza nad stalą"
                    referrerPolicy="no-referrer"
                    className="w-full aspect-3/4 object-cover rounded-2xl border border-brand-gray/30 shadow-xl"
                  />
                  <div className="p-5 bg-brand-dark border border-brand-gray/40 rounded-xl space-y-1">
                    <span className="text-2xl font-bold font-display text-brand-amber">
                      100%
                    </span>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
                      Polskie rzemiosło
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-4 pt-12"
                >
                  <div className="p-5 bg-brand-dark border border-brand-gray/40 rounded-xl space-y-1">
                    <Award className="text-brand-amber" size={24} />
                    <h5 className="text-sm font-semibold text-white mt-1">
                      Stal Klasy S355
                    </h5>
                    <p className="text-[10px] text-zinc-400 leading-relaxed font-mono">
                      Zwiększona trwałość konstrukcji
                    </p>
                  </div>
                  <img
                    src={withBaseUrl(
                      "assets/images/meble_ogrodowe_1784393702453.jpg",
                    )}
                    alt="Luksusowa aranżacja tarasu"
                    referrerPolicy="no-referrer"
                    className="w-full aspect-3/4 object-cover rounded-2xl border border-brand-gray/30 shadow-xl"
                  />
                </motion.div>
              </div>

              {/* Right Side: Elegant Editorial Description */}
              <div className="space-y-6 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-brand-amber font-bold tracking-wider">
                  <span>Nasza Filozofia Rzemiosła</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-semibold font-display text-white tracking-tight leading-tight">
                  Wykute z pasji do ognia i precyzji formy
                </h3>

                <div className="h-0.5 bg-linear-to-r from-brand-amber to-transparent w-24" />

                <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
                  W{" "}
                  <span className="text-brand-amber font-semibold">
                    OGIEN I STAL
                  </span>{" "}
                  wierzymy, że ogród nie jest jedynie dodatkiem do domu, lecz
                  sercem życia towarzyskiego i oazą codziennego relaksu. Naszą
                  misją jest dostarczanie mebli oraz palenisk, które stanowią
                  estetyczny punkt orientacyjny każdej luksusowej posesji.
                </p>

                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                  Każdy spaw, każde ułożenie usłojenia egzotycznego drewna Teak
                  oraz formowanie żeliwnych konstrukcji przechodzi rygorystyczny
                  proces ręcznej weryfikacji. Nie uznajemy półśrodków –
                  projektujemy z myślą o surowych warunkach atmosferycznych,
                  dając gwarancję niezawodności i nienaruszonego uroku na
                  dziesięciolecia.
                </p>

                {/* Quote Block */}
                <div className="border-l-2 border-brand-amber pl-4 py-1 italic text-zinc-400 text-xs md:text-sm">
                  &ldquo;Chcieliśmy połączyć naturalny instynkt gromadzenia się
                  przy żywym płomieniu z luksusem i minimalistycznym designem
                  współczesnej architektury.&rdquo;
                  <span className="block not-italic font-mono text-[10px] text-zinc-500 uppercase font-bold mt-2">
                    — Paweł Kaczmarek, Główny Rzemieślnik
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE PRODUCT SHOWCASE SECTION */}
        <section
          id="kolekcja"
          className="py-24 bg-brand-dark/30 relative border-t border-brand-gray/20"
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Category header text */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-amber font-bold block mb-3">
                Ekskluzywne portfolio
              </span>
              <h3 className="text-4xl md:text-5xl font-semibold font-display text-white tracking-tight leading-tight">
                Rzemieślnicza Kolekcja Tarasowa
              </h3>
              <p className="text-zinc-400 mt-4 text-sm md:text-base leading-relaxed">
                Wybierz kategorię i skonfiguruj wymiary oraz wykończenie
                rdzewiejącej stali Corten, klasycznego antracytu lub dębu
                palonego. Prześlij zapytanie o bezpłatną wycenę.
              </p>
            </div>

            {/* Category Filter Tabs with dynamic Framer Motion highlights */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {[
                { id: "wszystkie", label: "Wszystkie produkty" },
                { id: "paleniska", label: "Paleniska" },
                { id: "grille", label: "Grille premium" },
                { id: "drewutnie", label: "Stojaki i drewutnie" },
                { id: "meble", label: "Rękodzieło i meble" },
              ].map((tab) => {
                const isActive = activeProductCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveProductCategory(tab.id as any)}
                    className="relative px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-medium transition-colors duration-300 cursor-pointer overflow-hidden select-none focus:outline-none"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeProductIndicator"
                        className="absolute inset-0 bg-linear-to-r from-brand-amber to-brand-gold rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-300 ${isActive ? "text-brand-charcoal font-bold" : "text-zinc-400 hover:text-white"}`}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Products grid with animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <ProductCard
                      product={product}
                      onOpenCustomizer={handleOpenCustomizer}
                      onQuickAdd={handleQuickAdd}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Configurator prompt banner */}
            <div className="mt-12 p-6 bg-brand-charcoal border border-brand-gray/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-amber/10 rounded-xl flex items-center justify-center text-brand-amber shrink-0">
                  <Sparkles size={22} className="animate-pulse" />
                </div>
                <div>
                  <h5 className="text-base font-semibold text-white">
                    Chcesz zrealizować unikalny projekt?
                  </h5>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Dostosowujemy długości mebli, grubości stali oraz kształty
                    palenisk pod wymiar Twojego tarasu.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigateToSection("kontakt")}
                className="px-5 py-3 bg-brand-gray hover:bg-brand-amber hover:text-brand-charcoal text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Zapytaj o projekt na wymiar</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* 4. BENEFITS / FEATURES SECTION */}
        <section
          id="zalety"
          className="py-24 bg-brand-charcoal border-t border-brand-gray/20"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text column */}
              <div className="lg:col-span-4 space-y-6 text-left">
                <span className="text-xs font-mono text-brand-amber uppercase tracking-wider font-bold">
                  Standard jakości
                </span>
                <h3 className="text-3xl md:text-4xl font-semibold font-display text-white tracking-tight leading-tight">
                  Dlaczego warto wybrać nasze wyroby?
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Każdy mebel i drewutnia wychodząca z naszej kuźni to
                  połączenie luksusowych materiałów z odpornością na najgorsze
                  jesienne szarugi.
                </p>
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-brand-amber font-mono text-xs font-bold uppercase tracking-wider">
                    <Clock size={14} />
                    <span>Czas realizacji: 14-21 dni roboczych</span>
                  </div>
                </div>
              </div>

              {/* Grid bento layout of features */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                {FEATURES.map((feature, index) => {
                  return (
                    <div
                      key={index}
                      className="p-6 bg-brand-dark/40 border border-brand-gray/30 rounded-xl space-y-3 hover:border-brand-amber/35 transition-colors duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber">
                        {feature.iconName === "ShieldCheck" && (
                          <ShieldCheck size={20} />
                        )}
                        {feature.iconName === "CloudSun" && (
                          <CloudSun size={20} />
                        )}
                        {feature.iconName === "Sparkles" && (
                          <Sparkles size={20} />
                        )}
                        {feature.iconName === "Flame" && <Flame size={20} />}
                      </div>
                      <h4 className="text-base font-semibold text-white">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 5. INSPIRATION GALLERY */}
        <InspirationGallery />

        {/* 6. TESTIMONIALS SECTION */}
        <section
          id="opinie"
          className="py-24 bg-brand-dark/45 relative border-b border-brand-gray/20"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-amber font-bold block mb-3">
                Zaufanie inwestorów
              </span>
              <h3 className="text-4xl font-semibold font-display text-white tracking-tight leading-tight">
                Co mówią nasi klienci?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="p-6 bg-brand-charcoal border border-brand-gray/30 rounded-2xl relative flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="text-brand-amber fill-brand-amber"
                        />
                      ))}
                    </div>

                    <p className="text-sm text-zinc-300 leading-relaxed font-light italic">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-brand-gray/20 flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-semibold text-white">
                        {t.name}
                      </h5>
                      <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                        {t.role}
                      </span>
                    </div>
                    <div className="p-1 bg-brand-amber/10 text-brand-amber rounded-full">
                      <ShieldCheck size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CONTACT & INQUIRY TIMELINE CONTAINER */}
        <ContactForm onContactFormSubmitted={handleInquirySubmitted} />

        {/* Client Zone / Sent inquiries list */}
        <section className="pb-24 bg-brand-charcoal px-6">
          <InquiryList
            inquiries={inquiries}
            onDeleteInquiry={handleDeleteInquiry}
            onClearAll={handleClearAllInquiries}
          />
        </section>
      </main>

      {/* FOOTER AREA */}
      <footer className="bg-brand-charcoal border-t border-brand-gray/30 py-12 text-zinc-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-amber/15 flex items-center justify-center text-brand-amber">
              <Flame size={14} className="fill-brand-amber text-brand-amber" />
            </div>
            <div>
              <span className="text-xs font-bold text-white uppercase font-display tracking-widest block leading-none">
                OGIEN I STAL
              </span>
              <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-mono">
                Premium Outdoor Gear
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-500 font-mono text-center md:text-right">
            © 2026 OGIEN I STAL. Wszelkie prawa zastrzeżone. Projektowanie z
            pasją do stali i ognia.
          </p>
        </div>
      </footer>

      {/* INTERACTIVE COMPONENT MODALS */}
      <CustomizerModal
        product={selectedProduct}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onAddToCart={handleAddToCart}
        onNavigateProduct={(nextProduct) => setSelectedProduct(nextProduct)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onInquirySubmitted={handleInquirySubmitted}
      />
    </div>
  );
}

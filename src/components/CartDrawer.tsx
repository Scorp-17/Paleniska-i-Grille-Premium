import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  User,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  Flame,
} from "lucide-react";
import { CartItem, Inquiry } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onInquirySubmitted: (inquiry: Inquiry) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onInquirySubmitted,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const cartTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleSubmitInquiry = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (
      !customerName.trim() ||
      !customerEmail.trim() ||
      !customerPhone.trim()
    ) {
      setErrorMsg("Proszę wypełnić wszystkie pola oznaczone gwiazdką (*).");
      return;
    }

    setIsSubmitting(true);

    // Simulate sending inquiry
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: "inq-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        customerName,
        customerEmail,
        customerPhone,
        message,
        items: cartItems.map((item) => ({
          name: item.product.name,
          material: item.selectedMaterial,
          size: item.selectedSize,
          quantity: item.quantity,
          price: item.totalPrice,
        })),
        date: new Date().toLocaleDateString("pl-PL"),
        status: "Nowe",
      };

      onInquirySubmitted(newInquiry);
      setIsSubmitting(false);
      setSubmittedSuccess(true);

      // Clear fields
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setMessage("");
      onClearCart();

      // Close success after 4 seconds
      setTimeout(() => {
        setSubmittedSuccess(false);
        onClose();
      }, 4000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="cart-drawer-container"
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
              className="w-screen max-w-md bg-brand-dark border-l border-brand-gray/30 flex flex-col shadow-2xl h-full"
            >
              {/* Header */}
              <div className="p-6 border-b border-brand-gray/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-brand-amber/10 rounded-lg text-brand-amber">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-white">
                      Twój Koszyk Wyceny
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Wybrane produkty rzemieślnicze
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-brand-gray/40 rounded-full transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {submittedSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center h-full py-8 space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-600/10 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-lg">
                      <CheckCircle size={32} className="animate-bounce" />
                    </div>
                    <h4 className="text-xl font-bold font-display text-white">
                      Zapytanie zostało wysłane!
                    </h4>
                    <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
                      Dziękujemy za zainteresowanie marką{" "}
                      <span className="text-brand-amber font-semibold">
                        OGIEN I STAL
                      </span>
                      . Nasz rzemieślnik skontaktuje się z Tobą w ciągu 24
                      godzin z dedykowaną wyceną.
                    </p>
                    <div className="pt-4 p-4 bg-brand-charcoal rounded-xl border border-brand-gray/30 text-xs text-zinc-500 text-left w-full space-y-1.5 font-mono">
                      <p>● Szybki kontakt: +48 501 234 567</p>
                      <p>● Status: Oczekiwanie na kontakt</p>
                    </div>
                  </motion.div>
                ) : cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center h-full py-12 space-y-3">
                    <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-600">
                      <ShoppingBag size={24} />
                    </div>
                    <h4 className="text-md font-semibold text-zinc-300">
                      Koszyk jest pusty
                    </h4>
                    <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                      Dodaj wybrane paleniska, grille lub meble tarasowe z
                      oferty, dostosuj wymiary i prześlij zapytanie o
                      indywidualną ofertę.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-4 px-4 py-2 bg-brand-gray hover:bg-brand-amber hover:text-brand-charcoal text-white rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      Przeglądaj kolekcję
                    </button>
                  </div>
                ) : (
                  <>
                    {/* List of items */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider font-semibold">
                          Elementy zestawienia
                        </span>
                        <span className="text-xs text-brand-amber font-mono font-bold">
                          {cartItems.length} poz.
                        </span>
                      </div>

                      <div className="space-y-3 max-h-75 overflow-y-auto pr-1">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="bg-brand-charcoal/80 border border-brand-gray/30 p-3.5 rounded-xl flex gap-3 relative group"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-16 h-16 object-cover rounded-lg border border-brand-gray/40 shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                              <h5 className="text-sm font-semibold text-white truncate pr-5">
                                {item.product.name}
                              </h5>

                              <p className="text-[11px] text-zinc-400 mt-0.5 font-mono truncate">
                                Mat:{" "}
                                <span className="text-brand-amber">
                                  {item.selectedMaterial.split(" (")[0]}
                                </span>
                              </p>

                              <p className="text-[11px] text-zinc-400 font-mono truncate">
                                Rozmiar:{" "}
                                <span className="text-brand-amber">
                                  {item.selectedSize}
                                </span>
                              </p>

                              <div className="flex items-center justify-between mt-2">
                                {/* Quantity selector */}
                                <div className="flex items-center bg-brand-dark border border-brand-gray/50 rounded-md py-0.5 px-1.5">
                                  <button
                                    onClick={() =>
                                      onUpdateQuantity(item.id, -1)
                                    }
                                    className="text-[10px] text-zinc-500 hover:text-white px-1"
                                  >
                                    -
                                  </button>
                                  <span className="text-[10px] text-zinc-300 font-mono font-bold px-1.5">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                    className="text-[10px] text-zinc-500 hover:text-white px-1"
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="text-xs font-mono font-bold text-white">
                                  {item.totalPrice.toLocaleString("pl-PL")} zł
                                </div>
                              </div>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="absolute top-3 right-3 text-zinc-500 hover:text-red-400 transition-colors"
                              title="Usuń"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Summary Pricing */}
                      <div className="p-4 bg-brand-charcoal rounded-xl border border-brand-gray/30 space-y-2">
                        <div className="flex justify-between text-xs text-zinc-400">
                          <span>Wartość orientacyjna</span>
                          <span className="font-mono">
                            {cartTotal.toLocaleString("pl-PL")} zł
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-zinc-400">
                          <span>Koszt dostawy i ułożenia</span>
                          <span className="text-brand-amber font-mono text-[10px] font-bold uppercase tracking-wider">
                            Do uzgodnienia
                          </span>
                        </div>
                        <div className="h-px bg-brand-gray/30 my-2" />
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-semibold text-white">
                            Razem szacunkowo
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold font-display text-white">
                              {cartTotal.toLocaleString("pl-PL")}
                            </span>
                            <span className="text-xs text-brand-amber font-mono font-bold">
                              PLN
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form Step inside Drawer */}
                    <div className="pt-4 border-t border-brand-gray/30">
                      <div className="flex items-center gap-1.5 mb-3 text-xs font-mono uppercase text-zinc-500 tracking-wider font-semibold">
                        <Flame size={12} className="text-brand-amber" />
                        <span>Prześlij dane do wyceny</span>
                      </div>

                      <form
                        onSubmit={handleSubmitInquiry}
                        className="space-y-3 text-left"
                      >
                        {errorMsg && (
                          <div className="p-3 bg-red-950/40 text-red-400 text-xs rounded-lg border border-red-500/20 flex items-center gap-2">
                            <span>{errorMsg}</span>
                          </div>
                        )}

                        <div className="relative">
                          <User
                            size={14}
                            className="absolute left-3.5 top-3 text-zinc-500"
                          />
                          <input
                            type="text"
                            placeholder="Imię i nazwisko *"
                            required
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full bg-brand-charcoal border border-brand-gray/40 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-amber transition-colors"
                          />
                        </div>

                        <div className="relative">
                          <Mail
                            size={14}
                            className="absolute left-3.5 top-3 text-zinc-500"
                          />
                          <input
                            type="email"
                            placeholder="Adres e-mail *"
                            required
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full bg-brand-charcoal border border-brand-gray/40 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-amber transition-colors"
                          />
                        </div>

                        <div className="relative">
                          <Phone
                            size={14}
                            className="absolute left-3.5 top-3 text-zinc-500"
                          />
                          <input
                            type="tel"
                            placeholder="Telefon kontaktowy *"
                            required
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full bg-brand-charcoal border border-brand-gray/40 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-amber transition-colors"
                          />
                        </div>

                        <div className="relative">
                          <FileText
                            size={14}
                            className="absolute left-3.5 top-3 text-zinc-500"
                          />
                          <textarea
                            placeholder="Dodatkowe uwagi (np. zmiana wymiaru, termin realizacji)"
                            rows={2}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-brand-charcoal border border-brand-gray/40 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-amber transition-colors resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full mt-2 py-3 bg-linear-to-r from-brand-amber to-brand-gold hover:brightness-110 text-brand-charcoal font-semibold rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span className="w-5 h-5 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <span>Wyślij zapytanie ofertowe</span>
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

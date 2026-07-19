import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";
import { Inquiry } from "../types";

interface ContactFormProps {
  onContactFormSubmitted: (inquiry: Inquiry) => void;
}

export default function ContactForm({
  onContactFormSubmitted,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("Projekt indywidualny (na wymiar)");
  const [message, setMessage] = useState("");
  const [gdprChecked, setGdprChecked] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage("Wszystkie pola formularza są wymagane.");
      return;
    }

    if (!gdprChecked) {
      setErrorMessage(
        "Proszę wyrazić zgodę na przetwarzanie danych osobowych.",
      );
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      const contactInquiry: Inquiry = {
        id: "CON-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        message: `[Kategoria: ${interest}] ${message}`,
        items: [
          {
            name: `Projekt Indywidualny: ${interest}`,
            material: "Stal i Drewno (Wykończenie na miarę)",
            size: "Do uzgodnienia",
            quantity: 1,
            price: 0, // indicates a free design session request
          },
        ],
        date: new Date().toLocaleDateString("pl-PL"),
        status: "Nowe",
      };

      onContactFormSubmitted(contactInquiry);
      setIsSending(false);
      setSentSuccess(true);

      // reset fields
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setGdprChecked(false);

      setTimeout(() => {
        setSentSuccess(false);
      }, 4000);
    }, 1500);
  };

  return (
    <section
      id="kontakt"
      className="py-24 bg-brand-dark/40 relative overflow-hidden border-t border-brand-gray/20"
    >
      {/* Warm glow on footer area */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Company details side */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-brand-amber font-bold block mb-3">
                Zbudujmy coś niezwykłego
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold font-display text-white tracking-tight leading-tight">
                Zaproś Ciepło do Swojej Przestrzeni
              </h2>
              <p className="text-zinc-400 mt-4 text-sm md:text-base leading-relaxed">
                Każdy element z naszej kuźni to osobna opowieść o ogniu, stali i
                drewnie. Masz wizję na unikalne palenisko rzemieślnicze lub stół
                tarasowy na wymiar? Skontaktuj się z nami. Pomożemy Ci
                przekształcić Twoje marzenia w stalowe rękodzieło.
              </p>
            </div>

            {/* Practical info cards */}
            <div className="space-y-4">
              {/* Card Address */}
              <div className="flex gap-4 p-4 bg-brand-charcoal border border-brand-gray/30 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">
                    TARPOL Sp. z o.o.
                  </h5>
                  <a
                    href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x47031599db9efde1:0x86f7021a074bb125?sa=X&ved=1t:8290&hl=ru-PL&ictx=111"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-zinc-400 mt-1 font-mono hover:text-brand-amber transition-colors block"
                  >
                    Jakóba Hechlińskiego 13, 85-862 Bydgoszcz
                  </a>
                </div>
              </div>

              {/* Card Phone */}
              <div className="flex gap-4 p-4 bg-brand-charcoal border border-brand-gray/30 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">
                    Telefon kontaktowy
                  </h5>
                  <p className="text-xs text-zinc-400 mt-1 font-mono hover:text-brand-amber transition-colors">
                    <a href="tel:+48523211601">tel. 52 321 16 01</a>
                  </p>
                </div>
              </div>

              {/* Card Email */}
              <div className="flex gap-4 p-4 bg-brand-charcoal border border-brand-gray/30 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">
                    Wyceny Indywidualne
                  </h5>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">
                    Dane kontaktowe zgodne z aktualną ofertą TARPOL Sp. z o.o.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form card */}
          <div className="lg:col-span-7 bg-brand-charcoal border border-brand-gray/30 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-6 border-b border-brand-gray/20 pb-4">
              <MessageSquare size={18} className="text-brand-amber" />
              <div>
                <h4 className="text-lg font-semibold text-white">
                  Formularz Konceptu Indywidualnego
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Zaprojektuj z nami swój idealny kącik wypoczynkowy
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-950/40 text-red-400 text-xs rounded-lg border border-red-500/20 flex items-center gap-2">
                  <ShieldAlert size={14} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {sentSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-emerald-950/40 text-emerald-400 text-xs rounded-lg border border-emerald-500/20 flex items-center gap-2.5"
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-400 shrink-0"
                  />
                  <div>
                    <span className="font-bold block">
                      Koncept został przesłany!
                    </span>
                    <span>
                      Właśnie dodaliśmy Twoje zapytanie o projekt na wymiar do
                      panelu poniżej.
                    </span>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-mono">
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="np. Robert Kowalski"
                    className="w-full bg-brand-dark border border-brand-gray/40 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-amber transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-mono">
                    Numer telefonu *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="np. +48 600 700 800"
                    className="w-full bg-brand-dark border border-brand-gray/40 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-amber transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-mono">
                  Adres e-mail *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="np. robert@przyklad.pl"
                  className="w-full bg-brand-dark border border-brand-gray/40 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-amber transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-mono">
                  Produkt / Kategoria zainteresowania
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-brand-dark border border-brand-gray/40 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-amber transition-colors cursor-pointer"
                >
                  <option>Ekskluzywne palenisko (Vulkan)</option>
                  <option>Grill rzemieślniczy (Ignis)</option>
                  <option>Drewutnik loftowy (Kubik)</option>
                  <option>Meble tarasowe ze stali (Silesia)</option>
                  <option>Projekt indywidualny (na wymiar)</option>
                  <option>Inna sprawa / Pytanie ogólne</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-mono">
                  Opisz swoje wymagania *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Napisz np. jaki wymiar paleniska Cię interesuje, czy masz gotowe rysunki ogrodowe, lub jakie gatunki drewna preferujesz na wykończenie mebli tarasowych..."
                  className="w-full bg-brand-dark border border-brand-gray/40 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-amber transition-colors resize-none"
                />
              </div>

              {/* GDPR Consent */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="gdpr-checkbox"
                  checked={gdprChecked}
                  onChange={(e) => setGdprChecked(e.target.checked)}
                  className="mt-1 accent-brand-amber border border-brand-gray/40 rounded cursor-pointer"
                />
                <label
                  htmlFor="gdpr-checkbox"
                  className="text-[11px] text-zinc-500 leading-relaxed select-none cursor-pointer"
                >
                  Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie
                  z polityką prywatności w celu przygotowania wyceny technicznej
                  i obsługi zgłoszenia. *
                </label>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full mt-4 py-3.5 bg-linear-to-r from-brand-amber to-brand-gold hover:brightness-110 text-brand-charcoal font-semibold rounded-xl text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSending ? (
                  <span className="w-5 h-5 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Wyślij briefing projektowy</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

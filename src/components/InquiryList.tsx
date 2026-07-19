import { motion } from 'motion/react';
import { Mail, Phone, Calendar, ClipboardCheck, Clock, FileCheck, Trash2 } from 'lucide-react';
import { Inquiry } from '../types';

interface InquiryListProps {
  inquiries: Inquiry[];
  onDeleteInquiry: (id: string) => void;
  onClearAll: () => void;
}

export default function InquiryList({ inquiries, onDeleteInquiry, onClearAll }: InquiryListProps) {
  if (inquiries.length === 0) return null;

  return (
    <div className="bg-brand-charcoal border border-brand-gray/30 rounded-2xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brand-gray/20 pb-4 mb-6">
        <div>
          <h4 className="text-xl font-semibold font-display text-white">Strefa Klienta (Wysłane zapytania)</h4>
          <p className="text-xs text-zinc-400 mt-1">Śledź status swoich wycen rzemieślniczych i konfiguracji</p>
        </div>
        <button
          onClick={onClearAll}
          className="text-xs text-zinc-500 hover:text-red-400 font-mono mt-3 sm:mt-0 flex items-center gap-1.5 transition-colors self-start sm:self-center cursor-pointer"
        >
          <Trash2 size={12} />
          Wyczyść historię zapytań
        </button>
      </div>

      <div className="space-y-6">
        {inquiries.map((inq) => (
          <motion.div
            key={inq.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-brand-gray/40 rounded-xl p-5 bg-brand-dark/40 hover:border-brand-amber/30 transition-all duration-300 relative group"
          >
            {/* Top Row: ID, Date, Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-gray/20 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold bg-brand-gray px-2.5 py-1 rounded-md text-zinc-300">
                  REF: {inq.id}
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <Calendar size={12} />
                  {inq.date}
                </span>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-1.5">
                {inq.status === 'Nowe' && (
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold bg-amber-500/10 text-brand-amber px-3 py-1 rounded-full border border-brand-amber/30 flex items-center gap-1 animate-pulse">
                    <Clock size={10} />
                    Nowe (Analiza)
                  </span>
                )}
                {inq.status === 'W trakcie analizy' && (
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 flex items-center gap-1">
                    <Clock size={10} />
                    Projektowanie
                  </span>
                )}
                {inq.status === 'Oferta wysłana' && (
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <FileCheck size={10} />
                    Oferta wysłana
                  </span>
                )}
              </div>
            </div>

            {/* Grid details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side: Contact details */}
              <div className="space-y-2 text-sm text-zinc-300">
                <p className="font-semibold text-white">{inq.customerName}</p>
                <div className="space-y-1.5 text-xs text-zinc-400">
                  <p className="flex items-center gap-2">
                    <Mail size={13} className="text-zinc-500" />
                    {inq.customerEmail}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={13} className="text-zinc-500" />
                    {inq.customerPhone}
                  </p>
                </div>
                {inq.message && (
                  <div className="mt-3 p-3 bg-brand-charcoal/60 rounded-lg text-xs italic text-zinc-400 border border-brand-gray/20">
                    <span className="text-[10px] uppercase font-mono block text-zinc-500 font-bold not-italic mb-1">
                      Twoja wiadomość:
                    </span>
                    &ldquo;{inq.message}&rdquo;
                  </div>
                )}
              </div>

              {/* Right Side: Items configured */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider font-bold block">
                  Zamówiona konfiguracja rzemieślnicza
                </span>
                <div className="space-y-2">
                  {inq.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-brand-charcoal/40 p-2.5 rounded-lg border border-brand-gray/20 text-xs flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                          {item.material.split(' (')[0]} | {item.size}
                        </p>
                      </div>
                      <div className="text-right shrink-0 ml-4 font-mono">
                        <span className="text-zinc-400">{item.quantity} szt.</span>
                        <p className="font-bold text-white text-sm">{item.price.toLocaleString('pl-PL')} zł</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-brand-gray/10 text-xs">
                  <span className="text-zinc-500">Orientacyjna suma:</span>
                  <span className="font-mono font-bold text-brand-amber">
                    {inq.items.reduce((sum, i) => sum + i.price, 0).toLocaleString('pl-PL')} PLN
                  </span>
                </div>
              </div>
            </div>

            {/* Individual delete action */}
            <button
              onClick={() => onDeleteInquiry(inq.id)}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-zinc-500 hover:text-red-400 hover:bg-brand-gray/30 rounded-md cursor-pointer"
              title="Skasuj to zapytanie"
            >
              <Trash2 size={13} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

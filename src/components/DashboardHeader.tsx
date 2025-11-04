'use client';

import { useEffect, useState } from 'react';
import { BellAlertIcon, SignalIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export function DashboardHeader() {
  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const date = clock.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const time = clock.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent p-6 shadow-xl"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Tu hogar conectado</p>
        <h1 className="mt-2 text-4xl font-semibold text-white">Casa inteligente · Panel maestro</h1>
        <p className="mt-2 text-sm text-slate-300">
          {date} · {time}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-emerald-200">
          <SignalIcon className="h-4 w-4" />
          Red estable
        </div>
        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white transition hover:border-brand-400/60 hover:text-brand-200"
        >
          <BellAlertIcon className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
            2
          </span>
        </button>
      </div>
    </motion.header>
  );
}

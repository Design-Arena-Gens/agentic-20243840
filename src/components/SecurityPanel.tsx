'use client';

import type { SecurityEvent } from '@/lib/data';
import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

type Props = {
  events: SecurityEvent[];
};

const typeLabel: Record<SecurityEvent['tipo'], string> = {
  puerta: 'Puerta',
  ventana: 'Ventana',
  movimiento: 'Movimiento',
  'cámara': 'Cámara'
};

const statusStyle: Record<SecurityEvent['estado'], string> = {
  normal: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30',
  alerta: 'bg-amber-500/20 text-amber-300 border border-amber-400/30',
  abierto: 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
};

export function SecurityPanel({ events }: Props) {
  const activeAlerts = events.filter((event) => event.estado !== 'normal').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl bg-slate-900/70 p-6 shadow-xl ring-1 ring-white/10"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Seguridad</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Sistema perimetral</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
          <ShieldCheckIcon className={clsx('h-5 w-5', activeAlerts ? 'text-amber-300' : 'text-emerald-300')} />
          <span>{activeAlerts ? `${activeAlerts} alertas activas` : 'Todo seguro'}</span>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
          >
            <div>
              <p className="text-base font-medium text-white">{event.dispositivo}</p>
              <p className="text-xs text-slate-400">{typeLabel[event.tipo]} · {event.hora}</p>
              {event.detalles && <p className="mt-1 text-xs text-slate-300">{event.detalles}</p>}
            </div>
            <span className={clsx('rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest', statusStyle[event.estado])}>
              {event.estado}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

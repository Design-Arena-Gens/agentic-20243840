'use client';

import type { Automation } from '@/lib/data';
import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

type Props = {
  automations: Automation[];
};

const statusColors: Record<Automation['estado'], string> = {
  activo: 'bg-emerald-500/20 text-emerald-200',
  pausado: 'bg-amber-500/20 text-amber-200',
  completado: 'bg-slate-500/30 text-slate-200'
};

export function AutomationTimeline({ automations }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl bg-slate-900/70 p-6 shadow-xl ring-1 ring-white/10"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Automatizaciones</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Próximas rutinas</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
          <ClockIcon className="h-4 w-4 text-sky-300" />
          <span>Sincronizadas con calendario</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {automations.map((automation, index) => (
          <motion.div
            key={automation.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="relative flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-500/20 text-lg font-semibold text-brand-200">
              {automation.hora.slice(0, 2)}
            </div>
            <div>
              <p className="text-base font-semibold text-white">{automation.titulo}</p>
              <p className="text-sm text-slate-300">{automation.descripcion}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm font-medium text-white">{automation.hora}</p>
              <span className={clsx('mt-2 inline-flex rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em]', statusColors[automation.estado])}>
                {automation.estado}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

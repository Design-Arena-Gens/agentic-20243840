'use client';

import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

export type AlertItem = {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
};

const severityStyle: Record<AlertItem['severity'], string> = {
  low: 'border-sky-400/30 bg-sky-500/10 text-sky-200',
  medium: 'border-amber-400/40 bg-amber-500/10 text-amber-100',
  high: 'border-rose-500/50 bg-rose-500/10 text-rose-100'
};

type Props = {
  alerts: AlertItem[];
};

export function AlertsPanel({ alerts }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl bg-slate-900/70 p-6 shadow-xl ring-1 ring-white/10"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
          <ExclamationTriangleIcon className="h-6 w-6 text-amber-300" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Alertas</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Notificaciones críticas</h2>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className={clsx('rounded-2xl border px-4 py-3 text-sm shadow-md', severityStyle[alert.severity])}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-base font-semibold text-white">{alert.title}</p>
              <span className="text-xs uppercase tracking-[0.24em] text-white/60">{alert.timestamp}</span>
            </div>
            <p className="mt-2 text-sm text-slate-200">{alert.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

'use client';

import { Device } from '@/lib/data';
import { formatWatts } from '@/lib/format';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';

type Props = {
  device: Device;
  onToggle: (id: string, nextState: boolean) => void;
  highlight?: boolean;
};

const typeToEmoji: Record<Device['type'], string> = {
  luz: '💡',
  clima: '🌡️',
  seguridad: '🛡️',
  multimedia: '🎵',
  energía: '⚡'
};

export function DeviceCard({ device, onToggle, highlight = false }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={clsx(
        'flex flex-col justify-between rounded-3xl bg-slate-900/60 p-6 shadow-lg ring-1 ring-white/5 transition hover:ring-brand-400/60',
        highlight && 'ring-2 ring-brand-400/80 shadow-soft-glow'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{typeToEmoji[device.type]}</span>
          <div>
            <p className="text-lg font-semibold text-white">{device.name}</p>
            <p className="text-sm text-slate-400">{device.room}</p>
          </div>
        </div>
        <Switch
          checked={device.online}
          onChange={(checked) => onToggle(device.id, checked)}
          className={clsx(
            'relative inline-flex h-7 w-14 items-center rounded-full transition',
            device.online ? 'bg-brand-500/90' : 'bg-slate-700'
          )}
        >
          <span className="sr-only">Cambiar estado</span>
          <span
            className={clsx(
              'inline-block h-5 w-5 transform rounded-full bg-white transition',
              device.online ? 'translate-x-7' : 'translate-x-2'
            )}
          />
        </Switch>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>Consumo</span>
          <span className="font-semibold text-brand-300">
            {device.online ? formatWatts(device.powerUsage) : 'En espera'}
          </span>
        </div>
        {device.mode && (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
            {device.mode}
          </div>
        )}
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400/90 shadow-[0_0_0_3px_rgba(74,222,128,0.2)]" />
            {device.online ? 'En línea' : 'Fuera de línea'}
          </span>
          <span className="capitalize">{device.connectivity}</span>
          {typeof device.battery === 'number' && (
            <span className="text-emerald-300/90">{device.battery}% batería</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

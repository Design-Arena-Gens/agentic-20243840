'use client';

import { Device } from '@/lib/data';
import { DeviceCard } from '@/components/DeviceCard';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

type Props = {
  devices: Device[];
  onToggle: (id: string, nextState: boolean) => void;
};

const typeOrder: Record<Device['type'], number> = {
  luz: 0,
  clima: 1,
  seguridad: 2,
  multimedia: 3,
  energía: 4
};

export function DeviceGrid({ devices, onToggle }: Props) {
  const sorted = useMemo(
    () =>
      [...devices].sort((a, b) => {
        if (a.online !== b.online) {
          return Number(b.online) - Number(a.online);
        }
        if (typeOrder[a.type] !== typeOrder[b.type]) {
          return typeOrder[a.type] - typeOrder[b.type];
        }
        return a.name.localeCompare(b.name);
      }),
    [devices]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl bg-slate-900/70 p-6 shadow-xl ring-1 ring-white/10"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Dispositivos</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Estado en tiempo real</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
          {sorted.filter((device) => device.online).length} activos
        </span>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((device) => (
          <DeviceCard key={device.id} device={device} onToggle={onToggle} highlight={device.online && device.powerUsage > 50} />
        ))}
      </div>
    </motion.div>
  );
}

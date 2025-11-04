'use client';

import { BoltIcon, ShieldCheckIcon, WifiIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { formatWatts } from '@/lib/format';
import type { Device, EnergySnapshot } from '@/lib/data';

type Props = {
  devices: Device[];
  energy: EnergySnapshot[];
  alerts: number;
};

const cards = [
  {
    id: 'consumo',
    title: 'Consumo actual',
    icon: BoltIcon,
    gradient: 'from-brand-500 via-sky-500 to-cyan-400'
  },
  {
    id: 'dispositivos',
    title: 'Dispositivos activos',
    icon: WifiIcon,
    gradient: 'from-emerald-500 via-green-500 to-lime-400'
  },
  {
    id: 'seguridad',
    title: 'Alertas de seguridad',
    icon: ShieldCheckIcon,
    gradient: 'from-amber-500 via-orange-500 to-red-400'
  }
];

export function SummaryStats({ devices, energy, alerts }: Props) {
  const latestEnergy = energy.at(-1) ?? energy[0];
  const onlineDevices = devices.filter((d) => d.online).length;

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const value =
          card.id === 'consumo'
            ? formatWatts((latestEnergy?.consumo ?? 0) * 1000)
            : card.id === 'dispositivos'
            ? `${onlineDevices}/${devices.length}`
            : alerts === 0
            ? 'Sin alertas'
            : `${alerts} activas`;

        const subtext =
          card.id === 'consumo'
            ? `${(latestEnergy?.solar ?? 0).toFixed(1)} kW solar · ${(latestEnergy?.bateria ?? 0).toFixed(
                1
              )} kW baterías`
            : card.id === 'dispositivos'
            ? 'Dispositivos conectados en tu hogar'
            : 'Sistema monitoreado 24/7';

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl bg-slate-900/70 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-lg"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10`} />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{card.title}</p>
                <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
                <p className="mt-2 text-sm text-slate-300">{subtext}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

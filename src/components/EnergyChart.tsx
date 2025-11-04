'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { EnergySnapshot } from '@/lib/data';
import { formatTimeLabel } from '@/lib/format';
import { motion } from 'framer-motion';

type Props = {
  data: EnergySnapshot[];
};

const tooltipStyle = {
  background: 'rgba(15, 23, 42, 0.9)',
  borderRadius: '16px',
  border: '1px solid rgba(148, 163, 184, 0.3)',
  padding: '10px 14px',
  color: '#E2E8F0',
  fontSize: '12px'
} as const;

export function EnergyChart({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl bg-slate-900/70 p-6 shadow-xl ring-1 ring-white/10"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Energía</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Flujo energético diario</h2>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Consumo
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            Solar
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Batería
          </span>
        </div>
      </div>
      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="consumo" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#0f172a" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="solar" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#fcd34d" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#0f172a" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="bateria" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#0f172a" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 10" stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTimeLabel}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value.toFixed(1)} kW`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              labelFormatter={formatTimeLabel}
              formatter={(value: number, name) => [
                `${value.toFixed(2)} kW`,
                name === 'consumo' ? 'Consumo' : name === 'solar' ? 'Solar' : 'Batería'
              ]}
            />
            <Area type="monotone" dataKey="consumo" stroke="#38bdf8" strokeWidth={2} fill="url(#consumo)" />
            <Area type="monotone" dataKey="solar" stroke="#fbbf24" strokeWidth={2} fill="url(#solar)" />
            <Area type="monotone" dataKey="bateria" stroke="#34d399" strokeWidth={2} fill="url(#bateria)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

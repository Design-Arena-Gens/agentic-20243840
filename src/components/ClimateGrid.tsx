'use client';

import type { ClimateZone } from '@/lib/data';
import { formatHumidity, formatTemperature } from '@/lib/format';
import { motion } from 'framer-motion';
import { SunIcon } from '@heroicons/react/24/outline';

type Props = {
  zones: ClimateZone[];
};

export function ClimateGrid({ zones }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl bg-slate-900/70 p-6 shadow-xl ring-1 ring-white/10"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Clima</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Zonas térmicas inteligentes</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
          <SunIcon className="h-4 w-4 text-amber-300" />
          <span>Modo confort activo</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {zones.map((zone, index) => {
          const delta = zone.temperatura - zone.consigna;
          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/60 via-slate-900/70 to-slate-900/10 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{zone.nombre}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{formatTemperature(zone.temperatura)}</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Humedad {formatHumidity(zone.humedad)} · Objetivo {formatTemperature(zone.consigna)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs uppercase text-slate-400">Desfase</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      Math.abs(delta) < 0.5
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : delta > 0
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-sky-500/20 text-sky-300'
                    }`}
                  >
                    {delta > 0 ? '+' : ''}
                    {delta.toFixed(1)}°C
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-slate-400">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider">Ventilación</p>
                  <p className="mt-2 text-sm text-slate-200">{zone.humedad > 50 ? 'Alta' : 'Normal'}</p>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider">Estado</p>
                  <p className="mt-2 text-sm text-slate-200">
                    {Math.abs(delta) < 1 ? 'Estable' : delta > 0 ? 'Enfriando' : 'Calentando'}
                  </p>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider">Sensores</p>
                  <p className="mt-2 text-sm text-slate-200">CO₂ 520 ppm</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

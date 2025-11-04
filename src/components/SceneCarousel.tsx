'use client';

import type { Scene } from '@/lib/data';
import { motion } from 'framer-motion';

type Props = {
  scenes: Scene[];
  onRunScene: (id: string) => void;
};

export function SceneCarousel({ scenes, onRunScene }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl bg-slate-900/70 p-6 shadow-xl ring-1 ring-white/10"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Escenas</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Ambientes inteligentes</h2>
        </div>
        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200 transition hover:border-brand-400/60 hover:text-brand-200"
          onClick={() => onRunScene(scenes[0]?.id ?? '')}
        >
          Activar última
        </button>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {scenes.map((scene, index) => (
          <motion.button
            key={scene.id}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onClick={() => onRunScene(scene.id)}
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${scene.color} p-[1px] text-left shadow-lg transition hover:shadow-soft-glow`}
          >
            <div className="rounded-[1.45rem] bg-slate-950/80 p-5">
              <span className="text-3xl">{scene.icono}</span>
              <p className="mt-5 text-lg font-semibold text-white">{scene.nombre}</p>
              <p className="mt-2 text-sm text-slate-300">{scene.descripcion}</p>
              <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.24em] text-white/60 transition group-hover:text-white">
                Ejecutar escena →
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

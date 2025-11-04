'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { SummaryStats } from '@/components/SummaryStats';
import { EnergyChart } from '@/components/EnergyChart';
import { DeviceGrid } from '@/components/DeviceGrid';
import { ClimateGrid } from '@/components/ClimateGrid';
import { SecurityPanel } from '@/components/SecurityPanel';
import { SceneCarousel } from '@/components/SceneCarousel';
import { AutomationTimeline } from '@/components/AutomationTimeline';
import { AlertsPanel, type AlertItem } from '@/components/AlertsPanel';
import {
  automations,
  climateZones,
  energyHistory,
  initialDevices,
  scenes,
  securityEvents,
  type Device,
  type EnergySnapshot
} from '@/lib/data';

const initialAlerts: AlertItem[] = [
  {
    id: 'alert-1',
    title: 'Consumo elevado en salón',
    description: 'El consumo de las luces del salón superó el umbral eficiente durante 15 min.',
    severity: 'medium',
    timestamp: 'Hace 4 min'
  },
  {
    id: 'alert-2',
    title: 'Movimiento detectado',
    description: 'La cámara de la entrada detectó movimiento inusual a las 20:14.',
    severity: 'high',
    timestamp: 'Hace 8 min'
  }
];

function generateEnergyPoint(prev: EnergySnapshot): EnergySnapshot {
  const nextDate = new Date(prev.timestamp);
  nextDate.setMinutes(nextDate.getMinutes() + 15);
  const base = 8 + Math.random() * 3;
  const solar = Math.max(0, 5 * Math.sin((nextDate.getHours() / 24) * Math.PI) + Math.random());
  const bateria = Math.max(0, 4 * Math.cos((nextDate.getHours() / 24) * Math.PI) + Math.random());
  const consumo = Math.max(1, base - solar * 0.6 - bateria * 0.3 + Math.random() * 1.5);
  return {
    timestamp: nextDate.toISOString(),
    consumo: Number(consumo.toFixed(2)),
    solar: Number(solar.toFixed(2)),
    bateria: Number(bateria.toFixed(2))
  };
}

export default function Home() {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [energyData, setEnergyData] = useState<EnergySnapshot[]>(energyHistory);
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [lastScene, setLastScene] = useState<string | null>(null);

  useEffect(() => {
    const energyInterval = setInterval(() => {
      setEnergyData((prev) => {
        const next = generateEnergyPoint(prev.at(-1) ?? prev[0]);
        return [...prev.slice(1), next];
      });
    }, 7000);

    const deviceInterval = setInterval(() => {
      setDevices((prev) =>
        prev.map((device) => {
          if (!device.online) return device;
          const variation = (Math.random() - 0.5) * 10;
          return {
            ...device,
            powerUsage: Math.max(5, Number((device.powerUsage + variation).toFixed(0)))
          };
        })
      );
    }, 5000);

    return () => {
      clearInterval(energyInterval);
      clearInterval(deviceInterval);
    };
  }, []);

  const totalConsumption = useMemo(
    () => devices.filter((device) => device.online).reduce((acc, device) => acc + device.powerUsage, 0),
    [devices]
  );

  const handleToggleDevice = useCallback((id: string, nextState: boolean) => {
    setDevices((prev) =>
      prev.map((device) => {
        if (device.id !== id) return device;
        return {
          ...device,
          online: nextState,
          powerUsage: nextState ? Math.max(8, Number((device.powerUsage || 12).toFixed(0))) : 0
        };
      })
    );

    setAlerts((prev) => {
      if (nextState) {
        return [
          {
            id: `${id}-alert-${Date.now()}`,
            title: 'Dispositivo activado',
            description: `Se activó ${id.replace('-', ' ')} manualmente.`,
            severity: 'low',
            timestamp: 'Justo ahora'
          },
          ...prev.slice(0, 4)
        ];
      }
      return prev;
    });
  }, []);

  const handleRunScene = useCallback((sceneId: string) => {
    if (!sceneId) return;
    setLastScene(sceneId);
    setAlerts((prev) => [
      {
        id: `scene-${sceneId}-${Date.now()}`,
        title: 'Escena ejecutada',
        description: `Escena "${scenes.find((s) => s.id === sceneId)?.nombre ?? sceneId}" aplicada correctamente.`,
        severity: 'low',
        timestamp: 'Justo ahora'
      },
      ...prev.slice(0, 4)
    ]);
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-8">
      <DashboardHeader />

      <SummaryStats devices={devices} energy={energyData} alerts={alerts.filter((a) => a.severity !== 'low').length} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EnergyChart data={energyData} />
        </div>
        <div className="flex flex-col gap-6">
          <AlertsPanel alerts={alerts.slice(0, 3)} />
          <div className="rounded-3xl bg-slate-900/70 p-6 shadow-xl ring-1 ring-white/10">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Resumen activo</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{(totalConsumption / 1000).toFixed(2)} kW totales</h2>
            <p className="mt-3 text-sm text-slate-300">
              Escena reciente:{' '}
              <span className="text-brand-300">
                {lastScene ? scenes.find((scene) => scene.id === lastScene)?.nombre : 'Ninguna'}
              </span>
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Optimización energética automática activada · Batería doméstica al {Math.round(64 + Math.random() * 10)}%
            </p>
          </div>
        </div>
      </div>

      <DeviceGrid devices={devices} onToggle={handleToggleDevice} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ClimateGrid zones={climateZones} />
        <SecurityPanel events={securityEvents} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SceneCarousel scenes={scenes} onRunScene={handleRunScene} />
        <AutomationTimeline automations={automations} />
      </div>
    </main>
  );
}

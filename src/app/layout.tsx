import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Casa Inteligente · Panel IoT',
  description:
    'Monitoriza tu hogar inteligente con métricas de energía, clima, seguridad y dispositivos conectados en tiempo real.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}

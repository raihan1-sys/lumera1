import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/components/store-provider';
import { SiteShell } from '@/components/site-shell';
export const metadata: Metadata = { title: 'LUMERA — Luxury Marketplace', description: 'A high-end functional e-commerce portfolio experience' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><StoreProvider><SiteShell>{children}</SiteShell></StoreProvider></body></html>}

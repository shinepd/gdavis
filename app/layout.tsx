import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RevealObserver } from '@/components/reveal';
import { ThemeProvider } from '@/components/theme-provider';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-archivo',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'G. Davis & Associates | Architectural Products',
  description:
    "G. Davis & Associates is a manufacturer's representative firm for interior and exterior architectural products, serving design and construction teams across Kansas, Missouri, Iowa, and Nebraska.",
  keywords: [
    'architectural products',
    "manufacturer's representative",
    'G. Davis & Associates',
    'rainscreens',
    'acoustical ceilings',
    'building materials',
  ],
  authors: [{ name: 'G. Davis & Associates' }],
  creator: 'G. Davis & Associates',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5f1' },
    { media: '(prefers-color-scheme: dark)', color: '#1b1e22' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${plexMono.variable} flex min-h-screen flex-col`}
      >
        <ThemeProvider
          attribute={['class', 'data-theme']}
          defaultTheme="system"
          enableSystem
          storageKey="gd-theme"
        >
          <RevealObserver />
          <Header />
          <main className="w-full flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

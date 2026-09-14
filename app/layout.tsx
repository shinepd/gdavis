import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RevealObserver } from '@/components/reveal';
import { ThemeProvider } from '@/components/theme-provider';
import { OrganizationSchema } from '@/components/structured-data';
import { SITE, SITE_URL } from '@/lib/site';

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

const DESCRIPTION =
  "G. Davis & Associates is a manufacturer's representative firm for interior and exterior architectural products, serving design and construction teams across Kansas, Missouri, Iowa, and Nebraska.";

export const metadata: Metadata = {
  // Every relative URL below - canonicals, social images - resolves against
  // this, so a page only has to name its own path.
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'G. Davis & Associates | Architectural Product Reps, Kansas City',
    template: '%s | G. Davis & Associates',
  },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_US',
    url: '/',
    title: 'G. Davis & Associates | Architectural Product Reps, Kansas City',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'G. Davis & Associates | Architectural Product Reps, Kansas City',
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
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
        <OrganizationSchema />
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

import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
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

// Kept under the ~160 characters Google renders. The firm name is already in
// the title, so the description spends its length on what we do and where.
const DESCRIPTION =
  "Manufacturer's representative for interior and exterior architectural products, serving design teams across Kansas, Missouri, Iowa, and Nebraska.";

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
        {/* Cookieless page and referrer counts, no cross-site identifiers, so
            there is nothing here that needs a consent banner. Needs Analytics
            switched on for the project in the Vercel dashboard to record
            anything. */}
        <Analytics />
      </body>
    </html>
  );
}

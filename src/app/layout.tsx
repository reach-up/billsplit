import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "@/context/ThemeContext";
import PwaInstallerWrapper from "@/components/PwaInstallerWrapper";

// We'll use a client component wrapper instead of dynamic import in the layout
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BillSplit - Scan. Tap. Split.",
  description:
    "Snap the receipt, tap your items, see who owes what. No sign-ups, no math, no drama.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BillSplit"
  },
  // OpenGraph/social media metadata
  openGraph: {
    title: "BillSplit - Scan. Tap. Split.",
    description: "Snap the receipt, tap your items, see who owes what. No sign-ups, no math, no drama.",
    url: "https://usebillsplit.com",
    siteName: "BillSplit",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "BillSplit App"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: "BillSplit - Scan. Tap. Split.",
    description: "Snap the receipt, tap your items, see who owes what. No sign-ups, no math, no drama.",
    images: ["/og.png"],
  },
};

export const viewport = {
  themeColor: "#6D28D9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="usebillsplit.com" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BillSplit" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script src="/sw-register.js" defer></script>
      </head>
      <body className={`${instrumentSans.variable} antialiased`}>
        <NuqsAdapter>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen items-center bg-[#f4eeec] dark:bg-neutral-900 w-full mx-auto relative overflow-hidden transition-colors duration-300">
              <Header />
              {children}
              <Footer />
              {/* PWA installer component will be loaded only on the client */}
              <div id="pwa-installer-container">
                {/* Import moved to a separate client component */}
                {process.env.NODE_ENV === 'production' && (
                  <PwaInstallerWrapper />
                )}
              </div>
            </div>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}

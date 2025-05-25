import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "@/context/ThemeContext";
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BillSplit - Scan. Tap. Split.",
  description:
    "Snap the receipt, tap your items, see who owes what. No sign-ups, no math, no drama.",
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
      </head>
      <body className={`${instrumentSans.variable} antialiased`}>
        <NuqsAdapter>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen items-center bg-[#f4eeec] dark:bg-neutral-900 w-full mx-auto relative overflow-hidden transition-colors duration-300">
              <Header />
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}

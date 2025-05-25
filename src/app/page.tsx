import { Metadata } from "next";
import HomeContent from "../components/HomeContent";

export const metadata: Metadata = {
  title: "BillSplit - Split your bill easily with AI",
  description:
    "Scan. Tap. Split. Snap the receipt, tap your items, see who owes what. No sign-ups, no math, no drama.",
  openGraph: {
    images: "https://usebillsplit.com/og.png",
  },
};

export default function Home() {
  return <HomeContent />;
}

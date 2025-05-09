import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BillSplit",
  description:
    "Scan. Tap. Split. Snap the receipt, tap your items, see who owes what. No sign-ups, no math, no drama.",
};

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center flex-grow w-full px-4 text-center gap-4 max-w-[300px] md:max-w-[388px] ">
        <div className="flex flex-col items-center justify-center">
          <img
            src="/logo.svg"
            alt="Main Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 mb-8"
          />

          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-medium text-[#1e2939] mb-2">
              Scan. Tap. Split.
            </h1>
            <p className="text-sm sm:text-base text-[#4a5565] max-w-xs sm:max-w-sm">
              Snap the receipt, tap your items, see who owes what. No sign-ups,
              no math, no drama.
            </p>
          </div>
        </div>

        <div className="w-full max-w-xs sm:max-w-sm space-y-3">
          <Link
            href="/app?mode=camera"
            className="w-full flex justify-center items-center gap-2 px-3.5 py-3 rounded-lg bg-[#d04f17] text-white"
          >
            <img src="/camera.svg" className="w-4 h-4" />
            <p className="text-base font-semibold">Scan Receipt</p>
          </Link>
          <Link
            href="/app?mode=manual"
            className="w-full flex justify-center items-center gap-1.5 p-3 rounded-lg bg-[#fff9f6] border-[0.7px] border-[#d1d5dc]"
          >
            <p className="text-base font-medium text-[#364153]">
              Enter Manually
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}

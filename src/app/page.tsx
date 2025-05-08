import { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
          <button className="w-full flex justify-center items-center gap-2 px-3.5 py-3 rounded-lg bg-[#d04f17] text-white">
            <svg
              width={17}
              height={16}
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              preserveAspectRatio="xMidYMid meet"
            >
              <g clipPath="url(#clip0_46_712)">
                <path
                  d="M14.587 3.82606H12.9174L11.9957 2.43476C11.6478 1.91302 11.0391 1.59998 10.413 1.59998H6.58696C5.96087 1.59998 5.35217 1.91302 5.00435 2.43476L4.08261 3.82606H2.41304C1.35217 3.82606 0.5 4.67824 0.5 5.73911V12.4869C0.5 13.5478 1.35217 14.4 2.41304 14.4H14.587C15.6478 14.4 16.5 13.5478 16.5 12.4869V5.73911C16.5 4.67824 15.6478 3.82606 14.587 3.82606ZM8.5 12.8348C6.11739 12.8348 4.18696 10.9043 4.18696 8.52171C4.18696 6.13911 6.11739 4.22606 8.5 4.22606C10.8826 4.22606 12.813 6.1565 12.813 8.53911C12.813 10.9043 10.8826 12.8348 8.5 12.8348ZM14.3435 6.52171C14.3261 6.52171 14.3087 6.52171 14.2739 6.52171H13.5783C13.2652 6.50432 13.0217 6.24345 13.0391 5.93041C13.0565 5.63476 13.2826 5.40867 13.5783 5.39128H14.2739C14.587 5.37389 14.8478 5.61737 14.8652 5.93041C14.8826 6.24345 14.6565 6.50432 14.3435 6.52171Z"
                  fill="white"
                />
                <path
                  d="M8.50001 6.13916C7.17827 6.13916 6.10001 7.21742 6.10001 8.53916C6.10001 9.8609 7.17827 10.9218 8.50001 10.9218C9.82175 10.9218 10.9 9.84351 10.9 8.52177C10.9 7.20003 9.82175 6.13916 8.50001 6.13916Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_46_712">
                  <rect
                    width={16}
                    height={16}
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <p className="text-base font-semibold">Scan Receipt</p>
          </button>
          <button className="w-full flex justify-center items-center gap-1.5 p-3 rounded-lg bg-[#fff9f6] border-[0.7px] border-[#d1d5dc]">
            <p className="text-base font-medium text-[#364153]">
              Enter Manually
            </p>
          </button>
        </div>
      </main>
    </>
  );
}

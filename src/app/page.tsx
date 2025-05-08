import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BillSplit",
  description:
    "Scan. Tap. Split. Snap the receipt, tap your items, see who owes what. No sign-ups, no math, no drama.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-[#f4eeec] w-full mx-auto relative overflow-hidden rounded">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-3 px-2 border-b border-[#d1d5dc] mb-8">
        <div className="flex flex-row gap-1">
          <img src="/logo.svg" alt="Logo" className="h-6 w-6 sm:h-8 sm:w-8" />
          <p className="hidden sm:block text-xl font-bold text-left">
            <span className="text-xl font-bold text-left text-[#1e2939]">
              Bill
            </span>
            <span className="text-xl font-bold text-left text-[#6a2000]">
              Split
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* <button className="flex justify-center items-center gap-1 px-3 py-2 rounded bg-[#fff9f6] border-[0.7px] border-[#d1d5dc]">
            <img
              className="w-3.5 h-3.5 rounded-[3px]"
              src="/together.svg"
              alt="API Key Logo"
            />
            <p className="text-xs sm:text-sm font-medium text-[#364153]">
              API Key
            </p>
          </button> */}
          <a
            href="https://github.com/nutlope/billsplit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-end items-center gap-1.5 p-2 rounded bg-[#d04f17]"
          >
            <img
              src="/github.svg"
              alt="GitHub Logo"
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
            />

            <p className="hidden sm:block text-xs sm:text-sm font-medium text-white">
              Star on GitHub
            </p>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
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

      {/* Footer */}
      <footer className="w-full flex flex-col sm:flex-row justify-center items-center py-4 mt-auto">
        <p className="text-xs font-medium text-center mb-2 sm:mb-0 sm:mr-2">
          <span className="text-[#99a1af]">Powered by </span>
          <a
            href="https://togetherai.link/"
            target="_blank"
            className="text-[#4a5565]"
          >
            Together.ai
          </a>
        </p>
        <div className="flex gap-2">
          <a
            href="https://github.com/nutlope/billsplit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-10 h-10 sm:w-11 sm:h-11 p-1 rounded bg-white border-[0.3px] border-[#D1D5DC]"
          >
            <svg
              width={12} // Adjusted size for better fit
              height={12} // Adjusted size for better fit
              viewBox="0 0 18 18" // Original viewBox maintained for path data
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <g clipPath="url(#clip_footer_github)">
                <path
                  d="M9 0C4.0275 0 0 4.13211 0 9.22838C0 13.3065 2.5785 16.7648 6.15375 17.9841C6.60375 18.0709 6.76875 17.7853 6.76875 17.5403C6.76875 17.3212 6.76125 16.7405 6.7575 15.9712C4.254 16.5277 3.726 14.7332 3.726 14.7332C3.3165 13.6681 2.72475 13.3832 2.72475 13.3832C1.9095 12.8111 2.78775 12.8229 2.78775 12.8229C3.6915 12.887 4.16625 13.7737 4.16625 13.7737C4.96875 15.1847 6.273 14.777 6.7875 14.5414C6.8685 13.9443 7.10025 13.5381 7.3575 13.3073C5.35875 13.0764 3.258 12.2829 3.258 8.74709C3.258 7.73988 3.60675 6.91659 4.18425 6.27095C4.083 6.03774 3.77925 5.0994 4.263 3.82846C4.263 3.82846 5.01675 3.58116 6.738 4.77462C7.458 4.56958 8.223 4.46785 8.988 4.46315C9.753 4.46785 10.518 4.56958 11.238 4.77462C12.948 3.58116 13.7017 3.82846 13.7017 3.82846C14.1855 5.0994 13.8818 6.03774 13.7917 6.27095C14.3655 6.91659 14.7142 7.73988 14.7142 8.74709C14.7142 12.2923 12.6105 13.0725 10.608 13.2995C10.923 13.5765 11.2155 14.1423 11.2155 15.0071C11.2155 16.242 11.2043 17.2344 11.2043 17.5341C11.2043 17.7759 11.3617 18.0647 11.823 17.9723C15.4237 16.7609 18 13.3002 18 9.22838C18 4.13211 13.9703 0 9 0Z"
                  fill="#62748E"
                />
              </g>
              <defs>
                <clipPath id="clip_footer_github">
                  <rect width={18} height={18} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a
            href="https://x.com/nutlope"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-10 h-10 sm:w-11 sm:h-11 p-1 rounded bg-white border-[0.3px] border-[#D1D5DC]"
          >
            <svg
              width={12} // Adjusted size for better fit
              height={12} // Adjusted size for better fit
              viewBox="0 0 21 21" // Original viewBox maintained for path data
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M10.7979 5.34375L13.9202 1.71429H13.1803L10.4692 4.86566L8.30391 1.71429H5.8064L9.08081 6.47973L5.8064 10.2857H6.54639L9.40931 6.95783L11.6961 10.2857H14.1935L10.7979 5.34375ZM9.78452 6.52173L9.45272 6.04724L6.81303 2.2713L9.14288 6L11.7143 9.85716L13.1807 9.75404H12.0442L9.78452 6.52173Z"
                fill="#62748E"
                transform="translate(2.5 4.5)" // Adjust transform to center the X logo if needed
              />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

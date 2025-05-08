import Image from "next/image";

export default function Home() {
  return (
    <div className="w-[390px] h-[800px] relative overflow-hidden rounded bg-[#f4eeec]">
      <div className="w-[1440px] h-[800px] absolute left-[-1px] top-[-1px] opacity-10 bg-[url('bg.png')] bg-[length:157.5px_auto] bg-repeat" />
      <div className="w-[390px] h-[62px] absolute left-0 top-0 overflow-hidden bg-[#f1ebe9] border-t-0 border-r-0 border-b border-l-0 border-[#d1d5dc]">
        <img src="/logo.svg" className="size-[24px]" />
        <div className="flex justify-start items-center absolute left-[237px] top-[15px] gap-2">
          <div className="flex justify-center items-center  relative overflow-hidden gap-1 px-3 py-[7px] rounded bg-[#fff9f6] border-[0.7px] border-[#d1d5dc]">
            <img className=" w-3.5 h-3.5 rounded-[3px]" src="logo.png" />
            <p className=" text-sm font-medium text-right text-[#364153]">
              API Key
            </p>
          </div>
          <div className="flex justify-end items-center  relative overflow-hidden gap-1.5 p-[7px] rounded bg-[#d04f17]">
            <svg
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" w-[18px] h-[18px] relative"
              preserveAspectRatio="xMidYMid meet"
            >
              <g clip-path="url(#clip0_46_701)">
                <path
                  d="M9 0C4.0275 0 0 4.13211 0 9.22838C0 13.3065 2.5785 16.7648 6.15375 17.9841C6.60375 18.0709 6.76875 17.7853 6.76875 17.5403C6.76875 17.3212 6.76125 16.7405 6.7575 15.9712C4.254 16.5277 3.726 14.7332 3.726 14.7332C3.3165 13.6681 2.72475 13.3832 2.72475 13.3832C1.9095 12.8111 2.78775 12.8229 2.78775 12.8229C3.6915 12.887 4.16625 13.7737 4.16625 13.7737C4.96875 15.1847 6.273 14.777 6.7875 14.5414C6.8685 13.9443 7.10025 13.5381 7.3575 13.3073C5.35875 13.0764 3.258 12.2829 3.258 8.74709C3.258 7.73988 3.60675 6.91659 4.18425 6.27095C4.083 6.03774 3.77925 5.0994 4.263 3.82846C4.263 3.82846 5.01675 3.58116 6.738 4.77462C7.458 4.56958 8.223 4.46785 8.988 4.46315C9.753 4.46785 10.518 4.56958 11.238 4.77462C12.948 3.58116 13.7017 3.82846 13.7017 3.82846C14.1855 5.0994 13.8818 6.03774 13.7917 6.27095C14.3655 6.91659 14.7142 7.73988 14.7142 8.74709C14.7142 12.2923 12.6105 13.0725 10.608 13.2995C10.923 13.5765 11.2155 14.1423 11.2155 15.0071C11.2155 16.242 11.2043 17.2344 11.2043 17.5341C11.2043 17.7759 11.3617 18.0647 11.823 17.9723C15.4237 16.7609 18 13.3002 18 9.22838C18 4.13211 13.9703 0 9 0Z"
                  fill="white"
                />
              </g>
              <defs>
                <clippath id="clip0_46_701">
                  <rect width={18} height={18} fill="white" />
                </clippath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <img
        src="/logo.svg"
        className="size-[64px] absolute left-[163px] top-[221px]"
      />
      <div className="flex justify-center items-center w-[350px] absolute left-5 top-[664px] overflow-hidden gap-2 px-3.5 py-3 rounded-lg bg-[#d04f17]">
        <svg
          width={17}
          height={16}
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" w-4 h-4 relative"
          preserveAspectRatio="xMidYMid meet"
        >
          <g clip-path="url(#clip0_46_712)">
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
            <clippath id="clip0_46_712">
              <rect
                width={16}
                height={16}
                fill="white"
                transform="translate(0.5)"
              />
            </clippath>
          </defs>
        </svg>
        <p className=" text-base font-semibold text-center text-white">
          Scan Receipt
        </p>
      </div>
      <div className="w-[193px] h-5">
        <p className="absolute left-[100px] top-[775px] text-xs font-medium text-center">
          <span className="text-xs font-medium text-center text-[#99a1af]">
            Powered by{" "}
          </span>
          <span className="text-xs font-medium text-center text-[#4a5565]">
            Together.ai
          </span>
        </p>
        <svg
          width={46}
          height={22}
          viewBox="0 0 46 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-11 h-5"
          preserveAspectRatio="none"
        >
          <rect
            x="24.85"
            y="0.85"
            width="20.3"
            height="20.3"
            rx="4.15"
            fill="white"
          />
          <rect
            x="24.85"
            y="0.85"
            width="20.3"
            height="20.3"
            rx="4.15"
            stroke="#D1D5DC"
            stroke-width="0.3"
          />
          <path
            d="M35.7979 10.3437L38.9202 6.71429H38.1803L35.4692 9.86566L33.3039 6.71429H30.8064L34.0808 11.4797L30.8064 15.2857H31.5464L34.4093 11.9578L36.6961 15.2857H39.1935L35.7979 10.3437ZM34.7845 11.5217L34.4527 11.0472L31.813 7.2713L34.1429 11L36.7143 14.8572L38.1807 14.754H37.0442L34.7845 11.5217Z"
            fill="#62748E"
          />
          <rect
            x="0.85"
            y="0.85"
            width="20.3"
            height="20.3"
            rx="4.15"
            fill="white"
          />
          <rect
            x="0.85"
            y="0.85"
            width="20.3"
            height="20.3"
            rx="4.15"
            stroke="#D1D5DC"
            stroke-width="0.3"
          />
          <g clip-path="url(#clip0_46_722)">
            <path
              d="M11.0001 5.67596C7.93066 5.67596 5.44455 8.12041 5.44455 11.1352C5.44455 13.5477 7.03622 15.5936 9.24316 16.3149C9.52094 16.3662 9.62279 16.1973 9.62279 16.0524C9.62279 15.9227 9.61816 15.5792 9.61585 15.1241C8.07048 15.4533 7.74455 14.3917 7.74455 14.3917C7.49177 13.7616 7.12649 13.5931 7.12649 13.5931C6.62325 13.2547 7.16538 13.2616 7.16538 13.2616C7.72325 13.2996 8.01631 13.8241 8.01631 13.8241C8.51168 14.6588 9.31677 14.4176 9.63436 14.2783C9.68436 13.925 9.82742 13.6848 9.98622 13.5482C8.75242 13.4116 7.45566 12.9422 7.45566 10.8505C7.45566 10.2547 7.67094 9.76763 8.02742 9.38569C7.96492 9.24772 7.77742 8.69263 8.07603 7.94078C8.07603 7.94078 8.54131 7.79448 9.60381 8.5005C10.0483 8.3792 10.5205 8.31902 10.9927 8.31624C11.4649 8.31902 11.9371 8.3792 12.3816 8.5005C13.4371 7.79448 13.9024 7.94078 13.9024 7.94078C14.201 8.69263 14.0135 9.24772 13.958 9.38569C14.3121 9.76763 14.5274 10.2547 14.5274 10.8505C14.5274 12.9477 13.2288 13.4093 11.9927 13.5436C12.1871 13.7074 12.3677 14.0422 12.3677 14.5537C12.3677 15.2843 12.3608 15.8713 12.3608 16.0486C12.3608 16.1917 12.458 16.3625 12.7427 16.3079C14.9654 15.5912 16.5557 13.544 16.5557 11.1352C16.5557 8.12041 14.0682 5.67596 11.0001 5.67596Z"
              fill="#62748E"
            />
          </g>
          <defs>
            <clippath id="clip0_46_722">
              <rect
                width="11.1111"
                height="11.1111"
                fill="white"
                transform="translate(5.44455 5.44446)"
              />
            </clippath>
          </defs>
        </svg>
      </div>
      <div className="w-[294px] h-28">
        <p className="absolute left-[50px] top-[318px] text-[40px] font-medium text-center text-[#1e2939]">
          Scan. Tap. Split.
        </p>
        <p className="w-[294px] absolute left-12 top-[364px] text-base text-center text-[#4a5565]">
          Snap the receipt, tap your items, see who owes what. No sign-ups, no
          math, no drama.
        </p>
      </div>
      <div className="flex justify-center items-center w-[350px] absolute left-5 top-[718px] overflow-hidden gap-1.5 p-3 rounded-lg bg-[#fff9f6] border-[0.7px] border-[#d1d5dc]">
        <p className=" text-base font-medium text-center text-[#364153]">
          Enter Manually
        </p>
      </div>
    </div>
  );
}

"use client";

import SubPageHeader from "@/components/SubPageHeader";
import { useSearchParams } from "next/navigation";

export default function AppPage() {
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode");

  const isManual = mode === "manual";

  if (isManual) {
    return (
      <>
        <SubPageHeader
          title="Manual Entry"
          description="Take a photo or upload an image of your receipt"
          backLink="/"
        />

        <div className="w-full space-y-6">
          <div>
            <label
              htmlFor="restaurant-name"
              className="block text-sm font-medium text-left text-[#4a5565] mb-1"
            >
              Restaurant Name (optional):
            </label>
            <input
              type="text"
              id="restaurant-name"
              placeholder="e.g. Olive Garden"
              className="w-full px-3 py-2.5 rounded-lg border border-[#d1d5dc] bg-white focus:outline-none focus:ring-2 focus:ring-[#d04f17] focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-left text-[#4a5565] mb-1"
            >
              Date (optional):
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="date"
                placeholder="mm/dd/yyyy"
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-[#d1d5dc] bg-[#FFF9F6] focus:outline-none focus:ring-2 focus:ring-[#d04f17] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SubPageHeader
        title="Scan Receipt"
        description="Take a photo or upload  an image of your receipt"
        backLink="/"
      />
      <div
        className="flex flex-col justify-start items-start w-[350px] h-[479px] relative overflow-hidden gap-2.5 p-4 rounded-2xl bg-[#faf7f5] border border-gray-200"
        style={{ boxShadow: "0px 1px 6px -4px rgba(0,0,0,0.2)" }}
      >
        <div className="h-[447px] relative overflow-hidden rounded-xl bg-[#f6f0ed] border border-[#d1d5dc] border-dashed">
          <p className="absolute left-[111.31px] top-[265px] text-base font-medium text-center text-[#364153]">
            Take a photo{" "}
          </p>
          <p className="absolute left-[111.31px] top-[289px] text-xs text-center text-[#4a5565]">
            or upload receipt
          </p>
          <img className="w-[131px] h-[72px]" src="/camera.png" />
        </div>
      </div>
    </>
  );
}

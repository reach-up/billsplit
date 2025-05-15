import SubPageHeader from "@/components/SubPageHeader";
import { Button } from "@/components/ui/button";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { BillForm } from "./types";
import Link from "next/link";

export const SplitSummary = ({
  goBack,
  formObject,
}: {
  goBack: () => void;
  formObject: UseFormReturn<BillForm>;
}) => {
  const { fields } = useFieldArray({
    control: formObject.control,
    name: "people",
  });

  return (
    <>
      <SubPageHeader
        title="Split Summary"
        description="Here is how you should split this bill:"
        onBack={() => goBack()}
      />
      <div className="flex flex-col gap-3 w-full">
        {fields.map((field) => (
          <div
            className="h-[47px] relative rounded-lg bg-white border border-gray-200 w-full flex flex-row justify-between items-center p-4"
            key={field.id}
          >
            <p className="text-base font-medium text-left text-[#1e2939]">
              {field.name}
            </p>
            <p className="font-medium text-right">
              <span className="text-base font-medium text-right text-[#6a7282]">
                $
              </span>
              <span className="text-base font-medium text-right text-[#1e2939]">
                {" "}
              </span>
              <span className="text-xl font-medium text-right text-[#1e2939]">
                14.99
              </span>
            </p>
          </div>
        ))}
      </div>
      <Button className="w-full mt-6" onClick={() => {}}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 11.5V13.75C10.5 14.164 10.164 14.5 9.75 14.5H3.25C3.05109 14.5 2.86032 14.421 2.71967 14.2803C2.57902 14.1397 2.5 13.9489 2.5 13.75V5.25C2.5 4.836 2.836 4.5 3.25 4.5H4.5C4.83505 4.49977 5.16954 4.52742 5.5 4.58267M10.5 11.5H12.75C13.164 11.5 13.5 11.164 13.5 10.75V7.5C13.5 4.52667 11.338 2.05933 8.5 1.58267C8.16954 1.52742 7.83505 1.49977 7.5 1.5H6.25C5.836 1.5 5.5 1.836 5.5 2.25V4.58267M10.5 11.5H6.25C6.05109 11.5 5.86032 11.421 5.71967 11.2803C5.57902 11.1397 5.5 10.9489 5.5 10.75V4.58267M13.5 9V7.75C13.5 7.15326 13.2629 6.58097 12.841 6.15901C12.419 5.73705 11.8467 5.5 11.25 5.5H10.25C10.0511 5.5 9.86032 5.42098 9.71967 5.28033C9.57902 5.13968 9.5 4.94891 9.5 4.75V3.75C9.5 3.45453 9.4418 3.16195 9.32873 2.88896C9.21566 2.61598 9.04992 2.36794 8.84099 2.15901C8.63206 1.95008 8.38402 1.78435 8.11104 1.67127C7.83806 1.5582 7.54547 1.5 7.25 1.5H6.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>Share</span>
      </Button>
      <Link href="/" className="w-full">
        <Button className="w-full" variant="secondary">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 7.99999L7.96933 2.02999C8.26267 1.73732 8.73733 1.73732 9.03 2.02999L15 7.99999M3.5 6.49999V13.25C3.5 13.664 3.836 14 4.25 14H7V10.75C7 10.336 7.336 9.99999 7.75 9.99999H9.25C9.664 9.99999 10 10.336 10 10.75V14H12.75C13.164 14 13.5 13.664 13.5 13.25V6.49999M6 14H11.5"
              stroke="#4A5565"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>Back Home</span>
        </Button>
      </Link>
    </>
  );
};

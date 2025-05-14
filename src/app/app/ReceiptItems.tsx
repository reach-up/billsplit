import SubPageHeader from "@/components/SubPageHeader";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { BillForm } from "./page";

export const ReceiptItems = ({
  goBack,
  goForward,
  formObject,
}: {
  goBack: () => void;
  goForward: () => void;
  formObject: UseFormReturn<BillForm>;
}) => {
  const items = formObject.watch("billItems");
  return (
    <>
      <SubPageHeader
        title="Receipt Items"
        description="List all the items on your receipt"
        onBack={() => goBack()}
      />
      <div className="flex flex-col gap-3">
        <div className="flex justify-start items-center w-[350px] relative gap-2">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[182px] relative overflow-hidden gap-1.5 p-3 rounded-lg bg-white border-[0.7px] border-[#d1d5dc]">
            <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-center text-[#1e2939]">
              Pasta Carbonara
            </p>
          </div>
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[110px] relative overflow-hidden gap-1.5 p-3 rounded-lg bg-white border-[0.7px] border-[#d1d5dc]">
            <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-center text-[#1e2939]">
              $ 16.99
            </p>
          </div>
          <svg
            width={42}
            height={42}
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-[42px] h-[42px] relative"
            preserveAspectRatio="none"
          >
            <path
              d="M27.3477 14.1641H23.6855L23.3987 13.5934C23.2747 13.3445 23.0205 13.1873 22.7425 13.1875H19.2544C18.9769 13.1864 18.7232 13.3441 18.6013 13.5934L18.3145 14.1641H14.6523C14.3827 14.1641 14.1641 14.3827 14.1641 14.6523V15.6289C14.1641 15.8986 14.3827 16.1172 14.6523 16.1172H27.3477C27.6173 16.1172 27.8359 15.8986 27.8359 15.6289V14.6523C27.8359 14.3827 27.6173 14.1641 27.3477 14.1641Z"
              fill="#875641"
            />
            <path
              d="M15.7876 27.4392C15.8359 28.2111 16.476 28.8124 17.2494 28.8125H24.7506C25.524 28.8124 26.1641 28.2111 26.2124 27.4392L26.8594 17.0938H15.1406L15.7876 27.4392Z"
              fill="#875641"
            />
          </svg>
        </div>
        <div className="flex justify-start items-center w-[300px] relative overflow-hidden gap-1.5 p-3 rounded-lg bg-[#f4eeec] border border-[#d1d5dc]">
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-4 h-4 relative"
            preserveAspectRatio="none"
          >
            <path
              d="M8 3V13M13 8H3"
              stroke="#1D293D"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-center text-[#1d293d]">
            Add Item
          </p>
        </div>
        ;
      </div>
      <Button className="w-full" onClick={goForward}>
        <span>Continue</span>
      </Button>
    </>
  );
};

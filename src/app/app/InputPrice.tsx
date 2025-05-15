import { InputHTMLAttributes } from "react";

type InputPriceProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const InputPrice = ({ className = "", ...props }: InputPriceProps) => {
  return (
    <div
      className={`flex justify-start items-center flex-grow-0 flex-shrink-0 w-[100px] relative overflow-hidden gap-1.5 p-3 rounded-lg bg-white border-[0.7px] border-[#d1d5dc] ${className}`}
    >
      <span className="text-base font-medium text-[#1e2939]">$</span>
      <input
        type="number"
        step="0.01"
        min="0"
        inputMode="decimal"
        pattern="[0-9]*[.]*[0-9]*"
        className="w-full text-base font-medium text-[#1e2939] bg-transparent border-none focus:outline-none"
        placeholder="0.00"
        {...props}
      />
    </div>
  );
};

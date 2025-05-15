import { InputHTMLAttributes } from "react";

type InputTextProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const InputText = ({ className = "", ...props }: InputTextProps) => {
  return (
    <div
      className={`flex justify-start items-center flex-grow-0 flex-shrink-0 w-[182px] relative overflow-hidden gap-1.5 p-3 rounded-lg bg-white border-[0.7px] border-[#d1d5dc] ${className}`}
    >
      <input
        type="text"
        className="w-full text-base font-medium text-[#1e2939] bg-transparent border-none focus:outline-none"
        placeholder="Item name"
        {...props}
      />
    </div>
  );
};

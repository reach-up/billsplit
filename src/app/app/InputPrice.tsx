import { InputHTMLAttributes } from "react";

type InputPriceProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const InputPrice = ({
  className = "",
  onChange,
  ...props
}: InputPriceProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "+") {
      e.preventDefault();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(".")) {
      const [, decimal] = value.split(".");
      if (decimal?.length > 2) {
        e.target.value = Number(value).toFixed(2);
      }
    }
    onChange?.(e);
  };

  return (
    <div
      className={`flex justify-start items-center flex-grow-0  w-[100px] relative overflow-hidden gap-1.5 p-3 rounded-lg bg-white border-[0.7px] border-[#d1d5dc] ${className}`}
    >
      <span className="text-base font-medium text-[#1e2939]">$</span>
      <input
        type="number"
        step="0.01"
        min="0"
        inputMode="decimal"
        pattern="[0-9]*[.]*[0-9]*"
        className="w-full text-base font-medium text-[#1e2939] bg-transparent border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder="0.00"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
};

import { InputHTMLAttributes, useState, useEffect } from "react";
import Decimal from "decimal.js";

type InputPriceProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  className?: string;
  value?: Decimal;
  onChange?: (value: Decimal) => void;
};

export const InputPrice = ({
  className = "",
  value,
  onChange,
  ...props
}: InputPriceProps) => {
  const [inputValue, setInputValue] = useState(value?.toString() || "");

  useEffect(() => {
    setInputValue(value?.toString() || "");
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "+" || e.key === ",") {
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/,/g, ".");

    // Limit to 2 decimal places
    const decimalParts = newValue.split(".");
    if (decimalParts.length > 1 && decimalParts[1].length > 2) {
      newValue = `${decimalParts[0]}.${decimalParts[1].substring(0, 2)}`;
    }

    setInputValue(newValue);

    if (newValue === "") {
      onChange?.(new Decimal(0));
      return;
    }

    try {
      const decimalValue = new Decimal(newValue);
      onChange?.(decimalValue);
    } catch (error) {
      console.error("Invalid decimal value:", error);
    }
  };

  const handleBlur = () => {
    if (inputValue === "") {
      onChange?.(new Decimal(0));
      return;
    }

    try {
      const normalizedValue = inputValue.replace(/,/g, ".");
      const decimalValue = new Decimal(normalizedValue);
      onChange?.(decimalValue);
      setInputValue(decimalValue.toString());
    } catch (error) {
      console.error("Invalid decimal value:", error);
      setInputValue(value?.toString() || "");
    }
  };

  return (
    <div
      className={`flex justify-start items-center flex-grow-0  w-[100px] relative overflow-hidden gap-1.5 p-3 rounded-lg bg-white border-[0.7px] border-[#d1d5dc] ${className}`}
    >
      <span className="text-base font-medium text-[#1e2939]">$</span>
      <input
        type="string"
        step="0.01"
        min="0"
        inputMode="decimal"
        pattern="[0-9]*[.]*[0-9]*"
        className="w-full text-base font-medium text-[#1e2939] bg-transparent border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder="0.00"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
};

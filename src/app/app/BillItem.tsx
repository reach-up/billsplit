import { UseFormReturn } from "react-hook-form";
import { BillForm } from "./page";
import { InputPrice } from "./InputPrice";

export const BillItem = ({
  index,
  formObject,
  onDelete,
}: {
  index: number;
  formObject: UseFormReturn<BillForm>;
  onDelete: (index: number) => void;
}) => {
  const { register } = formObject;

  return (
    <div className="flex justify-start items-center w-[350px] relative gap-2">
      <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[182px] relative overflow-hidden gap-1.5 p-3 rounded-lg bg-white border-[0.7px] border-[#d1d5dc]">
        <input
          type="text"
          className="w-full text-base font-medium text-[#1e2939] bg-transparent border-none focus:outline-none"
          placeholder="Item name"
          {...register(`billItems.${index}.name` as const)}
        />
      </div>
      <InputPrice
        {...register(`billItems.${index}.price` as const, {
          valueAsNumber: true,
        })}
      />
      <button
        onClick={() => onDelete(index)}
        className="flex-shrink-0 hover:opacity-80 cursor-pointer"
      >
        <img src="/trash.svg" className="size-[42px]" />
      </button>
    </div>
  );
};

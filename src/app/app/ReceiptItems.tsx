import SubPageHeader from "@/components/SubPageHeader";
import { Button } from "@/components/ui/button";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { BillForm } from "./page";
import { BillItem } from "./BillItem";
import { InputPrice } from "./InputPrice";

export const ReceiptItems = ({
  goBack,
  goForward,
  formObject,
}: {
  goBack: () => void;
  goForward: () => void;
  formObject: UseFormReturn<BillForm>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: formObject.control,
    name: "billItems",
  });

  const handleAddItem = () => {
    append({ name: "", price: 0 });
  };

  return (
    <>
      <SubPageHeader
        title="Receipt Items"
        description="List all the items on your receipt"
        onBack={() => goBack()}
      />
      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <BillItem
            key={field.id}
            index={index}
            formObject={formObject}
            onDelete={remove}
          />
        ))}
        <button
          onClick={handleAddItem}
          className="flex justify-start items-center w-full relative overflow-hidden gap-1.5 p-3 rounded-lg bg-[#f4eeec] border border-[#d1d5dc] hover:bg-[#ebe2df] transition-colors cursor-pointer max-w-[291px]"
        >
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
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-center text-[#1d293d]">
            Add Item
          </p>
        </button>
        <div className="h-[1px] bg-[#D1D5DC] -mx-[100vw] mt-5" />
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-left text-[#1e2939]">Tip:</p>
            <InputPrice
              {...formObject.register("tip")}
              className="w-full"
              placeholder="0.00"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-left text-[#1e2939]">Tax:</p>
            <InputPrice
              {...formObject.register("tax")}
              className="w-full"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>
      <Button className="w-full mt-6" onClick={goForward}>
        <span>Continue</span>
      </Button>
    </>
  );
};

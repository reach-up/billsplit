import SubPageHeader from "@/components/SubPageHeader";
import { Button } from "@/components/ui/button";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { BillForm } from "./types";
import { InputPrice } from "./InputPrice";
import { useMemo } from "react";
import { InputText } from "./InputText";

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

  const total = useMemo(() => {
    let total = 0;
    // sum all bill items + tip + tax
    formObject.watch("billItems").forEach((item) => {
      total += item.price;
    });
    total += Number(formObject.watch("tip") || 0);
    total += Number(formObject.watch("tax") || 0);
    return total;
  }, [
    formObject.watch("billItems"),
    formObject.watch("tip"),
    formObject.watch("tax"),
  ]);

  const isDisabled = useMemo(() => {
    const products = formObject.watch("billItems") || [];
    return (
      products.length === 0 ||
      products.some((field) => field.name === "") ||
      total === 0
    );
  }, [formObject.watch("billItems"), total]);

  return (
    <>
      <SubPageHeader
        title="Receipt Items"
        description="List all the items on your receipt"
        onBack={() => goBack()}
      />
      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div
            className="flex justify-start items-center relative gap-2"
            key={field.id}
          >
            <InputText
              placeholder="Item name"
              {...formObject.register(`billItems.${index}.name`)}
            />
            <InputPrice
              {...formObject.register(`billItems.${index}.price` as const, {
                valueAsNumber: true,
              })}
            />
            <button
              onClick={() => remove(index)}
              className=" hover:opacity-80 cursor-pointer"
            >
              <img src="/trash.svg" className="size-[42px]" />
            </button>
          </div>
        ))}
        <button
          onClick={handleAddItem}
          className="flex justify-start items-center w-full relative overflow-hidden gap-1.5 p-3 rounded-lg bg-[#f4eeec] border border-[#d1d5dc] hover:bg-[#ebe2df] transition-colors cursor-pointer"
        >
          <img src="/add.svg" className="size-4" />
          <p className="flex-grow-0  text-base font-medium text-center text-[#1d293d]">
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
        <div className="flex flex-row gap-2 items-center justify-end">
          <p className="text-sm text-right text-[#1e2939]">
            Total: <span className="font-medium text-[#6a7282]">$ </span>
          </p>
          <p className="font-medium text-right">
            <span className="text-2xl font-medium text-right text-[#1e2939]">
              {total.toFixed(2)}
            </span>
          </p>
        </div>
      </div>
      <Button className="w-full mt-6" onClick={goForward} disabled={isDisabled}>
        <span>Continue</span>
      </Button>
    </>
  );
};

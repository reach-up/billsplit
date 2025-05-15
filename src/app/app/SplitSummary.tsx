import SubPageHeader from "@/components/SubPageHeader";
import { Button } from "@/components/ui/button";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { BillForm } from "./types";

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
        <span>Share</span>
      </Button>
    </>
  );
};

import SubPageHeader from "@/components/SubPageHeader";
import { Button } from "@/components/ui/button";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { BillForm } from "./types";
import { InputText } from "./InputText";
import { useMemo } from "react";

export const PeopleAndSplit = ({
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
    name: "people",
  });

  const handleAddPerson = () => {
    append({ name: "" });
  };

  const isDisabled = useMemo(() => {
    const people = formObject.watch("people");
    return people.length === 0 || people.some((field) => field.name === "");
  }, [formObject.watch("people")]);

  return (
    <>
      <SubPageHeader
        title="Who's Splitting?"
        description="Type all the names and assign items"
        onBack={() => goBack()}
      />
      <div className="flex flex-col gap-3 w-full">
        {fields.map((field, index) => (
          <div
            className="flex justify-start items-center w-[350px] relative gap-2"
            key={field.id}
          >
            <InputText
              placeholder="Person name"
              className="w-full max-w-[300px]"
              {...formObject.register(`people.${index}.name`)}
            />

            <button
              onClick={() => {
                remove(index);
              }}
              className="flex-shrink-0 hover:opacity-80 cursor-pointer"
            >
              <img src="/trash.svg" className="size-[42px]" />
            </button>
          </div>
        ))}
        <button
          onClick={handleAddPerson}
          className="flex justify-start items-center w-full relative overflow-hidden gap-1.5 p-3 rounded-lg bg-[#f4eeec] border border-[#d1d5dc] hover:bg-[#ebe2df] transition-colors cursor-pointer max-w-[291px]"
        >
          <img src="/add.svg" className="size-4" />

          <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-center text-[#1d293d]">
            Add Person
          </p>
        </button>
        <div className="h-[1px] bg-[#D1D5DC] -mx-[100vw] mt-5" />
      </div>
      <Button className="w-full mt-6" onClick={goForward} disabled={isDisabled}>
        <span>Continue</span>
      </Button>
    </>
  );
};

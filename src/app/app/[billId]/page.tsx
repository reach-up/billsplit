"use client";

import SubPageHeader from "@/components/SubPageHeader";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useForm, SubmitHandler } from "react-hook-form";

type People = {
  name: string;
  uuid: string;
};
type BillItem = {
  name: string;
  price: number;
};

type BillForm = {
  billItems: BillItem[];

  subTotal?: Number;
  totalTaxes?: Number;

  tip?: Number;

  people: People[];
};

// List accepted values
const viewOptions = ["items", "split", "splitSummary"] as const;

export default function BillPage() {
  const [view, setView] = useQueryState(
    "view",
    parseAsStringLiteral(viewOptions)
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BillForm>();
  const onSubmit: SubmitHandler<BillForm> = (data) => console.log(data);

  if (view === "items") {
    return (
      <>
        <SubPageHeader
          title="Receipt Items"
          description="List all the items on your receipt"
          backLink="/"
        />
        <div></div>
      </>
    );
  }

  if (view === "split") {
    return (
      <>
        <SubPageHeader
          title="Who’s Splitting?"
          description="Type all the names and assign items"
          backLink="/"
        />
        <div></div>
      </>
    );
  }

  return (
    <>
      <SubPageHeader
        title="Split Summary"
        description="Here is how you should split this bill:"
        backLink="/"
      />
      <div></div>
    </>
  );
}

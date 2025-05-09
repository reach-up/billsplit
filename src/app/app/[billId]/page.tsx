"use client";

import SubPageHeader from "@/components/SubPageHeader";
import { useState } from "react";

export default function BillPage() {
  const [view, setView] = useState<"items" | "split" | "splitSummary">("items");

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

"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect } from "react";
import { ReceiptItems } from "./subpages/ReceiptItems";
import { BillForm } from "./types";
import { PeopleAndSplit } from "./subpages/PeopleAndSplit";
import { SplitSummary } from "./subpages/SplitSummary";
import { UploadOrManualBill } from "./subpages/UploadOrManualBill";

const viewOptions = ["intro", "items", "split", "splitSummary"] as const;

export default function AppPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const isManual = mode === "manual";

  const [view, setView] = useQueryState(
    "view",
    parseAsStringLiteral(viewOptions)
  );

  const formObject = useForm<BillForm>();

  const { watch, setValue } = formObject;

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem("billFormData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      Object.entries(parsedData).forEach(([key, value]) => {
        setValue(key as keyof BillForm, value as BillForm[keyof BillForm]);
      });
    }
  }, [setValue]);

  // Save form data to localStorage whenever it changes
  const formData = watch();
  useEffect(() => {
    localStorage.setItem("billFormData", JSON.stringify(formData));
  }, [formData]);

  if (view === "items") {
    return (
      <ReceiptItems
        formObject={formObject}
        goBack={() => setView("intro")}
        goForward={() => setView("split")}
      />
    );
  }

  if (view === "split") {
    return (
      <PeopleAndSplit
        formObject={formObject}
        goBack={() => setView("items")}
        goForward={() => setView("splitSummary")}
      />
    );
  }

  if (view === "splitSummary") {
    return (
      <SplitSummary goBack={() => setView("split")} formObject={formObject} />
    );
  }

  return (
    <UploadOrManualBill
      isManual={isManual}
      goBack={() => router.back()}
      goForward={() => setView("items")}
      formObject={formObject}
    />
  );
}

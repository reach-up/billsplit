"use client";

import { DatePicker } from "@/components/DatePicker";
import SubPageHeader from "@/components/SubPageHeader";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ReceiptItems } from "./ReceiptItems";
import { BillForm } from "./types";
import { PeopleAndSplit } from "./PeopleAndSplit";
import { SplitSummary } from "./SplitSummary";

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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = formObject;

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

  const onSubmit: SubmitHandler<BillForm> = (data) => {
    console.log(data);
    localStorage.removeItem("billFormData"); // Clear saved data after submission
  };

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

  if (isManual) {
    return (
      <>
        <SubPageHeader
          title="Manual Entry"
          description="Take a photo or upload an image of your receipt"
          onBack={() => router.push("/")}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div>
            <label
              htmlFor="restaurant-name"
              className="block text-sm font-medium text-left text-[#4a5565] mb-1"
            >
              Restaurant Name (optional):
            </label>
            <input
              type="text"
              id="restaurant-name"
              placeholder="e.g. Olive Garden"
              className="w-full px-3 py-2.5 rounded-lg border border-[#d1d5dc] bg-white focus:outline-none focus:ring-2 focus:ring-[#d04f17] focus:border-transparent"
              {...register("restaurantName")}
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-left text-[#4a5565] mb-1"
            >
              Date (optional):
            </label>
            <DatePicker
              date={watch("date")}
              onDateChange={(date) => {
                register("date").onChange({
                  target: { value: date, name: "date" },
                });
              }}
            />
          </div>
        </form>
        <Button className="w-full" onClick={() => setView("items")}>
          <span>Continue</span>
        </Button>
      </>
    );
  }

  return (
    <>
      <SubPageHeader
        title="Scan Receipt"
        description="Take a photo or upload  an image of your receipt"
        onBack={() => {
          router.push("/");
        }}
      />
      <div
        className="flex flex-col justify-start items-start max-w-[350px] w-full max-h-[479px] h-full relative overflow-hidden gap-2.5 p-4 rounded-2xl bg-[#faf7f5] border border-gray-200"
        style={{ boxShadow: "0px 1px 6px -4px rgba(0,0,0,0.2)" }}
      >
        <div className="h-[447px] w-full relative overflow-hidden rounded-xl bg-[#f6f0ed] border border-[#d1d5dc] border-dashed flex justify-center items-center">
          <div className="flex flex-col gap-3">
            <img className="w-[131px] h-[72px]" src="/camera.png" />
            <div className="flex flex-col">
              <p className=" ext-base font-medium text-center text-[#364153]">
                Take a photo
              </p>
              <Link
                href="/app?mode=manual"
                className="text-xs text-center underline text-[#4a5565]"
              >
                or upload receipt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

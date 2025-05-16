import { DatePicker } from "@/components/DatePicker";
import SubPageHeader from "@/components/SubPageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { BillForm } from "../types";
import Dropzone from "react-dropzone";
import { useMemo, useState } from "react";
import { useS3Upload } from "next-s3-upload";
import { ExtractSchemaType } from "@/app/api/vision/scrapeBill";
import { createId } from "../utils";
import Decimal from "decimal.js";

export const UploadOrManualBill = ({
  isManual,
  goBack,
  goForward,
  formObject,
}: {
  isManual: boolean;
  goBack: () => void;
  goForward: () => void;
  formObject: UseFormReturn<BillForm>;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const { uploadToS3 } = useS3Upload();
  const { register, watch } = formObject;

  const isDisabled = useMemo(() => {
    return !file;
  }, [file]);

  const processBill = async () => {
    if (!file) return;
    const uploadedBill = await uploadToS3(file);

    uploadedBill.url;

    try {
      const response = await fetch("/api/vision", {
        method: "POST",
        body: JSON.stringify({
          billUrl: uploadedBill.url,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const extractedData = (await response.json()) as ExtractSchemaType;

      formObject.setValue("businessName", extractedData.businessName);
      extractedData.date &&
        formObject.setValue("date", new Date(extractedData.date));
      formObject.setValue(
        "billItems",
        (extractedData?.billItems || []).map((item) => {
          return {
            id: createId(),
            name: item.name,
            price: new Decimal(item.price),
            assignedTo: [],
          };
        })
      );

      goForward();
    } catch (e) {
      // toast error couldn't process bill visually
    }
  };

  if (isManual) {
    return (
      <>
        <SubPageHeader
          title="Manual Entry"
          description="Take a photo or upload an image of your receipt"
          onBack={goBack}
        />

        <form className="w-full space-y-6">
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
              {...register("businessName")}
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
        <Button className="w-full" onClick={goForward}>
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
        onBack={goBack}
      />

      <Dropzone
        multiple={false}
        accept={{
          "image/*": [".jpg", ".jpeg", ".png"],
        }}
        onDrop={(acceptedFiles) => {
          const file = acceptedFiles[0];
          if (file.size > 15 * 1024 * 1024) {
            // 10MB in bytes
            // toast({
            //   title: "📁 File Too Large",
            //   description: "⚠️ File size must be less than 15MB",
            // });
            return;
          }
          setFile(file);
        }}
      >
        {({ getRootProps, getInputProps, isDragAccept }) => (
          <div
            className="flex flex-col justify-start items-start max-w-[350px] w-full max-h-[479px] h-full relative overflow-hidden gap-2.5 p-4 rounded-2xl bg-[#faf7f5] border border-gray-200"
            style={{ boxShadow: "0px 1px 6px -4px rgba(0,0,0,0.2)" }}
            {...getRootProps()}
          >
            <div className="h-[447px] w-full relative overflow-hidden rounded-xl bg-[#f6f0ed] border border-[#d1d5dc] border-dashed flex justify-center items-center">
              <div className="flex flex-col gap-3">
                <img className="w-[131px] h-[72px]" src="/camera.png" />
                <div className="flex flex-col">
                  <p className=" ext-base font-medium text-center text-[#364153]">
                    Take a photo
                  </p>
                  <input required={!file} {...getInputProps()} />
                  <Link
                    href="/app?mode=manual"
                    onClick={(evt) => {
                      evt.stopPropagation();
                    }}
                    className="text-xs text-center underline text-[#4a5565]"
                  >
                    or upload receipt
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dropzone>
      <Button
        className="w-full mt-6"
        onClick={processBill}
        disabled={isDisabled}
      >
        <span>Scrape the Bill</span>
      </Button>
    </>
  );
};

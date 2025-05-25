import { DatePicker } from "@/components/DatePicker";
import SubPageHeader from "@/components/SubPageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { BillForm } from "../types";
import Dropzone from "react-dropzone";
import { useEffect, useMemo, useState } from "react";
// Removed S3 upload dependency
import { ExtractSchemaType } from "@/lib/scrapeBill";
import { createId } from "../utils";
import Decimal from "decimal.js";
import logger from "../../../lib/logger";

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
  const [isLoading, setIsLoading] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const { register, watch } = formObject;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isLoading) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isLoading]);

  const isDisabled = useMemo(() => {
    return !file;
  }, [file]);

  // Function to compress an image before sending it to the API
  const compressImage = async (imageFile: File, maxWidth = 1200): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          
          if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = height * ratio;
          }
          
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          // Draw the image on the canvas with the new dimensions
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with reduced quality
          const quality = 0.8; // 80% quality, adjust as needed
          const base64 = canvas.toDataURL('image/jpeg', quality).split(',')[1];
          resolve(base64);
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = event.target?.result as string;
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(imageFile);
    });
  };

  const processBill = async () => {
    if (!file) return;
    setIsLoading(true);
    localStorage.removeItem("billFormData");
    
    // Generate a unique scan ID for tracking this operation in logs
    const scanId = `scan-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    try {
      
      // Log scan attempt with file metadata
      logger.info("Receipt scan initiated", {
        context: {
          scanId,
          fileType: file.type,
          fileSize: file.size,
          fileName: file.name
        },
        tags: ["user-action", "scan-receipt"]
      });
      
      // Compress the image before sending to the API
      const originalSizeKB = (file.size / 1024).toFixed(2);
      const base64Image = await compressImage(file);
      
      // Log image compression metrics
      logger.info("Image compressed for OCR", {
        context: {
          scanId,
          originalSizeKB,
          compressedLength: base64Image.length,
          compressionRatio: (file.size / (base64Image.length * 0.75)).toFixed(2) // Approximate ratio
        }
      });
      
      logger.info("File converted to base64, calling API", { 
        context: { 
          scanId, 
          mimeType: 'image/jpeg', 
          base64Length: base64Image.length 
        } 
      });
      
      // Make the API call with the compressed image
      const apiStartTime = Date.now();
      const response = await fetch("/api/vision", {
        method: "POST",
        body: JSON.stringify({
          base64Image,
          mimeType: 'image/jpeg', // We're always converting to JPEG
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const apiDuration = (Date.now() - apiStartTime) / 1000;
      logger.info("API response received", { 
        context: { 
          scanId, 
          status: response.status, 
          durationSeconds: apiDuration 
        } 
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        logger.error("API returned error response", { 
          context: { 
            scanId, 
            status: response.status,
            error: errorData.error 
          } 
        });
        throw new Error(errorData.error || "Failed to process receipt");
      }
      
      const extractedData = (await response.json()) as ExtractSchemaType;
      
      // Log successful extraction details
      logger.info("Receipt processed successfully", { 
        context: { 
          scanId,
          businessName: extractedData.businessName,
          date: extractedData.date,
          itemCount: extractedData.billItems?.length || 0,
          hasTax: !!extractedData.tax
        },
        tags: ["scan-success"]
      });
      
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
      formObject.setValue("tax", new Decimal(extractedData?.tax || 0));
      formObject.setValue("tip", new Decimal(extractedData?.tip || 0));

      // Set scan success state instead of immediately going forward
      setScanSuccess(true);
    } catch (e) {
      // Enhanced error handling with structured logging
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      logger.error("Error processing receipt", { 
        context: { 
          scanId, // Use the same scanId for tracking the entire operation
          error: errorMessage,
          stack: e instanceof Error ? e.stack : undefined 
        } 
      });
      alert(`Failed to process the receipt: ${errorMessage}`); // Use proper toast notification in production
    } finally {
      setIsLoading(false);
    }
  };

  // Show successful scan result with restaurant details
  if (scanSuccess) {
    const businessName = watch("businessName");
    const date = watch("date");
    const itemCount = watch("billItems")?.length || 0;
    
    return (
      <>
        <SubPageHeader
          title="Receipt Scanned Successfully"
          description="We've extracted the following information"
          onBack={() => setScanSuccess(false)}
        />
        
        <div className="w-full bg-[#faf7f5] p-5 rounded-xl border border-[#e7e5e4] mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-base font-semibold text-[#374151]">Restaurant</h3>
              <p className="text-lg text-[#111827]">{businessName || "Unknown"}</p>
            </div>
            
            <div>
              <h3 className="text-base font-semibold text-[#374151]">Date</h3>
              <p className="text-lg text-[#111827]">
                {date ? date.toLocaleDateString() : "Unknown"}
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-semibold text-[#374151]">Items Found</h3>
              <p className="text-lg text-[#111827]">{itemCount} items</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button className="w-full" onClick={goForward}>
            <span>Continue with These Details</span>
          </Button>
          
          <Button 
            variant="secondary"
            className="w-full" 
            onClick={() => {
              // Toggle to manual mode to allow editing
              setScanSuccess(false);
            }}
          >
            <span>Edit Details</span>
          </Button>
        </div>
      </>
    );
  }
  
  // Manual entry form
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
          if (isLoading) return;
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
        {({ getRootProps, getInputProps }) => (
          <div
            className="flex flex-col justify-start items-start max-w-[350px] w-full max-h-[479px] h-full relative overflow-hidden gap-2.5 p-4 rounded-2xl bg-[#faf7f5] border border-gray-200"
            style={{ boxShadow: "0px 1px 6px -4px rgba(0,0,0,0.2)" }}
            {...getRootProps()}
          >
            <div className="h-[447px] w-full relative overflow-hidden rounded-xl bg-[#f6f0ed] border border-[#d1d5dc] border-dashed flex justify-center items-center">
              {file ? (
                <div className="w-full h-full relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Receipt preview"
                    className="w-full h-full object-contain p-4"
                  />
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/10">
                      <div className="absolute inset-x-0 h-1 bg-orange-500/50 animate-scan-line" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 px-4 py-2 rounded-lg flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-orange-500 border-t-transparent rounded-full" />
                          <span className="text-sm font-medium animate-pulse">
                            {
                              [
                                "Looking at receipt...",
                                "Transcribing items...",
                                "Checking tax and tips...",
                              ][Math.floor((Date.now() / 2000) % 3)]
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {!isLoading && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white/90 transition-colors"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6L6 18" />
                        <path d="M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <img
                    className="w-[131px] h-[72px]"
                    src="/camera.png"
                    alt="Camera icon"
                  />
                  <div className="flex flex-col">
                    <p className="text-base font-medium text-center text-[#364153]">
                      Take a photo
                    </p>
                    <input required={!file} {...getInputProps()} />
                    <div className="text-xs text-center underline text-[#4a5565] cursor-pointer">
                      or upload receipt
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Dropzone>
      <Button
        className="w-full mt-6 min-h-[46px]"
        onClick={processBill}
        disabled={isDisabled || isLoading}
      >
        <span className="flex items-center justify-center gap-2">
          {isLoading && (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          )}
          {!isLoading && <span>Scrape the Bill</span>}
        </span>
      </Button>
    </>
  );
};

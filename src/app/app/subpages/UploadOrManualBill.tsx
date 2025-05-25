"use client";

import { DatePicker } from "@/components/DatePicker";
import SubPageHeader from "@/components/SubPageHeader";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { BillForm } from "../types";
import Dropzone from "react-dropzone";
import { useEffect, useMemo, useRef, useState } from "react";
// Removed S3 upload dependency
import { ExtractSchemaType } from "@/lib/scrapeBill";
import { createId } from "../utils";
import Decimal from "decimal.js";
import logger from "../../../lib/logger";
import { useTheme } from "@/context/ThemeContext";

// Custom scanning animation styles
const ScanningAnimation = () => (
  <style jsx global>{`
    @keyframes scanMove {
      0% { top: 0; }
      50% { top: 100%; }
      100% { top: 0; }
    }
    @keyframes scanLine {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }
    @keyframes slowPing {
      0% { transform: scale(1); opacity: 0.8; }
      70% { transform: scale(2); opacity: 0; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    .scan-line {
      position: absolute;
      left: 0;
      height: 2px;
      width: 100%;
      background: linear-gradient(90deg, transparent, #6941C6, transparent);
      animation: scanMove 3s cubic-bezier(0.45, 0, 0.55, 1) infinite, scanLine 3s ease-in-out infinite;
      box-shadow: 0 0 4px #6941C6, 0 0 8px #6941C6;
    }
    .ping-slow {
      animation: slowPing 3s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    /* Remove the dropzone icon completely */
    .dropzone-no-icon svg, 
    .dropzone-no-icon img,
    .dropzone-no-icon [class*="image"],
    .dropzone-no-icon [class*="picture"],
    .dropzone-no-icon [class*="photo"] {
      display: none !important;
    }
  `}</style>
);

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
  const { theme } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [isEnsuring, setIsEnsuring] = useState(false);
  const [isScanEnabled, setIsScanEnabled] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  useEffect(() => {
    if (cameraActive) {
      const startCamera = async () => {
        try {
          if (!videoRef.current) return;
          
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' } // Use back camera on mobile
          });
          
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } catch (err) {
          console.error('Error accessing camera:', err);
          alert('Could not access your camera. Please check permissions.');
          setCameraActive(false);
        }
      };
      
      startCamera();
      
      // Cleanup function to stop camera when component unmounts
      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          const tracks = stream.getTracks();
          
          tracks.forEach(track => track.stop());
        }
      };
    }
  }, [cameraActive]);

  useEffect(() => {
    if (file) {
      processBill();
    }
  }, [file]);

  // Function to process file before sending it to the API
  const processFile = async (file: File, maxWidth = 1200): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Check if file is PDF
      if (file.type === 'application/pdf') {
        // For PDFs, just read as base64
        const reader = new FileReader();
        
        reader.onload = (event) => {
          if (!event.target?.result) {
            reject(new Error('Failed to read PDF file'));
            return;
          }
          
          // Extract the base64 content without the data URL prefix
          const base64 = (event.target.result as string).split(',')[1];
          resolve(base64);
        };
        
        reader.onerror = () => reject(new Error('Failed to read PDF file'));
        reader.readAsDataURL(file);
      } else {
        // For images, compress them
        const reader = new FileReader();
        
        reader.onload = (event) => {
          if (!event.target?.result) {
            reject(new Error('Failed to read image file'));
            return;
          }
          
          const img = new Image();
          img.onload = () => {
            // Calculate new dimensions while maintaining aspect ratio
            const aspectRatio = img.height / img.width;
            const width = Math.min(maxWidth, img.width);
            const height = width * aspectRatio;
            
            // Create canvas and resize image
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
        
        reader.onerror = () => reject(new Error('Failed to read image file'));
        reader.readAsDataURL(file);
      }
    });
  };

  // Function to capture image from camera
  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsLoading(true);
    
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw current video frame to canvas
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      
      // Add a flash effect
      const flashOverlay = document.createElement('div');
      flashOverlay.style.position = 'fixed';
      flashOverlay.style.top = '0';
      flashOverlay.style.left = '0';
      flashOverlay.style.width = '100%';
      flashOverlay.style.height = '100%';
      flashOverlay.style.backgroundColor = 'white';
      flashOverlay.style.opacity = '0.8';
      flashOverlay.style.zIndex = '9999';
      flashOverlay.style.pointerEvents = 'none';
      flashOverlay.style.transition = 'opacity 0.5s';
      document.body.appendChild(flashOverlay);
      
      // Remove flash after animation
      setTimeout(() => {
        flashOverlay.style.opacity = '0';
        setTimeout(() => document.body.removeChild(flashOverlay), 500);
      }, 50);
      
      // Draw the video frame with a subtle border highlight
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsLoading(false);
          alert('Failed to capture image');
          return;
        }
        
        // Turn camera off
        setCameraActive(false);
        
        // Convert blob to file
        const capturedFile = new File([blob], `receipt-scan-${Date.now()}.jpg`, { type: 'image/jpeg' });
        setFile(capturedFile);
        
        // Process captured image
        await processBill(capturedFile);
      }, 'image/jpeg', 0.85);
      
    } catch (err) {
      console.error('Error capturing image:', err);
      setIsLoading(false);
      alert('Failed to capture image. Please try again.');
    }
  };

  const processBill = async (fileToProcess?: File) => {
    const fileToUse = fileToProcess || file;
    if (!fileToUse) return;
    setIsLoading(true);
    localStorage.removeItem("billFormData");
    
    // Generate a unique scan ID for tracking this operation in logs
    const scanId = `scan-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    try {
      
      // Log scan attempt with file metadata
      logger.info("Receipt scan initiated", {
        context: {
          scanId,
          fileType: fileToUse.type,
          fileSize: fileToUse.size,
          fileName: fileToUse.name
        },
        tags: ["user-action", "scan-receipt"]
      });
      
      // Process the file (image or PDF) before sending to the API
      const originalSizeKB = (fileToUse.size / 1024).toFixed(2);
      const base64Image = await processFile(fileToUse);
      
      // Determine file type for logging and processing
      const mimeType = fileToUse.type === 'application/pdf' ? 'application/pdf' : 'image/jpeg';
      const fileType = fileToUse.type === 'application/pdf' ? 'PDF' : 'Image';
      
      // Log file processing metrics
      logger.info(`${fileType} processed for OCR`, {
        context: {
          scanId,
          originalSizeKB,
          fileType,
          processedLength: base64Image.length,
          compressionRatio: fileToUse.type === 'application/pdf' ? '1.0' : 
            (fileToUse.size / (base64Image.length * 0.75)).toFixed(2) // Approximate ratio for images
        }
      });
      
      logger.info("File converted to base64, calling API", { 
        context: { 
          scanId, 
          mimeType, 
          base64Length: base64Image.length 
        } 
      });
      
      // Make the API call with the processed file (image or PDF)
      const apiStartTime = Date.now();
      const response = await fetch("/api/vision", {
        method: "POST",
        body: JSON.stringify({
          base64Image,
          mimeType, // Pass the correct MIME type (image/jpeg or application/pdf)
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

  // Show scanning UI while processing
  if (isLoading) {
    return (
      <>
        <ScanningAnimation />
        <SubPageHeader
          title="Scanning Receipt"
          description="Processing your receipt data"
          onBack={() => {
            if (confirm("Are you sure you want to cancel the scan?")) {
              setIsLoading(false);
            }
          }}
        />
        
        <div className="flex flex-col items-center justify-center py-8 space-y-8">
          <div className="relative w-72 h-96 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
            {file && (
              <img 
                src={URL.createObjectURL(file)} 
                alt="Receipt being scanned" 
                className="w-full h-full object-contain"
              />
            )}
            
            {/* Scanning effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="scan-line"></div>
              
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-primary-400 rounded-full ping-slow opacity-50"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-center w-full max-w-sm">
            <div className="flex items-center justify-center gap-3 bg-primary-50 py-3 px-4 rounded-lg border border-primary-100">
              <svg className="text-primary-600" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6H14M8.5 12H15.5M10.5 18H13.5M4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-primary-700 font-medium animate-pulse">Identifying items and prices...</span>
            </div>
            
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Please wait while we analyze your receipt. This usually takes about 15-20 seconds.</p>
          </div>
        </div>
      </>
    );
  }
  
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
        
        <div style={{
          width: '100%',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          background: 'linear-gradient(to bottom right, #E4D3FB, #B5F5E0)',
          border: '1px solid #C9A9F4',
          marginBottom: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 6H3C2.44772 6 2 6.44772 2 7V17C2 17.5523 2.44772 18 3 18H21C21.5523 18 22 17.5523 22 17V7C22 6.44772 21.5523 6 21 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"/>
              <path d="M16 14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"/>
              <path d="M2 10.5H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"/>
            </svg>
          </div>
          
          <div className="flex flex-col gap-5 relative z-10">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-medium text-primary-700 uppercase tracking-wide">Restaurant</h3>
              <p className="text-xl font-semibold text-neutral-900">{businessName || "Unknown"}</p>
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-medium text-primary-700 uppercase tracking-wide">Date</h3>
              <p className="text-xl font-semibold text-neutral-900">
                {date ? date.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'}) : "Unknown"}
              </p>
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-medium text-primary-700 uppercase tracking-wide">Items Found</h3>
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-neutral-900">{itemCount}</p>
                <span className="text-neutral-700 flex items-center gap-1.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 14L12 17L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  items detected
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <button 
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
              background: 'linear-gradient(to right, #6D28D9, #5B21B6)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #5B21B6',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out'
            }}
            onClick={goForward}
          >
            <span style={{color: 'white', fontSize: '18px', fontWeight: 'bold'}}>Details Correct</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12L10 17L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
              background: 'linear-gradient(to right, #0E9F6E, #057A55)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #057A55',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out'
            }}
            onClick={() => {
              // Toggle to manual mode to allow editing
              setScanSuccess(false);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.5 3.50001C18.3284 2.67158 19.6716 2.67158 20.5 3.50001C21.3284 4.32844 21.3284 5.67157 20.5 6.50001L12 15L8 16L9 12L17.5 3.50001Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{color: 'white', fontSize: '18px', fontWeight: 'bold'}}>Edit Details</span>
          </button>
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
          description="Enter your receipt details manually"
          onBack={goBack}
        />

        <form className="w-full space-y-6">
          <div className="space-y-1.5">
            <label
              htmlFor="restaurant-name"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Restaurant Name
            </label>
            <input
              {...register("businessName")}
              id="restaurant-name"
              type="text"
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition shadow-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              placeholder="e.g., The Cheesecake Factory"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Receipt Date
            </label>
            <DatePicker
              date={watch("date")}
              onDateChange={(date) => {
                register("date").onChange({
                  target: { value: date, name: "date" },
                });
              }}
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Select the date from the receipt</p>
          </div>
          
          <div className="pt-4">
            <button
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                borderRadius: '0.5rem',
                background: 'linear-gradient(to right, #F97316, #EA580C)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #EA580C',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out'
              }}
              onClick={goForward}
            >
              <span style={{color: 'white', fontSize: '18px', fontWeight: 'bold'}}>Continue to Add Items</span>
              <svg style={{width: '1.25rem', height: '1.25rem', transition: 'transform 0.2s'}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </form>
      </>
    );
  }

  // Receipt scan UI
  return (
    <>
      <SubPageHeader
        title="Scan Receipt"
        description="Upload or take a photo of your receipt to get started"
        onBack={goBack}
      />
      
      {/* Camera UI when active */}
      {cameraActive && (
        <div style={{
          position: 'relative',
          width: '100%',
          marginBottom: '1rem',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
          backgroundColor: theme === 'dark' ? '#000' : '#fff',
          transition: 'background-color 0.3s ease'
        }}>
          <video 
            ref={videoRef} 
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '70vh',
              objectFit: 'cover',
              display: 'block'
            }} 
            playsInline 
            muted
          />
          
          {/* Scanner animation overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}>
            <div className="scan-line"></div>
          </div>
          
          {/* Camera capture button */}
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button
              onClick={captureImage}
              disabled={isLoading}
              style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                background: 'white',
                border: '4px solid #6D28D9',
                boxShadow: '0 0 0 2px white, 0 4px 10px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                cursor: 'pointer',
                transition: 'transform 0.2s, background 0.2s'
              }}
            >
              <div style={{
                width: '80%',
                height: '80%',
                borderRadius: '50%',
                backgroundColor: isLoading ? '#ccc' : '#6D28D9',
                transition: 'background-color 0.2s'
              }}></div>
            </button>
          </div>
          
          {/* Close camera button */}
          <button
            onClick={() => setCameraActive(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '2.5rem',
              height: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Simple camera button */}
      {!cameraActive && !file && (
        <button
          onClick={() => setCameraActive(true)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            background: theme === 'dark' ? '#333' : '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            color: theme === 'dark' ? '#fff' : '#4b5563',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 12C19 11.1716 19 10.3432 19 9.51492C19 7.58122 17.4188 6 15.4851 6C14.6974 6 13.9175 6 13.1491 6C12.424 6 11.5 5 11 5C10.5 5 9.67596 5 9 5C8.32404 5 7.5 5 6.84088 5C4.80616 5 3 6.67893 3 8.8C3 9.65354 3 10.5071 3 11.3606C3 12.214 3 13.0675 3 13.921C3 16.8406 5.15229 18 7.89669 18H16C17.6569 18 19 16.6569 19 15V12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Take a picture or scan a PDF
        </button>
      )}
      
      <Dropzone
        multiple={false}
        accept={{
          "image/*": [".jpg", ".jpeg", ".png"],
          "application/pdf": [".pdf"]
        }}
        onDrop={(acceptedFiles) => {
          if (isLoading) return;
          const file = acceptedFiles[0];
          if (file.size > 15 * 1024 * 1024) {
            alert("File size must be less than 15MB");
            return;
          }
          setFile(file);
        }}
        noClick={cameraActive}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div>
            <input id="file-upload-dropzone" {...getInputProps()} />
            
            {!cameraActive && !file && (
              <div
                {...getRootProps()}
                className={`dropzone-no-icon w-full flex flex-col gap-6 items-center justify-center py-12 px-6 border-2 ${
                  isDragActive
                    ? "border-primary-400 bg-primary-50"
                    : "border-dashed border-neutral-300 hover:border-primary-300 hover:bg-primary-50/50"
                } rounded-xl cursor-pointer transition-all duration-200 shadow-sm`}
              >
                {isDragActive ? (
                  <div className="flex flex-col items-center text-center">
                    <p className="text-lg font-medium text-primary-700 mb-1">
                      Drop your receipt here
                    </p>
                    <p className="text-sm text-neutral-600">
                      We'll scan it automatically
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                      Drag & drop your receipt
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      or click to browse files
                    </p>
                  </div>
                )}
              </div>
            )}

            {file ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="relative w-full max-w-[240px] group">
                  {file.type === 'application/pdf' ? (
                    <div className="w-full aspect-[3/4] bg-neutral-50 flex flex-col items-center justify-center rounded-lg border border-neutral-200 shadow-md overflow-hidden">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-600 mb-2">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 9H10H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-sm font-medium text-neutral-800">{file.name}</p>
                      <p className="text-xs text-neutral-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  ) : (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Receipt"
                      className="h-auto w-full object-contain rounded-lg border border-neutral-200 shadow-md"
                    />
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="absolute -top-2 -right-2 bg-white text-error-600 rounded-full p-1 shadow-sm border border-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5 15V18.5H5.5V15M12 16V4M12 4L7 9M12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="truncate max-w-[200px]">{file.name}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6">
                {!isDragActive && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 transition-colors duration-300">
                    Supports images (JPG, PNG) and PDF files
                  </p>
                )}

                {isDragActive && (
                  <div className="flex flex-col items-center text-center">
                    <p className="text-lg font-medium text-primary-700 mb-1">
                      Drop your receipt here
                    </p>
                    <p className="text-sm text-neutral-600">
                      We'll scan it automatically
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Dropzone>

      <div className="w-full mt-6 relative">
        <button
          onClick={() => processBill()}
          disabled={isDisabled || isLoading}
          style={{
            width: '100%',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            background: 'linear-gradient(to right, #6D28D9, #5B21B6)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.125rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #5B21B6',
            opacity: isDisabled || isLoading ? 0.7 : 1,
            cursor: isDisabled || isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          {isLoading ? (
            <>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem'}}>
                <svg className="animate-pulse" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4V20M20 4V20M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{color: 'white', fontSize: '18px', fontWeight: 'bold'}}>Scanning receipt...</span>
              </div>
            </>
          ) : (
            <>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 16.5L12 21.75L21 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12L12 17.25L21 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 7.5L12 12.75L21 7.5L12 2.25L3 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{color: 'white', fontSize: '18px', fontWeight: 'bold'}}>Scan Receipt</span>
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
};

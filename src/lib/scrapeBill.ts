import { z } from "zod";
import { GEMINI_API_KEY, GEMINI_API_URL } from "./clients";
import zodToJsonSchema from "zod-to-json-schema";
import dedent from "dedent";
import logger from "./logger";

export const extractSchema = z.object({
  businessName: z
    .string()
    .optional()
    .describe("Name of the business where the bill was created"),
  date: z.string().optional().describe("Date when the bill was created"),
  billItems: z
    .array(
      z.object({
        name: z.string().describe("Name of the item"),
        price: z.number().describe("Price of the item in decimal format"),
      })
    )
    .describe("List of items in the bill"),
  tax: z
    .number()
    .optional()
    .describe("Tax amount, not percentage we need money amount"),
  tip: z
    .number()
    .optional()
    .describe(
      "Tip or Gratuity amount, not percentage we need money amount and if multiple tips are shown just output the medium one"
    ),
});

export type ExtractSchemaType = z.infer<typeof extractSchema>;

// The URL-based scrapeBill function has been removed as we now work directly with base64 images

/**
 * Function to process a base64 encoded image directly using Gemini Vision
 */
export async function scrapeBase64Bill({
  base64Image,
  mimeType,
}: {
  base64Image: string;
  mimeType: string;
}): Promise<ExtractSchemaType> {
  return await processGeminiVision(base64Image, mimeType);
}

/**
 * Common function to process images with Gemini Vision API using the exact implementation from Gemini app
 */
async function processGeminiVision(
  base64Image: string,
  imageMimeType: string
): Promise<ExtractSchemaType> {
  // Use structured logging
  logger.ocr.info(`Processing receipt image`, {
    context: {
      imageSize: base64Image.length,
      mimeType: imageMimeType
    }
  });
  const startTime = new Date();
  
  // Enhanced prompt with detailed instructions for more accurate extraction
  const prompt = dedent`
    You are an expert at extracting information from receipts.

    Analyze this receipt image and extract the following information in JSON format:

    1. BUSINESS NAME (Critical):
       - Look at the top of the receipt for the business/restaurant name
       - Often appears in larger text or logo area
       - This field is REQUIRED - make your best guess if unclear

    2. DATE (Critical):
       - Find the date the receipt was issued (not printed date)
       - Convert to YYYY-MM-DD format
       - This field is REQUIRED - make your best guess if unclear

    3. ITEMS (Most Important):
       - Find EVERY individual item purchased with its name and price
       - Each item must have a name and price as a decimal number
       - Do NOT include subtotals or non-purchased items

    4. TAX AMOUNT:
       - Extract the total tax amount in decimal format

    Format your response as a JSON object with these properties:
    - 'businessName' (string): Name of the restaurant or business
    - 'date' (string): Receipt date in YYYY-MM-DD format
    - 'items' (array): List of items, each with 'item' (string) and 'price' (number) properties
    - 'taxAmount' (number): The total tax amount

    Example: {"businessName": "BURGER KING #2187", "date": "2023-05-15", "items": [{"item": "Whopper Meal", "price": 12.99}, {"item": "Large Fries", "price": 4.50}], "taxAmount": 1.75}
  `;
  
  // Prepare the API payload
  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: imageMimeType,
              data: base64Image
            }
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          "businessName": { "type": "STRING" },
          "date": { "type": "STRING" },
          "items": {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                "item": { "type": "STRING" },
                "price": { "type": "NUMBER" }
              },
              "propertyOrdering": ["item", "price"]
            }
          },
          "taxAmount": { "type": "NUMBER" }
        },
        "propertyOrdering": ["businessName", "date", "items", "taxAmount"]
      }
    }
  };

  // Call the Gemini API
  const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
  const apiCallStart = new Date();
  logger.ocr.info(`Sending request to Gemini API...`, {
    context: { url: GEMINI_API_URL, apiKeyDefined: !!GEMINI_API_KEY }
  });
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const apiCallEnd = new Date();
    const apiCallDuration = (apiCallEnd.getTime() - apiCallStart.getTime()) / 1000;
    logger.ocr.info(`API call completed`, { 
      context: {
        durationSeconds: apiCallDuration,
        status: response.status
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      logger.ocr.error(`Gemini API error`, { context: errorData });
      throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const result = await response.json();

    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      const jsonText = result.candidates[0].content.parts[0].text;
      
      try {
        // Parse the response and map it to our schema format
        const geminiOutput = JSON.parse(jsonText);
        // Log the raw response to debug the field names
        logger.ocr.debug('Raw JSON response received', { 
          context: { response: jsonText.slice(0, 200) + (jsonText.length > 200 ? '...' : '') } 
        });
        
        // Define the Gemini response type with flexibility
        interface GeminiItem {
          item: string;
          price: number;
        }
        
        // We use Record<string, any> to allow for any property names in the response
        // This way we can check for different field names that Gemini might return
        type GeminiResponse = {
          items?: GeminiItem[];
          taxAmount?: number;
          businessName?: string;
          date?: string;
          [key: string]: any; // Allow any other property names
        };
        
        // Convert from Gemini's format to our application's format
        const typedOutput = geminiOutput as GeminiResponse;
        
        // Extract business name - try different possible field names
        let businessName = "Restaurant";
        if (typeof typedOutput.businessName === 'string') businessName = typedOutput.businessName;
        else if (typeof typedOutput.BusinessName === 'string') businessName = typedOutput.BusinessName;
        else if (typeof typedOutput.restaurant === 'string') businessName = typedOutput.restaurant;
        else if (typeof typedOutput.Restaurant === 'string') businessName = typedOutput.Restaurant;
        
        // Extract date - try different possible field names
        let date = new Date().toISOString().split('T')[0];
        if (typeof typedOutput.date === 'string') date = typedOutput.date;
        else if (typeof typedOutput.Date === 'string') date = typedOutput.Date;
        else if (typeof typedOutput.receiptDate === 'string') date = typedOutput.receiptDate;
        else if (typeof typedOutput.ReceiptDate === 'string') date = typedOutput.ReceiptDate;
        
        logger.ocr.info('Extracted receipt metadata', { 
          context: { businessName, date } 
        });
        
        const mappedOutput: ExtractSchemaType = {
          businessName,
          date,
          billItems: (typedOutput.items || []).map((item: GeminiItem) => ({
            name: item.item,
            price: item.price
          })),
          tax: typedOutput.taxAmount || 0,
          tip: 0 // Default since Gemini doesn't extract this
        };
        
        // Log summary of extracted data
        const endTime = new Date();
        const totalDuration = (endTime.getTime() - startTime.getTime()) / 1000;
        
        logger.ocr.info(`OCR processing completed`, { 
          context: { 
            durationSeconds: totalDuration,
            itemsExtracted: mappedOutput.billItems.length,
            businessName: mappedOutput.businessName,
            hasTax: !!mappedOutput.tax,
            taxAmount: mappedOutput.tax
          } 
        });
        
        return mappedOutput;
      } catch (error) {
        // Type safety for error handling
        const parseError = error instanceof Error ? error : new Error(String(error));
        logger.ocr.error('Error parsing JSON response', { 
          context: { error: parseError.message } 
        });
        throw new Error(`Failed to parse JSON response: ${parseError.message}`);
      }
    } else {
      logger.ocr.error('Invalid response structure', { 
        context: { 
          hasCandidate: !!result.candidates?.length,
          hasContent: !!result.candidates?.[0]?.content,
          hasParts: !!result.candidates?.[0]?.content?.parts?.length
        } 
      });
      throw new Error("No valid content returned from Gemini Vision");
    }
  } catch (error) {
    logger.ocr.error(`Error during API call`, { 
      context: { error: error instanceof Error ? error.message : String(error) } 
    });
    throw error;
  }
}

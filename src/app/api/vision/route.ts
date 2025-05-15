import dedent from "dedent";
import { z } from "zod";
import { togetherBaseClient } from "./clients";
import zodToJsonSchema from "zod-to-json-schema";

export async function POST(req: Request) {
  const { text, language } = await req.json();

  const start = new Date();

  const systemPrompt = dedent`
    You are an expert at extracting information from receipts.

    Your task:
    1. Analyze the receipt image provided
    2. Extract all relevant billing information
    3. Format the data in a structured way

    Guidelines for extraction:
    - Identify the restaurant/business name and location
    - Find the receipt date
    - Extract each item with its name and total price
    - Capture additional charges (tax, tip)
    - Ensure all numerical values are accurate
    - Convert all prices to decimal numbers
    
    IMPORTANT: Extract ONLY the information visible in the receipt. Do not make assumptions about missing data.
  `;

  const extractSchema = z.object({
    restaurantName: z.string().describe("Name of the restaurant or business"),
    date: z.string().describe("Date when the bill was created"),
    billItems: z
      .array(
        z.object({
          name: z.string().describe("Name of the item"),
          price: z.number().describe("Price of the item in decimal format"),
        })
      )
      .describe("List of items in the bill"),
    subTotal: z
      .number()
      .optional()
      .describe("Subtotal amount before tax and tip"),
    tax: z.number().optional().describe("Tax amount"),
    tip: z.number().optional().describe("Tip amount"),
  });

  const jsonSchema = zodToJsonSchema(extractSchema, {
    target: "openAi",
  });

  const extract = await togetherBaseClient.chat.completions.create({
    model: "arcee_ai/arcee-spotlight",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: systemPrompt },
          {
            type: "image_url",
            image_url: {
              url: "",
            },
          },
        ],
      },
    ],
    response_format: { type: "json_object", schema: jsonSchema },
  });

  const endJson = new Date();
  console.log(
    "Time it took to generate Bill JSON: ",
    (endJson.getTime() - start.getTime()) / 1000
  );

  if (extract?.choices?.[0]?.message?.content) {
    const output = JSON.parse(extract?.choices?.[0]?.message?.content);
    return output as typeof extractSchema._output;
  }
  throw new Error("No content returned from Llama 4 vision");
}

export const runtime = "edge";

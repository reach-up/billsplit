import { z } from "zod";
import { togetherBaseClient } from "./clients";
import zodToJsonSchema from "zod-to-json-schema";
import dedent from "dedent";

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
      "Tip amount, not percentage we need money amount and if multiple tips are shown just output the medium one"
    ),
});

export type ExtractSchemaType = z.infer<typeof extractSchema>;

const systemPrompt = dedent`
  You are an expert at extracting information from receipts.

  Your task:
  1. Analyze the receipt image provided
  2. Extract all relevant billing information
  3. Format the data in a structured way

  Guidelines for extraction:
  - Identify the restaurant/business name and location if available otherwise just return null
  - Find the receipt date or return null, date format should be YYYY-MM-DD but if day it's less than 10 don't add a 0 in front
  - Extract each item with its name and total price
  - Capture tax amount, if applicable and not percentage but the money amount otherwise return null
  - Identify any tips or gratuities, if multiple tips are shown just output the medium one otherwise return null
  - Ensure all numerical values are accurate
  - Convert all prices to decimal numbers
  
  IMPORTANT: Extract ONLY the information visible in the receipt. Do not make assumptions about missing data.
`;

export async function scrapeBill({
  billUrl,
  model = "meta-llama/Llama-4-Scout-17B-16E-Instruct",
}: {
  billUrl: string;
  model?: string;
}): Promise<ExtractSchemaType> {
  const jsonSchema = zodToJsonSchema(extractSchema, {
    target: "openAi",
  });

  const extract = await togetherBaseClient.chat.completions.create({
    model: model,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: systemPrompt },
          {
            type: "image_url",
            image_url: {
              url: billUrl,
            },
          },
        ],
      },
    ],
    response_format: { type: "json_object", schema: jsonSchema },
  });

  if (extract?.choices?.[0]?.message?.content) {
    const output = JSON.parse(extract.choices[0].message.content);
    return output;
  }
  throw new Error("No content returned from Llama 4 vision");
}

import Together from "together-ai";

const options: ConstructorParameters<typeof Together>[0] = {
  apiKey: process.env.TOGETHER_API_KEY,
};

if (process.env.HELICONE_API_KEY) {
  options.baseURL = "https://together.helicone.ai/v1";
  options.defaultHeaders = {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
    "Helicone-Property-Appname": "ratemyroom",
  };
}

export const togetherBaseClient = new Together(options);

import { evalite } from "evalite";
import { Levenshtein } from "autoevals";
import { scrapeBill } from "./scrapeBill";

const testData = [
  {
    name: "US Walmart Receipt",
    input: "https://asprise.com/ocr/api/img/blog/rcpt/US-1.jpg",
    expected: {
      businessName: "Walmart",
      date: "11/29/2013",
      billItems: [
        { name: "3DSXL BUNDLE", price: 149.99 },
        { name: "3DSXL BUNDLE", price: 149.99 },
      ],
      tax: 24,
      tip: 0,
    },
  },
  {
    name: "Nobu Caesars Palace Receipt",
    input:
      "https://i0.wp.com/escapearoundtheworld.com/wp-content/uploads/2020/03/IMG_6147-1.jpg?resize=610%2C1024&ssl=1",
    expected: {
      businessName: "NOBU - Restaurant",
      date: "2/13/2020",
      billItems: [
        { name: "Peruvian Caipiri", price: 18 },
        { name: "Hakka Nigori", price: 18 },
        { name: "PF 155 Oma", price: 155 },
        { name: "PF 155 Oma", price: 155 },
      ],
      tax: 28.98,
      tip: 62.28,
    },
  },
  {
    name: "Bubba Gump Shrimp Receipt",
    input:
      "https://media-cdn.tripadvisor.com/media/photo-s/0c/11/46/20/bubba-gump-shrimp-co.jpg",
    expected: {
      businessName: "Bubba Gump Shrimp Co",
      date: "07/18/2016",
      billItems: [
        { name: "Diet Pepsi", price: 2.79 },
        { name: "Lemonade", price: 2.79 },
        { name: "Dft 16 Bud Light", price: 3.5 },
        { name: "Shrimmer's Heaven", price: 20.99 },
        { name: "Steamed Shellfish", price: 24.49 },
        { name: "Scampi Linguini", price: 17.49 },
        { name: "Scampi Linguini", price: 17.49 },
      ],
      tax: 4.55,
      tip: null,
    },
  },
  {
    name: "Italian Restaurant Receipt",
    input:
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Italian_supermarket_receipt_showing_value-added_tax_%28IVA%29_categories.jpg",
    expected: {
      businessName: null,
      date: null,
      billItems: [
        { name: "ACQUA S.ANGELO NATUR", price: 1.32 },
        { name: "MILK PRO PORRIDGE AV", price: 1.65 },
        { name: "MILK PRO PORRIDGE AV", price: 1.65 },
        { name: "LINDT TAVOLETTA LATT", price: 2.85 },
        { name: "CIK CROK STILE FATT", price: 2.85 },
        { name: "MELE GRANNY SMITH", price: 1.53 },
      ],
      tax: 1.12,
      tip: 0,
    },
  },
  {
    name: "Dubai Mall Receipt",
    input:
      "https://media-cdn.tripadvisor.com/media/photo-s/12/99/2b/3b/receipt.jpg",
    expected: {
      businessName: "Mertcan",
      date: "28/03/2018",
      billItems: [
        { name: "Fresh Lavash Wrap", price: 39 },
        { name: "Urfa Kebab", price: 54 },
        { name: "Lamb Chops", price: 67 },
        { name: "Chicken Skewers", price: 47 },
        { name: "OFM Styl Lamb", price: 67 },
        { name: "Peach Ice Tea", price: 17 },
        { name: "Lemon &Peach I.T", price: 36 },
      ],
      tax: 16.35,
      tip: null,
    },
  },
];

const visionModels = [
  "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
  "meta-llama/Llama-4-Scout-17B-16E-Instruct",
  "Qwen/Qwen2-VL-72B-Instruct",
];

visionModels.map((model) => {
  evalite(`Bill Scraping with: ${model}`, {
    data: async () =>
      testData.map((item) => ({
        input: item.input,
        expected: JSON.stringify(item.expected),
      })),
    task: async (input) =>
      JSON.stringify(
        await scrapeBill({
          billUrl: input,
          model: model,
        })
      ),
    scorers: [Levenshtein],
  });
});

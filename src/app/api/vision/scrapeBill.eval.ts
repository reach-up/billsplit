import { evalite } from "evalite";
import { Levenshtein } from "autoevals";
import { scrapeBill } from "./scrapeBill";

const testData = [
  {
    name: "US Walmart Receipt",
    input: "https://asprise.com/ocr/api/img/blog/rcpt/US-1.jpg",
    expected: {
      businessName: "Walmart",
      date: "2013-11-29",
      billItems: [
        { name: "3DSXL BUNDLE", price: 149.99 },
        { name: "3DSXL BUNDLE", price: 149.99 },
      ],
      tax: 24,
      tip: null,
    },
  },
  {
    name: "Nobu Caesars Palace Receipt",
    input:
      "https://i0.wp.com/escapearoundtheworld.com/wp-content/uploads/2020/03/IMG_6147-1.jpg?resize=610%2C1024&ssl=1",
    expected: {
      businessName: "NOBU - Restaurant",
      date: "2020-02-13",
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
      date: "2016-07-18",
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
      tip: null,
    },
  },
  {
    name: "Dubai Mall Receipt",
    input:
      "https://media-cdn.tripadvisor.com/media/photo-s/12/99/2b/3b/receipt.jpg",
    expected: {
      businessName: "Mertcan",
      date: "2018-03-28",
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
  {
    name: "Tatiana New York Receipt",
    input:
      "https://reportergourmet.com/upload/multimedia/Tatiana-scontrino.jpg",
    expected: {
      businessName: "Lincoln Center",
      date: "2024-06-18",
      billItems: [
        { name: "Spicy Marg", price: 18 },
        { name: "Tatiana Tonic", price: 18 },
        { name: "Egusi Dumpling", price: 22 },
        { name: "Crispy Okra", price: 16 },
        { name: "Curried Goat Patties", price: 27 },
        { name: "Braised Oxtails", price: 58 },
        { name: "Malbec, Solar del Alma, Natural, Mendoza", price: 59 },
        { name: "Black Bean Hummus", price: 26 },
        { name: "Rice & Peas", price: 12 },
        { name: "Rum Cake", price: 18 },
      ],
      tax: 24.33,
      tip: null,
    },
  },
  {
    name: "El Chalan Restaurant Receipt",
    input:
      "https://c8.alamy.com/comp/FWREE7/miami-floridael-chalan-restaurant-peruvian-foodcheck-receipt-bill-FWREE7.jpg",
    expected: {
      businessName: "El Chalan Restaurant",
      date: "2016-12-03",
      billItems: [
        { name: "CAUSA DE POLLO", price: 8.95 },
        { name: "CEVICHE DE CAMARONES", price: 16.95 },
        { name: "LIMONADA", price: 4 },
        { name: "PESCADO AL AJILLO", price: 15.95 },
      ],
      tax: 3.67,
      tip: 9.9,
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

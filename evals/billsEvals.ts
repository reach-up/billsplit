export const billEvals: {
  name: string;
  input: string;
  expected: {
    businessName: string | null;
    date: string | null;
    billItems: { name: string; price: number }[];
    tax: number | null;
    tip: number | null;
  };
}[] = [
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
  {
    name: "Blue India Atlanta Receipt",
    input:
      "https://media-cdn.tripadvisor.com/media/photo-s/1b/3c/ac/33/12-24-19-blue-india-receipt.jpg",
    expected: {
      businessName: "Blue India Atlanta",
      date: "2019-12-24",
      billItems: [
        { name: "Samosas", price: 6 },
        { name: "Karahi Dinner", price: 16 },
        { name: "Paneer", price: 1 },
        { name: "Vindaloo Dinner", price: 16 },
        { name: "- Paneer", price: 1 },
        { name: "Biryani", price: 16 },
        { name: "Cheddar Naan", price: 6 },
      ],
      tax: 5.5,
      tip: 11.16,
    },
  },
  {
    name: "Iranian Restaurant Receipt",
    input:
      "https://eatgosee.com/wp-content/uploads/2024/06/Iranish-Iranian-Restaurant-Receipt.webp",
    expected: {
      businessName: "Iranian Restaurant",
      date: "2024-5-17",
      billItems: [
        { name: "Noon", price: 8 },
        { name: "Mast-O-Khiar", price: 15 },
        { name: "Kashk E Badenjan", price: 36 },
        { name: "Soltani", price: 74 },
        { name: "Iranian Rice", price: 15 },
        { name: "Sparkling water LRG", price: 20 },
      ],
      tax: 8,
      tip: null,
    },
  },
  {
    name: "Nobu Los Angeles Receipt",
    input: "https://www.tangmeister.com/110416_nobu_los_angeles/Receipt.jpg",
    expected: {
      businessName: null,
      date: "2011-4-16",
      billItems: [
        { name: "Pina Martini", price: 14 },
        { name: "Japanese Calpitrina", price: 14 },
        { name: "Yardaskis150car", price: 14 },
        { name: "Mia Margarita", price: 4 },
        { name: "Diet Coke", price: 27 },
        { name: "Vodkared bull (2 @14.00)", price: 28 },
        { name: "Vodkared bull12 (4 @12.00)", price: 48 },
        { name: "Glass TazulefRiesl Ing", price: 12 },
        { name: "Glass TazulefRiesl Ing (2 @12.00)", price: 24 },
        { name: "Sangria ROM (6 @24.00)", price: 432 },
        { name: "YKS0", price: 225 },
        { name: "Green Tea (5 @0.00)", price: 0 },
        { name: "Tiradito", price: 75 },
        { name: "$25", price: 25 },
        { name: "Tiraditto", price: 20 },
        { name: "$20", price: 20 },
        { name: "New-F BOTAN (3 @30.00)", price: 90 },
        { name: "Diet Coke Reflll", price: 3 },
        { name: "babboo (3 @25.00)", price: 75 },
        { name: "Admin Fee", price: 300 },
        { name: "TESOLUR (15 @150.00)", price: 2250 },
        { name: "Sparkling Water large", price: 9 },
        { name: "King Crab Assu (3 @26.00)", price: 78 },
        { name: "Mexican white shrimp (15 @5.00)", price: 75 },
        { name: "NorkFish Pate Cav", price: 22 },
      ],
      tax: 447.72,
      tip: 766,
    },
  },
];

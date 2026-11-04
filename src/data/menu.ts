export type Choice = {
  name: string;
  delta?: number;
  note?: string;
};

export type OptionGroup = {
  id: string;
  label: string;
  helper?: string;
  kind: "single" | "multi";
  max?: number;
  choices: Choice[];
  free?: boolean;
};

export type MenuItem = {
  id: string;
  name: string;
  collection: string;
  collectionId: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  badge?: string;
  groups?: OptionGroup[];
  note?: string;
  composedOf?: string;
};

export type Collection = {
  id: string;
  index: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  image: string;
};

export const CHOCOLATE_GROUP: OptionGroup = {
  id: "chocolate",
  label: "Choose your chocolate",
  kind: "single",
  choices: [{ name: "Dark" }, { name: "Milk" }, { name: "White" }],
};

export const collections: Collection[] = [
  {
    id: "classics",
    index: "01",
    name: "The Classics",
    shortName: "Classics",
    tagline: "The ones we never stop making.",
    description:
      "Pure, hand-tempered couverture. No agenda, no noise — just chocolate the way it should taste.",
    image: "/images/classics.jpg",
  },
  {
    id: "nut",
    index: "02",
    name: "The Nut Collection",
    shortName: "Nut Collection",
    tagline: "A little crunch, a little luxury.",
    description:
      "Heart-shaped chocolates finished by hand with whole nuts and slow-dried fruit. Our most gifted collection.",
    image: "/images/nut-collection.jpg",
  },
  {
    id: "bars",
    index: "03",
    name: "The Chocolate Bar Collection",
    shortName: "Chocolate Bars",
    tagline: "Little bars, lovely indulgence.",
    description:
      "Small format, generous spirit. The everyday bars that started the whole thing.",
    image: "/images/bar-trio.jpg",
  },
  {
    id: "signature",
    index: "04",
    name: "Signature Bars",
    shortName: "Signature Bars",
    tagline: "Our finest, generously adorned.",
    description:
      "Larger bars, layered toppings, our signature snap. Built to be opened slowly.",
    image: "/images/signature-bar.jpg",
  },
  {
    id: "personalised",
    index: "05",
    name: "The Personalised Collection",
    shortName: "Personalised",
    tagline: "Your words, set in chocolate.",
    description:
      "Names, birthdays, inside jokes and quiet declarations. Hand-piped onto a bar made only once.",
    image: "/images/personalised-bar.jpg",
  },
  {
    id: "crunchy",
    index: "06",
    name: "The Crunchy Collection",
    shortName: "Crunchy",
    tagline: "Oreo, cookie, crunch.",
    description:
      "Cookie shards folded through smooth chocolate. Nostalgic, a little loud, entirely welcome.",
    image: "/images/crunchy-bar.jpg",
  },
  {
    id: "surprise",
    index: "07",
    name: "The Surprise Collection",
    shortName: "Surprise",
    tagline: "A ring, a secret, a moment.",
    description:
      "The collection for proposals, apologies and grand gestures. We hide the surprise; you take the credit.",
    image: "/images/surprise-ring.jpg",
  },
  {
    id: "gifting",
    index: "08",
    name: "The Gift Edit",
    shortName: "Gift Boxes",
    tagline: "Wrapped by hand, tied with blue.",
    description:
      "Our chocolates, gathered into keepsake boxes with a handwritten note. Made for giving away.",
    image: "/images/chocolate-box.jpg",
  },
];

export const collectionById = (id: string) =>
  collections.find((collection) => collection.id === id);

export const menuItems: MenuItem[] = [
  // THE CLASSICS
  {
    id: "classic-heart",
    name: "The Classic Heart",
    collection: "The Classics",
    collectionId: "classics",
    description:
      "Our smoothest hand-tempered couverture, poured into a heart. Nothing to hide behind.",
    price: 60,
    unit: "each",
    image: "/images/classics.jpg",
    groups: [CHOCOLATE_GROUP],
  },
  {
    id: "velvet-bonbon-box",
    name: "The Velvet Bonbon Box",
    collection: "The Classics",
    collectionId: "classics",
    description:
      "Six filled bonbons — praline, salted ganache and caramel — in a cobalt keepsake box.",
    price: 340,
    unit: "box of 6",
    image: "/images/chocolate-box.jpg",
    badge: "Bestseller",
    groups: [
      {
        id: "filling",
        label: "Choose your filling edit",
        kind: "single",
        choices: [
          { name: "The assorted six" },
          { name: "All praline" },
          { name: "All dark ganache" },
        ],
      },
    ],
  },
  {
    id: "mini-heart-trio",
    name: "Mini Heart Trio",
    collection: "The Classics",
    collectionId: "classics",
    description:
      "Three little hearts — dark, milk and white — for the indecisive romantic.",
    price: 150,
    unit: "box of 3",
    image: "/images/nut-collection.jpg",
    groups: [CHOCOLATE_GROUP],
  },

  // THE NUT COLLECTION
  {
    id: "almond-crunch",
    name: "Almond Crunch",
    collection: "The Nut Collection",
    collectionId: "nut",
    description:
      "Milk or dark chocolate topped with crunchy almond pieces. A little crunch, a little luxury.",
    price: 65,
    unit: "each",
    image: "/images/nut-collection.jpg",
    badge: "Most loved",
    groups: [CHOCOLATE_GROUP],
  },
  {
    id: "pistachio-crunch",
    name: "Pistachio Crunch",
    collection: "The Nut Collection",
    collectionId: "nut",
    description: "Chocolate topped with delicate pistachio pieces and a whisper of sea salt.",
    price: 70,
    unit: "each",
    image: "/images/nut-collection.jpg",
    groups: [CHOCOLATE_GROUP],
  },
  {
    id: "cashew-crunch",
    name: "Cashew Crunch",
    collection: "The Nut Collection",
    collectionId: "nut",
    description: "Smooth chocolate finished with roasted, crunchy cashew pieces.",
    price: 60,
    unit: "each",
    image: "/images/nut-collection.jpg",
    groups: [CHOCOLATE_GROUP],
  },
  {
    id: "nut-medley",
    name: "Nut Medley",
    collection: "The Nut Collection",
    collectionId: "nut",
    description: "A delicious mix of nuts for extra crunch in every single bite.",
    price: 75,
    unit: "each",
    image: "/images/nut-collection.jpg",
    groups: [CHOCOLATE_GROUP],
  },
  {
    id: "nut-heart-four",
    name: "The Nut Collection Box",
    collection: "The Nut Collection",
    collectionId: "nut",
    description:
      "All four nut hearts, nestled in parchment. The easiest way to say thank you.",
    price: 240,
    unit: "box of 4",
    image: "/images/chocolate-box.jpg",
    groups: [CHOCOLATE_GROUP],
  },

  // THE CHOCOLATE BAR COLLECTION
  {
    id: "classic-bar",
    name: "The Classic Bar",
    collection: "The Chocolate Bar Collection",
    collectionId: "bars",
    description: "Your favourite chocolate, simply made. Small snap, big comfort.",
    price: 40,
    unit: "1 bar",
    image: "/images/bar-trio.jpg",
    groups: [CHOCOLATE_GROUP],
  },
  {
    id: "nutty-bar",
    name: "The Nutty Bar",
    collection: "The Chocolate Bar Collection",
    collectionId: "bars",
    description: "Choose any one or two toppings, arranged by hand over smooth chocolate.",
    price: 50,
    unit: "1 bar",
    image: "/images/nut-collection.jpg",
    groups: [
      CHOCOLATE_GROUP,
      {
        id: "toppings",
        label: "Choose one or two toppings",
        kind: "multi",
        max: 2,
        free: true,
        choices: [
          { name: "Cashews" },
          { name: "Almonds" },
          { name: "Pistachios" },
          { name: "Raisins" },
        ],
      },
    ],
  },
  {
    id: "drizzle-splash",
    name: "The Drizzle & Splash Bar",
    collection: "The Chocolate Bar Collection",
    collectionId: "bars",
    description:
      "Choose your finish — thick white lines, or irregular splashes of white chocolate.",
    price: 45,
    unit: "1 bar",
    image: "/images/bar-trio.jpg",
    badge: "New",
    groups: [
      CHOCOLATE_GROUP,
      {
        id: "finish",
        label: "Choose your finish",
        kind: "single",
        choices: [
          { name: "White Drizzle", note: "Thick white chocolate lines" },
          { name: "White Splash", note: "Irregular white chocolate splashes" },
        ],
      },
    ],
  },

  // SIGNATURE BARS
  {
    id: "nut-garden",
    name: "Nut Garden",
    collection: "Signature Bars",
    collectionId: "signature",
    description:
      "A delightful selection of chocolate bars topped with your favourite dry fruits.",
    price: 120,
    unit: "1 bar",
    image: "/images/signature-bar.jpg",
    groups: [
      CHOCOLATE_GROUP,
      {
        id: "toppings",
        label: "Choose up to two toppings",
        kind: "multi",
        max: 2,
        free: true,
        choices: [
          { name: "Almonds" },
          { name: "Cashews" },
          { name: "Pistachios" },
          { name: "Raisins" },
        ],
      },
    ],
  },
  {
    id: "rose-petal-bar",
    name: "Rose Petal Bar",
    collection: "Signature Bars",
    collectionId: "signature",
    description:
      "Rich, smooth chocolate delicately decorated with fragrant rose petals.",
    price: 130,
    unit: "1 bar",
    image: "/images/signature-bar.jpg",
    badge: "Editor's pick",
    groups: [CHOCOLATE_GROUP],
  },
  {
    id: "everything-bar",
    name: "The Everything Bar",
    collection: "Signature Bars",
    collectionId: "signature",
    description:
      "A beautiful combination of assorted dry fruits, generously arranged over rich chocolate.",
    price: 150,
    unit: "1 bar",
    image: "/images/signature-bar.jpg",
    groups: [
      CHOCOLATE_GROUP,
      {
        id: "toppings",
        label: "Choose up to three toppings",
        kind: "multi",
        max: 3,
        free: true,
        choices: [
          { name: "Almonds" },
          { name: "Cashews" },
          { name: "Pistachios" },
          { name: "Raisins" },
        ],
      },
    ],
  },

  // PERSONALISED
  {
    id: "message-bar",
    name: "Your Message, In Chocolate",
    collection: "The Personalised Collection",
    collectionId: "personalised",
    description:
      "Your words or name, hand-piped onto a chocolate bar. Add it to the order note and we'll do the rest.",
    price: 160,
    unit: "1 bar",
    image: "/images/personalised-bar.jpg",
    badge: "Customisable",
    groups: [CHOCOLATE_GROUP],
  },
  {
    id: "name-date-bar",
    name: "The Name & Date Bar",
    collection: "The Personalised Collection",
    collectionId: "personalised",
    description:
      "A date worth remembering, piped in white chocolate. Anniversaries, births and very good Tuesdays.",
    price: 180,
    unit: "1 bar",
    image: "/images/personalised-bar.jpg",
    groups: [CHOCOLATE_GROUP],
  },
  {
    id: "personalised-heart-box",
    name: "The Personalised Heart Box",
    collection: "The Personalised Collection",
    collectionId: "personalised",
    description:
      "Four hearts, one handwritten message card, wrapped in our signature blue.",
    price: 320,
    unit: "box of 4",
    image: "/images/chocolate-box.jpg",
    groups: [CHOCOLATE_GROUP],
  },

  // CRUNCHY
  {
    id: "oreo-crunch",
    name: "The Oreo Crunch Bar",
    collection: "The Crunchy Collection",
    collectionId: "crunchy",
    description:
      "Chocolate loaded with crushed chocolate sandwich cookies. Bright, crunchy, nostalgic.",
    price: 60,
    unit: "1 bar",
    image: "/images/crunchy-bar.jpg",
    groups: [CHOCOLATE_GROUP],
  },
  {
    id: "cookie-crunch",
    name: "The Cookie Crunch Bar",
    collection: "The Crunchy Collection",
    collectionId: "crunchy",
    description:
      "Buttery cookie shards folded through chocolate for a softer, cosier crunch.",
    price: 55,
    unit: "1 bar",
    image: "/images/crunchy-bar.jpg",
    groups: [CHOCOLATE_GROUP],
  },

  // SURPRISE
  {
    id: "ring-bar",
    name: "The Ring Bar",
    collection: "The Surprise Collection",
    collectionId: "surprise",
    description:
      "A chocolate bar with a hidden ring. Tell us the size in your note — we'll keep the secret.",
    price: 499,
    unit: "1 bar",
    image: "/images/surprise-ring.jpg",
    badge: "Ask for the secret",
    groups: [
      CHOCOLATE_GROUP,
      {
        id: "ring-size",
        label: "Ring size",
        helper: "Unsure? Write it in your order note and we'll guide you.",
        kind: "single",
        choices: [
          { name: "Size 10–12" },
          { name: "Size 13–15" },
          { name: "Size 16–18" },
          { name: "Not sure yet" },
        ],
      },
    ],
  },
  {
    id: "secret-message-bar",
    name: "The Secret Message Bar",
    collection: "The Surprise Collection",
    collectionId: "surprise",
    description:
      "A custom message, hidden inside a wrapped bar. Only they will know how to open it.",
    price: 180,
    unit: "1 bar",
    image: "/images/surprise-ring.jpg",
    groups: [CHOCOLATE_GROUP],
  },
];

export type GiftBox = {
  id: string;
  name: string;
  count: string;
  description: string;
  price: number;
  image: string;
};

export const giftBoxes: GiftBox[] = [
  {
    id: "petite-box",
    name: "The Petite Box",
    count: "4 pieces",
    description: "Four nut hearts, wrapped in parchment and cobalt ribbon.",
    price: 279,
    image: "/images/classics.jpg",
  },
  {
    id: "signature-box",
    name: "The Signature Box",
    count: "9 pieces",
    description: "A curated mix of hearts, bars and a personalised note card.",
    price: 649,
    image: "/images/chocolate-box.jpg",
  },
  {
    id: "grand-box",
    name: "The Grand Box",
    count: "16 pieces",
    description: "The full Veloura edit, in a keepsake box made to be reused.",
    price: 1149,
    image: "/images/bar-trio.jpg",
  },
];

export const giftBoxAsItem = (box: GiftBox): MenuItem => ({
  id: box.id,
  name: box.name,
  collection: "The Gift Edit",
  collectionId: "gifting",
  description: box.description,
  price: box.price,
  unit: box.count,
  image: box.image,
  badge: "Hand-wrapped",
  groups: [],
});

export const allOrderableItems: MenuItem[] = [
  ...menuItems,
  ...giftBoxes.map(giftBoxAsItem),
];

export const findItem = (id: string) =>
  allOrderableItems.find((item) => item.id === id);

export const formatINR = (value: number) =>
  `₹${new Intl.NumberFormat("en-IN").format(value)}`;

export type OrderLine = {
  lineId: string;
  itemId: string;
  selections: { groupId: string; choice: string }[];
  qty: number;
};

export const lineUnitPrice = (line: OrderLine) => {
  const item = findItem(line.itemId);
  if (!item) return 0;
  const deltas = line.selections.reduce((sum, selection) => {
    const group = item.groups?.find((entry) => entry.id === selection.groupId);
    const choice = group?.choices.find((entry) => entry.name === selection.choice);
    return sum + (choice?.delta ?? 0);
  }, 0);
  return item.price + deltas;
};

export const lineTotal = (line: OrderLine) => lineUnitPrice(line) * line.qty;

export const orderTotal = (lines: OrderLine[]) =>
  lines.reduce((sum, line) => sum + lineTotal(line), 0);

export const orderCount = (lines: OrderLine[]) =>
  lines.reduce((sum, line) => sum + line.qty, 0);

export const defaultSelections = (item: MenuItem) => {
  const selections: { groupId: string; choice: string }[] = [];
  item.groups?.forEach((group) => {
    if (group.kind === "single" && group.choices[0]) {
      selections.push({ groupId: group.id, choice: group.choices[0].name });
    }
  });
  return selections;
};

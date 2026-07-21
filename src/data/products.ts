import activeMan from "@/assets/active-man.asset.json";
import addiction from "@/assets/addiction.asset.json";
import barcelona from "@/assets/barcelona.asset.json";
import blackMusk from "@/assets/black-musk.asset.json";
import crush from "@/assets/crush.asset.json";
import forestSpice from "@/assets/forest-spice.asset.json";
import goodnessOud from "@/assets/goodness-oud.asset.json";
import romantic from "@/assets/romantic.asset.json";

export type CollectionGroup = "bold-dynamic" | "deep-rich" | "soft-expressive";

export interface Product {
  name: string;
  slug: string;
  productType: "Deodorant Body Spray";
  size: "250 ml";
  fluidOunce: "8.45 fl. oz.";
  shortDescription: string;
  detailedDescription: string;
  image: string | null;
  accent: string;
  accentSoft: string;
  gradient: string;
  collection: CollectionGroup;
  visualIdentity: string;
  seoTitle: string;
  metaDescription: string;
  imageAlt: string;
}

export const collections: Record<CollectionGroup, { title: string; description: string }> = {
  "bold-dynamic": {
    title: "Bold & Dynamic",
    description:
      "Confident visual identities created for energetic and expressive everyday positioning.",
  },
  "deep-rich": {
    title: "Deep & Rich",
    description:
      "Darker, richer and more dramatic body spray personalities with a premium presence.",
  },
  "soft-expressive": {
    title: "Soft & Expressive",
    description:
      "Fresh, graceful and expressive variants designed for diverse fragrance preferences.",
  },
};

const detail = (name: string, short: string) =>
  `${short} Presented in a 250 ml / 8.45 fl. oz. format, ${name} is developed as part of the Arise Paris deodorant body spray collection — a diverse range curated for distributors, wholesalers and retailers looking to offer a distinctive personal-care line with strong shelf presence and everyday appeal.`;

export const products: Product[] = [
  {
    name: "Active Man",
    slug: "active-man",
    productType: "Deodorant Body Spray",
    size: "250 ml",
    fluidOunce: "8.45 fl. oz.",
    shortDescription:
      "A confident everyday body spray presented with a bold blue identity for an energetic and modern fragrance experience.",
    detailedDescription: detail(
      "Active Man",
      "A confident everyday body spray presented with a bold blue identity for an energetic and modern fragrance experience.",
    ),
    image: activeMan.url,
    accent: "#1E4C8A",
    accentSoft: "#EAF0F8",
    gradient: "linear-gradient(160deg, #0F2542 0%, #1E4C8A 100%)",
    collection: "bold-dynamic",
    visualIdentity: "Deep blue, black — energetic and confident",
    seoTitle: "Active Man Deodorant Body Spray | Arise Paris",
    metaDescription:
      "Active Man 250 ml deodorant body spray by Arise Paris — a confident blue identity available for wholesale and distribution enquiries.",
    imageAlt: "Arise Paris Active Man 250 ml deodorant body spray",
  },
  {
    name: "Addiction",
    slug: "addiction",
    productType: "Deodorant Body Spray",
    size: "250 ml",
    fluidOunce: "8.45 fl. oz.",
    shortDescription:
      "A bold body spray with a dark and expressive identity, created for those who prefer a strong and distinctive presence.",
    detailedDescription: detail(
      "Addiction",
      "A bold body spray with a dark and expressive identity, created for those who prefer a strong and distinctive presence.",
    ),
    image: addiction.url,
    accent: "#7A1E1E",
    accentSoft: "#F3E7E7",
    gradient: "linear-gradient(160deg, #1A0808 0%, #7A1E1E 100%)",
    collection: "deep-rich",
    visualIdentity: "Black, deep red — bold and intense",
    seoTitle: "Addiction Deodorant Body Spray | Arise Paris",
    metaDescription:
      "Addiction 250 ml deodorant body spray by Arise Paris — a bold, expressive variant for B2B fragrance distribution.",
    imageAlt: "Arise Paris Addiction 250 ml deodorant body spray",
  },
  {
    name: "Barcelona",
    slug: "barcelona",
    productType: "Deodorant Body Spray",
    size: "250 ml",
    fluidOunce: "8.45 fl. oz.",
    shortDescription:
      "A vibrant city-inspired body spray with an energetic visual character and a warm, expressive personality.",
    detailedDescription: detail(
      "Barcelona",
      "A vibrant city-inspired body spray with an energetic visual character and a warm, expressive personality.",
    ),
    image: barcelona.url,
    accent: "#C55A1E",
    accentSoft: "#FAEDDF",
    gradient: "linear-gradient(160deg, #7A2E10 0%, #E39A28 100%)",
    collection: "bold-dynamic",
    visualIdentity: "Yellow, orange, red — warm and vibrant",
    seoTitle: "Barcelona Deodorant Body Spray | Arise Paris",
    metaDescription:
      "Barcelona 250 ml deodorant body spray by Arise Paris — a warm, vibrant variant available for wholesale enquiries.",
    imageAlt: "Arise Paris Barcelona 250 ml deodorant body spray",
  },
  {
    name: "Black Musk",
    slug: "black-musk",
    productType: "Deodorant Body Spray",
    size: "250 ml",
    fluidOunce: "8.45 fl. oz.",
    shortDescription:
      "A deep musk-inspired body spray with a dark, sophisticated appearance and a rich, confident character.",
    detailedDescription: detail(
      "Black Musk",
      "A deep musk-inspired body spray with a dark, sophisticated appearance and a rich, confident character.",
    ),
    image: blackMusk.url,
    accent: "#5C3E7A",
    accentSoft: "#EEE9F3",
    gradient: "linear-gradient(160deg, #0A0A0A 0%, #5C3E7A 100%)",
    collection: "deep-rich",
    visualIdentity: "Black, charcoal, purple — mysterious",
    seoTitle: "Black Musk Deodorant Body Spray | Arise Paris",
    metaDescription:
      "Black Musk 250 ml deodorant body spray by Arise Paris — a sophisticated musk-inspired variant for distributors.",
    imageAlt: "Arise Paris Black Musk 250 ml deodorant body spray",
  },
  {
    name: "Crush",
    slug: "crush",
    productType: "Deodorant Body Spray",
    size: "250 ml",
    fluidOunce: "8.45 fl. oz.",
    shortDescription:
      "A soft and expressive body spray with a graceful visual style, designed for a fresh and memorable everyday presence.",
    detailedDescription: detail(
      "Crush",
      "A soft and expressive body spray with a graceful visual style, designed for a fresh and memorable everyday presence.",
    ),
    image: crush.url,
    accent: "#A0367A",
    accentSoft: "#F5E8F0",
    gradient: "linear-gradient(160deg, #E7D9E8 0%, #A0367A 100%)",
    collection: "soft-expressive",
    visualIdentity: "Ivory, purple, pink — expressive",
    seoTitle: "Crush Deodorant Body Spray | Arise Paris",
    metaDescription:
      "Crush 250 ml deodorant body spray by Arise Paris — a graceful and expressive variant for B2B partners.",
    imageAlt: "Arise Paris Crush 250 ml deodorant body spray",
  },
  {
    name: "Forest Spice",
    slug: "forest-spice",
    productType: "Deodorant Body Spray",
    size: "250 ml",
    fluidOunce: "8.45 fl. oz.",
    shortDescription:
      "A green and nature-inspired body spray combining a fresh visual identity with a warm, spicy character.",
    detailedDescription: detail(
      "Forest Spice",
      "A green and nature-inspired body spray combining a fresh visual identity with a warm, spicy character.",
    ),
    image: forestSpice.url,
    accent: "#4F7A3B",
    accentSoft: "#EAF1E4",
    gradient: "linear-gradient(160deg, #B7CFA1 0%, #4F7A3B 100%)",
    collection: "soft-expressive",
    visualIdentity: "Green, botanical — fresh and nature-inspired",
    seoTitle: "Forest Spice Deodorant Body Spray | Arise Paris",
    metaDescription:
      "Forest Spice 250 ml deodorant body spray by Arise Paris — a fresh, nature-inspired variant for retail partners.",
    imageAlt: "Arise Paris Forest Spice 250 ml deodorant body spray",
  },
  {
    name: "Goodness Oud",
    slug: "goodness-oud",
    productType: "Deodorant Body Spray",
    size: "250 ml",
    fluidOunce: "8.45 fl. oz.",
    shortDescription:
      "A rich oud-inspired body spray presented in warm amber and brown tones for a deep and refined fragrance experience.",
    detailedDescription: detail(
      "Goodness Oud",
      "A rich oud-inspired body spray presented in warm amber and brown tones for a deep and refined fragrance experience.",
    ),
    image: goodnessOud.url,
    accent: "#8A5A1E",
    accentSoft: "#F3E9D9",
    gradient: "linear-gradient(160deg, #2A1608 0%, #B99A5B 100%)",
    collection: "deep-rich",
    visualIdentity: "Brown, amber, gold — rich",
    seoTitle: "Goodness Oud Deodorant Body Spray | Arise Paris",
    metaDescription:
      "Goodness Oud 250 ml deodorant body spray by Arise Paris — a refined oud-inspired variant for wholesale and export.",
    imageAlt: "Arise Paris Goodness Oud 250 ml deodorant body spray",
  },
  {
    name: "Romantic",
    slug: "romantic",
    productType: "Deodorant Body Spray",
    size: "250 ml",
    fluidOunce: "8.45 fl. oz.",
    shortDescription:
      "A warm and elegant body spray with a romantic visual identity, created for graceful and expressive everyday wear.",
    detailedDescription: detail(
      "Romantic",
      "A warm and elegant body spray with a romantic visual identity, created for graceful and expressive everyday wear.",
    ),
    image: romantic.url,
    accent: "#B93A3A",
    accentSoft: "#F7E7E7",
    gradient: "linear-gradient(160deg, #F5EBD8 0%, #B93A3A 100%)",
    collection: "soft-expressive",
    visualIdentity: "Ivory, red — warm and elegant",
    seoTitle: "Romantic Deodorant Body Spray | Arise Paris",
    metaDescription:
      "Romantic 250 ml deodorant body spray by Arise Paris — a warm, elegant variant for retail distribution.",
    imageAlt: "Arise Paris Romantic 250 ml deodorant body spray",
  },
  {
    name: "Signature",
    slug: "signature",
    productType: "Deodorant Body Spray",
    size: "250 ml",
    fluidOunce: "8.45 fl. oz.",
    shortDescription:
      "A clean and refined body spray with a polished signature identity, suitable for a versatile and confident presence.",
    detailedDescription: detail(
      "Signature",
      "A clean and refined body spray with a polished signature identity, suitable for a versatile and confident presence.",
    ),
    image: null,
    accent: "#5F7A94",
    accentSoft: "#EAEEF3",
    gradient: "linear-gradient(160deg, #B9BDC5 0%, #5F7A94 100%)",
    collection: "bold-dynamic",
    visualIdentity: "Silver, light blue — clean and refined",
    seoTitle: "Signature Deodorant Body Spray | Arise Paris",
    metaDescription:
      "Signature 250 ml deodorant body spray by Arise Paris — a clean, refined variant for B2B partners.",
    imageAlt: "Arise Paris Signature 250 ml deodorant body spray",
  },
  {
    name: "Sweet Love",
    slug: "sweet-love",
    productType: "Deodorant Body Spray",
    size: "250 ml",
    fluidOunce: "8.45 fl. oz.",
    shortDescription:
      "A soft and sweet body spray with a delicate pink identity, designed to express warmth, charm and everyday elegance.",
    detailedDescription: detail(
      "Sweet Love",
      "A soft and sweet body spray with a delicate pink identity, designed to express warmth, charm and everyday elegance.",
    ),
    image: null,
    accent: "#D48AA8",
    accentSoft: "#FBEEF3",
    gradient: "linear-gradient(160deg, #FCE4EC 0%, #D48AA8 100%)",
    collection: "soft-expressive",
    visualIdentity: "White, soft pink — delicate and sweet",
    seoTitle: "Sweet Love Deodorant Body Spray | Arise Paris",
    metaDescription:
      "Sweet Love 250 ml deodorant body spray by Arise Paris — a delicate, expressive variant for retail markets.",
    imageAlt: "Arise Paris Sweet Love 250 ml deodorant body spray",
  },
  {
    name: "Temptation",
    slug: "temptation",
    productType: "Deodorant Body Spray",
    size: "250 ml",
    fluidOunce: "8.45 fl. oz.",
    shortDescription:
      "A captivating body spray with a deep and dramatic visual identity for a bold and memorable fragrance experience.",
    detailedDescription: detail(
      "Temptation",
      "A captivating body spray with a deep and dramatic visual identity for a bold and memorable fragrance experience.",
    ),
    image: null,
    accent: "#7A1E4A",
    accentSoft: "#F1E1EA",
    gradient: "linear-gradient(160deg, #1A0812 0%, #B0246E 100%)",
    collection: "deep-rich",
    visualIdentity: "Black, burgundy, magenta — dramatic",
    seoTitle: "Temptation Deodorant Body Spray | Arise Paris",
    metaDescription:
      "Temptation 250 ml deodorant body spray by Arise Paris — a bold, dramatic variant for distribution partners.",
    imageAlt: "Arise Paris Temptation 250 ml deodorant body spray",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsByCollection = (group: CollectionGroup) =>
  products.filter((p) => p.collection === group);
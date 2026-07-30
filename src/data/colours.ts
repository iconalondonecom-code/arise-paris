// Centralised Product Colour Journey palette (WordPress-migration friendly).
export interface ProductColour {
  glow: string;
  mid: string;
  deep: string;
}

export const journeyColours: Record<string, ProductColour> = {
  "active-man": { glow: "#1069D8", mid: "#0A2451", deep: "#081224" },
  addiction: { glow: "#A62520", mid: "#3D090B", deep: "#09090B" },
  barcelona: { glow: "#EF8A19", mid: "#D44318", deep: "#3A1604" },
  "black-musk": { glow: "#6A3C82", mid: "#211226", deep: "#08090C" },
  crush: { glow: "#C02E7B", mid: "#8B3CA5", deep: "#1A0A20" },
  "forest-spice": { glow: "#68A84A", mid: "#274D2D", deep: "#08130C" },
  "goodness-oud": { glow: "#B87621", mid: "#5A3012", deep: "#170B04" },
  romantic: { glow: "#E43D4E", mid: "#8F1C32", deep: "#1B060C" },
  signature: { glow: "#4E83C5", mid: "#2B4A70", deep: "#0A1424" },
  "sweet-love": { glow: "#E85A9F", mid: "#8E3462", deep: "#1D0A14" },
  temptation: { glow: "#B21962", mid: "#54122D", deep: "#190A14" },
};

export const colourOf = (slug: string): ProductColour =>
  journeyColours[slug] ?? { glow: "#D8AD52", mid: "#10102D", deep: "#05091A" };

/** Full-bleed hero background for the currently selected product. */
export const journeyBackground = (slug: string) => {
  const c = colourOf(slug);
  return [
    `radial-gradient(900px 620px at 12% 60%, ${c.glow}55 0%, transparent 70%)`,
    `radial-gradient(1000px 700px at 50% 35%, ${c.mid}cc 0%, transparent 72%)`,
    `radial-gradient(760px 560px at 88% 62%, ${c.glow}44 0%, transparent 72%)`,
    `radial-gradient(1100px 800px at 50% 110%, ${c.deep} 0%, transparent 70%)`,
    `linear-gradient(180deg, #05091A 0%, #07142F 45%, #10102D 100%)`,
  ].join(", ");
};

/** Hero order — the approved Colour Journey sequence. */
export const heroOrder = [
  "active-man",
  "addiction",
  "barcelona",
  "black-musk",
  "forest-spice",
  "sweet-love",
  "temptation",
  "crush",
  "goodness-oud",
  "romantic",
  "signature",
];
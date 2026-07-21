import ariseLogoAsset from "@/assets/arise-logo.asset.json";
import ronakLogoAsset from "@/assets/ronak-logo.asset.json";

export const site = {
  brand: "Arise Paris",
  parent: "Ronak Group",
  tagline: "A brand of Ronak Group",
  logo: ariseLogoAsset.url,
  ronakLogo: ronakLogoAsset.url,
  email: "contact@ronak.global",
  phoneUAE: "+971 50 137 7674",
  phoneIndia: "+91 99985 69923",
  whatsappUAE: "https://wa.me/971501377674",
  whatsappIndia: "https://wa.me/919998569923",
  whatsappMessage:
    "Hello, I am interested in Arise Paris products for B2B distribution. Please share more information.",
  address: {
    line1: "Ronak Group Building",
    line2: "Gotri Road, Next to Nilgiri Terrace",
    line3: "Gadapura, Hari Nagar",
    city: "Vadodara, Gujarat 390021",
    country: "India",
  },
  ronakUrl: "https://ronak.global/",
  copyright: "© 2026 Arise Paris — A Ronak Group Brand. All rights reserved.",
};

export const waLink = (msg = site.whatsappMessage) =>
  `${site.whatsappUAE}?text=${encodeURIComponent(msg)}`;
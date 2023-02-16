import "dotenv/config";

export default {
  expo: {
    name: "servicebarbershop",
    slug: "servicebarbershop",
    orientation: "portrait",
    version: "1.0.0",
    assetBundlePatterns: ["**/*"],
    extra: {
      BASE_URL: process.env.BASE_URL,
    }
  },
};

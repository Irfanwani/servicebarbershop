import "dotenv/config";

export default {
  expo: {
    jsEngine: "hermes",
    name: "servicebarbershop",
    slug: "servicebarbershop",
    orientation: "portrait",
    version: "1.0.0",
    assetBundlePatterns: ["**/*"],
    extra: {
      BASE_URL: process.env.BASE_URL,
      BASE_URL_PROD: process.env.BASE_URL_PROD,
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_API_KEY,
        },
      },
    },
  },
};

import "dotenv/config";

export default {
  expo: {
    plugins: [
      "@react-native-firebase/app",
      [
        "expo-notifications",
        {
          icon: "./android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png",
          color: "#ffffff",
        },
      ],
    ],
    jsEngine: "hermes",
    name: "servicebarbershop",
    slug: "servicebarbershop",
    orientation: "portrait",
    version: "1.0.0",
    assetBundlePatterns: ["**/*"],
    extra: {
      BASE_URL: process.env.BASE_URL,
      BASE_URL_PROD: process.env.BASE_URL_PROD,
      eas: {
        projectId: "19633f78-a9e8-4eaf-b161-5e339c4d4687",
      },
    },
    android: {
      package: "com.servicebarbershop",
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_API_KEY,
        },
      },
    },
  },
};

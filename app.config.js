import 'dotenv/config';

export default {
  expo: {
    name: 'weather',
    slug: 'weather',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: 'com.ifmsedu2025.weather_app_tads5',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-location',
        {
          isAndroidBackgroundLocationEnabled: 'Allow the APP to use your location.',
        },
      ],
    ],
    extra: {
      OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
      "eas": {
        "projectId": "a440dd6d-3cba-40e2-9f98-77b7fa270b58"
      }
    },
  },
};

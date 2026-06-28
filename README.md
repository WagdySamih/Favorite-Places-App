# Favorite Places App

A React Native learning app built with Expo. Save your favorite places with a photo and location — stored locally on your device.

## Features

- Take or pick a photo for each place
- Pick a location from an interactive Google Map
- Auto-fetch address from coordinates via Geocoding API
- Persist all places locally with SQLite (no backend needed)

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React Native + Expo SDK 56 |
| Navigation | React Navigation (Native Stack) |
| Map | `react-native-maps` + Google Maps API |
| Camera | `expo-image-picker` |
| Location | `expo-location` |
| Database | `expo-sqlite` |

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- A [Google Cloud](https://console.cloud.google.com/) API key with **Maps SDK** and **Geocoding API** enabled

### Installation

```bash
git clone https://github.com/your-username/favorite-places-app.git
cd favorite-places-app
npm install
```

### Environment Setup

Create an `app.config.js` in the root:

```js
export default {
  expo: {
    name: "favorite-places-app",
    // ...
    extra: {
      googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    },
    android: {
      config: {
        googleMaps: {
          apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
        },
      },
    },
  },
};
```

### Run

```bash
npm start          # Expo dev client
npm run android    # Android
npm run ios        # iOS
```

## Project Structure

```
favorite-places-app/
├── components/        # Reusable UI components
├── screens/           # App screens (PlacesList, AddPlace, Map, PlaceDetail)
├── util/              # Location & geocoding helpers
├── constants/         # Colors, styles
├── models/            # types 
└── app.config.js      # Expo config + API keys
```

# AgroClima 🌦️🌱

AgroClima is a modern agricultural weather monitoring platform built with Vue 3 and Vite.
The application integrates official IPMA meteorological data and transforms it into useful climate insights and agricultural recommendations for farmers and rural activities in Portugal.

The platform combines real-time weather observations, forecasts, official weather warnings, and crop-based agricultural intelligence in a responsive and user-friendly dashboard.

---

# Features

## 🌤️ Real-Time Weather Monitoring

* Current weather conditions by district
* Temperature monitoring
* Wind intensity and direction
* Atmospheric pressure
* Humidity monitoring
* Accumulated precipitation
* Nearest weather station detection

## 📅 Daily Forecasts

* Multi-day forecast system
* Minimum and maximum temperatures
* Probability of precipitation
* Wind classification
* Dynamic district selection

## ⚠️ Official IPMA Warning System

The application displays official IPMA weather alerts:

* Thunderstorms
* Heavy rain
* Strong wind
* Heat waves
* Cold weather
* Fog
* Snow
* Maritime agitation

Warning severity levels:

* 🟡 Yellow
* 🟠 Orange
* 🔴 Red

Warnings are automatically filtered by district.

---

# 🌱 Agricultural Intelligence

AgroClima includes a crop monitoring system capable of generating agricultural recommendations based on meteorological conditions.

The system evaluates:

* High temperatures
* Frost conditions
* Rain probability
* Humidity levels
* Wind intensity
* Official weather warnings

## Smart Agricultural Alerts

Examples of generated alerts:

* Avoid spraying during strong wind
* Irrigation monitoring recommendations
* Heat stress warnings
* Frost risk alerts
* Fungus development risk
* Natural irrigation opportunities

---

# Project Structure

```text id="1vr68o"
src/
 ├── components/
 │    ├── AboutCard.vue
 │    ├── CropCard.vue
 │    ├── InfoCards.vue
 │    └── WeatherCard.vue
 │
 ├── services/
 │    ├── agricultureRules.js
 │    ├── api.js
 │    └── weatherUtils.js
 │
 ├── App.vue
 └── main.js
```

---

# Main Components

## WeatherCard.vue

Responsible for:

* District selection
* Weather observations
* Daily forecasts
* Active IPMA warnings
* Weather data visualization

## CropCard.vue

Handles agricultural monitoring:

* Crop selection
* Agricultural alerts
* Weather-based recommendations
* Climate risk analysis

## InfoCards.vue

Displays summarized climate indicators:

* Temperature indicators
* Rain probability
* Wind intensity
* Humidity analysis

## AboutCard.vue

Provides general information about the platform and project purpose.

---

# Services

## api.js

Handles all API communication:

* Weather forecasts
* Current observations
* Warnings
* Meteorological stations
* District metadata

## weatherUtils.js

Contains weather helper utilities:

* Warning filtering
* Nearest station calculation
* Data formatting

## agricultureRules.js

Contains agricultural intelligence rules and crop-specific logic used to generate alerts and recommendations dynamically.

---

# Tech Stack

* Vue 3
* Vite
* Bootstrap 5
* JavaScript (ES6)
* IPMA API

---

# Installation

Clone the repository:

```bash id="jwk0so"
git clone https://github.com/danielbailote-1998/agroclima.git
```

Enter the project folder:

```bash id="q2a4ik"
cd agroclima
```

Install dependencies:

```bash id="pq2ysf"
npm install
```

Run the development server:

```bash id="b4b7f2"
npm run dev
```

---

# Production Build

```bash id="f3v18g"
npm run build
```

---

# Deploy to GitHub Pages

```bash id="pukggo"
npm run deploy
```

---

# Future Improvements

* 🗺️ Interactive weather maps
* 📊 Historical weather analytics
* 🌱 Crop growth analysis
* 🔔 Real-time push notifications
* 📱 Progressive Web App (PWA)
* 🌍 Multi-language support
* 📡 Live weather updates

---

# Author

Developed by Daniel Bailote.

GitHub:

https://github.com/danielbailote-1998

---


# 🚗 Car/Bike Rentals App

Welcome to the **Car/Bike Rentals** web application! A responsive platform where users can register, browse available vehicles, book rentals, and manage their bookings in real-time.

🌐 **Live Demo**:  
🔗 [https://car-bike-rentals.web.app](https://car-bike-rentals.web.app)

--- 

## ✨ Features

- 🔐 User & Admin Authentication (Firebase Auth)
- 🚙 Browse cars/bikes with filters
- 📅 Book vehicles with pickup/drop details
- 💰 Apply Promo Codes & View Pricing
- 📦 View & Manage Bookings
- ❤️ Save Favorite Vehicles (localStorage)
- 📂 Firebase Firestore integration
- 🧑‍💻 Role-based access control for Admin
- 📲 Responsive on mobile & desktop

---

## 🛠️ Tech Stack

- ⚛️ React + Vite
- 🔥 Firebase (Auth, Firestore, Hosting)
- 🌐 React Router DOM
- 🎨 Tailwind CSS
- 💾 Firestore Database

---

## 🚀 Getting Started Locally

To run the project on your local machine:

```bash
git clone https://github.com/Supusha1244/car-bike-rental-app.git
cd car-bike-rental-app
npm install
npm run dev
```

## 🔐 Firebase Setup
Go to Firebase Console and:
1. Create a Firebase Project
2. Enable the following services:
 - 🔑 Authentication (Email/Password)
 - 🔥 Firestore Database
 - 🌐 Firebase Hosting
3. Add your Firebase configuration to the firebase.js file.

## 👤 Roles
Admin can add/edit vehicles, view all bookings.

User can register, browse & book vehicles, and view/cancel their bookings.

## 📦 Deployment
This app is deployed via Firebase Hosting : https://car-bike-rentals.firebaseapp.com

```bash

npm run build
firebase deploy
```

## 🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

Made with ❤️ by Supusha Bharti


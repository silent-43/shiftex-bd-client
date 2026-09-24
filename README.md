# ShiftexBD

A modern full-stack parcel delivery platform for booking, payment, tracking, and delivery management.

## 🌐 Live Project

- **Live Website:** https://shiftex-bd.web.app
- **Backend API:** https://shiftex-bd-server.onrender.com
- **Client Repository:** https://github.com/silent-43/shiftex-bd-client
- **Server Repository:** https://github.com/silent-43/shiftex-bd-server

## ✨ Features

- 🔐 Firebase Authentication — Email/Password, Google Sign-In, Password Reset & Profile
- 🔑 Role-Based Access — User, Admin & Rider workflows
- 🛡️ Multi-Layer Security — Protected Routes, JWT Authorization, Backend Role Verification & Admin Route Protection
- 📦 Parcel Management — Booking, sender/receiver info, parcel type, weight, location, status & details
- 🆔 Tracking — Automatic tracking ID generation & parcel tracking
- 💳 Stripe Payments — Secure Checkout, payment verification, transaction ID & payment history
- 💰 Dynamic Pricing — Weight-based, within-city & outside-city delivery charges
- 📊 Dashboard — Responsive layout, collapsible sidebar, mobile drawer & role-based navigation
- 👨‍💼 Admin — User management, rider approval, rider assignment, parcel & warehouse management
- 🚴 Rider — Assigned parcels, pickup, status updates, warehouse handoff, OTP delivery & earnings workflow
- 📍 Coverage — Interactive Bangladesh map, service centers, district search & 64-district coverage
- 🏠 Home — Hero carousel, deliveryman section, How It Works, Why Choose Us, FAQ & CTA
- ℹ️ About Us — Company information, services, features & interactive Learn More modal
- 📞 Contact — Contact form, validation, EmailJS, FAQ & support information
- 📱 Responsive — Mobile, tablet & desktop friendly UI

## 🛠️ Technologies

### Frontend

- React.js
- React Router
- Tailwind CSS
- DaisyUI
- TanStack React Query
- Axios
- Firebase Authentication
- React Hook Form
- React Leaflet
- React Icons
- React Responsive Carousel
- SweetAlert2
- EmailJS
- Lottie

### Backend

- Node.js
- Express.js
- MongoDB
- Firebase Admin
- Stripe
- REST API
- Crypto

### Deployment

- Firebase Hosting
- Render

## 💰 Delivery Pricing

| Type                | Within City | Outside City |
| ------------------- | ----------: | -----------: |
| Document            |         ৳60 |          ৳80 |
| Non-Document (≤3kg) |        ৳110 |         ৳150 |

- **Above 3kg:** +৳40/kg for extra weight
- **Outside City:** Additional ৳40 charge
- **Example — 5kg:** ৳190 within city / ৳230 outside city

## 🔒 Security

ShiftexBD implements multiple layers of access control:

- Firebase Authentication
- JWT-based API Authorization
- Protected Frontend Routes
- Backend Role Verification
- Admin-only Route Protection
- Role-based Dashboard Navigation

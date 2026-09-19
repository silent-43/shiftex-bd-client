# ShiftexBD

A modern full-stack parcel delivery platform for parcel booking, payment, tracking, and delivery management.

## 🌐 Live Project

- **Live Website:** https://shiftex-bd.web.app
- **Backend API:** https://shiftex-bd-server.onrender.com
- **Client Repository:** https://github.com/silent-43/shiftex-bd-client
- **Server Repository:** https://github.com/silent-43/shiftex-bd-server

---

## ✨ Features

### 🔐 Authentication

- Email & Password Authentication
- Google Sign-In
- Password Reset
- User Profile
- Logout
- Protected Routes
- Role-Based Access Structure

### 📦 Parcel Management

- Send Parcel
- Sender & Receiver Information
- Parcel Type & Weight
- Delivery Location
- Automatic Delivery Charge Calculation
- Parcel Booking
- My Parcels
- Parcel Details
- Parcel Status
- Tracking ID

### 💳 Payment

- Stripe Payment Integration
- Secure Checkout
- Payment Verification
- Payment Status
- Transaction ID
- Payment Records
- Automatic Tracking ID Generation After Successful Payment

### 📊 Dashboard

- Responsive Dashboard Layout
- Sidebar Navigation
- Drawer-Based Navigation
- Dashboard Home
- My Parcels
- Role-Based Dashboard Structure
- User, Admin & Rider Workflow Structure

### 👨‍💼 Admin

- Admin Dashboard Structure
- Parcel Management
- Rider Management
- Rider Assignment
- Parcel Status Management
- Warehouse Management Workflow
- Delivery Operation Workflow

### 🚴 Rider

- Rider Dashboard Structure
- Assigned Parcel Workflow
- Parcel Pickup
- Parcel Status Update
- Warehouse Handoff
- OTP-Based Delivery Confirmation
- Delivery History
- Earnings Workflow

### 📍 Coverage

- Interactive Bangladesh Map
- React Leaflet Integration
- Service Center Markers
- District Coverage Information
- Service Center Popups
- District Search
- Map Navigation with `flyTo()`
- Coverage Across 64 Districts

### 🏠 Home Page

- Responsive Navbar
- ShiftexBD Branding
- Authentication Buttons
- Hero Carousel
- Deliveryman Section
- How It Works
- Why Choose Us
- FAQ
- Call-to-Action
- Responsive Footer

### ℹ️ About Us

- Company Introduction
- Service Information
- Feature Cards
- Why Choose ShiftexBD
- Interactive Learn More Modal
- Detailed Information Without Page Navigation

### 💰 Pricing

- Document Delivery Pricing
- Non-Document Delivery Pricing
- Weight-Based Pricing
- Within-City & Outside-City Charges
- Pricing Cards
- Pricing Table
- Example Calculations

### 📞 Contact Us

- Contact Information
- Contact Form
- Form Validation
- EmailJS Integration
- SweetAlert2 Notifications
- FAQ & Support Information
- Responsive Design

---

## 🛠️ Technologies

### Frontend

- React.js
- React Router
- Tailwind CSS
- DaisyUI
- React Icons
- React Responsive Carousel
- React Leaflet
- TanStack React Query
- Axios
- Firebase Authentication
- React Hook Form
- SweetAlert2
- EmailJS

### Backend

- Node.js
- Express.js
- MongoDB
- Firebase Admin
- REST API
- Stripe
- Crypto

### Deployment

- Firebase Hosting
- Render

---

## 💰 Delivery Pricing

### Document

| Delivery Type           | Charge |
| ----------------------- | -----: |
| Within City             |    ৳60 |
| Outside City / District |    ৳80 |

### Non-Document — Up to 3kg

| Delivery Type           | Charge |
| ----------------------- | -----: |
| Within City             |   ৳110 |
| Outside City / District |   ৳150 |

### Above 3kg

- Additional **৳40 per kg**
- Outside-city deliveries include an additional **৳40 charge**

---

## 🔄 Parcel Workflow

```text
User
  ↓
Book Parcel
  ↓
Calculate Delivery Charge
  ↓
Stripe Payment
  ↓
Payment Verification
  ↓
Generate Tracking ID
  ↓
Admin Assignment
  ↓
Rider Pickup
  ↓
Warehouse / Sorting
  ↓
Delivery
  ↓
OTP Verification
  ↓
Delivered
```

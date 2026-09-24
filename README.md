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
- BDT (৳) Currency Support
- Secure Stripe Checkout
- Payment Verification
- Payment Status
- Transaction ID
- Payment Records
- Automatic Tracking ID Generation After Successful Payment
- Payment Amount Stored in BDT in MongoDB
- Stripe Amount Converted from BDT to Poisha Automatically

### 📊 Dashboard

- Responsive Dashboard Layout
- Collapsible Sidebar Navigation
- Mobile Drawer Navigation
- Dashboard Home
- My Parcels
- Payment History
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
- BDT Currency Support

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

All delivery charges are calculated and displayed in **Bangladeshi Taka (BDT / ৳)**.

### 📄 Document

| Delivery Type           | Charge |
| ----------------------- | -----: |
| Within City             |    ৳60 |
| Outside City / District |    ৳80 |

### 📦 Non-Document — Up to 3kg

| Delivery Type           | Charge |
| ----------------------- | -----: |
| Within City             |   ৳110 |
| Outside City / District |   ৳150 |

### ⚖️ Non-Document — Above 3kg

For parcels weighing more than 3kg:

- Additional **৳40 per kg** is added for the extra weight.
- Outside-city deliveries include an additional **৳40 charge**.

### 🧮 Pricing Examples

#### Document

- Within City → **৳60**
- Outside City → **৳80**

#### Non-Document — 3kg or Less

- Within City → **৳110**
- Outside City → **৳150**

#### Non-Document — Above 3kg

For example, a 5kg parcel:

- Base charge = ৳110
- Extra weight = 5kg - 3kg = 2kg
- Extra weight charge = 2 × ৳40 = ৳80
- Total within-city charge = **৳190**

For outside-city delivery:

- Base charge = ৳150
- Extra weight charge = ৳80
- Total outside-city charge = **৳230**

---

## 💳 Payment Amount Handling

ShiftexBD uses **Stripe Checkout with BDT currency**.

The parcel cost is stored and displayed as the actual BDT amount.

For example:

```text
Parcel Cost
৳80
```

# ShiftexBD

A modern full-stack parcel delivery platform for booking, payment, tracking, and delivery management.

## 🌐 Live Project

- **Live Website:** https://shiftex-bd.web.app
- **Backend API:** https://shiftex-bd-server.onrender.com
- **Client Repository:** https://github.com/silent-43/shiftex-bd-client
- **Server Repository:** https://github.com/silent-43/shiftex-bd-server

---

## ✨ Features

### 🔐 Authentication & Authorization

- Firebase Authentication
- Email/Password Authentication
- Google Sign-In
- Password Reset
- User Profile Information
- Protected Frontend Routes
- JWT-based API Authorization
- Backend Role Verification
- Role-Based Dashboard Access
- Admin-only Route Protection

---

### 📦 Parcel Management

- Create and book parcels
- Sender and receiver information
- Document and non-document parcel types
- Weight-based pricing
- Same District and Outside District delivery pricing
- Parcel payment management
- Parcel details and delivery status
- Edit parcel information
- Delete unpaid parcels
- Unique parcel tracking ID
- My Parcels management table
- Paid and unpaid parcel status
- Delivery status tracking

---

### 🆔 Parcel Tracking

- Automatic Tracking ID generation
- Unique ShiftexBD Tracking ID
- Tracking ID connected with parcel and payment
- Delivery status progression
- Tracking history stored in MongoDB
- Timeline-based parcel tracking
- Tracking events include:
  - Pickup Pending
  - Rider Assigned
  - Rider Arriving
  - Parcel Picked Up
  - Parcel Delivered

### 💳 Stripe Payment

- Stripe Checkout integration
- Secure payment processing
- Payment verification
- Payment success page
- Transaction ID generation
- Parcel Tracking ID generation
- Payment history
- Paid/unpaid parcel status
- Payment information connected with parcel records
- Duplicate payment-success request handling

---

### 💰 Dynamic Delivery Pricing

ShiftexBD uses dynamic pricing based on parcel type, weight, and delivery location.

#### 📄 Document Parcel

| Delivery Type    | Price |
| ---------------- | ----: |
| Same District    |   ৳80 |
| Outside District |  ৳100 |

#### 📦 Non-Document Parcel Up To 3kg

| Delivery Type    | Price |
| ---------------- | ----: |
| Same District    |  ৳130 |
| Outside District |  ৳170 |

#### ⚖️ Non-Document Parcel Above 3kg

- Additional **৳40 per extra kg**
- Outside District delivery includes an additional **৳40 charge**

Examples:

| Parcel | Same District | Outside District |
| ------ | ------------: | ---------------: |
| 4kg    |          ৳170 |             ৳250 |
| 5kg    |          ৳210 |             ৳290 |

---

### 📊 Dashboard

- Responsive dashboard layout
- Collapsible desktop sidebar
- Mobile drawer navigation
- Role-based navigation
- Dashboard home
- My Parcels
- My Profile
- Payment History
- Rider dashboard
- Admin dashboard
- Responsive tables
- Responsive cards
- Mobile support
- Tablet support
- Desktop support

---

### 👨‍💼 Admin Features

- User management
- View registered users
- Rider application management
- Approve rider applications
- Reject rider applications
- Manage rider information
- Rider assignment
- Assign riders to parcels
- View parcel information
- Parcel management
- Warehouse management
- Delivery status management
- Role-based admin access
- Rider work-status management
- Available rider management
- In-delivery rider management

---

### 🚴 Rider Features

- Rider dashboard
- View assigned parcels
- Accept assigned delivery
- Reject assigned delivery
- View rejected deliveries
- Rider-specific rejected parcel history
- Rider arrival status
- Parcel pickup status
- Parcel delivery status
- Rider work-status management
- Available rider status
- In-delivery rider status
- Completed deliveries
- Rider earnings workflow
- Cash Out functionality
- Cash Out History
- Test cash-out record system

---

### 🔄 Delivery Workflow

A parcel follows a structured delivery workflow:

```text
Pickup Pending
      ↓
Rider Assigned
      ↓
Rider Arriving
      ↓
Parcel Picked Up
      ↓
Parcel Delivered
```

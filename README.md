# ShiftexBD

A modern full-stack parcel delivery and management platform designed to simplify parcel booking, delivery operations, rider management, tracking, and payment.

## 🌐 Live Project

- **Live Website:** Coming Soon
- **Client Repository:** Coming Soon
- **Server Repository:** Coming Soon

---

## 📌 About The Project

ShiftexBD is a full-stack parcel delivery management system that connects customers, riders, and administrators through a role-based workflow.

Users can book parcels, calculate delivery charges, make payments, track their parcels, and review delivery services.

Administrators can manage users, parcels, riders, warehouses, delivery operations, and assignments.

Riders can manage assigned deliveries, update parcel statuses, collect and deliver parcels, verify deliveries using OTP, and monitor their earnings.

The project is designed to simulate a real-world courier and parcel management system.

---

## ✨ Key Features

### 👤 User

- User registration and authentication
- Firebase authentication
- Google Sign-In
- Book a parcel
- Automatic delivery charge calculation
- Online payment
- Parcel tracking
- View parcel history
- Delivery status updates
- Review and rating system
- Personal dashboard

### 🛠️ Admin

- Admin dashboard
- Manage users
- Manage parcels
- Manage riders
- Assign riders to parcels
- Monitor delivery operations
- Manage warehouses
- View delivery statistics
- Manage parcel statuses
- Role-based access control

### 🚴 Rider

- Rider dashboard
- View assigned parcels
- Pickup parcels
- Update parcel status
- Warehouse handoff
- Delivery confirmation using OTP
- Track completed deliveries
- View earnings and commission
- Delivery history

---

## 💰 Delivery Pricing

The platform uses an automatic pricing system based on parcel type, weight, and delivery location.

### Document

| Delivery Type | Charge |
| ------------- | -----: |
| Within City   |    ৳60 |
| Outside City  |    ৳80 |

### Non-Document

For parcels up to 3kg:

| Delivery Type | Charge |
| ------------- | -----: |
| Within City   |   ৳110 |
| Outside City  |   ৳150 |

For parcels above 3kg:

- Additional **৳40 per kg**
- Outside-city deliveries include an additional **৳40 charge**

---

## 📦 Parcel Delivery Workflow

```text
User
  ↓
Book Parcel
  ↓
Payment
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

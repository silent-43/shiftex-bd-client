# ShiftexBD

A modern full-stack parcel delivery and management platform designed to simplify parcel booking, delivery operations, rider management, tracking, payment, and customer support.

---

## 🌐 Live Project

- **Live Website:** https://shiftex-bd.web.app
- **Client Repository:** https://github.com/silent-43/shiftex-bd-client
- **Server Repository:** Coming Soon

---

## 📌 About The Project

ShiftexBD is a full-stack parcel delivery management system that connects customers, riders, and administrators through a role-based workflow.

The platform is designed to provide a smooth and modern parcel delivery experience with features such as user authentication, parcel booking, delivery charge calculation, parcel tracking, service coverage information, customer support, and more.

The project follows a real-world courier and parcel management workflow and is built with a responsive user interface for different screen sizes.

---

## ✨ Current Features

### 🔐 Authentication

- User registration and login
- Firebase Authentication
- Google Sign-In
- Protected/private routes
- Authentication state handling
- User profile information
- Logout functionality

---

### 👤 User

- User registration and authentication
- Firebase authentication
- Google Sign-In
- Book a parcel
- Automatic delivery charge calculation
- Parcel tracking
- View parcel-related information
- Personal dashboard
- Review and rating functionality
- Access protected pages after authentication

---

### 🛠️ Admin

- Admin dashboard structure
- Role-based access control structure
- Admin-specific workflow planning
- Parcel management structure
- Rider management structure
- Warehouse management structure
- Delivery operation management structure

---

### 🚴 Rider

- Rider dashboard structure
- Assigned delivery workflow
- Parcel pickup workflow
- Parcel status update workflow
- Warehouse handoff workflow
- OTP-based delivery confirmation workflow
- Delivery history structure
- Earnings and commission workflow

---

## 🏠 Home Page

The ShiftexBD homepage includes:

- Responsive navigation bar
- ShiftexBD branding and logo
- Sign In and Sign Up buttons
- Hero banner carousel
- Deliveryman promotional section
- How It Works section
- Why Choose Us section
- FAQ section
- Call-to-action sections
- Responsive footer

### How It Works

The platform explains the parcel delivery process through a simple step-by-step interface.

- Booking Pick & Drop
- Parcel Processing
- Delivery Tracking
- Successful Delivery

---

## 💡 Why Choose ShiftexBD

The homepage highlights important service benefits such as:

- Real-Time Tracking
- Fast Delivery
- Safe & Secure Delivery
- On-Time Delivery
- Parcel Management
- Customer Support

---

## 📍 Coverage Page

ShiftexBD includes an interactive delivery coverage map powered by **React Leaflet**.

### Coverage Features

- Interactive Bangladesh map
- Service center markers
- Coverage information for districts
- Popup information for service centers
- District search functionality
- Map navigation using `flyTo()`
- Service center data loaded dynamically
- Coverage information across Bangladesh districts

Users can search for a district and quickly navigate to the corresponding location on the map.

---

## ℹ️ About Us Page

The About Us page introduces the ShiftexBD platform and its services.

### Features

- Company introduction
- Service information
- Why choose ShiftexBD
- Feature cards
- Interactive "Learn More" modal/popup
- Detailed information without navigating to another page
- Responsive design

The Learn More sections open detailed information inside a popup, keeping users on the same page.

---

## 📞 Contact Us Page

A complete Contact Us page has been implemented to allow users to communicate with ShiftexBD.

### Contact Page Features

- Contact information cards
- Phone information
- Email information
- Location information
- Business hours
- Contact form
- Form validation
- Email sending functionality
- Success/error notifications
- FAQ/help section
- Customer support information
- Responsive design

### Form Validation

The contact form validates:

- Name
- Email
- Bangladeshi phone number
- Subject
- Message

Form validation is implemented using **React Hook Form**.

### Email Integration

The contact form uses **EmailJS** to send submitted messages directly to the configured email address.

### Notifications

**SweetAlert2** is used for:

- Successful message submission
- Error notifications

---

## 🔒 Protected Routes

ShiftexBD uses protected/private routes for authenticated users.

Unauthenticated users cannot directly access protected pages and are redirected to the appropriate authentication flow.

The project uses React Router for client-side routing.

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

# Project Structure

```
amazon-clone/
│
├── backend/                          # Node.js/Express Backend
│   ├── models/                       # MongoDB Models
│   │   ├── User.js                   # User model with authentication
│   │   ├── Product.js                # Product model with GST
│   │   ├── Cart.js                   # Shopping cart model
│   │   └── Order.js                  # Order model with payment info
│   │
│   ├── routes/                       # API Routes
│   │   ├── auth.js                   # Authentication routes
│   │   ├── products.js               # Product CRUD routes
│   │   ├── cart.js                   # Cart management routes
│   │   ├── orders.js                 # Order management routes
│   │   ├── payment.js                # Razorpay payment routes
│   │   └── admin.js                  # Admin panel routes
│   │
│   ├── middleware/                   # Express Middleware
│   │   └── auth.js                   # JWT authentication middleware
│   │
│   ├── scripts/                      # Utility Scripts
│   │   └── createAdmin.js            # Create admin user script
│   │
│   ├── uploads/                      # Product image uploads
│   │   └── .gitkeep
│   │
│   ├── server.js                     # Express server entry point
│   └── .env                          # Environment variables (create this)
│
├── frontend/                         # React Frontend
│   ├── public/                       # Static files
│   │   └── index.html                # HTML template
│   │
│   ├── src/
│   │   ├── components/               # Reusable Components
│   │   │   ├── Navbar.js             # Navigation bar
│   │   │   └── ProductCard.js        # Product card component
│   │   │
│   │   ├── pages/                    # Page Components
│   │   │   ├── Home.js               # Homepage
│   │   │   ├── Products.js           # Product listing page
│   │   │   ├── ProductDetail.js      # Product detail page
│   │   │   ├── Cart.js               # Shopping cart page
│   │   │   ├── Checkout.js           # Checkout page
│   │   │   ├── Login.js              # Login page
│   │   │   ├── Register.js           # Registration page
│   │   │   ├── Orders.js             # Order history page
│   │   │   ├── OrderDetail.js        # Order detail page
│   │   │   └── AdminDashboard.js     # Admin panel
│   │   │
│   │   ├── context/                  # React Context
│   │   │   └── AuthContext.js        # Authentication context
│   │   │
│   │   ├── utils/                    # Utility Functions
│   │   │   └── api.js                # API helper functions
│   │   │
│   │   ├── App.js                    # Main App component
│   │   ├── index.js                  # React entry point
│   │   └── index.css                 # Global styles (Tailwind)
│   │
│   ├── package.json                  # Frontend dependencies
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   └── postcss.config.js             # PostCSS configuration
│
├── logs/                             # Application logs (PM2)
│
├── package.json                       # Root package.json
├── ecosystem.config.js                # PM2 configuration
├── .gitignore                         # Git ignore rules
├── README.md                          # Main documentation
├── DEPLOYMENT.md                      # Deployment guide
├── QUICK_START.md                     # Quick start guide
└── PROJECT_STRUCTURE.md               # This file

```

## Key Features by Component

### Backend Models
- **User**: Authentication, roles (user/admin), address management
- **Product**: Products with GST, stock, images, reviews
- **Cart**: User shopping carts with items
- **Order**: Orders with payment info, GST calculation, shipping

### Backend Routes
- **/api/auth**: Register, login, get user, update address
- **/api/products**: List, search, filter, get single product
- **/api/cart**: Get, add, update, remove cart items
- **/api/orders**: Create, list, get order details
- **/api/payment**: Razorpay order creation and verification
- **/api/admin**: Product CRUD, order management, statistics

### Frontend Pages
- **Home**: Featured products, hero section
- **Products**: Product listing with filters and search
- **ProductDetail**: Product details, add to cart
- **Cart**: Cart management, quantity updates
- **Checkout**: Address form, payment method selection
- **Orders**: Order history
- **OrderDetail**: Detailed order view with GST breakdown
- **AdminDashboard**: Product and order management

## Data Flow

1. **User Registration/Login** → JWT token stored → Authenticated requests
2. **Browse Products** → Search/Filter → Add to Cart
3. **Cart** → Update quantities → Proceed to Checkout
4. **Checkout** → Enter address → Select payment → Create order
5. **Payment** → Razorpay/COD → Verify → Order confirmed
6. **Admin** → Manage products → Update order status

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT tokens
- `RAZORPAY_KEY_ID`: Razorpay API key
- `RAZORPAY_KEY_SECRET`: Razorpay API secret
- `NODE_ENV`: Environment (development/production)

### Frontend (.env)
- `REACT_APP_API_URL`: Backend API URL

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Admin role-based access control
- CORS configuration
- Input validation with express-validator
- Secure file uploads with multer

## Payment Integration

- **Razorpay**: UPI, Cards, Net Banking
- **COD**: Cash on Delivery option
- **GST Calculation**: Automatic GST calculation (18% default)
- **Payment Verification**: Server-side signature verification

## Indian Market Features

- GST billing (18% default, configurable)
- Free shipping above ₹499
- Indian currency (₹) formatting
- Indian address format
- Razorpay payment gateway (popular in India)
- COD option (common in India)


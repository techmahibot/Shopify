# ShopKart

ShopKart is a full-stack e-commerce app I built for the Fullstack Engineering Lab at IIT Madras. You can sign up, browse a catalogue of 200+ products, save favourites to a wishlist, fill a cart, and pay for it through Razorpay (test mode). Your past orders are saved under **My Orders**.

It started as a set of weekly labs (auth, product catalogue, wishlist, cart, checkout and orders), and this repo is where all of them come together.

> **Live demo:** _add your deployed link here if you deploy it_
> **Repo:** _add your GitHub link here_

## What you can do

- **Create an account and log in.** Passwords are hashed with bcrypt, and the session lives in an httpOnly cookie (JWT), so it can't be read from JavaScript.
- **Browse products.** Search by name, filter by category, and sort by price. Search is debounced, so it doesn't fire a request on every keystroke.
- **Open a product page** to see details and stock.
- **Keep a wishlist.** Tap the heart on any product. Everything is saved on your account, so it follows you across devices.
- **Use a cart** with quantity controls. Stock limits are checked on the server, and the navbar always shows your cart count.
- **Check out and pay.** Enter a shipping address, pay with Razorpay, and land on an order confirmation page.
- **See your orders.** Each paid order is listed newest first, with a status badge and a details page.

## A few decisions worth mentioning

- **The server decides the price.** The checkout request only sends the shipping address. The backend rebuilds the total from the cart and the latest product prices, so nobody can tamper with the amount from the browser.
- **Payments are verified, not trusted.** After Razorpay's popup succeeds, the backend checks the HMAC-SHA256 signature before marking the order as paid and clearing the cart. Pending, failed or abandoned payments never show up in My Orders.
- **Orders are snapshots.** Each order stores the product name, price and image as they were at purchase time, so later catalogue changes don't rewrite history.
- **You can only see your own orders.** Other people's order IDs return a 404, exactly as if they didn't exist.

## Tech stack

| Part | What's used |
| --- | --- |
| Frontend | React 19, Vite, React Router, Tailwind CSS v4, Axios, react-hot-toast, lucide-react |
| Backend | Node.js, Express 5, Mongoose |
| Database | MongoDB (local or Atlas) |
| Auth | JWT in an httpOnly cookie, bcrypt |
| Payments | Razorpay (test mode) |

## Project structure

```
.
├── backend
│   ├── config/          Razorpay client
│   ├── controllers/     customer, product, wishlist, cart, order
│   ├── middlewares/     auth (protect)
│   ├── models/          Customer, Product, Order
│   ├── routes/
│   ├── utils/           token generator
│   ├── seed.js          loads 210 sample products
│   ├── index.js         server entry point
│   └── .env.example
└── frontend
    ├── src
    │   ├── components/  navbar, cards, hero, footer...
    │   ├── context/     cart state
    │   ├── hooks/
    │   ├── layout/
    │   ├── pages/       Home, Products, Cart, Checkout, Orders...
    │   └── services/    api.js (all backend calls)
    └── .env.example
```

## Running it locally

You'll need **Node.js 18+**, **npm**, and a MongoDB database (a local install, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster). For payments you'll also need a free [Razorpay](https://razorpay.com) account, which gives you test keys without any KYC.

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `backend/.env` and fill in the values:

| Variable | What it is |
| --- | --- |
| `MONGO_URI` | Your MongoDB connection string |
| `PORT` | Port for the API (default `5001`) |
| `JWT_SECRET` | Any long random string |
| `CLIENT_URL` | Frontend origin for CORS (default `http://localhost:5173`, only needed if the API is hosted separately) |
| `RAZORPAY_KEY_ID` | Razorpay **test** key ID (starts with `rzp_test_`) |
| `RAZORPAY_KEY_SECRET` | Razorpay **test** key secret |

Then load the sample products and start the server:

```bash
npm run seed    # adds 210 products
npm run dev     # starts the API with auto-reload
```

You should see `MongoDB connected` and `Server running on port 5001`.

> Heads up: `npm run seed` wipes the existing products and empties every customer's cart and wishlist, because the old product IDs no longer exist. It's meant for first-time setup.

### 3. Set up the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**. The dev server forwards `/api` to the backend on port 5001. If your API runs elsewhere, change the proxy in `frontend/vite.config.js` or set `VITE_API_URL` (see `frontend/.env.example`).

### 4. Try a payment

Checkout runs in Razorpay **test mode**, so no real money moves. In the popup you can use:

- **Card:** `4111 1111 1111 1111`, any future expiry, any CVV, any name (use `1234` or any OTP if asked)
- **UPI:** `success@razorpay` for a successful payment, `failure@razorpay` to see a failure

If a payment fails or you close the popup, your cart stays exactly as it was.

## API overview

Every route lives under `/api`. All routes except the public ones need you to be logged in (the cookie is sent automatically).

| Method | Route | Auth | What it does |
| --- | --- | --- | --- |
| POST | `/api/customers/register` | No | Create an account |
| POST | `/api/customers/login` | No | Log in and set the cookie |
| GET | `/api/customers/me` | Yes | Current customer |
| POST | `/api/customers/logout` | Yes | Clear the cookie |
| GET | `/api/products` | No | List products (`?search=`, `?category=`, `?sort=price_asc\|price_desc`) |
| GET | `/api/products/:id` | No | One product |
| POST | `/api/products` | No | Create a product (see limitations) |
| GET | `/api/wishlist` | Yes | Your wishlist |
| POST / DELETE | `/api/wishlist/:productId` | Yes | Add or remove a product |
| GET | `/api/cart` | Yes | Your cart with live prices and stock |
| POST | `/api/cart/:productId` | Yes | Add one unit |
| PATCH | `/api/cart/:productId` | Yes | Set the quantity (`{ "quantity": 2 }`) |
| DELETE | `/api/cart/:productId` | Yes | Remove from cart |
| POST | `/api/orders/create-payment-order` | Yes | Validate cart, save a pending order, create the Razorpay order |
| POST | `/api/orders/verify-payment` | Yes | Verify the signature, mark the order paid, clear the cart |
| GET | `/api/orders` | Yes | Your paid orders, newest first |
| GET | `/api/orders/:id` | Yes | One of your orders |

## Deploying on Vercel (optional)

The repo is set up as one Vercel project with two services (see `vercel.json`): the Express API (`backend`) and the Vite frontend (`frontend`), served from a single domain. Requests to `/api/*` go to the backend and everything else goes to the frontend.

1. Import the repo into Vercel (root directory = the repo root).
2. Add these environment variables: `MONGO_URI`, `JWT_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `NODE_ENV=production`.
3. In MongoDB Atlas, allow Vercel to connect under Network Access (`0.0.0.0/0` is the quick option for a lab).
4. To try it locally the way Vercel runs it, use `vercel dev`. Plain `npm run dev` in each folder also works, because Vite forwards `/api` to the backend on port 5001.

Because the frontend and API share one domain, you don't need `VITE_API_URL` or `CLIENT_URL` in production.

## Known limitations

- `POST /products` is open, with no admin role, because the lab only needed it to add sample data. A real store would restrict it to admins.
- Stock isn't reduced after an order is placed. It's only checked when you add to the cart and when you pay.
- Google sign-in and "Forgot password" are placeholders on the login page.
- There's no order cancellation or refund flow.

## Security note

No secrets are committed to this repo. `.env` files are ignored by git, and `backend/.env.example` shows what's needed. The Razorpay key **secret** only ever lives on the server, and only the public key ID is sent to the browser.

---

Built by Aryan, IIT Madras.
#   S h o p i f y  
 
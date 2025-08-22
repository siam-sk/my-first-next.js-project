# My First Next.js Store

This is a simple e-commerce store application built with Next.js 15 (App Router) and styled with Tailwind CSS. It demonstrates core concepts including public and protected pages, authentication with NextAuth.js (Credentials provider), and API route handling for a mock product backend.

## Features

- **Public Pages**: A landing page, product listing, and product detail pages accessible to all visitors.
- **Authentication**: User registration and login system using email and password (NextAuth.js).
- **Protected Routes**: A dashboard page for adding new products, accessible only to authenticated users.
- **Mock API**: In-memory data store for users and products, served via Next.js Route Handlers.

---

## Setup and Installation

Follow these steps to get the project running on your local machine.

### 1. Install Dependencies

First, install the necessary Node.js packages using npm:

```bash
npm install
```

### 2. Configure Environment Variables

Create a new file named `.env.local` in the root of the project directory and add the following variables.

```env
# The base URL of your application
NEXTAUTH_URL=http://localhost:3000

# A secret key for signing NextAuth.js JWTs.
# Generate one with the command below.
NEXTAUTH_SECRET=

# Optional: A default user for easy testing
DEMO_USER_EMAIL=test@example.com
DEMO_USER_PASSWORD=password
```

To generate a secure `NEXTAUTH_SECRET`, run the following command in your terminal and paste the output into the `.env.local` file:

```powershell
# For Windows (PowerShell)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Run the Development Server

Once the dependencies are installed and the environment variables are set, start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## Route Summary

The application consists of the following pages and API endpoints.

### Pages

| Route                       | Description                                                                 | Authentication |
| --------------------------- | --------------------------------------------------------------------------- | -------------- |
| `/`                         | The main landing page with a hero and product highlights.                   | Public         |
| `/login`                    | A page for users to log in or register a new account.                       | Public         |
| `/products`                 | Displays a list of all available products.                                  | Public         |
| `/products/[id]`            | Shows the full details for a single product.                                | Public         |
| `/dashboard/add-product`    | A protected form for adding new products to the store.                      | Required       |

### API Routes

| Route                       | Method | Description                                                         | Authentication |
| --------------------------- | ------ | ------------------------------------------------------------------- | -------------- |
| `/api/products`             | `GET`  | Returns a JSON list of all products.                                | Public         |
| `/api/products`             | `POST` | Creates a new product.                                              | Required       |
| `/api/products/[id]`        | `GET`  | Returns a single product by its ID.                                 | Public         |
| `/api/register`             | `POST` | Handles new user registration.                                      | Public         |
| `/api/auth/*`               | `*`    | Handled by NextAuth.js for session management, login, and logout.   | N/A            |

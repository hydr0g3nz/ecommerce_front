# E-commerce Frontend
A modern e-commerce platform built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

### ✅ Completed Features

The following features are fully implemented and ready to use:

- 🏷️ **Product Management**
  - Product variation system (size, color)
  - Product details view
  - Image gallery
  - Variation selection
  - Price display with sale calculations

- 🛒 **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Price calculations
  - Persistent cart storage using Redux
  - Cart summary

- 🔐 **Authentication**
  - JWT-based authentication
  - Login/Register system
  - Protected routes
  - Role-based access control (Admin/User)
  - Token refresh mechanism

- 💫 **UI/UX**
  - Modern, clean interface
  - Smooth transitions
  - Loading states
  - Error handling
  - Toast notifications

### 🚀 Coming Soon

Features currently in development:

- 🔍 **Search & Discovery**
  - Product search functionality
  - Advanced filtering
  - Sort options
  - Category navigation
  - Product recommendations

- 👤 **User Profile**
  - Personal information management
  - Order history
  - Address management
  - Preferences settings

- 📱 **Enhanced UI**
  - Fully responsive design
  - Dark/Light mode toggle
  - Improved animations
  - Mobile-first approach

- 📦 **Order System**
  - Order creation
  - Order tracking
  - Order history
  - Order status updates

- ⭐ **Social Features**
  - Product reviews
  - Rating system
  - User feedback
  - Product Q&A

- 💭 **Wishlist**
  - Save favorite items
  - Share wishlist
  - Move to cart functionality
  - Wishlist management

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Redux
- **HTTP Client**: Axios
- **Authentication**: JWT 
- **Icons**: Lucide Icons

## Prerequisites

- Node.js 18.17 or later
- npm or yarn or pnpm
- Git

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd e-commerce-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Install shadcn/ui components:
```bash
npx shadcn-ui@latest init
```

4. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Components

### Authentication
- JWT-based authentication
- Protected routes
- Role-based access control
- Refresh token mechanism

### Product Management
- Product listing with filters
- Product details with variations
- Image gallery
- Related products
- Reviews and ratings

### Shopping Cart
- Add/remove items
- Update quantities
- Price calculations
- Persistent cart storage

### User Profile
- Personal information
- Order history
- Saved addresses
- Wishlist management

## License

MIT

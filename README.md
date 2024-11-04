# E-commerce Frontend

A modern e-commerce platform built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Features
**complete
- 🏷️ Product variations (size, color, etc.)
- 🛒 Shopping cart management
- 💫 Smooth animations and transitions
- 🔐 User authentication and authorization
**comming soon
- 🛍️ Product browsing and search
- 👤 User profile management
- 📱 Fully responsive design
- 🌙 Dark/Light mode support
- 🛍️ Order management and tracking
- ⭐ Product reviews and ratings
- 💭 Wishlist functionality
- 🎨 Category-based navigation


## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: redux
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

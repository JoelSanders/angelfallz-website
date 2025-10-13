# ANGELFALLZ - Modern Streetwear Brand Website

A modern, edgy, and youthful React website for the ANGELFALLZ clothing brand, featuring an interactive 3D model viewer and animated liquid background.

## Features

- ✨ **3D Model Viewer**: Interactive rotating 3D model display
- 🌊 **Liquid Animation Background**: Smooth, interactive fluid simulation with mouse tracking
- 🌓 **Dark/Light Mode**: Toggle between dark and light themes
- 📱 **Responsive Design**: Mobile-first, fully responsive layout
- 🎨 **Modern UI**: Stussy-inspired navigation and minimalist design
- ⚡ **Performance Optimized**: Built with Vite for fast development and production builds
- 🛍️ **Shopify Integration**: Full e-commerce functionality
  - Product catalog with real-time inventory
  - Shopping cart with persistent state
  - Variant selection (sizes, colors, etc.)
  - Secure Shopify checkout
  - Collection filtering
  - Shopify POS compatibility

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Shopify Storefront API** - E-commerce backend
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Shopify integration:
```bash
cp .env.example .env
```

Then edit `.env` and add your Shopify credentials:
```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
```

See [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md) for detailed setup instructions.

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Cart.tsx             # Shopping cart sidebar
│   ├── LiquidEther.tsx      # Animated fluid background
│   ├── Model3D.tsx          # 3D model component
│   ├── ModelViewer.tsx      # 3D model canvas wrapper
│   ├── Navigation.tsx       # Header navigation with cart
│   └── ProductCard.tsx      # Product grid item
├── pages/
│   ├── ShopPage.tsx         # Product listing page
│   └── ProductDetailPage.tsx # Individual product page
├── context/
│   └── CartContext.tsx      # Shopping cart state
├── services/
│   └── shopify.ts           # Shopify API integration
├── types/
│   └── shopify.ts           # TypeScript type definitions
├── config/
│   └── shopify.ts           # Shopify configuration
├── App.tsx                  # Main app with routing
├── main.tsx                 # App entry point
└── index.css                # Global styles

public/
└── base.glb                 # 3D model file
```

## Shopify Integration

This website is fully integrated with Shopify for e-commerce functionality:

- **Product Management**: Products are pulled directly from your Shopify store
- **Inventory Sync**: Real-time stock levels and availability
- **Cart Management**: Persistent shopping cart with localStorage
- **Checkout**: Secure checkout hosted by Shopify
- **POS Compatible**: Works with Shopify Point of Sale for in-person sales

For detailed setup instructions, see [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md).

## Customization

### Theme Colors

Edit the colors in `src/App.tsx`:

```typescript
const lightColors = ['#FF6B9D', '#C44569', '#FFC312'];
const darkColors = ['#5227FF', '#FF9FFC', '#B19EEF'];
```

### 3D Model

Replace `public/base.glb` with your own 3D model file (supports .glb, .gltf formats).

### Shopify Store

All products, collections, and inventory are managed through your Shopify admin panel. Changes sync automatically.

## Performance Tips

- The 3D model is loaded lazily with Suspense
- Background animation pauses when not visible
- ResizeObserver and IntersectionObserver optimize rendering

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

## Credits

- LiquidEther component inspired by React Bits
- Design inspired by Stussy streetwear aesthetic


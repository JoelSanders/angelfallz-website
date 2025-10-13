# ANGELFALLZ - Modern Streetwear Brand Website

A modern, edgy, and youthful React website for the ANGELFALLZ clothing brand, featuring an interactive 3D model viewer and animated liquid background.

## Features

- ✨ **3D Model Viewer**: Interactive rotating 3D model display
- 🌊 **Liquid Animation Background**: Smooth, interactive fluid simulation with mouse tracking
- 🌓 **Dark/Light Mode**: Toggle between dark and light themes
- 📱 **Responsive Design**: Mobile-first, fully responsive layout
- 🎨 **Modern UI**: Stussy-inspired navigation and minimalist design
- ⚡ **Performance Optimized**: Built with Vite for fast development and production builds

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
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

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

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
│   ├── LiquidEther.tsx      # Animated fluid background
│   ├── Model3D.tsx          # 3D model component
│   ├── ModelViewer.tsx      # 3D model canvas wrapper
│   └── Navigation.tsx       # Header navigation
├── App.tsx                  # Main app component
├── main.tsx                 # App entry point
└── index.css                # Global styles

public/
└── base.glb                 # 3D model file
```

## Customization

### Theme Colors

Edit the colors in `src/App.tsx`:

```typescript
const lightColors = ['#FF6B9D', '#C44569', '#FFC312'];
const darkColors = ['#5227FF', '#FF9FFC', '#B19EEF'];
```

### 3D Model

Replace `public/base.glb` with your own 3D model file (supports .glb, .gltf formats).

### Navigation

Edit menu items in `src/components/Navigation.tsx`:

```typescript
const menuItems = ['SHOP', 'COLLECTIONS', 'ABOUT'];
const categories = ['NEW ARRIVALS', 'TEES', 'SWEATS', ...];
```

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


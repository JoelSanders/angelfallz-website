# Shopify Integration Setup Guide

This guide will help you set up Shopify integration for the AngelFallz website.

## Prerequisites

- A Shopify store (you can create a development store for free)
- Node.js and npm installed
- Basic understanding of Shopify's Storefront API

## Step 1: Create or Access Your Shopify Store

1. If you don't have a Shopify store:
   - Go to [Shopify Partners](https://www.shopify.com/partners)
   - Sign up for a free partner account
   - Create a development store

2. If you already have a store, log in to your Shopify Admin panel

## Step 2: Create a Custom App to Get API Credentials

1. In your Shopify Admin, go to **Settings** → **Apps and sales channels**

2. Click **Develop apps** (you may need to enable custom app development)

3. Click **Create an app**
   - Name it "AngelFallz Website" or similar
   - Click **Create app**

4. Click **Configure Storefront API scopes**

5. Select the following permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_product_prices`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_customers`

6. Click **Save**

7. Go to **API credentials** tab

8. Click **Install app** to install it on your store

9. Copy the **Storefront API access token** (you'll need this for the .env file)

## Step 3: Configure Your Environment Variables

1. In the AngelFallz-Website directory, create a `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and add your credentials:
   ```env
   VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here
   ```

3. Replace:
   - `your-store.myshopify.com` with your actual store domain
   - `your_storefront_access_token_here` with the token from Step 2

## Step 4: Add Products to Your Shopify Store

1. In Shopify Admin, go to **Products**

2. Click **Add product** and create some products with:
   - Title
   - Description
   - Images
   - Price
   - Variants (sizes, colors, etc.)
   - Tags (add "new" tag for featured products)

3. Make sure products are set to **Active** and available on the **Online Store** sales channel

## Step 5: Test the Integration

1. Install dependencies (if not already done):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   - `http://localhost:5173/` - Home page
   - `http://localhost:5173/shop` - Shop page with all products
   - Click on any product to see the detail page
   - Add products to cart and test checkout

## Features Included

### ✅ Product Catalog
- Browse all products from your Shopify store
- Filter by collections
- Product images, titles, prices, and availability

### ✅ Product Details
- Full product information
- Multiple images with gallery
- Variant selection (size, color, etc.)
- Quantity selector
- Add to cart functionality
- Availability status

### ✅ Shopping Cart
- Persistent cart (saved in localStorage)
- Add/remove items
- Update quantities
- View subtotal
- Direct checkout to Shopify

### ✅ Shopify Checkout
- Secure checkout on Shopify
- Handles payment processing
- Order confirmation
- Email notifications

## Folder Structure

```
src/
├── config/
│   └── shopify.ts          # Shopify configuration
├── context/
│   └── CartContext.tsx     # Cart state management
├── services/
│   └── shopify.ts          # Shopify API service layer
├── types/
│   └── shopify.ts          # TypeScript types
├── pages/
│   ├── ShopPage.tsx        # Product listing page
│   └── ProductDetailPage.tsx  # Individual product page
└── components/
    ├── Cart.tsx            # Shopping cart sidebar
    ├── ProductCard.tsx     # Product grid item
    └── Navigation.tsx      # Updated with cart icon
```

## Troubleshooting

### Products not showing up?
- Verify your `.env` file has correct credentials
- Check that products are **Active** in Shopify
- Ensure products are available on the **Online Store** channel
- Restart the dev server after changing `.env`

### Cart not working?
- Check browser console for errors
- Verify Storefront API has checkout permissions
- Clear localStorage and try again

### Checkout not redirecting?
- Ensure you have the correct checkout permissions
- Check that your store is not password protected
- Verify the checkout URL is being generated correctly

## Shopify POS Integration (Optional)

For in-person sales using Shopify POS:

1. Download the Shopify POS app on your iOS or Android device

2. In Shopify Admin, go to **Settings** → **Point of Sale**

3. Configure your POS settings:
   - Add staff
   - Set up locations
   - Configure hardware (card readers, receipt printers)

4. Products added through the website will automatically be available in POS

5. Inventory syncs in real-time between online store and POS

## API Rate Limits

Shopify's Storefront API has the following limits:
- **Free stores**: 50 requests per second
- **Paid stores**: Higher limits based on plan

The app includes automatic retry logic and caching to minimize API calls.

## Production Deployment

When deploying to production:

1. Set environment variables in your hosting platform (Cloudflare Pages, Vercel, etc.)

2. Make sure your Shopify store is active (not in development mode)

3. Test all functionality on production before going live

4. Set up Shopify payment providers

5. Configure shipping zones and rates

## Support

For issues or questions:
- Check [Shopify's Storefront API documentation](https://shopify.dev/docs/api/storefront)
- Review the code comments in the service files
- Check the browser console for error messages

## Next Steps

Consider adding:
- Product search functionality
- Customer account management
- Product reviews
- Wishlist feature
- Related products
- Email marketing integration



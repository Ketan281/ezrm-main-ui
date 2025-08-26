# EZRM Sitemap Documentation

## Overview

This document describes the sitemap structure and SEO setup for the EZRM (Raw Materials Simplified) project.

## Sitemap Files

### 1. Main Sitemap (`/sitemap.xml`)

**File:** `src/app/sitemap.ts`
**Purpose:** Contains all static pages and main navigation pages

#### Pages Included:

- **Homepage** (`/`) - Priority: 1.0, Frequency: Daily
- **About** (`/about`) - Priority: 0.8, Frequency: Monthly
- **Certifications** (`/certifications`) - Priority: 0.8, Frequency: Monthly
- **Contact** (`/contact`) - Priority: 0.7, Frequency: Monthly
- **Products** (`/product`) - Priority: 0.9, Frequency: Daily
- **Search** (`/search`) - Priority: 0.8, Frequency: Daily
- **Sign In** (`/sign_in`) - Priority: 0.6, Frequency: Monthly
- **Sign Up** (`/sign_up`) - Priority: 0.6, Frequency: Monthly
- **Profile** (`/profile`) - Priority: 0.7, Frequency: Weekly
- **My Orders** (`/my_orders`) - Priority: 0.7, Frequency: Weekly
- **Favourites** (`/favourite`) - Priority: 0.7, Frequency: Weekly
- **Cart** (`/cart`) - Priority: 0.8, Frequency: Daily
- **Checkout** (`/checkout`) - Priority: 0.8, Frequency: Daily
- **Payment Success** (`/payment-success`) - Priority: 0.5, Frequency: Monthly
- **Order Details** (`/orderDetails`) - Priority: 0.6, Frequency: Weekly
- **Countries Demo** (`/countries-demo`) - Priority: 0.4, Frequency: Monthly

### 2. Products Sitemap (`/sitemap-products.xml`)

**File:** `src/app/sitemap-products.ts`
**Purpose:** Contains all individual product detail pages

#### Features:

- **Dynamic Generation:** Fetches products from API
- **Product URLs:** `/product/detail/{productId}`
- **Priority:** 0.8
- **Frequency:** Weekly
- **Last Modified:** Uses product's `updatedAt` or `createdAt` date

### 3. Sitemap Index (`/sitemap-index.xml`)

**File:** `src/app/sitemap-index.ts`
**Purpose:** Index file for multiple sitemaps

#### Sitemaps Listed:

- Main sitemap (`/sitemap.xml`) - Daily updates
- Products sitemap (`/sitemap-products.xml`) - Weekly updates

## Robots.txt

**File:** `src/app/robots.ts`
**Purpose:** Provides crawling instructions for search engines

### Allowed Pages:

- Homepage and main navigation
- Product listing and detail pages
- About, certifications, contact pages
- Search functionality
- Authentication pages

### Disallowed Pages:

- API endpoints (`/api/`)
- Admin areas (`/admin/`)
- Next.js internal files (`/_next/`)
- User-specific pages (profile, orders, cart, etc.)
- Checkout and payment pages

## SEO Features

### 1. Priority Structure

- **1.0:** Homepage (highest priority)
- **0.9:** Product listing page
- **0.8:** Main content pages (about, certifications, cart, checkout)
- **0.7:** User account pages
- **0.6:** Authentication and order pages
- **0.5:** Success/confirmation pages
- **0.4:** Demo/utility pages

### 2. Change Frequency

- **Daily:** Homepage, product listing, cart, search
- **Weekly:** User account pages, order details
- **Monthly:** Static content, authentication, success pages

### 3. Dynamic Content

- Product pages are dynamically generated from API
- Last modified dates use actual product update timestamps
- Automatic sitemap regeneration on build

## Environment Variables

### Required:

```env
NEXT_PUBLIC_API_URL=https://your-domain.com
```

### Default:

If `NEXT_PUBLIC_API_URL` is not set, defaults to `https://ezrm.com`

## Build Output

When you run `npm run build`, the following files are generated:

- `/sitemap.xml` - Main sitemap
- `/sitemap-products.xml` - Products sitemap
- `/robots.txt` - Robots file

## Search Engine Submission

After deployment, submit your sitemap to search engines:

### Google Search Console:

1. Add your property
2. Go to "Sitemaps" section
3. Submit: `https://your-domain.com/sitemap.xml`

### Bing Webmaster Tools:

1. Add your site
2. Go to "Sitemaps" section
3. Submit: `https://your-domain.com/sitemap.xml`

## Maintenance

### Regular Tasks:

1. **Monitor API:** Ensure product API is accessible for sitemap generation
2. **Update Priorities:** Adjust page priorities based on business needs
3. **Review Disallowed:** Update robots.txt as new private areas are added
4. **Check Coverage:** Monitor search console for sitemap coverage issues

### Adding New Pages:

1. Add page to appropriate sitemap file
2. Set appropriate priority and change frequency
3. Update robots.txt if needed
4. Rebuild and redeploy

## Troubleshooting

### Common Issues:

1. **API Errors:** Check product service connectivity
2. **Build Failures:** Verify TypeScript types in sitemap files
3. **Missing Pages:** Ensure all important pages are included
4. **Wrong URLs:** Verify `NEXT_PUBLIC_BASE_URL` environment variable

### Debug Commands:

```bash
# Test sitemap generation
npm run build

# Check sitemap output
curl https://your-domain.com/sitemap.xml

# Validate robots.txt
curl https://your-domain.com/robots.txt
```

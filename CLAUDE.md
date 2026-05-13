# MIGO App — Claude Second Brain

## What Is MIGO

MIGO is a mobile-first e-commerce marketplace app modeled after TEMU — ultra-low-price products, flash deals, gamified shopping, and a broad multi-category catalog. Built as a React Native Expo app targeting Android and iOS with a single codebase.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native via Expo SDK 54 |
| Language | TypeScript (strict mode) |
| Database & Auth | Supabase (PostgreSQL + Auth + Storage + Realtime) |
| Navigation | Expo Router (file-based, app/ directory) |
| State Management | Zustand |
| Server State / Caching | TanStack Query (React Query v5) |
| Styling | StyleSheet + custom design tokens (no UI library) |
| Forms | React Hook Form + Zod validation |
| Payments | Stripe (via stripe-react-native) |
| Push Notifications | Expo Notifications |
| Analytics | PostHog |
| Image Handling | Expo Image |
| Icons | Expo Vector Icons (MaterialIcons + Ionicons) |

---

## Design System

### Brand Colors
```
Primary Orange:   #FF6B00
Orange Light:     #FF8C3A
Orange Dark:      #CC5500
Background:       #FFFFFF
Surface:          #F7F7F7
Border:           #EBEBEB
Text Primary:     #1A1A1A
Text Secondary:   #666666
Text Muted:       #999999
Success:          #00C48C
Error:            #FF4D4D
Warning:          #FFB800
```

### Typography
- Font family: System default (SF Pro on iOS, Roboto on Android)
- Heading sizes: 28 / 22 / 18 / 16
- Body: 14 (regular), 12 (small)
- Bold weight for prices, CTAs, and product titles

### Spacing Scale
- 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48

### Component Rules
- Border radius: 8px cards, 24px buttons, 999px pills/badges
- Shadows: elevation 2 on cards (Android), shadowOpacity 0.08 (iOS)
- All touchables use `activeOpacity={0.75}`
- Images always have a `#F0F0F0` placeholder background

---

## Project Structure

```
migo-app/
├── app/                        # Expo Router screens
│   ├── (auth)/                 # Auth flow (login, register, forgot)
│   ├── (tabs)/                 # Main tab navigator
│   │   ├── index.tsx           # Home feed
│   │   ├── explore.tsx         # Category browse
│   │   ├── cart.tsx            # Shopping cart
│   │   ├── orders.tsx          # Order history
│   │   └── profile.tsx         # User profile
│   ├── product/[id].tsx        # Product detail
│   ├── checkout/               # Checkout flow
│   ├── search.tsx              # Search results
│   └── _layout.tsx             # Root layout
├── components/
│   ├── ui/                     # Base primitives (Button, Input, Badge, etc.)
│   ├── product/                # ProductCard, ProductGrid, PriceTag, etc.
│   ├── cart/                   # CartItem, CartSummary
│   ├── home/                   # BannerCarousel, FlashSaleTimer, CategoryRow
│   └── shared/                 # Header, BottomSheet, EmptyState, Skeleton
├── lib/
│   ├── supabase.ts             # Supabase client singleton
│   ├── stripe.ts               # Stripe client
│   └── queryClient.ts          # TanStack Query client
├── hooks/                      # Custom hooks (useCart, useAuth, useProducts, etc.)
├── stores/                     # Zustand stores (cartStore, authStore, uiStore)
├── services/                   # API calls (productService, orderService, etc.)
├── types/                      # Global TypeScript types and Supabase DB types
├── constants/                  # Colors, spacing, config
└── utils/                      # formatPrice, formatDate, truncate, etc.
```

---

## Supabase Database Schema

### Tables

**profiles**
- id (uuid, FK → auth.users)
- full_name, avatar_url, phone
- default_address_id (FK → addresses)
- created_at, updated_at

**addresses**
- id, user_id (FK → profiles)
- label (Home / Work / Other)
- street, city, state, postal_code, country
- is_default (boolean)

**categories**
- id, name, slug, icon_url, parent_id (self-referential for subcategories)
- sort_order, is_active

**products**
- id, name, slug, description
- category_id (FK → categories)
- seller_id (FK → profiles)
- price_original, price_sale, currency
- stock_quantity, is_active, is_featured
- images (text[], ordered array of Storage URLs)
- tags (text[])
- rating_avg, rating_count
- created_at, updated_at

**product_variants**
- id, product_id, label (e.g. "Size: L / Color: Red")
- sku, price_override, stock_quantity, attributes (jsonb)

**cart_items**
- id, user_id, product_id, variant_id, quantity
- added_at

**wishlists**
- id, user_id, product_id, added_at

**orders**
- id, user_id, status (pending / paid / processing / shipped / delivered / cancelled / refunded)
- address_id, payment_intent_id
- subtotal, shipping_fee, discount_amount, total
- currency, notes
- created_at, updated_at

**order_items**
- id, order_id, product_id, variant_id
- quantity, unit_price, total_price
- product_snapshot (jsonb — frozen product data at time of purchase)

**reviews**
- id, product_id, user_id, order_id
- rating (1–5), title, body
- images (text[])
- helpful_count, created_at

**flash_sales**
- id, title, starts_at, ends_at, is_active

**flash_sale_items**
- id, flash_sale_id, product_id
- sale_price, max_quantity, sold_count

**coupons**
- id, code (unique), type (percentage / fixed)
- value, min_order_amount, max_uses, used_count
- expires_at, is_active

**notifications**
- id, user_id, type, title, body, data (jsonb), read_at, created_at

---

## Planned Features

### Authentication
- Email + password sign up / sign in
- Magic link (passwordless) login
- Google OAuth
- Persistent session via Supabase Auth
- Protected routes redirect to (auth) if unauthenticated

### Home Feed
- Hero banner carousel (promotional images, auto-scrolling)
- Flash sale section with live countdown timer
- Category quick-access row (icons grid)
- "Just for You" personalized product grid (based on browse history)
- "New Arrivals" horizontal scroll
- "Top Deals" section (highest discount %)
- Pull-to-refresh

### Product Discovery
- Category browse tree (parent → subcategory drill-down)
- Search with instant results (Supabase full-text search)
- Filter panel: price range, category, rating, in-stock only
- Sort: Relevance / Price Low–High / Price High–Low / Newest / Best Rated
- Infinite scroll pagination (TanStack Query `useInfiniteQuery`)

### Product Detail
- Image gallery with pinch-to-zoom
- Variant selector (size, color, etc.)
- Price display: sale price + original crossed out + discount % badge
- Stock indicator (low stock warning < 10 units)
- Add to cart / Buy Now buttons
- Wishlist toggle (heart icon)
- Ratings summary + review list
- "You May Also Like" related products
- Share button (Expo Sharing)

### Shopping Cart
- Add / remove / update quantity
- Variant details shown per item
- Coupon code field
- Order summary: subtotal, shipping, discount, total
- Cart persists via Supabase (synced across devices when logged in)
- Empty cart state with CTA to explore

### Checkout
- Address selection / add new address
- Shipping method selection (standard / express)
- Payment via Stripe (card input, Apple Pay, Google Pay)
- Order review screen before confirm
- Success screen with order ID

### Orders
- Order list with status badges
- Order detail: items, address, timeline, totals
- Order status real-time updates via Supabase Realtime
- Cancel order (if still pending)
- Request refund flow

### User Profile
- Edit name, avatar (Expo ImagePicker → Supabase Storage)
- Manage addresses (CRUD)
- Wishlist / Saved Items
- Review history
- Notification preferences
- Logout

### Reviews & Ratings
- Leave review only after delivered order
- Star rating + optional title + body + photo upload
- Mark review as helpful
- Report review

### Notifications
- Push notifications via Expo Notifications
- In-app notification center
- Types: order status change, flash sale starts, back-in-stock, coupon

### Gamification / Engagement
- Daily check-in reward (coins/discount credit)
- Spin-the-wheel for discount coupons
- Referral program (invite link → reward on first purchase)
- Progress bar toward free shipping threshold

### Admin / Seller (future)
- Product listing management
- Order management dashboard
- Sales analytics

---

## Coding Rules

### TypeScript
- Strict mode always on (`"strict": true` in tsconfig)
- No `any` — use `unknown` + type guards if the shape is unknown
- All Supabase responses typed via generated `Database` types (`supabase gen types typescript`)
- Props interfaces named `[ComponentName]Props`, never inline object types for component props

### Components
- One component per file; filename matches export name
- Functional components only, no class components
- Keep components under ~150 lines; extract sub-components if larger
- No business logic in components — delegate to hooks
- All list renders use `FlatList` or `FlashList`, never `ScrollView` + `.map()`

### Hooks
- All Supabase queries wrapped in TanStack Query hooks inside `hooks/`
- Mutations use `useMutation` with `onSuccess` cache invalidation
- Auth state read from `authStore` (Zustand), not directly from Supabase in components

### Styling
- All styles via `StyleSheet.create()` — no inline style objects except for dynamic values
- Use constants from `constants/colors.ts` and `constants/spacing.ts` — never hardcode `#FF6B00` or pixel values directly in component files
- No third-party UI component libraries (build from primitives)

### Supabase
- Single client instance exported from `lib/supabase.ts`
- All DB access goes through `services/` functions — never call `supabase` directly from a component
- Row Level Security (RLS) enabled on all tables
- Use Supabase Storage for all user-uploaded images

### Navigation
- File-based routing via Expo Router
- Typed routes: use `router.push()` with typed path strings
- Auth guard in root `_layout.tsx` — redirect unauthenticated users

### Error Handling
- All async service functions return `{ data, error }` shaped results (mirrors Supabase convention)
- Display user-facing errors via a toast/snackbar, never `alert()`
- Log errors to console in dev; send to analytics in production

### Git
- Branch naming: `feature/`, `fix/`, `chore/`
- Commits follow Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`
- Never commit directly to `master` — always PR

### Performance
- Use `expo-image` for all images (caching built in)
- Memoize expensive list item renders with `React.memo`
- Avoid anonymous functions in JSX for repeated renders
- Lazy-load heavy screens via `React.lazy` / dynamic imports where Expo Router supports it

---

## Environment Variables

Stored in `.env.local` (never committed):
```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=
EXPO_PUBLIC_POSTHOG_API_KEY=
```

All `EXPO_PUBLIC_` prefixed vars are safe to bundle client-side. Secret keys (Stripe secret, Supabase service role) never go in the app — only in Supabase Edge Functions.

---

## Key Commands

```bash
npm start                 # Start Expo dev server
npm run android           # Run on Android emulator/device
npm run ios               # Run on iOS simulator (macOS only)
npx expo install          # Install Expo-compatible package version
npx supabase gen types typescript --project-id <id> > types/database.types.ts
```

# Smart Tourism Website with AI and Virtual Reality

A full-stack smart tourism platform: explore Indian destinations, plan trips with an AI travel
assistant, take 360° virtual reality tours, search stays and flights, and complete a demonstration
booking and payment flow.

**The project always runs locally with zero credentials.** Every third-party integration
(Google Maps, OpenAI, Amadeus, PostgreSQL) has a clearly-labelled demonstration fallback, so nothing
is ever presented as real-time data when it is not.

---

## 1. Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS 3 with a custom nature/travel palette |
| Animation | Framer Motion 11 |
| 3D / VR | Three.js (360° panoramas) + A-Frame (VR headset mode) |
| Map | Google Maps JavaScript API (with a stylised SVG fallback map) |
| AI | OpenAI Chat Completions API (with a rule-based offline engine) |
| Travel data | Amadeus Travel API (with a deterministic demo fare generator) |
| Backend | Node.js + Express REST API (`server/`) |
| Database | PostgreSQL + Prisma ORM (`prisma/schema.prisma`) |
| Auth | bcryptjs password hashing + JWT sessions |

---

## 2. Quick start

```bash
# 1. Install dependencies
npm install

# 2. (optional) create your environment file
copy .env.example .env        # Windows
# cp .env.example .env        # macOS / Linux

# 3. Run the frontend AND the backend API together
npm run dev
```

Then open **http://localhost:3000**. The API runs on **http://localhost:4000/api**.

You do not need PostgreSQL, an OpenAI key, a Google Maps key or Amadeus credentials to see the whole
site working. Skipping step 2 is completely fine.

### Other scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs the Next.js frontend and the Express API together |
| `npm run dev:web` | Frontend only (http://localhost:3000) |
| `npm run dev:api` | Backend API only (http://localhost:4000/api) |
| `npm run build` | Production build (all 15 pages pre-render/compile) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run prisma:generate` | Generate the Prisma client |
| `npm run prisma:push` | Push the schema to PostgreSQL |
| `npm run prisma:seed` | Load destinations, hotels, reviews and a demo user |

---

## 3. Enabling the real integrations (all optional)

Copy `.env.example` to `.env` and fill in only what you own. Each key independently upgrades one
feature from demonstration mode to live mode.

| Variable | Effect when set | Behaviour when empty |
| --- | --- | --- |
| `DATABASE_URL` | Express API persists users/bookings/trips/reviews in PostgreSQL via Prisma | API uses an in-memory store with the same shape |
| `JWT_SECRET` | Real JWT signing key for auth tokens | A demo default is used (logged as a warning) |
| `OPENAI_API_KEY` | Chatbot answers come from OpenAI | Bundled rule-based travel engine answers |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Real interactive Google map | Stylised SVG map with the same pins and filtering |
| `AMADEUS_CLIENT_ID` + `AMADEUS_CLIENT_SECRET` | Live flight search results | Deterministic demonstration fares |

### Using PostgreSQL

```bash
# 1. Set DATABASE_URL in .env to your PostgreSQL connection string
# 2. Create the tables from the Prisma schema
npm run prisma:push

# 3. Load destinations, hotels, starter reviews and a demo account
npm run prisma:seed
```

The seed script prints a demo account you can sign in with:

```
demo@smarttourism.app  /  demo1234
```

The API logs which mode it is running in on startup:

```
[db] Connected to PostgreSQL via Prisma.
[store] Active repository: database
```

…or, if the database is unreachable:

```
[db] DATABASE_URL is not set - using the in-memory store.
[store] Active repository: memory
```

---

## 4. Pages

All 15 pages required by the brief are implemented and reachable.

| # | Page | Route |
| --- | --- | --- |
| 1 | Home | `/` |
| 2 | Explore Destinations | `/explore` |
| 3 | Destination Details | `/destinations/[id]` (e.g. `/destinations/goa`) |
| 4 | AI Travel Assistant | `/assistant` |
| 5 | Plan Your Trip | `/plan` |
| 6 | Virtual Reality Tours | `/virtual-tour` |
| 7 | Hotels & Travel Options | `/hotels` |
| 8 | Booking Details | `/booking` |
| 9 | Payment Demo | `/payment` |
| 10 | User Login | `/login` |
| 11 | User Registration | `/register` |
| 12 | User Dashboard | `/dashboard` |
| 13 | Booking History | `/bookings` |
| 14 | About Us | `/about` |
| 15 | Contact Us | `/contact` |

### Destinations covered (Tamil Nadu + nearby)

The bundled catalogue (`src/lib/data.ts`) ships 16 destinations, each with stays, nearby services
(hospital / police / ATM / restaurant), reviews and 360° virtual tour scenes.

| Destination | Category | Destination | Category |
| --- | --- | --- | --- |
| Chennai | City | Rameswaram | Spiritual |
| Madurai | Heritage | Thanjavur | Heritage |
| Mahabalipuram | Heritage | Coimbatore | City |
| Kanyakumari | Beach | Kanchipuram | Heritage |
| Ooty | Mountain | Trichy (Tiruchirappalli) | Heritage |
| Puducherry | Beach | Mudumalai | Wildlife |
| Kodaikanal | Mountain | Velankanni | Spiritual |
| Yercaud | Mountain | Chettinad | Heritage |

The world map and Explore filters default to the centre of Tamil Nadu
(`TAMIL_NADU_CENTRE` in `src/lib/data.ts`).

---

## 5. API reference

Base URL: `http://localhost:4000/api`

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/health` | – | Status, active repository and which integrations are live |
| GET | `/destinations` | – | List/search destinations (`?q=`, `?category=`) |
| GET | `/destinations/:id` | – | Full destination with stays, nearby services and VR tours |
| POST | `/auth/register` | – | Create an account, returns `{ token, user }` |
| POST | `/auth/login` | – | Sign in, returns `{ token, user }` |
| GET | `/auth/me` | Bearer | Current user profile |
| PUT | `/auth/profile` | Bearer | Update profile (name, phone, interests, budget) |
| GET | `/bookings` | Bearer | Booking history |
| POST | `/bookings` | Bearer | Create a booking (pending / unpaid) |
| GET | `/bookings/:id` | Bearer | Fetch one booking by id or reference |
| DELETE | `/bookings/:id` | Bearer | Cancel a booking (simulated refund when paid) |
| POST | `/payments` | Bearer | Record a simulated payment, confirm the booking |
| GET | `/trips` | Bearer | Saved itineraries |
| POST | `/trips` | Bearer | Save a trip (generates an itinerary when omitted) |
| GET | `/reviews?destinationId=` | – | Reviews and ratings for a destination |
| POST | `/reviews` | Bearer | Add a review and rating |
| POST | `/chat` | – | AI travel assistant (`{ message, history?, context? }`) |
| GET | `/travel/flights?from=&to=&date=` | – | Flight search (Amadeus or demo fares) |
| GET | `/travel/hotels?destination=` | – | Stay catalogue (demonstration data) |

Example:

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Harini G","email":"harini@example.com","password":"secret123"}'
```

---

## 6. Working features vs demonstrations

This table is the honesty contract of the project: it says exactly what is real and what is sample
data. The UI repeats these labels inline with `DemoBadge` / `LiveBadge` chips.

| Feature | Without credentials | With credentials |
| --- | --- | --- |
| Destinations, costs, travel info | Bundled dataset of 16 Tamil Nadu destinations — **demonstration data** | Same dataset (or the PostgreSQL copy) |
| Hotels & stays | Bundled demonstration catalogue | Bundled catalogue (Amadeus hotel content needs a separate agreement) |
| Flight search | **Demonstration fares**, deterministic and labelled `live: false` | Amadeus live offers, labelled `live: true` |
| Interactive map | Stylised SVG fallback map with real pin projection | Google Maps with Places, directions and nearby search |
| AI travel assistant | Rule-based engine over the bundled dataset | OpenAI Chat Completions, grounded on the same dataset |
| Virtual reality tours | 360° panoramas rendered in Three.js + A-Frame VR mode — **sample imagery** | Same (no licensed 360° photography is bundled) |
| Accounts & auth | In-browser demo store (obfuscated password, **not security**) | bcrypt hashes + JWT sessions in PostgreSQL |
| Booking history | Browser `localStorage` | PostgreSQL `Booking` table |
| Payments | **Simulated** card / UPI / wallet — no gateway, no money, no credentials collected | Replace `POST /payments` with Stripe/Razorpay |

### Payments and privacy

- The payment page is a **simulator**. No card number, CVV, expiry, UPI ID or UPI PIN is ever
  requested, transmitted or stored. Only the *chosen method name* is saved with the booking.
- Card and UPI fields on the demo page are free-text placeholders that reset on reload.
- For production, integrate a PCI-compliant provider (Stripe or Razorpay) and never handle raw
  payment credentials yourself.

---

## 7. Project structure

```
├─ prisma/
│  ├─ schema.prisma            # User, Destination, Hotel, Trip, ItineraryDay,
│  │                           # Booking, Review, Payment
│  └─ seed.ts                  # Sample destinations, hotels, reviews, demo user
├─ server/                     # Express + Prisma backend
│  ├─ index.ts                 # App bootstrap, CORS, health, error handling
│  ├─ lib/
│  │  ├─ auth.ts               # bcrypt hashing, JWT signing, requireAuth middleware
│  │  ├─ prisma.ts             # Lazy Prisma client with safe fallback
│  │  ├─ store.ts              # Repository layer: PostgreSQL or in-memory
│  │  └─ integrations.ts       # OpenAI + Amadeus with graceful degradation
│  └─ routes/                  # auth, destinations, bookings, payments,
│                              # trips, reviews, chat, travel
└─ src/
   ├─ app/                     # Next.js App Router — all 15 pages
   ├─ components/              # Navbar, Footer, MapView, VirtualTourViewer,
   │                           # AiChat, ChatWidget, BookingClient, PaymentClient, …
   ├─ lib/                     # data, itinerary, assistant, flights, store,
   │                           # api client, hooks, formatting
   └─ types/                   # Shared domain types (mirror the Prisma models)
```

### How the fallbacks work

`src/lib/api.ts` exposes `withFallback(call, fallback)`. Every API call in the UI tries the Express
backend first and, if it is unreachable, silently answers from the bundled dataset while tagging the
result `source: 'local'` so the interface can label it. That is why the site is fully usable whether
you run `npm run dev:web` on its own or the complete `npm run dev`.

---

## 8. Accessibility and UX

- Responsive from small phones through to wide desktops.
- Respects `prefers-reduced-motion` (the `Reveal` wrapper disables scroll animations).
- Keyboard-navigable navigation, skip-to-content link, `aria-pressed` on toggle controls.
- Loading indicators (`Spinner`, `LoadingBlock`, `SkeletonCard`) and explicit error states with retry
  actions on every asynchronous surface.
- Consistent nature / travel / adventure colour palette: emerald `brand`, teal `lagoon`,
  amber `sunset`, warm neutral `sand`.

---

## 9. Notes and limitations

- Destination hero images and galleries are **real photographs** of the actual Tamil Nadu landmarks,
  loaded from Wikimedia Commons via the `WIKI_PHOTOS` map in `src/lib/data.ts` (freely licensed; keep
  the source attribution if you reuse them). Hotel exteriors and the 360° tour panoramas are still
  generated sample content.
- Virtual tour imagery is **sample content**, generated for this project. Replace the scene images in
  `src/lib/data.ts` with licensed equirectangular 360° photographs for production use.
- Amadeus hotel content requires an approved test agreement; the hotel endpoints therefore always
  serve the bundled catalogue and say so.
- The in-memory fallback store lives inside the API process, so restarting `npm run dev:api` clears
  users and bookings created through the API. Configure `DATABASE_URL` to persist them.
- This is a demonstration project. Do not reuse real passwords, and never enter real card or UPI
  details into the payment simulator.

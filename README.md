# Pastebin Lite

A minimal Pastebin-like application built with Next.js.
Users can create text pastes and share a link to view them.
Each paste can optionally expire by time (TTL) or by view count.

This project was built as part of a take-home assignment.

---

## Features

- Create a paste with arbitrary text
- Optional time-based expiry (TTL)
- Optional maximum view count
- Shareable URL to view the paste
- API and HTML rendering support
- Deterministic time support for automated testing

---

## Tech Stack

- Next.js (App Router)
- Node.js
- Upstash Redis (persistence)

---

## Persistence Layer

This project uses **Upstash Redis** as the persistence layer.

Reason:
- Works well in serverless environments
- Data persists across requests
- Fast and reliable for key-value access
- Suitable for automated testing on Vercel

Each paste is stored as a Redis key with metadata including:
- content
- created time
- expiry time
- view count
- max views

---

## Running Locally

###  1. Clone the repository
```bash
git clone https://github.com/Nagatriveni2910/pastebin-lite.git
cd pastebin-lite
```

###  2. Install dependencies
```bash
npm install
```


### 3. Create .env.local
```env
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run the app
```bash
npm run dev
```
###  Open 
```bash
http://localhost:3000
```

## API Routes

### Health Check
```bash
GET /api/healthz
```

#### Response:
```bash
json
{ "ok": true }
```

### Create Paste
```bash
POST /api/pastes
```

#### Request Body:
```bash
json
{
  "content": "Hello Pastebin Lite",
  "ttl_seconds": 60,
  "max_views": 5
}
```

#### Response:
```bash
json
{
  "id": "abc123",
  "url": "http://localhost:3000/p/abc123"
}
```

### Fetch Paste (API)
```bash
GET /api/pastes/:id
```

#### Response:
```bash
{
  "content": "Hello Pastebin Lite",
  "remaining_views": 4,
  "expires_at": "2026-01-01T00:00:00.000Z"
}
```

### View a Paste (UI)
```bash
GET /p/:id
```
Returns an HTML page showing the paste content.

## Testing Mode
To support deterministic expiry testing, the app supports:
```env
TEST_MODE=1
```

When enabled, the request header:

## x-test-now-ms

is treated as the current time for expiry logic.

## Notes & Design Decisions

- Redis keys are stored as paste:<id>

- View count is decremented atomically

- TTL and view constraints are enforced strictly

- Test mode supported using:

      - TEST_MODE=1

      - x-test-now-ms request header

  ## Deployment
The app is deployed on Vercel and connected to GitHub for CI/CD.
Environment variables are configured in the Vercel dashboard.

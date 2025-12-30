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

### 1. Clone the repository
```bash
git clone https://github.com/Nagatriveni2910/pastebin-lite.git
cd pastebin-lite

### 2. Install dependencies

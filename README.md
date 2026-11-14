# devnotes

A responsive developer writing community built with React, TypeScript, NestJS, Prisma, and PostgreSQL.

## Features

- Public story feed with search, topics, pagination, and author details
- Account registration and login using bcrypt and short-lived JWTs
- Authenticated story publishing, editing, and deletion with author ownership checks
- Authenticated likes and comments
- Request validation, API throttling, CORS configuration, and Swagger docs
- Responsive frontend and Docker Compose setup for the API and PostgreSQL

## Run locally

Requirements: Node.js 22+, npm, and Docker (or a PostgreSQL 16 instance).

1. Copy backend/.env.example to backend/.env. Set DATABASE_URL to your PostgreSQL URL and replace JWT_SECRET with a random secret (openssl rand -base64 48).
2. Start PostgreSQL with Docker Compose: docker compose up -d db.
3. Install and prepare the API:

    cd backend
    npm ci
    npm run db:generate
    npm run db:dev
    npm run start:dev

4. In another terminal, install and start the frontend:

    cd frontend
    cp .env.example .env.local
    npm ci
    npm run dev

Frontend: http://localhost:5173 · API: http://localhost:3000 · API docs: http://localhost:3000/api/docs

The frontend can render a small local preview when the API cannot be reached. Stories are stored in PostgreSQL and the list will be empty on a fresh database until you publish content.

## Deploy with Docker Compose

Set JWT_SECRET to a long random value and optionally set POSTGRES_PASSWORD and CORS_ORIGIN, then run:

    JWT_SECRET="$(openssl rand -base64 48)" CORS_ORIGIN="https://your-frontend.example.com" docker compose up --build -d

This starts the frontend at http://localhost:8080, the API at http://localhost:3000, and PostgreSQL. The API runs Prisma migrations on startup. For hosted deployment, use managed PostgreSQL with backups and deploy both Docker services. Set DATABASE_URL, JWT_SECRET, PORT=3000, and CORS_ORIGIN to your public frontend origin for the API; set VITE_API_URL to your public API origin at frontend build time. Put both services behind HTTPS in production.

Never commit .env files or production credentials. The frontend's VITE_API_URL is public configuration and must not contain secrets.

## Useful commands

- cd backend && npm run build — generate Prisma client and compile the API
- cd backend && npm run db:migrate — apply checked-in migrations to the configured database
- cd frontend && npm run build — type-check and build the static frontend
- cd frontend && npm run lint — lint frontend source

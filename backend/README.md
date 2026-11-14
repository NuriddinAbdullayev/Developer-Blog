# Devnotes API

NestJS REST API for devnotes. See the root README for local development and Docker deployment instructions.

## Routes

- GET / — health response
- GET /api/docs — Swagger UI
- POST /auth/register, POST /auth/login
- GET /posts, GET /posts/:id
- POST /posts, PATCH /posts/:id, DELETE /posts/:id (Bearer JWT; only the author may update/delete)
- POST /posts/:id/like, POST /posts/:id/comments (Bearer JWT)
- GET /users, GET /users/:id

GET /posts accepts q, tag, page, and limit query parameters. Set DATABASE_URL, JWT_SECRET, and CORS_ORIGIN in the environment. Apply migrations with npm run db:migrate.

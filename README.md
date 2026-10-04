# Developer Blog

A full-stack developer blog website where developers can share articles, knowledge, and experiences related to software development.

The project is built with **React + TypeScript** on the frontend and **NestJS + TypeScript** on the backend.

## Tech Stack

### Frontend

* React
* TypeScript
* React Router
* TanStack Query
* Axios

### Backend

* NestJS
* TypeScript
* REST API
* Authentication & Authorization

### Database

* PostgreSQL

## Features

* User registration and authentication
* User profiles
* Create, edit, and delete blog posts
* View and search articles
* Categories and tags
* Comments
* Like articles
* Pagination
* Role-based access control
* Protected routes
* Responsive interface

## Project Structure

```text
developer-blog/
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── src/
│   └── package.json
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd developer-blog
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

Start the development server:

```bash
npm run start:dev
```

### 3. Setup the Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

## API

The backend provides a REST API for:

* Authentication
* Users
* Blog posts
* Categories
* Tags
* Comments
* Likes

The API is served by the NestJS backend.

## Environment Variables

### Backend

```env
DATABASE_URL=
JWT_SECRET=
```

> Do not commit `.env` files or sensitive credentials to the repository.

## Development

Run the backend and frontend separately during development:

```bash
# Backend
cd backend
npm run start:dev
```

```bash
# Frontend
cd frontend
npm run dev
```

## License

This project is for educational purposes.

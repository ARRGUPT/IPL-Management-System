# IPL Management System (ipl-ms)

A RESTful API for managing IPL-related entities including owners, teams, players, sponsors, broadcasters, team-sponsor links, and team-broadcaster links.

## Features

- User authentication with registration, login, email verification, refresh tokens, logout, forgot/reset password
- Owner management with admin-only creation, update, and deletion
- Team management, including owner-specific team queries
- Player management with role updates, stat updates, transfers, and top player listing
- Sponsor and broadcaster CRUD operations
- Team-sponsor and team-broadcaster relationship management
- File upload support for user avatars via authenticated routes
- MongoDB persistence with Docker Compose support
- Express 5, Mongoose, JWT, Joi validation, and cookie-based token handling

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Joi for request validation
- Multer for file uploads
- Nodemailer for email delivery
- ImageKit for avatar uploads
- Docker Compose for local MongoDB

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm installed
- Docker Desktop (for MongoDB local service)

### Clone repository

```bash
git clone <repository-url>
cd IPL-Management-System
```

### Install dependencies

```bash
npm install
```

### Environment variables

Copy the sample environment file and update the values:

```bash
copy env.example .env
```

Add the following variables to `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://admin:password@localhost:27017/ipl-ms?authSource=admin
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_FROM_NAME=Your App Name
SMTP_FROM_EMAIL=you@example.com
CLIENT_URL=http://localhost:3000
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

> Note: `env.example` currently contains only `PORT`, but the application uses more environment variables for MongoDB, JWT, email, and ImageKit.

### Start local MongoDB

```bash
npm run db:up
```

To stop the MongoDB service:

```bash
npm run db:down
```

### Start the server

```bash
npm run dev
```

Or run in production mode:

```bash
npm start
```

The server starts on the port specified in `.env`, defaulting to `5000`.

## API Endpoints

### Auth

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - login and receive auth cookies
- `POST /api/auth/refresh-token` - refresh access token from refresh cookie
- `GET /api/auth/verify-email/:token` - verify user email
- `POST /api/auth/logout` - logout and clear auth cookies
- `POST /api/auth/forgot-password` - request password reset email
- `PUT /api/auth/reset-password/:token` - reset password using token
- `GET /api/auth/me` - get authenticated user profile
- `POST /api/auth/avatar` - upload authenticated user avatar

### Owners

- `POST /api/owners` - create owner (admin only)
- `GET /api/owners` - list owners
- `GET /api/owners/:id` - get owner by ID
- `PUT /api/owners/:id` - update owner (admin only)
- `DELETE /api/owners/:id` - delete owner (admin only)

### Teams

- `POST /api/teams` - create team (admin only)
- `GET /api/teams` - list teams
- `GET /api/teams/owner` - list teams by owner
- `GET /api/teams/:id` - get team by ID
- `PUT /api/teams/:id` - update team (admin only)
- `DELETE /api/teams/:id` - delete team (admin only)

### Players

- `POST /api/players` - create player (admin only)
- `GET /api/players` - list players
- `GET /api/players/top` - list top players
- `GET /api/players/team` - list players by team
- `GET /api/players/:id` - get player by ID
- `PATCH /api/players/transfer/:id` - transfer player to another team (admin only)
- `PATCH /api/players/:id/role` - update player role (admin only)
- `PATCH /api/players/:id/stats` - update player stats (admin only)
- `DELETE /api/players/:id` - delete player (admin only)

### Sponsors

- `POST /api/sponsors` - create sponsor (admin only)
- `GET /api/sponsors` - list sponsors
- `GET /api/sponsors/:id` - get sponsor by ID
- `PUT /api/sponsors/:id` - update sponsor (admin only)
- `DELETE /api/sponsors/:id` - delete sponsor (admin only)

### Broadcasters

- `POST /api/broadcasters` - create broadcaster (admin only)
- `GET /api/broadcasters` - list broadcasters
- `GET /api/broadcasters/:id` - get broadcaster by ID
- `PUT /api/broadcasters/:id` - update broadcaster (admin only)
- `DELETE /api/broadcasters/:id` - delete broadcaster (admin only)

### Team Sponsors

- `POST /api/team-sponsors` - create team-sponsor relationship (admin only)
- `GET /api/team-sponsors` - list team sponsors
- `GET /api/team-sponsors/:id` - get team sponsor by ID
- `PUT /api/team-sponsors/:id` - update team sponsor (admin only)
- `DELETE /api/team-sponsors/:id` - delete team sponsor (admin only)

### Team Broadcasters

- `POST /api/team-broadcasters` - create team-broadcaster relationship (admin only)
- `GET /api/team-broadcasters` - list team broadcasters
- `GET /api/team-broadcasters/:id` - get team broadcaster by ID
- `PUT /api/team-broadcasters/:id` - update team broadcaster (admin only)
- `DELETE /api/team-broadcasters/:id` - delete team broadcaster (admin only)

## Project Structure

- `server.js` — application entry point
- `src/app.js` — Express app and routes
- `src/common/config` — shared configuration for database, email, and image uploads
- `src/common/middleware` — request validation and upload middleware
- `src/common/utils` — API response helpers, error handling, JWT helpers
- `src/modules/auth` — authentication module, DTOs, controllers, services, and routes
- `src/modules/ipl-ms` — IPL management domain modules for owners, teams, players, sponsors, broadcasters, and relationships

## Notes

- Authenticated routes require a valid JWT access token and refresh token stored in cookies.
- The server includes a catch-all route for undefined endpoints and returns a 404-style API error.
- `npm run db:up` starts MongoDB in Docker while `npm run db:down` stops it.

## License

This project is provided as-is.

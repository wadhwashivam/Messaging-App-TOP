# Project Messaging App

A full-stack, real-time-ish messaging application built as the final project for [The Odin Project's NodeJS course](https://www.theodinproject.com/lessons/nodejs-messaging-app). Users can sign up, customize their profile, and send messages to any other registered user.

## Live Demo

- **Frontend:** _coming soon_
- **Backend API:** _coming soon_

## Features

- **Authentication** — Email/password signup and login using Passport.js (Local + JWT strategies), with bcrypt password hashing.
- **Messaging** — Send and receive messages with any other registered user. Conversations are fetched per-user and merged into a single, chronologically ordered thread.
- **Live-ish updates** — Since this is a REST API (not WebSockets), the frontend polls the active conversation every few seconds to simulate real-time delivery, alongside instant local updates for messages you send yourself.
- **Profile customization** — Update your display name, bio, and avatar (image URL) at any time.
- **User discovery** — A sidebar listing every registered user (excluding yourself), each linking to a conversation with them.
- **Protected routes** — The chat and profile screens are inaccessible without a valid session; sessions persist across page reloads via JWT rehydration.

## Tech Stack

**Backend**
- Node.js + Express 5
- PostgreSQL + Prisma ORM 7
- Passport.js (`passport-local`, `passport-jwt`) for authentication
- `jsonwebtoken` for session tokens
- `bcryptjs` for password hashing
- `express-validator` for request validation

**Frontend**
- React 19 + Vite
- React Router (nested routes, protected routes)
- React Context API for global auth state
- Material UI (MUI)
- `jwt-decode` for reading token payloads client-side

## Architecture Notes

This project deliberately follows a REST client-server split, as required by the assignment:

- The backend never pushes data to clients — it only ever responds to requests.
- "Real-time" delivery is simulated entirely on the frontend via polling (`setInterval`, cleared/reset on unmount or conversation change).
- The JWT payload only contains the user's `id`. The frontend decodes it client-side to identify the logged-in user, then fetches their full profile via a separate request — the token itself carries no sensitive or profile data.

## Project Structure

```
Project-Messaging-App/
├── app.js
├── prisma/
│   └── schema.prisma
├── database/
│   └── queries.js
├── controllers/
│   ├── authenticationController.js
│   ├── userController.js
│   └── messageController.js
├── routes/
│   ├── indexRouter.js
│   ├── authenticationRouter.js
│   ├── userRouter.js
│   └── messageRouter.js
├── middleware/
│   ├── requireOwnership.js
│   └── error.js
├── config/
│   └── passport.js
└── frontend/
    └── src/
        ├── api/            # client.js (shared fetch wrapper), auth.js
        ├── context/        # AuthContext
        ├── components/     # Sidebar, ChatWindow, MessageThread, MessageInput, ProfileEditor, ProtectedRoute
        ├── pages/           # Login, Signup, Chat, Profile
        └── App.jsx          # route definitions
```

## Data Model

**User**
| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | Primary key |
| username | String | Unique, used for login |
| password | String | Bcrypt hash |
| name | String | Display name |
| bio | String? | Optional |
| avatar | String? | Optional, image URL |

**Message**
| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | Primary key |
| content | String | |
| createdAt | DateTime | Defaults to now |
| senderId | String | FK → User, cascades on delete |
| recipientId | String | FK → User, cascades on delete |

## API Endpoints

| Method | Route | Description | Auth required |
|---|---|---|---|
| POST | `/signup` | Create a new account | No |
| POST | `/login` | Authenticate and receive a JWT | No |
| GET | `/users` | List all users (excluding passwords) | Yes |
| GET | `/users/:id` | View a specific user's profile | Yes |
| PATCH | `/users/:id` | Edit your own profile (name/bio/avatar) | Yes (owner only) |
| DELETE | `/users/:id` | Delete your own account | Yes (owner only) |
| GET | `/messages/:id` | Fetch the full conversation thread with user `:id` | Yes |
| POST | `/messages/:id` | Send a message to user `:id` | Yes |

## Getting Started

### Prerequisites

- Node.js (v22+)
- PostgreSQL running locally or hosted

### Backend Setup

```bash
# from the project root
npm install

# create a .env file with:
# DATABASE_URL="postgresql://user:password@localhost:5432/messaging_app"
# JWT_SECRET="your-secret-key"
# PORT=3000

npx prisma migrate dev --name init
node --watch app.js
```

### Frontend Setup

```bash
cd frontend
npm install

# create a .env file with:
# VITE_API_URL=http://localhost:3000

npm run dev
```

The frontend runs on `http://localhost:5173` by default and expects the backend running on `http://localhost:3000` (or whatever `VITE_API_URL` points to).

### Testing with two users

Since the app supports multiple simultaneous sessions, open one browser window normally and a second in an incognito/private window (or a different browser) to log in as two different users and test messaging between them.

## Known Limitations

- No true real-time delivery — messages arrive on a 3-second poll rather than instantly, per the assignment's stated scope.
- No search functionality — the sidebar shows all registered users; filtering by username was scoped out as a deliberate future enhancement.
- No image messages, online-status indicators, or group chats (see Extra Credit below).

## Extra Credit (Not Implemented)

- [ ] Image messages
- [ ] Friends list / online status
- [ ] Group chats

## License

MIT
# Marvel Universe Library

**Full-Stack React + Node.js + Express + MongoDB Project**

A complete project blueprint and starter source code for a cinematic Marvel movie library.

## Technology Stack

- **Frontend:** React, Vite, React Router, Axios, responsive CSS
- **Backend:** Node.js, Express, CORS, dotenv, Mongoose-ready API
- **Database:** MongoDB-ready architecture (with seamless built-in fallback dataset)
- **API:** REST

---

## Project Structure

```text
marvel-universe/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .env
└── README.md
```

---

## How to Run

### 1. Backend Server

```bash
cd server
npm install
npm run dev
```

The API will start at `http://localhost:5000`.

### 2. Frontend Client

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend app will be running at `http://localhost:5173`.

---

## Current API Routes

- `GET /api/health` - Service health status
- `GET /api/movies` - List all Marvel movies
- `GET /api/movies/timeline` - List movies sorted in MCU chronological order
- `GET /api/movies/search?q=iron` - Search movies by keyword
- `GET /api/movies/:id` - Detailed movie information and full story breakdown

---

## Next Development Stage

- Expand the movie seed/database to the complete MCU catalogue.
- Add character collections and character connection graphs.
- Authentication & persistent user watchlists.
- Filter by Phase / Year / Genre.
- Official trailer integration.
- Admin CRUD portal with full MongoDB Atlas persistence.

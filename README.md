# Live Dashboard

A real-time React dashboard application displaying live events data with polling, pagination, and summary metrics.

## Tech Stack

- **Frontend**: React 18 + Vite 8 Beta (with Rolldown bundler)
- **Backend**: Express.js + PostgreSQL (Neon)
- **Build Tool**: Vite with experimental Rolldown bundler

## Project Structure

```
liveui/
├── api/                    # Backend API server
│   ├── src/
│   │   ├── db/
│   │   │   └── pool.js     # PostgreSQL connection pool
│   │   ├── routes/
│   │   │   └── liveState.routes.js  # API routes
│   │   ├── app.js          # Express app configuration
│   │   └── server.js       # Server entry point
│   ├── .env                # Environment variables (not tracked)
│   └── package.json
├── src/                    # Frontend React application
│   ├── api/
│   │   └── liveStateApi.js # API client helper
│   ├── components/
│   │   ├── SummaryCard.jsx # Summary metrics card
│   │   ├── EventsTable.jsx # Events table with pagination
│   │   └── ChartPlaceholder.jsx
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── vite.config.js          # Vite configuration with proxy
└── package.json
```

## Features

- **Real-time Data Polling**: Fetches live state data every 5 seconds
- **Pagination**: Displays 10 rows per page with navigation controls
- **Summary Metrics**: Shows total events, total amount, and active organizations
- **Ascending ID Sort**: Events sorted by ID in ascending order
- **Empty State Handling**: Gracefully handles empty data arrays

## Setup

### Prerequisites

- Node.js (v18+)
- PostgreSQL database (Neon)

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173)

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

### Backend Setup

1. Navigate to API directory:
```bash
cd api
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in `api/` directory:
```bash
DATABASE_URL="your-postgresql-connection-string"
PORT=4000
```

4. Start the API server:
```bash
npm start
```

The API will run on [http://localhost:4000](http://localhost:4000)

## Running the Full Application

1. **Start the backend** (in `api/` directory):
```bash
cd api
npm start
```

2. **Start the frontend** (in root directory):
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## API Endpoints

- `GET /api/live-state` - Returns array of live state events
  - Query params: `?org=<org_name>&region=<region_name>` (optional filters)
  - Returns: `[{ id, org, amount, region, source, event_time, updated_at }]`

## Development Notes

- Frontend proxies `/api/*` requests to `http://localhost:4000` via Vite proxy configuration
- Data polling interval: 5 seconds
- Pagination: 10 rows per page
- Events are sorted by ID in ascending order

## Environment Variables

### Frontend
No environment variables required (uses Vite proxy for API calls)

### Backend (`api/.env`)
```
DATABASE_URL=postgresql://...
PORT=4000
```

**Important**: `.env` files are gitignored. Never commit database credentials.

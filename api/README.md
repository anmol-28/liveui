# Live API

Express.js REST API server for serving live state data from PostgreSQL database.

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 4.x
- **Database**: PostgreSQL (via `pg` library)
- **Environment**: dotenv

## Project Structure

```
api/
├── src/
│   ├── db/
│   │   └── pool.js              # PostgreSQL connection pool
│   ├── routes/
│   │   └── liveState.routes.js  # Live state API routes
│   ├── app.js                   # Express app setup
│   └── server.js                # Server entry point
├── .env                         # Environment variables (gitignored)
└── package.json
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
PORT=4000
```

3. Start the server:
```bash
npm start
```

Server runs on `http://localhost:4000` (or PORT from .env)

## API Endpoints

### GET /api/live-state

Returns live state events from the database.

**Query Parameters** (optional):
- `org` - Filter by organization name
- `region` - Filter by region name

**Response**:
```json
[
  {
    "id": 1,
    "org": "Organization Name",
    "amount": 1000,
    "region": "us-east-1",
    "source": "api",
    "event_time": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

**Example Requests**:
- `GET /api/live-state` - Get all events (limited to 100)
- `GET /api/live-state?org=Acme` - Filter by organization
- `GET /api/live-state?region=us-west-2` - Filter by region
- `GET /api/live-state?org=Acme&region=us-west-2` - Combined filters

**Response Order**: Results ordered by `updated_at DESC`, limited to 100 records.

## Database Schema

Expected table: `serving_live_state`

Columns:
- `id` (integer, primary key)
- `org` (text)
- `amount` (numeric)
- `region` (text)
- `source` (text)
- `event_time` (timestamp)
- `updated_at` (timestamp)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `PORT` | Server port (default: 4000) | No |

## Error Handling

- Database errors return `500 Internal Server Error`
- Invalid queries are logged to console
- API returns JSON error responses: `{ error: "Internal Server Error" }`

## Security Notes

- `.env` file is gitignored - never commit database credentials
- Uses SSL for database connections (`rejectUnauthorized: false` for development)
- No authentication implemented (add middleware as needed)

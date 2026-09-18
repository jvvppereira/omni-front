# Omni Frontend

Real-time Twitter-like frontend consuming SSE events from [omni-back](https://github.com/jvvppereira/omni-back).

## 🛠 Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | React | 16.8 | UI library |
| **Build Tool** | Create React App | 5.0 | Zero-config bundler |
| **HTTP Client** | Fetch (native) | Built-in | API requests |
| **Routing** | React Router | 4.3 | SPA navigation |
| **Real-time** | EventSource (native) | Built-in | SSE for live updates |
| **Deployment** | Vercel | - | Serverless hosting |

## 📁 Project Structure

```
src/
├── components/
│   └── Tweet.js          # Tweet display component
├── pages/
│   ├── Login.js          # Username entry
│   └── Timeline.js       # Main feed + SSE subscription
├── services/
│   └── api.js            # Fetch wrapper (configurable baseURL)
├── App.js                # Routes
└── index.js              # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Backend running (see [omni-back](https://github.com/jvvppereira/omni-back))

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `REACT_APP_API_URL` | No | `https://omni-back-jvvppereira.vercel.app/` | Backend API + SSE endpoint |

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local (optional - for local backend)
echo "REACT_APP_API_URL=http://localhost:3000" > .env.local

# 3. Start dev server
npm start
# Opens http://localhost:3000
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server with hot reload |
| `npm run build` | Production build to `build/` |
| `npm test` | Run tests (watch mode) |

## 🔌 Real-time (SSE)

- Connects to `${REACT_APP_API_URL}events` via native `EventSource`
- Events: `tweet` (new tweet), `like` (updated tweet)
- Auto-reconnects on disconnect
- Event format: `event: tweet\ndata: {"_id":"...","author":"...",...}\n\n`

## 🚢 Deployment (Vercel)

1. Connect repo to Vercel
2. Add Environment Variable: `REACT_APP_API_URL=https://omni-back-jvvppereira.vercel.app/`
3. Deploy

## 📡 API Integration

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tweets` | List all tweets (newest first) |
| `POST` | `/tweets` | Create new tweet |
| `POST` | `/likes/:id` | Increment like count |
| `GET` | `/events` | SSE stream for real-time updates |

## 📄 License

MIT
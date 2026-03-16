# SearFind 🚀
> Global Job Search, Freelancer & Learning Platform

## 🌐 Live URL
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🛠️ Tech Stack
- Frontend: React.js + Vite + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB Atlas
- Auth: JWT
- Real-time: Socket.io
- Payments: Stripe

## 📁 Project Structure
```
searfind/
├── frontend/     # React.js app
└── backend/      # Node.js API
```

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/searfind.git
cd searfind
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌿 Branch Strategy
| Branch | Purpose |
|--------|---------|
| `main` | Production only |
| `dev` | Integration branch |
| `feature/job-search` | Job search module |
| `feature/freelancer` | Freelancer module |
| `feature/learning` | Learning platform |
| `feature/auth` | Authentication |
| `feature/dashboard` | Dashboard |
| `feature/payment` | Payments |

## 👥 Team
| Dev | Branch | Task |
|-----|--------|------|
| Dev 1 | `feature/job-search` + `feature/auth` | Job search + Auth |
| Dev 2 | `feature/freelancer` + `feature/dashboard` | Freelancer + Dashboard |
| Dev 3 | `feature/learning` + `feature/payment` | Learning + Payments |

## 🔐 Environment Variables
Create `.env` in backend folder:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
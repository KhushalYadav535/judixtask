# TaskFlow Setup Guide

Complete setup guide for TaskFlow application with MongoDB backend.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend folder:
```env
PORT=5000
MONGODB_URI=mongodb+srv://khushalyadav0:YOUR_PASSWORD@judixtask.aydxzu9.mongodb.net/taskflow?retryWrites=true&w=majority&appName=Judixtask
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Important:** Replace `YOUR_PASSWORD` with your actual MongoDB Atlas database password.

**Note:** MongoDB Atlas is already configured, no local MongoDB installation needed.

5. Start the backend server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Backend will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend-web-application
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in frontend-web-application folder:
```env
BACKEND_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Database Setup

MongoDB will automatically create the database and collections when you first run the application. No manual setup required!

## Testing the Application

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Sign up for a new account
4. Login and start creating tasks!

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/profile` - Update profile (requires auth)
- `GET /api/auth/me` - Get current user (requires auth)

### Tasks
- `GET /api/tasks` - Get all tasks (requires auth)
- `POST /api/tasks` - Create task (requires auth)
- `PUT /api/tasks/:id` - Update task (requires auth)
- `DELETE /api/tasks/:id` - Delete task (requires auth)

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check MONGODB_URI in `.env` file
- Verify MongoDB port (default: 27017)

### Backend Not Starting
- Check if port 5000 is available
- Verify all dependencies are installed
- Check `.env` file exists and has correct values

### Frontend Can't Connect to Backend
- Verify BACKEND_URL in `.env.local` matches backend URL
- Check CORS settings in backend
- Ensure backend server is running

### Authentication Issues
- Clear browser localStorage
- Check JWT_SECRET in backend `.env`
- Verify token is being stored in localStorage

## Production Deployment

1. Set `NODE_ENV=production` in backend `.env`
2. Use strong `JWT_SECRET` in production
3. Configure proper CORS origins
4. Use MongoDB Atlas or managed MongoDB service
5. Set up environment variables in hosting platform


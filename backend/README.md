# TaskFlow Backend API

Backend API for TaskFlow application built with Express.js and MongoDB.

## Features

- User Authentication (Signup, Login, Profile Update)
- Task Management (CRUD operations)
- JWT-based authentication
- MongoDB database integration
- Password hashing with bcrypt

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://khushalyadav0:YOUR_PASSWORD@judixtask.aydxzu9.mongodb.net/taskflow?retryWrites=true&w=majority&appName=Judixtask
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Note:** Replace `YOUR_PASSWORD` with your actual MongoDB Atlas database password.

3. MongoDB Atlas is already configured, no local MongoDB needed

4. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/profile` - Update user profile (requires auth)
- `GET /api/auth/me` - Get current user (requires auth)

### Tasks

- `GET /api/tasks` - Get all tasks for logged in user (requires auth)
- `POST /api/tasks` - Create a new task (requires auth)
- `PUT /api/tasks/:id` - Update a task (requires auth)
- `DELETE /api/tasks/:id` - Delete a task (requires auth)

## Authentication

All task endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Database Schema

### User
- name: String (required, min 3 chars)
- email: String (required, unique)
- password: String (required, min 8 chars, hashed)
- memberSince: String

### Task
- title: String (required)
- description: String (required)
- userId: ObjectId (reference to User)
- createdDate: Date


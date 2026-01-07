# Production Setup Guide

Production environment ke liye backend aur frontend ko connect karne ka guide.

## Production URLs

- **Frontend:** https://judixtask.vercel.app/
- **Backend:** https://judixtask.onrender.com

## Backend Setup (Render)

### Environment Variables in Render Dashboard:

1. Render dashboard mein apne service ke **Environment** section mein yeh variables add karo:

```env
PORT=5000
MONGODB_URI=mongodb+srv://khushalyadav0:YOUR_PASSWORD@judixtask.aydxzu9.mongodb.net/taskflow?retryWrites=true&w=majority&appName=Judixtask
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
FRONTEND_URL=https://judixtask.vercel.app
```

**Important:** 
- `YOUR_PASSWORD` ko actual MongoDB Atlas password se replace karo
- `JWT_SECRET` ko strong random string se replace karo (production ke liye)

### CORS Configuration

Backend already configured hai to allow:
- `https://judixtask.vercel.app` (Production frontend)
- `http://localhost:3000` (Local development)

## Frontend Setup (Vercel)

### Environment Variables in Vercel Dashboard:

1. Vercel dashboard mein apne project ke **Settings** → **Environment Variables** section mein yeh variable add karo:

```env
BACKEND_URL=https://judixtask.onrender.com
```

### Vercel Environment Variables Setup Steps:

1. Vercel dashboard mein jao: https://vercel.com/dashboard
2. Apne project (`judixtask`) ko select karo
3. **Settings** tab par click karo
4. **Environment Variables** section mein jao
5. **Add New** button click karo
6. Add karo:
   - **Name:** `BACKEND_URL`
   - **Value:** `https://judixtask.onrender.com`
   - **Environment:** Production, Preview, Development (sab select karo)
7. **Save** karo

### Redeploy Frontend

Environment variable add karne ke baad:

1. Vercel dashboard mein **Deployments** tab par jao
2. Latest deployment ke right side mein **...** (three dots) click karo
3. **Redeploy** select karo

Ya phir:

1. Git mein koi bhi commit push karo
2. Vercel automatically redeploy kar dega

## Testing Production Connection

1. **Backend Health Check:**
   ```
   https://judixtask.onrender.com/health
   ```
   Expected response: `{"status":"OK","message":"Server is running"}`

2. **Frontend Test:**
   - https://judixtask.vercel.app/ par jao
   - Sign up / Login try karo
   - Tasks create/edit/delete karo

## Troubleshooting

### CORS Error
Agar CORS error aaye to:
- Backend `.env` mein `FRONTEND_URL=https://judixtask.vercel.app` check karo
- Backend server restart karo

### 404 Errors
- Vercel environment variable `BACKEND_URL` properly set hai ya nahi check karo
- Vercel deployment logs check karo

### Connection Timeout
- Render service "sleeping" state mein to nahi hai (free tier)
- Backend logs check karo Render dashboard mein

## Local Development

Local development ke liye `.env.local` file use karo:

**Frontend (`frontend-web-application/.env.local`):**
```env
BACKEND_URL=http://localhost:5000
```

**Backend (`backend/.env`):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://khushalyadav0:YOUR_PASSWORD@judixtask.aydxzu9.mongodb.net/taskflow?retryWrites=true&w=majority&appName=Judixtask
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Security Notes

1. **JWT_SECRET:** Production mein strong random string use karo (minimum 32 characters)
2. **MongoDB Password:** Strong password use karo aur safely store karo
3. **Environment Variables:** Never commit `.env` files to Git
4. **HTTPS:** Production mein always HTTPS use karo


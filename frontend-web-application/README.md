# TaskFlow - Task Management Application

A modern, responsive full-stack web application built with Next.js 14+ and TailwindCSS for managing tasks and improving productivity.

## Features

- **Authentication**: Mock authentication with email/password signup and login
- **Landing Page**: Hero section with feature highlights and call-to-action buttons
- **Dashboard**: Protected route showing user profile and task management
- **Task Management**: Create, edit, delete, search, and filter tasks
- **Profile Management**: View and edit user profile information
- **Toast Notifications**: User feedback for all actions
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, professional interface with blue/indigo primary colors

## Pages

- `/` - Landing page with feature highlights
- `/login` - Login page with email and password
- `/signup` - Sign up page with form validation
- `/dashboard` - Protected dashboard with task management

## Mock Authentication

The app includes mock authentication for demo purposes:

**Test Accounts:**
- Email: `test@example.com` | Password: `Test1234`
- Email: `demo@example.com` | Password: `Demo1234`

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── globals.css          # Global styles and design tokens
│   ├── page.tsx             # Landing page
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── dashboard/           # Protected dashboard
│   └── api/                 # Mock API routes
├── components/              # Reusable components
│   ├── dashboard-layout.tsx # Dashboard wrapper
│   ├── task-management.tsx  # Task CRUD logic
│   ├── task-list.tsx        # Task display grid
│   ├── task-modal.tsx       # Task create/edit form
│   ├── profile-dropdown.tsx # User profile menu
│   ├── search-bar.tsx       # Global search
│   └── protected-route.tsx  # Route protection wrapper
├── contexts/                # React contexts
│   ├── auth-context.tsx     # Authentication state
│   └── toast-context.tsx    # Toast notifications
└── scripts/                 # Utility scripts
```

## API Routes

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `PUT /api/auth/profile` - Update profile
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

## Design System

The application uses a professional blue/indigo color scheme with:
- **Primary**: Indigo blue for main actions and highlights
- **Neutral**: White/gray for backgrounds and text
- **Accents**: Green for success, Red for errors
- **Typography**: Geist font family for clean, modern appearance
- **Spacing**: Tailwind spacing scale for consistency

## Form Validation

**Signup Form:**
- Full Name: Minimum 3 characters
- Email: Valid email format
- Password: Minimum 8 characters, must include uppercase, lowercase, and numbers
- Confirm Password: Must match password field

**Task Form:**
- Title: Required, non-empty
- Description: Required, non-empty

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

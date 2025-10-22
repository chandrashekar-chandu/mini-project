# Setup Instructions for CodeArena

## ✅ Fixed Issues
- Fixed malformed API URLs in Home.js, AdminPanel.js, and ContestList.js
- Created frontend `.env` file with proper API configuration

## 🚀 Installation & Setup Steps

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB running locally or Atlas connection string

### Step 1: Install Backend Dependencies
```bash
cd /home/user/Downloads/minorproject-main/backend
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd /home/user/Downloads/minorproject-main/frontend
npm install
```

### Step 3: Configure Backend Environment
The `.env` file is already configured in `/backend/.env` with:
- MongoDB URL (already set)
- PORT: 3001
- JWT_SECRET (change for production)
- JUDGE0 API credentials

### Step 4: Configure Frontend Environment
The `.env` file has been created at `/frontend/.env` with:
```
REACT_APP_API_URL=http://localhost:3001
```

### Step 5: Start the Backend Server
```bash
cd /home/user/Downloads/minorproject-main/backend
npm start
```
Or with nodemon for development:
```bash
npx nodemon server.js
```

### Step 6: Start the Frontend Development Server (in another terminal)
```bash
cd /home/user/Downloads/minorproject-main/frontend
npm start
```

The application should now be running at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001

## 🔍 Troubleshooting

### 1. Port Already in Use
If port 3000 or 3001 is already in use:
```bash
# On Linux/Mac, kill the process using the port
lsof -ti:3001 | xargs kill -9

# Or change the PORT in backend/.env
PORT=3002
```

### 2. MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `backend/.env`
- For MongoDB Atlas, verify IP whitelist includes your machine

### 3. CORS Errors
- Backend CORS should be configured
- Check that `REACT_APP_API_URL` matches backend server address

### 4. Environment Variable Not Loading
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Restart the development server

## 📝 Important Notes
- The Admin Panel now only shows Contests (User Management and Analytics removed)
- Create a `.env.local` file for local overrides if needed
- Never commit `.env` files with sensitive data
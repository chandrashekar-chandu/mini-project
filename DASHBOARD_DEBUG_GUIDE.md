# 🔧 Dashboard Contest History - Debug Guide

## Quick Troubleshooting Steps

### Step 1: Check Browser Console
1. **Open DevTools:** Press `F12` or `Ctrl+Shift+I`
2. **Go to Console tab**
3. **Look for these logs when Dashboard loads:**

```
=== Dashboard Contest Data Fetch ===
User object: { id: "...", username: "...", ... }
User ID: (your user ID)
Token available: true
API Base URL: http://localhost:3001/api
Fetching from: http://localhost:3001/api/users/[YOUR_ID]/contests
✅ API Response received: { contests: [...], stats: {...} }
Contests count: X
Stats: { totalContestsAttended: X, ... }
```

**If you see an error (❌), note the exact error message below.**

---

## Common Issues & Solutions

### ❌ Issue 1: "No user ID available"
**Problem:** User is not logged in properly  
**Solution:**
1. Log out (click Logout)
2. Clear browser cache: `Ctrl+Shift+Delete`
3. Log in again
4. Refresh Dashboard

---

### ❌ Issue 2: Token not sent (Token available: false)
**Problem:** Browser not sending authentication  
**Solution:**
1. Open Console and run:
```javascript
console.log('Token:', localStorage.getItem('token'))
```
2. You should see a long token string. If empty:
   - Log out completely
   - Log in again and check if "Remember me" or token is saved

---

### ❌ Issue 3: "401 Unauthorized"
**Problem:** Token expired or invalid  
**Solution:**
1. Log out completely
2. Open DevTools Application tab
3. Delete all items from LocalStorage
4. Log in again

---

### ❌ Issue 4: "User not found" (404 error)
**Problem:** User ID doesn't exist in database  
**Solution:**
1. Check user ID in console matches your account
2. Verify you're logged in with correct account
3. Try registering a new account and logging in

---

### ❌ Issue 5: Contests count is 0
**Problem:** User has no contest participation records  
**Solution:**
1. Go to `/contests`
2. Join at least one contest
3. Submit some solutions (this creates contest participation)
4. Return to `/dashboard`
5. Refresh page

---

### ❌ Issue 6: Network error / Cannot connect to API
**Problem:** Backend server not running  
**Solution:**
1. Check backend is running:
```bash
curl http://localhost:3001/api/test
```
2. You should see: `{"message":"Server is working"}`
3. If not, start the backend:
```bash
cd backend
npm start
```

---

## Step 2: Check Backend Logs

### Start backend with logging:
```bash
cd /home/user/Downloads/minorproject-main/backend
npm start
```

### Look for these logs when Dashboard loads:
```
getUserContests - userId: [ID]
getUserContests - req.params.id: [ID]
getUserContests - req.user.id: [ID]
Finding participations for userId: [ID]
Found participations: X
Formatted contest data: X contests
Stats calculated: {...}
```

**If you see errors, note them and share below.**

---

## Step 3: Test API Directly

### Using cURL (command line):
```bash
# Replace [TOKEN] with your actual token and [USER_ID] with your user ID
curl -H "Authorization: Bearer [TOKEN]" \
  http://localhost:3001/api/users/[USER_ID]/contests
```

### Using Browser Console:
```javascript
// Get token
const token = localStorage.getItem('token');

// Get user ID
const user = JSON.parse(localStorage.getItem('user'));
const userId = user.id;

// Make API call
fetch('http://localhost:3001/api/users/' + userId + '/contests', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
.then(r => r.json())
.then(data => console.log('Response:', data))
.catch(e => console.error('Error:', e));
```

You should see the API response with contests and stats.

---

## Step 4: Database Check

### Check if ContestParticipation records exist:

#### Using MongoDB Compass (GUI):
1. Open MongoDB Compass
2. Connect to your database
3. Go to `contestparticipations` collection
4. Check if there are any documents

#### Using MongoDB CLI:
```bash
mongosh
use your_database_name
db.contestparticipations.find().pretty()
```

---

## Data Flow Diagram

```
Browser
  ↓
[User Clicks Dashboard]
  ↓
useEffect runs in Dashboard.js
  ↓
Get token from localStorage
  ↓
Get user ID from user object
  ↓
Make API call: GET /api/users/{id}/contests
  ↓
[With Authorization header]
  ↓
Backend receives request
  ↓
Auth middleware validates token
  ↓
getUserContests controller:
  ├─ Get userId from params or auth
  ├─ Query ContestParticipation
  ├─ Populate contest details
  ├─ Format response
  ├─ Calculate statistics
  └─ Return data
  ↓
Frontend receives data
  ↓
Update state
  ↓
Re-render component
  ↓
Display stats cards + history table
```

---

## Checklist Before Reporting Issues

- [ ] Backend is running (`npm start` in backend folder)
- [ ] Frontend is running (`npm start` in frontend folder)
- [ ] You are logged in
- [ ] Browser console shows "✅ API Response received"
- [ ] Token is present in localStorage
- [ ] User ID is showing in console
- [ ] You have participated in at least one contest
- [ ] No 401/403 authorization errors

---

## Files Modified in This Fix

### Backend:
1. **`backend/routes/User.js`**
   - Added `auth` middleware to `/contests` endpoint
   - Ensures only authenticated users can access

2. **`backend/controllers/User.js`**
   - Enhanced `getUserContests()` function
   - Added comprehensive logging
   - Better error handling
   - Handles null/deleted contests

### Frontend:
1. **`frontend/src/pages/Dashboard.js`**
   - Enhanced logging in useEffect
   - Explicit Authorization header handling
   - Better error messages
   - Handle both `id` and `_id` properties

---

## Manual Testing Steps

### Test 1: Join a Contest
1. Go to `/contests`
2. Click on a contest
3. Submit a solution to at least one problem
4. Go to `/dashboard`
5. Should see contest in history table

### Test 2: Check Stats Display
1. If you participated in contests, stats should show:
   - Contests Attended: > 0
   - Highest Score: > 0
   - Average Score: > 0
   - Contest Rating: ≥ 1200

### Test 3: Check Table Display
1. Click on Dashboard
2. Should see table with columns:
   - Contest Name
   - Date Participated
   - Score
   - Problems Solved
3. Should display all contests you've participated in

### Test 4: Check Empty State
1. Create a new test account
2. Don't participate in any contests
3. Go to `/dashboard`
4. Should see "No contest history yet" message
5. "Browse Contests" button should link to `/contests`

---

## Performance Tips

- **First Load:** May take 1-2 seconds to fetch data
- **Subsequent Loads:** Data is not cached, always fetches fresh
- **Large Datasets:** If you've participated in 100+ contests, consider pagination

---

## Security Notes

- Token is stored in localStorage (consider moving to httpOnly cookies in future)
- Authorization header is sent with every request
- User can only see their own contest data
- Backend validates authentication on every request

---

## Next Steps After Fixing

1. ✅ Verify all stats display correctly
2. ✅ Test on different browsers
3. ✅ Test on mobile/tablet (responsive design)
4. ✅ Load test with multiple contests
5. ✅ Check error handling with invalid data

---

## Getting Help

If after these steps you still have issues:

1. **Capture console logs** (screenshot or copy/paste)
2. **Note the exact error message**
3. **Check backend logs** for corresponding errors
4. **Share database query results** (do you have contest participation data?)
5. **Verify all services running** (backend, frontend, MongoDB)

---

**Status:** Issue identified and debugging tools added ✅

**Last Updated:** 2024
# 🎯 Contest Management - Complete Guide

## ✅ Features Implemented

### 1. **Create Contest** ✨
- **Location:** Admin Panel → "Create New Contest" button
- **Route:** `/admin/create-contest`
- **Features:**
  - Create contests with name, duration, start time, end time, and description
  - Add multiple problems to a single contest
  - Set difficulty levels (Easy/Medium/Hard) for each problem
  - Automatically assign points based on difficulty
  - Add test cases for each problem (with hidden test case support)
  - Form validation before submission

### 2. **Edit Contest** 🔧
- **Location:** Admin Panel → Click "Edit" button on any contest
- **Route:** `/admin/edit-contest/{contestId}`
- **Features:**
  - Modify contest details (name, times, description)
  - View all problems in the contest
  - Quick edit links to modify individual problems
  - Update contest with immediate feedback

### 3. **Edit Problem** 📝
- **Location:** From Edit Contest page → Click "Edit Problem" on any problem
- **Route:** `/admin/edit-problem/{problemId}`
- **Features:**
  - Edit problem title, description, difficulty, points
  - Manage test cases (add, modify, remove)
  - Mark test cases as hidden
  - Update problem with validation

### 4. **Delete Contest** 🗑️
- **Location:** Admin Panel → Click "Delete" button on any contest
- **Features:**
  - Confirmation dialog before deletion
  - Prevents accidental deletions
  - Real-time status ("Deleting...")
  - Automatic list refresh after deletion
  - Error handling with user feedback

---

## 🚀 How to Use

### **Create a New Contest:**
```
1. Click "Admin Panel" in navbar
2. Click "Create New Contest" button
3. Fill in contest details:
   - Contest Name (required)
   - Duration (e.g., "2 hours")
   - Start Time (date & time picker)
   - End Time (date & time picker)
   - Description (optional)
4. Click "Add Problem" to add problems to the contest
5. For each problem:
   - Enter problem title
   - Select difficulty (Easy/Medium/Hard)
   - Points auto-set (Easy=10, Medium=20, Hard=30)
   - Add problem description
   - Add test cases (input/output pairs)
   - Mark test cases as "Hidden" if needed
6. Click "Create Contest" to save
```

### **Edit an Existing Contest:**
```
1. Go to Admin Panel
2. Find the contest in the table
3. Click "Edit" button
4. Modify contest details as needed
5. Click "Update Contest" to save
```

### **Edit a Problem:**
```
1. Go to Admin Panel
2. Click "Edit" on a contest
3. Click "Edit Problem" on the problem you want to modify
   OR
   Navigate directly to: /admin/edit-problem/{problemId}
4. Modify problem details and test cases
5. Click "Update Problem" to save
```

### **Delete a Contest:**
```
1. Go to Admin Panel
2. Find the contest in the table
3. Click "Delete" button
4. Confirm deletion in the popup
5. Contest and all its problems are removed
```

---

## 📊 Admin Panel Overview

The Admin Panel displays:
- **Total Contests count** (stats card)
- **Quick Actions:** Create New Contest, Create New Problem
- **Contests Table** with columns:
  - Contest Name
  - Start Time
  - Number of Problems
  - Participants Count
  - Status (Upcoming/Ongoing/Completed)
  - Actions (Edit, Delete)

---

## 🔐 Security & Permissions

✅ **Admin-Only Access:**
- All admin routes require authentication
- User must have `role: 'admin'` to access admin panel
- Backend validates permissions on every request

✅ **Authorization Checks:**
- Frontend routing verification
- Backend API validation
- CORS configured for allowed origins

---

## 📋 State Management

The AdminPanel manages:
- `contests` - Array of all contests
- `loading` - Global loading state for operations
- `deletingId` - Tracks which contest is being deleted (for UI feedback)

---

## 🔗 API Endpoints Used

### Contest Operations:
- `GET /api/contests` - Fetch all contests
- `GET /api/contests/{id}` - Fetch single contest
- `POST /api/contests` - Create new contest
- `PUT /api/contests/{id}` - Update contest
- `DELETE /api/contests/{id}` - Delete contest

### Challenge/Problem Operations:
- `GET /api/challenges/{id}` - Fetch problem details
- `POST /api/challenges` - Create new problem
- `PUT /api/challenges/{id}` - Update problem
- `DELETE /api/challenges/{id}` - Delete problem

### Test Cases:
- `GET /api/testcases/challenge/{problemId}` - Fetch test cases
- `POST /api/testcases/challenge/{problemId}` - Create test case
- `PUT /api/testcases/{testCaseId}` - Update test case
- `DELETE /api/testcases/{testCaseId}` - Delete test case

---

## 🛠️ Technical Implementation

### Files Modified:
1. **AdminPanel.js** ✏️
   - Added `loading` and `deletingId` state
   - Implemented `handleDeleteContest()` function
   - Updated Delete button with confirmation and loading states
   - Added error handling

### Key Functions:

**handleDeleteContest():**
```javascript
const handleDeleteContest = async (contestId, contestTitle) => {
  if (!window.confirm(`Are you sure you want to delete "${contestTitle}"?`)) {
    return;
  }
  
  setDeletingId(contestId);
  setLoading(true);
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/contests/${contestId}`);
    setContests(contests.filter(contest => contest._id !== contestId));
    alert('Contest deleted successfully');
  } catch (error) {
    alert('Failed to delete contest');
  } finally {
    setDeletingId(null);
    setLoading(false);
  }
};
```

---

## ✨ UI/UX Features

### Delete Button:
- Shows "Delete" normally
- Shows "Deleting..." during operation
- Disabled state (grayed out) during deletion
- Red color indicates destructive action
- Confirmation dialog prevents accidents

### Feedback:
- ✅ Success messages via alerts
- ❌ Error messages with details
- ⏳ Loading indicators during operations
- 🔄 Real-time list updates

---

## 🧪 Testing Checklist

- [ ] Create a new contest with multiple problems
- [ ] Verify contest appears in admin panel
- [ ] Edit contest details and verify updates
- [ ] Edit a problem within the contest
- [ ] Add/modify test cases
- [ ] Delete a contest with confirmation
- [ ] Verify deleted contest removes from list
- [ ] Test error handling (invalid data, network errors)
- [ ] Verify admin-only access control

---

## 🐛 Troubleshooting

### Delete button not working:
1. Check browser console for errors
2. Verify admin authentication token in localStorage
3. Ensure backend is running
4. Check CORS configuration

### Contest not appearing after creation:
1. Refresh the page
2. Check network tab for API response
3. Verify no validation errors

### Permission denied on delete:
1. Log out and log back in
2. Verify account has admin role
3. Check backend authorization middleware

---

## 📝 Notes

- Dates are converted between ISO format (database) and datetime-local format (form inputs)
- All operations require valid authentication token
- Backend validates all requests
- Deleted contests cascade delete associated problems and test cases
- Admin panel updates in real-time after operations

---

**Status:** ✅ Complete and Ready for Testing
**Last Updated:** 2024
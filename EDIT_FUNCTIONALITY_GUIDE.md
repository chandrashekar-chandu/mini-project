# Edit Functionality Guide

## Overview
The edit functionality has been fully implemented for both contests and problems in the Admin Panel.

## ✅ What's Been Implemented

### 1. **Edit Contests**
- **File**: `frontend/src/pages/EditContest.js` (NEW)
- **Route**: `/admin/edit-contest/:contestId`
- **Features**:
  - Load existing contest data
  - Edit contest name, description, start/end times, and duration
  - View all problems in the contest
  - Quick access to edit individual problems
  - Save changes with validation

### 2. **Edit Problems/Challenges**
- **File**: `frontend/src/pages/EditProblem.js` (NEW)
- **Route**: `/admin/edit-problem/:problemId`
- **Features**:
  - Load existing problem data
  - Edit title, description, difficulty, and points
  - Manage problem topics
  - Edit input/output format and constraints
  - Modify test cases
  - Add/remove/update test cases

### 3. **Admin Panel Updates**
- **File**: `frontend/src/pages/AdminPanel.js` (UPDATED)
- **Changes**:
  - Edit buttons now navigate to `/admin/edit-contest/{contestId}`
  - Added functional navigation for each contest

### 4. **App.js Routes**
- **File**: `frontend/src/App.js` (UPDATED)
- **New Routes**:
  - `GET /admin/edit-contest/:contestId` - Edit contest page
  - `GET /admin/edit-problem/:problemId` - Edit problem page

## 🚀 How to Use

### Edit a Contest
1. Go to Admin Panel (`/admin`)
2. Find the contest you want to edit in the "Contests" table
3. Click the **"Edit"** button in the Actions column
4. Update contest details as needed
5. Click **"Update Contest"** to save changes

### Edit a Problem
**Option 1: From Contest Edit Page**
1. Edit a contest (see above)
2. In the "Contest Problems" section, click **"Edit Problem"** next to any problem

**Option 2: Direct Link**
- Navigate to: `/admin/edit-problem/{problemId}`

### Edit Problem Details
1. Modify problem title, description, and difficulty
2. Select relevant topics (required)
3. Update input/output format and constraints
4. Add, modify, or remove test cases
5. Mark test cases as "Hidden" if needed (for hidden test cases)
6. Click **"Update Problem"** to save

## 📊 API Endpoints Used

### Contests
- **GET** `/api/contests/:id` - Fetch contest details
- **PUT** `/api/contests/:id` - Update contest

### Challenges (Problems)
- **GET** `/api/challenges/:id` - Fetch problem details
- **PUT** `/api/challenges/:id` - Update problem
- **GET** `/api/testcases/challenge/:id` - Fetch test cases
- **POST** `/api/testcases/challenge/:id` - Create test case
- **PUT** `/api/testcases/:id` - Update test case

## 🔧 Technical Details

### EditContest Component
- Fetches contest by ID
- Converts ISO dates to datetime-local format for editing
- Displays associated problems with quick edit links
- Validates all required fields before submission

### EditProblem Component
- Fetches problem and test case data
- Handles topic selection from predefined list
- Automatically adjusts points based on difficulty:
  - Easy: 10 points
  - Medium: 20 points
  - Hard: 30 points
- Supports adding/removing test cases
- Updates test cases intelligently (update if exists, create if new)

## ✨ Features

✅ Full contest editing capability  
✅ Problem/challenge editing  
✅ Test case management  
✅ Date/time formatting for editing  
✅ Navigation between contest and problem edits  
✅ Form validation  
✅ Error handling with user feedback  
✅ Admin-only access control  

## 🛡️ Security
- All edit operations require admin role
- User authentication check before accessing edit pages
- Authorization header automatically included in API requests

## 📝 Notes
- The `.env` file has the correct API URL: `http://localhost:3001`
- Make sure the backend server is running on port 3001
- Test cases can be marked as "Hidden" for hidden test cases
- Difficulty level automatically adjusts point values
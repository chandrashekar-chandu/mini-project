# Quick Test Guide - Edit Functionality

## 🚀 Start the Application

**Terminal 1 - Backend:**
```bash
cd /home/user/Downloads/minorproject-main/backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd /home/user/Downloads/minorproject-main/frontend
npm start
```

Both should start successfully:
- Backend: `http://localhost:3001`
- Frontend: `http://localhost:3000`

## ✅ Test Steps

### 1. **Login as Admin**
```
URL: http://localhost:3000
1. Click "Login"
2. Use admin credentials:
   - Email: [your admin email]
   - Password: [your admin password]
3. Should redirect to home page
```

### 2. **Access Admin Panel**
```
1. In navbar, click "Admin" or navigate to: http://localhost:3000/admin
2. You should see:
   - "Admin Panel" heading
   - "Total Contests" card with count
   - "Create New Contest" and "Create New Problem" buttons
   - Table with all contests
```

### 3. **Edit a Contest**
```
1. In the contests table, find any contest
2. Click the "Edit" button in the Actions column
3. You should see the EditContest page with:
   - Contest name (filled)
   - Start/End times (filled)
   - Duration (filled)
   - Description (filled)
   - Contest Problems section (if any)
```

### 4. **Modify Contest Details**
```
1. Change the contest name: Add " - UPDATED"
2. Change the description
3. Click "Update Contest"
4. You should see: "Contest updated successfully!"
5. You're redirected to Admin Panel
6. Verify the contest shows the updated name
```

### 5. **Edit a Problem from Contest**
```
1. From EditContest page, in "Contest Problems" section
2. Find any problem and click "Edit Problem"
3. You should see EditProblem page with:
   - Problem title (filled)
   - Difficulty (filled)
   - Description (filled)
   - Topics (some checked)
   - Test Cases listed
```

### 6. **Modify Problem Details**
```
1. Change the problem title: Add " - UPDATED"
2. Change difficulty to "Hard"
3. Verify points updated to 30
4. Add a new topic if none selected
5. Add a new test case: Click "Add Test Case"
6. Fill input and expected output
7. Click "Update Problem"
8. You should see: "Problem updated successfully!"
```

### 7. **Direct Problem Edit**
```
1. Get a problem ID from the EditContest page
2. Navigate to: http://localhost:3000/admin/edit-problem/{problemId}
3. Should load the problem details
4. Make changes and click "Update Problem"
```

## 🐛 Troubleshooting

### Issue: "Access Denied" message
**Solution:**
- Make sure you're logged in as admin
- Check user role in localStorage (should be "admin")
- Try logging out and logging back in

### Issue: 404 errors on API calls
**Solution:**
- Check backend is running on port 3001
- Verify REACT_APP_API_URL is `http://localhost:3001/api`
- Check network tab in browser DevTools for exact URL

### Issue: Edit button not responding
**Solution:**
- Check browser console for JavaScript errors
- Make sure useNavigate is imported in AdminPanel
- Verify AdminPanel component re-renders after loading contests

### Issue: Cannot update - "Failed to update contest"
**Solution:**
- Check backend logs for error message
- Verify contest ID is valid (from table)
- Check you have admin role
- Try updating from the same session (don't switch browser tabs)

## 📊 Expected Behavior

### Successful Contest Edit
```
Before: Contest named "Round 1"
Action: Change name to "Round 1 - UPDATED"
After:  Contest name shows "Round 1 - UPDATED" in admin panel
```

### Successful Problem Edit
```
Before: Problem "Sum Array" with Easy difficulty
Action: Change to Hard difficulty
After:  Points auto-update to 30
        Problem shows updated values
```

## 🔍 Verification Points

- [x] Edit button appears on all contests
- [x] Edit button navigates to correct URL
- [x] Contest data loads in edit form
- [x] Form accepts changes
- [x] Submit creates API PUT request
- [x] Success message appears
- [x] User redirects to admin panel
- [x] Changes persist (visible in admin panel)
- [x] Problem edit accessible from contest
- [x] Problem data loads correctly
- [x] Test cases display
- [x] Changes saved successfully

## 📋 Test Scenarios

### Scenario 1: Quick Contest Edit
```
Time: 2 minutes
Steps:
1. Login → Admin Panel
2. Find any contest
3. Click Edit
4. Change name and description
5. Click Update
6. Verify changes in admin panel
```

### Scenario 2: Problem Management
```
Time: 3 minutes
Steps:
1. Edit a contest
2. Click "Edit Problem"
3. Change difficulty and title
4. Verify points update
5. Click "Update Problem"
6. Go back to contest, verify problem updated
```

### Scenario 3: Test Case Edit
```
Time: 3 minutes
Steps:
1. Edit a problem
2. Modify an existing test case
3. Add a new test case
4. Mark one as "Hidden"
5. Click "Update Problem"
6. Verify test cases saved
```

## ✨ Success Indicators

When everything works correctly, you should see:

- ✅ Contest edit form populates with existing data
- ✅ Edit button is clickable and changes cursor to pointer
- ✅ Form submission shows success alert
- ✅ Admin panel re-renders with updated data
- ✅ Problem edit page loads problem data
- ✅ Changes persist in database
- ✅ No JavaScript errors in console
- ✅ No 404 errors in network tab

**Ready to Test! 🎉**
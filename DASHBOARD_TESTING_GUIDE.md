# 🧪 User Dashboard Testing Guide

## 🎯 Quick Start

### Access Dashboard
```
1. Navigate to http://localhost:3000/dashboard
2. Must be logged in as a user
3. Page loads user's contest data
```

---

## 📋 Test Cases

### Test 1: Page Load (First Time User)
**Scenario:** New user with no contests

**Steps:**
1. Create a new user account
2. Navigate to /dashboard
3. Observe initial state

**Expected Results:**
- ✅ Loading spinner appears briefly
- ✅ All stat cards display with default values:
  - Contests Attended: 0
  - Contest Rating: 1200
  - Highest Score: 0
  - Average Score: 0
- ✅ "No contest history yet" message displayed
- ✅ "Browse Contests" button visible
- ✅ No console errors

---

### Test 2: Page Load (Active User)
**Scenario:** User with multiple contest participations

**Steps:**
1. Log in as user with contest history
2. Navigate to /dashboard
3. Wait for data to load

**Expected Results:**
- ✅ Loading spinner appears briefly (1-2 seconds)
- ✅ Stat cards populate with correct values:
  - Contests Attended: Shows actual count
  - Contest Rating: Shows current rating
  - Highest Score: Shows max score
  - Average Score: Shows calculated average
- ✅ Contest history table displays all contests
- ✅ Overall summary section visible
- ✅ No console errors

---

### Test 3: Stat Cards Display
**Scenario:** Verify all stat cards render correctly

**Steps:**
1. User logged in with contest data
2. Dashboard loaded
3. Verify stat cards

**Expected Results:**
- ✅ Blue card: "Contests Attended" with 🏆 icon
- ✅ Purple card: "Contest Rating" with ⭐ icon
- ✅ Green card: "Highest Score" with 🎯 icon
- ✅ Orange card: "Average Score" with 📊 icon
- ✅ All cards have gradient background
- ✅ All cards have proper shadow
- ✅ Cards are centered and properly spaced

---

### Test 4: Contest History Table
**Scenario:** Verify table displays contest data

**Steps:**
1. Dashboard loaded with contest data
2. Scroll to "📋 Contest History" section
3. Verify table structure and data

**Expected Results:**
- ✅ Table has 4 columns:
  1. Contest Name (with ID)
  2. Date Participated
  3. Score (with "Points" badge)
  4. Problems Solved (X / Total)
- ✅ Data displays correctly for each contest
- ✅ Dates formatted as: "Jan 15, 2024" with time
- ✅ Scores show as bold numbers with badge
- ✅ Problem counts show completion ratio
- ✅ Hover effect on rows

---

### Test 5: Responsive Design - Mobile
**Scenario:** Test dashboard on mobile device

**Steps:**
1. Open dashboard
2. Resize browser to < 768px (or use mobile device)
3. Verify layout

**Expected Results:**
- ✅ Stat cards stack in 1 column
- ✅ All content readable without horizontal scroll
- ✅ Touch-friendly button sizes
- ✅ Table scrolls horizontally if needed
- ✅ No overlapping elements
- ✅ Icons and text properly sized

---

### Test 6: Responsive Design - Tablet
**Scenario:** Test dashboard on tablet

**Steps:**
1. Open dashboard
2. Resize browser to 768px - 1024px
3. Verify layout

**Expected Results:**
- ✅ Stat cards display in 2 columns
- ✅ All content visible without excessive scroll
- ✅ Table properly formatted
- ✅ Margins and padding appropriate
- ✅ No overlapping content

---

### Test 7: Responsive Design - Desktop
**Scenario:** Test dashboard on desktop

**Steps:**
1. Open dashboard
2. Resize browser to > 1024px
3. Verify layout

**Expected Results:**
- ✅ Stat cards display in 4 columns (1 row)
- ✅ Maximum content width applied
- ✅ Centered on page
- ✅ Proper spacing
- ✅ Table fully visible

---

### Test 8: Error Handling - Network Failure
**Scenario:** Dashboard fails to fetch data

**Steps:**
1. Open dashboard
2. Manually close network connection (DevTools)
3. Observe error handling

**Expected Results:**
- ✅ Loading spinner appears
- ✅ Error message displayed: "Failed to load contest data"
- ⚠️ icon shown
- ✅ All stat cards show default values
- ✅ No crash or infinite loop
- ✅ Graceful degradation

---

### Test 9: Statistics Accuracy
**Scenario:** Verify stat calculations

**Steps:**
1. User with 3 contests in database:
   - Contest 1: Score 1200, 5 problems
   - Contest 2: Score 800, 4 problems
   - Contest 3: Score 1000, 5 problems
2. Load dashboard
3. Verify calculations

**Expected Results:**
- ✅ Contests Attended: 3
- ✅ Highest Score: 1200
- ✅ Total Score: 3000
- ✅ Average Score: 1000 (3000 / 3)
- ✅ All values displayed correctly

---

### Test 10: Data Persistence
**Scenario:** Verify data persists after refresh

**Steps:**
1. Load dashboard with data
2. Note the stat values
3. Refresh page (F5)
4. Compare values

**Expected Results:**
- ✅ Same values displayed after refresh
- ✅ Data fetched from server
- ✅ No data corruption
- ✅ Timestamps remain consistent

---

### Test 11: Hover Interactions
**Scenario:** Test card hover effects

**Steps:**
1. Dashboard loaded
2. Hover mouse over stat cards
3. Hover over table rows
4. Observe effects

**Expected Results:**
- ✅ Stat cards scale up slightly
- ✅ Shadow becomes more prominent
- ✅ Smooth transition animation
- ✅ Table rows highlight on hover
- ✅ Cursor changes to pointer on clickable elements

---

### Test 12: Empty State
**Scenario:** User with no contests

**Steps:**
1. Create new user with no contests
2. Navigate to dashboard
3. Observe empty state

**Expected Results:**
- ✅ "No contest history yet" message
- ✅ Trophy emoji (🏆) displayed
- ✅ "Browse Contests" button visible
- ✅ Button links to /contests page
- ✅ Overall summary section not shown

---

### Test 13: Data Types and Formatting
**Scenario:** Verify data formatting

**Steps:**
1. Dashboard loaded with data
2. Check each field's format

**Expected Results:**
- ✅ Numbers displayed correctly
- ✅ Dates formatted: "Jan 15, 2024"
- ✅ Times formatted: "10:30 AM"
- ✅ Contest IDs shown in correct format
- ✅ No undefined or null values displayed

---

### Test 14: Browser Compatibility
**Scenario:** Test on different browsers

**Steps:**
1. Load dashboard on Chrome
2. Load dashboard on Firefox
3. Load dashboard on Safari
4. Load dashboard on Edge

**Expected Results:**
- ✅ Works consistently across all browsers
- ✅ Styling appears correct
- ✅ No console errors
- ✅ Animations smooth

---

### Test 15: Performance
**Scenario:** Test dashboard performance

**Steps:**
1. Open DevTools (F12)
2. Go to Performance tab
3. Load dashboard
4. Record and analyze

**Expected Results:**
- ✅ Page loads in < 2 seconds
- ✅ No layout shifts
- ✅ Smooth animations
- ✅ Minimal memory usage
- ✅ No CPU spikes

---

## 🔍 Debugging Steps

### Console Checks
```javascript
// Open Developer Tools: F12
// Check Console tab for errors

// Should see data like:
{
  contests: [...],
  stats: {
    totalContestsAttended: 5,
    totalContestRating: 1450,
    totalScoreInContests: 4800,
    averageScore: 960,
    highestScore: 1200
  }
}
```

### Network Checks
```
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Look for GET /api/users/{id}/contests
5. Check Status: 200
6. Check Response: Valid JSON
```

### Element Inspection
```
1. Right-click on element
2. Select "Inspect"
3. Check class names applied
4. Verify styling matches
5. Check for layout issues
```

---

## 📊 Test Results Template

```
Test Case: ___________________
Date: ___________________
Tester: ___________________
Browser: ___________________
Device: ___________________

Steps:
1. _____________________
2. _____________________
3. _____________________

Expected Result:
_____________________

Actual Result:
_____________________

Status: [ ] PASS [ ] FAIL

Notes:
_____________________
_____________________
```

---

## 🎯 Quick Test Checklist

- [ ] Dashboard loads without errors
- [ ] All stat cards display correctly
- [ ] Contest history table shows data
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Empty state displays when no contests
- [ ] Error handling works
- [ ] Data persists after refresh
- [ ] Hover effects work
- [ ] Dates formatted correctly
- [ ] Statistics calculated accurately
- [ ] No console errors
- [ ] Page loads in < 2 seconds
- [ ] Works on all browsers

---

## 🚀 Production Deployment Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] No console warnings
- [ ] API endpoint verified
- [ ] Environment variables set
- [ ] Backend changes deployed
- [ ] Frontend built successfully
- [ ] Performance acceptable
- [ ] Mobile responsive confirmed
- [ ] Error handling verified
- [ ] Data integrity checked
- [ ] Security validated
- [ ] User authentication working

---

## 📝 Known Issues & Fixes

### Issue 1: Stats showing 0
**Cause:** No contest participation records
**Fix:** User needs to participate in contests

### Issue 2: Dates showing NaN
**Cause:** Invalid date format from API
**Fix:** Verify Contest model stores ISO dates

### Issue 3: Table not scrolling
**Cause:** Overflow CSS not applied
**Fix:** Check Tailwind CSS `overflow-x-auto` class

### Issue 4: Stat cards not stacking
**Cause:** Responsive classes not working
**Fix:** Verify Tailwind CSS is configured

---

## 🎉 Success Criteria

Dashboard is ready when:
✅ All data displays correctly
✅ Responsive on all devices
✅ No console errors
✅ Smooth animations
✅ Error handling works
✅ Performance acceptable
✅ All tests passing
✅ User feedback positive

---

**Last Updated:** 2024
**Status:** ✅ Ready for Testing
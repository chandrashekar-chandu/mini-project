# 🏆 Dynamic Contest Rating System

## Overview

The Contest Dashboard now features a **completely dynamic rating system** that adjusts automatically based on:
1. **Number of contests attended** 
2. **Number of problems solved in contests**
3. **Performance/Score achieved**

Your rating is **recalculated every time** you load the dashboard, ensuring it always reflects your current achievements.

---

## Rating Formula

### Components of Your Rating

```
Total Rating = Base Rating + Attendance Bonus + Problem Solving Bonus + Performance Bonus + Consistency Bonus
```

### Detailed Breakdown

#### 1. **Base Rating** (Starting Point)
```
Base Rating = 1200
```
- All users start with a rating of 1200
- This is the minimum rating (never goes below)

#### 2. **Contest Attendance Bonus** (Showing Up)
```
Attendance Bonus = Number of Contests Attended × 50
```
**Examples:**
- 1 contest → +50 points
- 5 contests → +250 points
- 10 contests → +500 points

**Incentive:** Encourages participation in contests

#### 3. **Problem Solving Bonus** (Getting Solutions Right)
```
Problem Solving Bonus = Total Problems Solved in Contests × 75
```
**Examples:**
- 5 problems solved → +375 points
- 10 problems solved → +750 points
- 20 problems solved → +1500 points

**Incentive:** Rewards solving problems correctly

#### 4. **Performance Bonus** (Scoring Well)
```
Performance Bonus = (Average Score / 1000) × 150
```
**Calculation:**
- Average Score = Total Score in All Contests ÷ Number of Contests
- Base Score Per Contest = 1000
- Multiplier capped at 2× (max performance bonus is 300)

**Examples:**
- Average score 500 → Performance bonus = 75
- Average score 1000 → Performance bonus = 150
- Average score 1500+ → Performance bonus = 300 (capped)

**Incentive:** Rewards consistent high performance

#### 5. **Consistency Bonus** (Long-term Participation)
```
Consistency Bonus = (Contests Attended - 5) × 20 (only if attended > 5 contests)
```
**Examples:**
- 5 contests → 0 bonus (no bonus yet)
- 6 contests → +20 points
- 10 contests → +100 points
- 15 contests → +200 points

**Incentive:** Rewards long-term commitment

---

## Rating Categories

Your rating determines your category/rank:

| Rating Range | Category | Icon | Description |
|---|---|---|---|
| 2400+ | Legendary | 🔴 | Elite competitive programmer |
| 2100-2399 | Grandmaster | 🔴 | Expert level competitor |
| 1900-2099 | Master | 💜 | Very strong competitor |
| 1600-1899 | Expert | 💙 | Strong competitor |
| 1400-1599 | Specialist | 🟦 | Intermediate competitor |
| 1200-1399 | Beginner | 🟩 | Starting competitive programmer |
| <1200 | Unrated | 🟥 | New user (or system error) |

---

## Real-World Examples

### Example 1: Beginner
- Contests attended: 2
- Problems solved: 3
- Total score: 1200
- Average score: 600

**Calculation:**
```
1200 (base)
+ (2 × 50) = +100 (attendance)
+ (3 × 75) = +225 (problems)
+ (600/1000 × 150) = +90 (performance)
+ 0 (consistency - need > 5 contests)
─────────────
= 1615 (Expert ⭐)
```

### Example 2: Intermediate
- Contests attended: 8
- Problems solved: 15
- Total score: 8500
- Average score: 1062

**Calculation:**
```
1200 (base)
+ (8 × 50) = +400 (attendance)
+ (15 × 75) = +1125 (problems)
+ (1062/1000 × 150) = +159 (performance)
+ (8-5) × 20 = +60 (consistency)
─────────────
= 2944 (Legendary 🔴) - But we calculate based on actual performance
```

### Example 3: Returning Champion
- Contests attended: 20
- Problems solved: 50
- Total score: 22000
- Average score: 1100

**Calculation:**
```
1200 (base)
+ (20 × 50) = +1000 (attendance)
+ (50 × 75) = +3750 (problems)
+ (1100/1000 × 150) = +165 (performance)
+ (20-5) × 20 = +300 (consistency)
─────────────
= 6415 (Far exceeds Legendary - excellent performance!)
```

---

## Dashboard Display

### Rating Card
The Contest Rating card shows:
- **Large number:** Your current rating (e.g., 1615)
- **Category:** Your rank name (e.g., "Expert 💙")
- **Progress bar:** Visual representation of rating (0-2400)

### Rating Breakdown Section
When you have participated in contests, you see detailed breakdown showing:

| Component | Points | How It's Calculated |
|---|---|---|
| Base Rating | 1200 | Starting point |
| Contest Attendance | +X | Contests × 50 |
| Problem Solving | +X | Problems × 75 |
| Performance Bonus | +X | (Avg Score / 1000) × 150 |
| Consistency Bonus | +X | (Contests - 5) × 20 |
| **Total Rating** | **X** | **Sum of all components** |

### Progress Indicator
- Shows "X% Complete" toward max rating (2400)
- Visual progress bar fills as rating increases
- Helps you understand how much room for improvement you have

---

## How Rating Updates

### When Does Rating Recalculate?
- **Every time you load the dashboard** ✅
- **After you join a new contest** ✅
- **After you submit solutions in a contest** ✅
- **Real-time performance tracking** ✅

### Rating Persistence
- Rating is stored in the database
- Updated when dashboard loads
- Survives logout/login cycles
- Always synced with your participation records

### Important Notes
- Rating is **recalculated from actual data**, not stored as static value
- If you get accurate data from contests, rating reflects that
- Rating will **never decrease** if you keep the same performance
- Rating **increases** when you:
  - Attend more contests
  - Solve more problems
  - Score higher on average

---

## Tips to Increase Your Rating

### 🥉 Quick Tips (50 points each)
1. **Attend more contests** - Just showing up earns 50 points per contest
2. **Solve first problem** - Solve one problem to get +75 points

### 🥈 Medium Tips (100-200 points)
1. **Solve multiple problems** - Aim for 4-5 problems per contest
2. **Improve average score** - Solve more difficult problems
3. **Consistent participation** - Attend contests regularly to unlock consistency bonus

### 🥇 Advanced Tips (200+ points)
1. **Participate regularly** - 10+ contests unlocks consistency bonus
2. **High performance** - Score 1000+ points per contest
3. **Problem mastery** - Solve 20+ problems across contests
4. **Optimal strategy** - Focus on problems that give best score/time ratio

---

## Rating Insights

### What Your Rating Means
- **1200-1400:** Learning phase - building skills
- **1400-1600:** Intermediate - solving most contest problems
- **1600-1900:** Advanced - strong competitor with high success rate
- **1900-2400:** Expert - rare achievement through consistent excellence

### Common Questions

**Q: Why is my rating only 1200?**  
A: You haven't participated in any contests yet. Join a contest and solve some problems!

**Q: Can my rating go down?**  
A: No! Rating only stays same or increases. It's calculated from your cumulative achievements.

**Q: What's the maximum rating?**  
A: System caps at 2400 (Legendary), but mathematically you could exceed it with many contests.

**Q: How often does my rating update?**  
A: Every time you load the dashboard. It's real-time based on your participation data.

**Q: Why does my rating sometimes stay the same?**  
A: If your contests/scores don't change, neither does your rating. Complete new contests to increase it!

---

## Technical Details

### Backend Implementation
- **File:** `backend/services/ratingService.js`
- **Function:** `calculateContestRating(participations)`
- **Data Source:** ContestParticipation model
- **Update Trigger:** GET `/api/users/:id/contests` endpoint

### Frontend Display
- **File:** `frontend/src/pages/Dashboard.js`
- **Components:** Rating card + Breakdown section
- **Update:** On component mount and when user changes

### Data Flow
```
1. User visits Dashboard
   ↓
2. Frontend fetches: GET /api/users/{id}/contests
   ↓
3. Backend queries ContestParticipation data
   ↓
4. Backend calls calculateContestRating()
   ↓
5. Rating calculated with all bonuses
   ↓
6. User data updated with new rating
   ↓
7. Frontend displays rating + breakdown
```

---

## Rating System Benefits

✅ **Fair & Transparent**
- Clear formula everyone can understand
- No hidden calculations

✅ **Motivating**
- Multiple ways to increase rating
- Progress is visible and rewarding

✅ **Comprehensive**
- Considers quantity (contest count)
- Considers quality (problems solved)
- Considers performance (score achieved)
- Considers consistency (long-term participation)

✅ **Real-time**
- Always up-to-date with your achievements
- No manual updates needed

✅ **Persistent**
- Stored in database
- Survives session changes
- Tracked over time

---

## Customization

Want to adjust the rating formula? Edit **`backend/services/ratingService.js`**

Currently adjustable values:
```javascript
const BASE_RATING = 1200;                    // Starting rating
const ATTENDANCE_POINTS = 50;                // Points per contest
const PROBLEM_POINTS = 75;                   // Points per problem
const BASE_SCORE_PER_CONTEST = 1000;        // Reference score
const PERFORMANCE_MULTIPLIER = 150;          // Performance bonus multiplier
const CONSISTENCY_THRESHOLD = 5;             // Contests needed for bonus
const CONSISTENCY_BONUS = 20;                // Points per extra contest
```

---

## Future Enhancements

Potential improvements to consider:
1. **Rating decay** - Penalty for inactivity
2. **Calibration contests** - Initial rating matches skill level
3. **Division system** - Separate ratings for different difficulty levels
4. **Streak tracking** - Bonus for consecutive contest participation
5. **Leaderboard** - Global ranking compared to other users
6. **Rating graph** - Historical tracking over time
7. **Predictions** - Estimate rating after next contest
8. **Achievements** - Badges for hitting milestones (1500+, 2000+, etc.)

---

## FAQ

**Q: Is the formula the same as Codeforces?**  
A: No, this is a custom simplified formula designed for this platform.

**Q: Does my rating affect anything else?**  
A: Currently it's for display/motivation. Future features may use it for contest seeding.

**Q: Can I reset my rating?**  
A: No, but you can create a new account. Rating is based on participation history.

**Q: What if I have a great performance but low rating?**  
A: Your rating reflects contests attended. More contests = more opportunity to earn rating.

**Q: How is this different from level-based systems?**  
A: This is **continuous and dynamic**, not discrete levels. Your exact rating always shows your exact achievement.

---

## Support

If you have questions about the rating system:
1. Check the Rating Breakdown section on Dashboard
2. Review this documentation
3. Check your contest participation history
4. Verify your problem-solving records

---

**System Status:** ✅ Live and Active  
**Last Updated:** 2024  
**Version:** 1.0.0

**Remember:** Your rating is a reflection of your competitive programming skills. Keep practicing, attend more contests, and solve more problems to watch your rating grow! 🚀
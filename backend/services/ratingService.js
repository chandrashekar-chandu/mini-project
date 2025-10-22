/**
 * Rating Service - Calculates dynamic contest rating based on performance
 */

/**
 * Calculate contest rating based on:
 * 1. Number of contests attended
 * 2. Problems solved in contests
 * 3. Overall performance score
 * 
 * Rating Formula:
 * Base Rating: 1200
 * + Contest Attendance Bonus: (contests_attended * 50)
 * + Problem Solving Bonus: (problems_solved_in_contests * 75)
 * + Performance Bonus: (average_score / base_score * 150)
 * 
 * @param {Array} participations - Array of contest participations
 * @returns {number} - Calculated contest rating
 */
const calculateContestRating = (participations) => {
  const BASE_RATING = 1200;
  
  if (!participations || participations.length === 0) {
    return BASE_RATING;
  }

  try {
    // 1. Contest Attendance Bonus
    const contestsAttended = participations.length;
    const attendanceBonus = contestsAttended * 50;

    // 2. Problem Solving Bonus
    const totalProblemsSolved = participations.reduce((sum, p) => {
      return sum + (p.solvedProblems?.length || 0);
    }, 0);
    const problemSolvingBonus = totalProblemsSolved * 75;

    // 3. Performance Bonus (based on score)
    const totalScore = participations.reduce((sum, p) => sum + (p.totalScore || 0), 0);
    const averageScore = totalScore / contestsAttended;
    const BASE_SCORE_PER_CONTEST = 1000; // Assuming max score is ~1000 per contest
    const performanceMultiplier = Math.min(averageScore / BASE_SCORE_PER_CONTEST, 2); // Cap at 2x
    const performanceBonus = Math.round(performanceMultiplier * 150);

    // 4. Consistency Bonus (if participated in many contests)
    const consistencyBonus = contestsAttended > 5 ? (contestsAttended - 5) * 20 : 0;

    // Total Rating
    const totalRating = BASE_RATING + attendanceBonus + problemSolvingBonus + performanceBonus + consistencyBonus;

    // Rating should not go below base rating
    return Math.max(BASE_RATING, Math.round(totalRating));
  } catch (error) {
    console.error('Error calculating contest rating:', error);
    return BASE_RATING;
  }
};

/**
 * Calculate rating details including breakdown
 * @param {Array} participations - Array of contest participations
 * @returns {Object} - Detailed rating breakdown
 */
const calculateRatingBreakdown = (participations) => {
  const BASE_RATING = 1200;
  
  if (!participations || participations.length === 0) {
    return {
      totalRating: BASE_RATING,
      breakdown: {
        baseRating: BASE_RATING,
        attendanceBonus: 0,
        problemSolvingBonus: 0,
        performanceBonus: 0,
        consistencyBonus: 0
      },
      metrics: {
        contestsAttended: 0,
        totalProblemsSolved: 0,
        averageScore: 0,
        totalScore: 0
      }
    };
  }

  try {
    // Metrics
    const contestsAttended = participations.length;
    const totalProblemsSolved = participations.reduce((sum, p) => {
      return sum + (p.solvedProblems?.length || 0);
    }, 0);
    const totalScore = participations.reduce((sum, p) => sum + (p.totalScore || 0), 0);
    const averageScore = totalScore / contestsAttended;

    // Bonuses
    const attendanceBonus = contestsAttended * 50;
    const problemSolvingBonus = totalProblemsSolved * 75;
    
    const BASE_SCORE_PER_CONTEST = 1000;
    const performanceMultiplier = Math.min(averageScore / BASE_SCORE_PER_CONTEST, 2);
    const performanceBonus = Math.round(performanceMultiplier * 150);
    
    const consistencyBonus = contestsAttended > 5 ? (contestsAttended - 5) * 20 : 0;

    const totalRating = BASE_RATING + attendanceBonus + problemSolvingBonus + performanceBonus + consistencyBonus;

    return {
      totalRating: Math.max(BASE_RATING, Math.round(totalRating)),
      breakdown: {
        baseRating: BASE_RATING,
        attendanceBonus: Math.round(attendanceBonus),
        problemSolvingBonus: Math.round(problemSolvingBonus),
        performanceBonus: performanceBonus,
        consistencyBonus: Math.round(consistencyBonus)
      },
      metrics: {
        contestsAttended,
        totalProblemsSolved,
        averageScore: Math.round(averageScore),
        totalScore
      }
    };
  } catch (error) {
    console.error('Error calculating rating breakdown:', error);
    return {
      totalRating: BASE_RATING,
      breakdown: {
        baseRating: BASE_RATING,
        attendanceBonus: 0,
        problemSolvingBonus: 0,
        performanceBonus: 0,
        consistencyBonus: 0
      },
      metrics: {
        contestsAttended: 0,
        totalProblemsSolved: 0,
        averageScore: 0,
        totalScore: 0
      }
    };
  }
};

/**
 * Get rating category based on rating value
 * @param {number} rating - The rating value
 * @returns {string} - Category name
 */
const getRatingCategory = (rating) => {
  if (rating >= 2400) return 'Legendary 🔴';
  if (rating >= 2100) return 'Grandmaster 🔴';
  if (rating >= 1900) return 'Master 💜';
  if (rating >= 1600) return 'Expert 💙';
  if (rating >= 1400) return 'Specialist 🟦';
  if (rating >= 1200) return 'Beginner 🟩';
  return 'Unrated 🟥';
};

/**
 * Get rating color based on rating value
 * @param {number} rating - The rating value
 * @returns {string} - Color code
 */
const getRatingColor = (rating) => {
  if (rating >= 2400) return '#FF0000'; // Red
  if (rating >= 2100) return '#FF0000'; // Red
  if (rating >= 1900) return '#AA00AA'; // Purple
  if (rating >= 1600) return '#0000FF'; // Blue
  if (rating >= 1400) return '#00AA00'; // Green
  if (rating >= 1200) return '#808080'; // Gray
  return '#808080';
};

module.exports = {
  calculateContestRating,
  calculateRatingBreakdown,
  getRatingCategory,
  getRatingColor
};
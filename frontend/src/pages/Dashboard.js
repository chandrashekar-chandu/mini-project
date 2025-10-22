import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [contestData, setContestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const userId = user?.id || user?._id;
        
        console.log('=== Dashboard Contest Data Fetch ===');
        console.log('User object:', user);
        console.log('User ID:', userId);
        console.log('Token available:', !!token);
        console.log('API Base URL:', process.env.REACT_APP_API_URL);
        
        if (!userId) {
          throw new Error('No user ID available. User might not be logged in properly.');
        }
        
        const apiUrl = `${process.env.REACT_APP_API_URL}/users/${userId}/contests`;
        console.log('Fetching from:', apiUrl);
        
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        
        const response = await axios.get(apiUrl, config);
        
        console.log('✅ API Response received:', response.data);
        console.log('Contests count:', response.data.contests?.length || 0);
        console.log('Stats:', response.data.stats);
        
        setContestData(response.data);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching contest data:', err.message);
        console.error('Error response:', err.response?.data);
        console.error('Error status:', err.response?.status);
        console.error('Full error:', err);
        
        const errorMessage = err.response?.data?.error || err.message || 'Failed to load contest data';
        setError(errorMessage);
        setContestData({ contests: [], stats: {
          totalContestsAttended: 0,
          totalContestRating: 1200,
          totalScoreInContests: 0,
          averageScore: 0,
          highestScore: 0
        } });
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.id || user?._id) {
      console.log('User ID available, fetching contests');
      fetchContestData();
    } else {
      console.log('⚠️ User ID not available');
      setError('User information not available. Please log in again.');
      setLoading(false);
    }
  }, [user?.id, user?._id]);

  const contests = contestData?.contests || [];
  const stats = contestData?.stats || {
    totalContestsAttended: 0,
    totalContestRating: 1200,
    totalScoreInContests: 0,
    averageScore: 0,
    highestScore: 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold text-white">Dashboard</h1>
              <p className="text-primary-100 mt-2">Welcome back, {user?.username}! 👋</p>
            </div>
            <div className="text-6xl opacity-20">🎯</div>
          </div>
        </div>

        {/* Contest Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Contests Attended */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl shadow-xl border border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Contests Attended</h2>
              <span className="text-3xl">🏆</span>
            </div>
            <p className="text-5xl font-bold text-white">{stats.totalContestsAttended}</p>
            <p className="text-blue-100 mt-3 text-sm">Total participated</p>
          </div>

          {/* Contest Rating */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-xl shadow-xl border border-purple-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Contest Rating</h2>
              <span className="text-3xl">⭐</span>
            </div>
            <p className="text-5xl font-bold text-white">{stats.totalContestRating}</p>
            <p className="text-purple-100 mt-3 text-sm">{stats.ratingCategory || 'Unrated'}</p>
            <div className="mt-3 w-full bg-purple-700 rounded-full h-2">
              <div 
                className="bg-yellow-300 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((stats.totalContestRating / (stats.maxPossibleRating || 2400)) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Highest Score */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-xl shadow-xl border border-green-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Highest Score</h2>
              <span className="text-3xl">🎯</span>
            </div>
            <p className="text-5xl font-bold text-white">{stats.highestScore}</p>
            <p className="text-green-100 mt-3 text-sm">Best performance</p>
          </div>

          {/* Average Score */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-xl shadow-xl border border-orange-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Average Score</h2>
              <span className="text-3xl">📊</span>
            </div>
            <p className="text-5xl font-bold text-white">{stats.averageScore}</p>
            <p className="text-orange-100 mt-3 text-sm">Across all contests</p>
          </div>
        </div>

        {/* Contest History Section */}
        <div className="bg-gradient-to-br from-white to-secondary-50 rounded-xl shadow-xl p-8 border border-primary-200 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-primary-700">📋 Contest History</h2>
            <span className="text-sm font-semibold text-secondary-600 bg-secondary-100 px-4 py-2 rounded-full">
              {contests.length} contests
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="text-secondary-600 text-lg">{error}</p>
            </div>
          ) : contests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Contest Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Date Participated
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Problems Solved
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-200">
                  {contests.map((contest) => (
                    <tr key={contest.contestId} className="hover:bg-primary-50/50 transition-colors duration-200">
                      <td className="px-6 py-5">
                        <div className="text-sm font-bold text-primary-800">
                          {contest.contestTitle}
                        </div>
                        <div className="text-xs text-secondary-500 mt-1">
                          ID: {contest.contestId}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm text-secondary-700">
                          {new Date(contest.joinedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-xs text-secondary-500">
                          {new Date(contest.joinedAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="inline-flex items-center">
                          <span className="text-2xl font-bold text-primary-600">
                            {contest.totalScore}
                          </span>
                          <span className="ml-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                            Points
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-green-600">
                            {contest.solvedProblems}
                          </span>
                          <span className="ml-2 text-xs text-secondary-600">
                            / {contest.totalProblems}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏆</div>
              <p className="text-secondary-600 text-lg font-semibold">No contest history yet</p>
              <p className="text-secondary-400 mt-2 mb-6">Join your first contest to see your performance here!</p>
              <Link 
                to="/contests" 
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Browse Contests →
              </Link>
            </div>
          )}
        </div>

        {/* Rating Breakdown Section */}
        {contests.length > 0 && stats.ratingBreakdown && (
          <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-purple-300 shadow-lg">
            <h3 className="text-2xl font-bold text-indigo-900 mb-6">🏆 How Your Rating is Calculated</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Rating Breakdown Cards */}
              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-500">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">Base Rating</span>
                  <span className="text-2xl font-bold text-blue-600">+{stats.ratingBreakdown.baseRating}</span>
                </div>
                <p className="text-xs text-gray-500">Starting point for all users</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-green-500">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">Contest Attendance</span>
                  <span className="text-2xl font-bold text-green-600">+{stats.ratingBreakdown.attendanceBonus}</span>
                </div>
                <p className="text-xs text-gray-500">{stats.totalContestsAttended} contests × 50 points</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-yellow-500">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">Problem Solving</span>
                  <span className="text-2xl font-bold text-yellow-600">+{stats.ratingBreakdown.problemSolvingBonus}</span>
                </div>
                <p className="text-xs text-gray-500">{stats.totalProblemsSolved} problems × 75 points</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-red-500">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">Performance Bonus</span>
                  <span className="text-2xl font-bold text-red-600">+{stats.ratingBreakdown.performanceBonus}</span>
                </div>
                <p className="text-xs text-gray-500">Based on average score: {stats.averageScore}</p>
              </div>

              {stats.ratingBreakdown.consistencyBonus > 0 && (
                <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-purple-500">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-600">Consistency Bonus</span>
                    <span className="text-2xl font-bold text-purple-600">+{stats.ratingBreakdown.consistencyBonus}</span>
                  </div>
                  <p className="text-xs text-gray-500">{stats.totalContestsAttended} contests completed</p>
                </div>
              )}
            </div>

            {/* Rating Total */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Your Current Rating</p>
                  <p className="text-4xl font-bold mt-2">{stats.totalContestRating}</p>
                  <p className="text-sm opacity-75 mt-2">{stats.ratingCategory}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Max Possible</p>
                  <p className="text-3xl font-bold mt-2">{stats.maxPossibleRating}</p>
                  <p className="text-sm opacity-75 mt-2">
                    {Math.round((stats.totalContestRating / stats.maxPossibleRating) * 100)}% Complete
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats Footer */}
        {contests.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-200">
            <h3 className="text-lg font-bold text-primary-700 mb-4">📈 Overall Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="text-xs text-secondary-600">Total Score Earned</p>
                  <p className="text-2xl font-bold text-primary-700">{stats.totalScoreInContests}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="text-xs text-secondary-600">Contests Attended</p>
                  <p className="text-2xl font-bold text-primary-700">{stats.totalContestsAttended}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="text-xs text-secondary-600">Avg Score Per Contest</p>
                  <p className="text-2xl font-bold text-primary-700">{stats.averageScore}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contests = ({ user }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [contests, setContests] = useState({ upcoming: [], ongoing: [], past: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllContests = async () => {
      try {
        setLoading(true);
        const statuses = ['upcoming', 'active', 'past'];
        const newContests = { upcoming: [], ongoing: [], past: [] };
        
        // Fetch all contest types
        for (const status of statuses) {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/contests`, {
              params: { status: status }
            });
            
            const tabKey = status === 'active' ? 'ongoing' : status;
            const contestsList = response.data.contests || [];
            newContests[tabKey] = contestsList;
            
            console.log(`✅ Fetched ${status} contests:`, contestsList.length);
          } catch (error) {
            console.error(`Error fetching ${status} contests:`, error);
            const tabKey = status === 'active' ? 'ongoing' : status;
            newContests[tabKey] = [];
          }
        }
        
        setContests(newContests);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllContests();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      upcoming: 'text-blue-600 bg-blue-100',
      ongoing: 'text-green-600 bg-green-100',
      past: 'text-gray-600 bg-gray-100'
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading contests...</p>
        </div>
      </div>
    );
  }

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const statuses = ['upcoming', 'active', 'past'];
      const newContests = { upcoming: [], ongoing: [], past: [] };
      
      for (const status of statuses) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/contests`, {
            params: { status: status }
          });
          
          const tabKey = status === 'active' ? 'ongoing' : status;
          const contestsList = response.data.contests || [];
          newContests[tabKey] = contestsList;
        } catch (error) {
          console.error(`Error fetching ${status} contests:`, error);
          const tabKey = status === 'active' ? 'ongoing' : status;
          newContests[tabKey] = [];
        }
      }
      
      setContests(newContests);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Coding Contests</h1>
            <p className="text-gray-600 text-sm sm:text-base">Join contests and compete with other developers</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
          >
            {loading ? '⟳ Refreshing...' : '⟳ Refresh'}
          </button>
        </div>
        
        <div className="mb-6">
          <nav className="flex flex-wrap space-x-4 sm:space-x-8">
            <button 
              onClick={() => setActiveTab('upcoming')} 
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'upcoming' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📅 Upcoming <span className="bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 text-xs font-bold">({contests.upcoming?.length || 0})</span>
            </button>
            <button 
              onClick={() => setActiveTab('ongoing')} 
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'ongoing' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🔴 Ongoing <span className="bg-green-100 text-green-600 rounded-full px-2 py-0.5 text-xs font-bold">({contests.ongoing?.length || 0})</span>
            </button>
            <button 
              onClick={() => setActiveTab('past')} 
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'past' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ✓ Past <span className="bg-gray-200 text-gray-600 rounded-full px-2 py-0.5 text-xs font-bold">({contests.past?.length || 0})</span>
            </button>
          </nav>
        </div>

        <div className="grid gap-6">
          {contests[activeTab]?.length > 0 ? (
            contests[activeTab].map(contest => (
              <div key={contest._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{contest.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activeTab)}`}>
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{contest.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>📅 Start: {formatDate(contest.startTime)}</span>
                      <span>⏰ End: {formatDate(contest.endTime)}</span>
                      <span>👥 {contest.participantCount || 0} participants</span>
                      <span>🏆 {contest.challenges?.length || 0} problems</span>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6">
                    <Link
                      to={`/contest/${contest._id}`}
                      className="inline-block bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
                    >
                      {activeTab === 'upcoming' ? 'Register' : activeTab === 'ongoing' ? 'Join Now' : 'View Results'}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} contests</h3>
              <p className="text-gray-600">Check back later for new contests!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contests;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditContest = ({ user }) => {
  const navigate = useNavigate();
  const { contestId } = useParams();
  const [loading, setLoading] = useState(true);
  const [contestData, setContestData] = useState({ 
    name: '', 
    startTime: '', 
    endTime: '', 
    duration: '', 
    description: '',
    challenges: []
  });

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/contests/${contestId}`);
        const contest = response.data;
        
        // Convert ISO dates to datetime-local format
        const formatDateTime = (isoString) => {
          if (!isoString) return '';
          const date = new Date(isoString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          return `${year}-${month}-${day}T${hours}:${minutes}`;
        };

        setContestData({
          name: contest.name || contest.title || '',
          startTime: formatDateTime(contest.startTime),
          endTime: formatDateTime(contest.endTime),
          duration: contest.duration || '',
          description: contest.description || '',
          challenges: contest.challenges || []
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contest:', error);
        alert('Failed to load contest: ' + (error.response?.data?.error || error.message));
        navigate('/admin');
      }
    };

    if (contestId) {
      fetchContest();
    }
  }, [contestId, navigate]);

  const handleContestChange = (e) => {
    setContestData({ ...contestData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!contestData.name || !contestData.startTime || !contestData.endTime) {
      alert('Please fill in all required contest fields');
      return;
    }

    try {
      // Convert datetime-local strings to ISO Date strings
      const startTime = new Date(contestData.startTime).toISOString();
      const endTime = new Date(contestData.endTime).toISOString();

      const updateData = {
        name: contestData.name,
        startTime,
        endTime,
        description: contestData.description,
        duration: contestData.duration
      };

      console.log('Updating contest with data:', updateData);

      await axios.put(
        `${process.env.REACT_APP_API_URL}/contests/${contestId}`,
        updateData
      );

      alert('Contest updated successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating contest:', error);
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      alert('Failed to update contest: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading contest...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Contest</h1>
              <p className="text-gray-600">Update contest details and settings</p>
            </div>
            <Link to="/admin" className="text-blue-600 hover:text-blue-800">← Back to Admin Panel</Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Contest Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contest Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={contestData.name} 
                  onChange={handleContestChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter contest name" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input 
                  type="text" 
                  name="duration" 
                  value={contestData.duration} 
                  onChange={handleContestChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="e.g., 2 hours" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                <input 
                  type="datetime-local" 
                  name="startTime" 
                  value={contestData.startTime} 
                  onChange={handleContestChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
                <input 
                  type="datetime-local" 
                  name="endTime" 
                  value={contestData.endTime} 
                  onChange={handleContestChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  name="description" 
                  value={contestData.description} 
                  onChange={handleContestChange} 
                  rows={4} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter contest description" 
                />
              </div>
            </div>
          </div>

          {contestData.challenges && contestData.challenges.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contest Problems</h2>
              <div className="space-y-2">
                {contestData.challenges.map((challenge, index) => (
                  <div key={challenge._id || index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{challenge.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">Difficulty: {challenge.difficulty || 'N/A'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Points: {challenge.points || 0}</p>
                        <Link 
                          to={`/admin/edit-problem/${challenge._id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                        >
                          Edit Problem
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Link to="/admin" className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">Cancel</Link>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">Update Contest</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContest;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = ({ user }) => {
  const [userStats, setUserStats] = useState(null);
  const [badges, setBadges] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.profile?.name || '',
    email: user?.profile?.email || user?.email || '',
    phone: user?.profile?.phone || '',
    address: user?.profile?.address || '',
    gender: user?.profile?.gender || '',
    bio: user?.profile?.bio || '',
    country: user?.profile?.country || '',
    company: user?.profile?.company || '',
    github: user?.profile?.github || '',
    linkedin: user?.profile?.linkedin || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    fetchUserStats();
    fetchUserBadges();
    fetchCurrentUser();
  }, [user]);

  const fetchCurrentUser = async () => {
    if (!user?.id) {
      console.error('User ID is not available');
      return;
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${user.id}`);
      if (response.data) {
        setProfileData({
          name: response.data.profile?.name || '',
          email: response.data.profile?.email || response.data.email || '',
          phone: response.data.profile?.phone || '',
          address: response.data.profile?.address || '',
          gender: response.data.profile?.gender || '',
          bio: response.data.profile?.bio || '',
          country: response.data.profile?.country || '',
          company: response.data.profile?.company || '',
          github: response.data.profile?.github || '',
          linkedin: response.data.profile?.linkedin || ''
        });
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const refreshStats = () => {
    fetchUserStats();
    fetchUserBadges();
  };

  const fetchUserStats = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${user.id}/stats`);
      setUserStats(response.data);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const fetchUserBadges = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${user.id}/badges`);
      setBadges(response.data.badges || []);
    } catch (error) {
      console.error('Error fetching badges:', error);
      setBadges([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      setMessage(null);
      
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${user.id}`,
        { profile: profileData },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      // Update localStorage with the new user data
      const updatedUser = {
        ...user,
        profile: profileData
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setMessage({ type: 'success', text: '✅ Profile updated successfully!' });
      setIsEditMode(false);
      await fetchCurrentUser();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || '❌ Failed to update profile' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.profile?.name || '',
      email: user?.profile?.email || user?.email || '',
      phone: user?.profile?.phone || '',
      address: user?.profile?.address || '',
      gender: user?.profile?.gender || '',
      bio: user?.profile?.bio || '',
      country: user?.profile?.country || '',
      company: user?.profile?.company || '',
      github: user?.profile?.github || '',
      linkedin: user?.profile?.linkedin || ''
    });
    setIsEditMode(false);
  };



  return (
    <div className="min-h-screen bg-gradient-light py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-xl p-8 mb-8 border border-primary-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary-600 text-3xl font-bold shadow-lg">
                {user?.profile?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white">{user?.profile?.name}</h1>
                <p className="text-primary-100">@{user?.username}</p>
  
              </div>
            </div>
            <button
              onClick={refreshStats}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-all duration-300 flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh Stats</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Stats */}
          <div>
            <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-primary-200 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-primary-700 mb-6">Problem Solving Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105 border border-primary-400">
                  <div className="text-4xl font-bold text-white mb-2">{userStats?.stats?.totalSolved || 0}</div>
                  <div className="text-sm text-primary-100 font-semibold">Total Solved</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105 border border-primary-400">
                  <div className="text-4xl font-bold text-white mb-2">{userStats?.stats?.easySolved || 0}</div>
                  <div className="text-sm text-primary-100 font-semibold">Easy</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl shadow-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105 border border-secondary-400">
                  <div className="text-4xl font-bold text-white mb-2">{userStats?.stats?.mediumSolved || 0}</div>
                  <div className="text-sm text-secondary-100 font-semibold">Medium</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl shadow-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105 border border-accent-400">
                  <div className="text-4xl font-bold text-white mb-2">{userStats?.stats?.hardSolved || 0}</div>
                  <div className="text-sm text-accent-100 font-semibold">Hard</div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl shadow-xl p-8 border border-secondary-200 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-secondary-800 mb-6">Badges ({badges.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {/* All Available Badges */}
                {[
                  { _id: 'first-solve', name: 'First Steps', description: 'Solved your first problem!', icon: '🎯' },
                  { _id: 'ten-solved', name: 'Getting Started', description: 'Solved 10 problems!', icon: '🚀' },
                  { _id: 'fifty-solved', name: 'Problem Solver', description: 'Solved 50 problems!', icon: '⭐' },
                  { _id: 'hundred-solved', name: 'Century Club', description: 'Solved 100 problems!', icon: '👑' },
                  { _id: 'week-streak', name: 'Week Warrior', description: '7+ day solving streak!', icon: '⚡' },
                  { _id: 'month-streak', name: 'Streak Master', description: '30+ day solving streak!', icon: '🔥' },
                  { _id: 'rating-1500', name: 'Skilled Coder', description: 'Reached 1500 rating!', icon: '🎖️' },
                  { _id: 'rating-2000', name: 'Expert Coder', description: 'Reached 2000 rating!', icon: '🏆' },
                  { _id: 'easy-master', name: 'Easy Master', description: 'Solved 20+ easy problems!', icon: '🟢' },
                  { _id: 'medium-conqueror', name: 'Medium Conqueror', description: 'Solved 15+ medium problems!', icon: '🟡' },
                  { _id: 'hard-hero', name: 'Hard Hero', description: 'Solved 10+ hard problems!', icon: '🔴' }
                ].map(badge => {
                  const isEarned = badges.some(b => (b.badge?.name || b.name) === badge.name);
                  return (
                    <div 
                      key={badge._id} 
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 transform ${
                        isEarned 
                          ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-400 hover:shadow-glow hover:scale-105' 
                          : 'bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-300 opacity-40 hover:opacity-60'
                      }`}
                    >
                      <div className="text-3xl">{badge.icon}</div>
                      <div className="flex-1">
                        <div className={`font-semibold text-base ${isEarned ? 'text-yellow-900' : 'text-gray-700'}`}>{badge.name}</div>
                        <div className={`text-sm ${isEarned ? 'text-yellow-700' : 'text-gray-600'}`}>{badge.description}</div>
                      </div>
                      {isEarned && <div className="text-xl">✅</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Profile Information - At the Bottom */}
            <div className="bg-gradient-to-br from-white to-primary-50 rounded-xl shadow-xl p-8 border border-primary-200 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary-700">Profile Information</h2>
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isEditMode 
                      ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  {isEditMode ? '✕ Cancel' : '✏️ Edit'}
                </button>
              </div>

              {message && (
                <div className={`mb-4 p-4 rounded-lg font-semibold ${
                  message.type === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {message.text}
                </div>
              )}

              {isEditMode ? (
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Full Name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Email Address"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Phone Number"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Street Address"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 h-24 resize-none"
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={profileData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Country"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={profileData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Company Name"
                    />
                  </div>

                  {/* GitHub */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub</label>
                    <input
                      type="text"
                      name="github"
                      value={profileData.github}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="GitHub Username"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={profileData.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="LinkedIn Profile"
                    />
                  </div>

                  {/* Save and Cancel Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                    >
                      {loading ? '💾 Saving...' : '💾 Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-semibold">Name:</span>
                    <span className="text-gray-900">{profileData.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-semibold">Email:</span>
                    <span className="text-gray-900">{profileData.email || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-semibold">Phone:</span>
                    <span className="text-gray-900">{profileData.phone || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-semibold">Address:</span>
                    <span className="text-gray-900">{profileData.address || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-semibold">Gender:</span>
                    <span className="text-gray-900 capitalize">{profileData.gender || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-semibold">Country:</span>
                    <span className="text-gray-900">{profileData.country || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-semibold">Company:</span>
                    <span className="text-gray-900">{profileData.company || 'Not set'}</span>
                  </div>
                  {profileData.bio && (
                    <div className="py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-semibold">Bio:</span>
                      <p className="text-gray-900 mt-1">{profileData.bio}</p>
                    </div>
                  )}
                  {profileData.github && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-semibold">GitHub:</span>
                      <span className="text-gray-900">{profileData.github}</span>
                    </div>
                  )}
                  {profileData.linkedin && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-semibold">LinkedIn:</span>
                      <span className="text-gray-900">{profileData.linkedin}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

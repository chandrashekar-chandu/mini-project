import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/home.css'; // Import animations

const Home = ({ isLoggedIn }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/announcements`);
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };
    fetchAnnouncements();
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="hero-fade-in bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 rounded-3xl p-12 mb-12 shadow-2xl border border-blue-200 backdrop-blur-sm">
            <h1 className="text-6xl sm:text-7xl font-bold text-blue-900 mb-6 animate-title drop-shadow-lg">
              ⚡ Welcome to CodeArena
            </h1>
            <p className="text-xl sm:text-2xl text-blue-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate platform for competitive programming. Compete in contests, solve challenges, and climb the leaderboards.
            </p>
            {!isLoggedIn && (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/login"
                  className="btn-primary bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-secondary bg-cyan-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:bg-cyan-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="animate-section py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-16">
            ✨ Why Choose CodeArena?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group feature-card bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-300 p-8 rounded-2xl hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-200">
              <div className="text-7xl mb-4 group-hover:scale-125 transition-transform duration-300">🏆</div>
              <h3 className="text-2xl font-semibold text-cyan-700 mb-4">Competitive Contests</h3>
              <p className="text-gray-700">Participate in timed coding contests with real-time leaderboards and prizes.</p>
            </div>
            <div className="group feature-card bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-300 p-8 rounded-2xl hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200">
              <div className="text-7xl mb-4 group-hover:scale-125 transition-transform duration-300">💻</div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">Practice Problems</h3>
              <p className="text-gray-700">Solve thousands of algorithmic problems across various difficulty levels.</p>
            </div>
            <div className="group feature-card bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-300 p-8 rounded-2xl hover:border-pink-500 transition-all duration-300 hover:shadow-xl hover:shadow-pink-200">
              <div className="text-7xl mb-4 group-hover:scale-125 transition-transform duration-300">📊</div>
              <h3 className="text-2xl font-semibold text-pink-700 mb-4">Global Leaderboards</h3>
              <p className="text-gray-700">Track your progress and compete with programmers worldwide.</p>
            </div>
            <div className="group feature-card bg-gradient-to-br from-green-50 to-cyan-50 border border-green-300 p-8 rounded-2xl hover:border-green-500 transition-all duration-300 hover:shadow-xl hover:shadow-green-200">
              <div className="text-7xl mb-4 group-hover:scale-125 transition-transform duration-300">⚡</div>
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Real-time Judging</h3>
              <p className="text-gray-700">Get instant feedback on your code submissions with detailed test results.</p>
            </div>
            <div className="group feature-card bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-300 p-8 rounded-2xl hover:border-yellow-500 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-200">
              <div className="text-7xl mb-4 group-hover:scale-125 transition-transform duration-300">🎯</div>
              <h3 className="text-2xl font-semibold text-yellow-700 mb-4">Skill Assessment</h3>
              <p className="text-gray-700">Improve your coding skills with personalized recommendations and badges.</p>
            </div>
            <div className="group feature-card bg-gradient-to-br from-red-50 to-pink-50 border border-red-300 p-8 rounded-2xl hover:border-red-500 transition-all duration-300 hover:shadow-xl hover:shadow-red-200">
              <div className="text-7xl mb-4 group-hover:scale-125 transition-transform duration-300">🌐</div>
              <h3 className="text-2xl font-semibold text-red-700 mb-4">Community Support</h3>
              <p className="text-gray-700">Connect with fellow programmers, share solutions, and learn together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="animate-section py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-blue-900 mb-16 drop-shadow-lg">📈 Platform Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="stat-card group bg-white border border-cyan-200 rounded-2xl p-8 hover:border-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-300/50">
              <div className="text-5xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">10K+</div>
              <div className="text-gray-700 font-semibold text-lg">Active Users</div>
            </div>
            <div className="stat-card group bg-white border border-purple-200 rounded-2xl p-8 hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-300/50">
              <div className="text-5xl font-bold text-purple-600 mb-3 group-hover:scale-110 transition-transform duration-300">5K+</div>
              <div className="text-gray-700 font-semibold text-lg">Problems Solved</div>
            </div>
            <div className="stat-card group bg-white border border-green-200 rounded-2xl p-8 hover:border-green-400 transition-all duration-300 hover:shadow-2xl hover:shadow-green-300/50">
              <div className="text-5xl font-bold text-green-600 mb-3 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-gray-700 font-semibold text-lg">Contests Hosted</div>
            </div>
            <div className="stat-card group bg-white border border-yellow-200 rounded-2xl p-8 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-300/50">
              <div className="text-5xl font-bold text-yellow-600 mb-3 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-gray-700 font-semibold text-lg">Languages</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="animate-section py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-16">🚀 How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative text-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg group-hover:shadow-2xl group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110">1</div>
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Sign Up</h3>
              <p className="text-gray-600 leading-relaxed">Create your account and set up your profile to get started.</p>
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative text-center">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">2</div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">Choose a Challenge</h3>
              <p className="text-gray-600 leading-relaxed">Browse contests, practice problems, or join ongoing competitions.</p>
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative text-center">
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg group-hover:shadow-2xl group-hover:shadow-pink-500/50 transition-all duration-300 group-hover:scale-110">3</div>
              <h3 className="text-2xl font-semibold text-pink-700 mb-4">Code & Compete</h3>
              <p className="text-gray-600 leading-relaxed">Write efficient code, submit solutions, and climb the rankings.</p>
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section id="announcements" className="animate-section py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-200 backdrop-blur-md hover:border-blue-400 transition-all duration-300">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-8">📢 Latest Announcements</h2>
            {announcements.length > 0 ? (
              <ul className="space-y-6">
                {announcements.slice(0, 2).map((announcement) => (
                  <li key={announcement.id} className="group bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-200">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2 group-hover:text-blue-900 transition-colors">{announcement.title}</h3>
                    <p className="text-gray-700 mb-3 leading-relaxed">{announcement.content}</p>
                    <p className="text-sm text-gray-500 font-medium">
                      📅 {new Date(announcement.date).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <div className="text-7xl mb-4">📢</div>
                <p className="text-gray-500 text-lg">No announcements available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-100 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-bold text-blue-900 mb-6 drop-shadow-lg animate-pulse-slow">💻 Ready to Start Coding?</h2>
          <p className="text-2xl text-blue-800 mb-10 leading-relaxed font-semibold drop-shadow-md">Join thousands of programmers and take your skills to the next level.</p>
          <Link
            to={isLoggedIn ? '/contests' : '/login'}
            className="group inline-block bg-blue-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:bg-blue-700 border-2 border-blue-600"
          >
            🚀 Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer - White Background */}
      <footer className="bg-white text-gray-800 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">⚡ CodeArena</h3>
              <p className="text-gray-700 leading-relaxed">Empowering programmers worldwide through competitive coding challenges and skill development.</p>
              <div className="flex gap-3 pt-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-200 cursor-pointer transition-all">👨‍💻</div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-blue-600 mb-4">🎯 Platform</h4>
              <ul className="space-y-3">
                <li><Link to="/contests" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contests</Link></li>
                <li><Link to="/problems" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Problems</Link></li>
                <li><Link to="/leaderboard" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Leaderboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-purple-600 mb-4">💬 Support</h4>
              <ul className="space-y-3">
                <li><Link to="/help" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Help Center</Link></li>
                <li><Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Contact Us</Link></li>
                <li><Link to="/faq" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-pink-600 mb-4">🌐 Community</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Blog</a></li>
                <li><a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Forum</a></li>
                <li><a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Newsletter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-gray-600">© 2024 CodeArena. All rights reserved. 🚀</p>
            <p className="text-gray-500 text-sm">Made with ❤️ for programmers worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
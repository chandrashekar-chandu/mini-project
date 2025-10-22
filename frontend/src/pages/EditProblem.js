import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProblem = ({ user }) => {
  const navigate = useNavigate();
  const { problemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [problemData, setProblemData] = useState({
    title: '',
    description: '',
    difficulty: 'Easy',
    topics: [],
    inputFormat: '',
    outputFormat: '',
    constraints: '',
    points: 10
  });
  const [testCases, setTestCases] = useState([
    { input: '', expectedOutput: '', isHidden: false }
  ]);

  const topics = [
    "Arrays", "Strings", "Linked Lists", "Stacks", "Queues",
    "Trees", "Binary Search Trees", "Heaps", "Graphs", 
    "Dynamic Programming", "Greedy", "Backtracking",
    "Sorting", "Searching", "Hash Tables", "Two Pointers",
    "Sliding Window", "Recursion", "Bit Manipulation"
  ];

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const [problemResp, testCaseResp] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/challenges/${problemId}`),
          axios.get(`${process.env.REACT_APP_API_URL}/testcases/challenge/${problemId}`)
        ]);

        const problem = problemResp.data;
        setProblemData({
          title: problem.title || '',
          description: problem.description || '',
          difficulty: problem.difficulty || 'Easy',
          topics: Array.isArray(problem.topics) ? problem.topics : [],
          inputFormat: problem.inputFormat || '',
          outputFormat: problem.outputFormat || '',
          constraints: problem.constraints || '',
          points: problem.points || 10
        });

        if (testCaseResp.data && Array.isArray(testCaseResp.data.testCases)) {
          setTestCases(testCaseResp.data.testCases);
        } else if (testCaseResp.data && Array.isArray(testCaseResp.data)) {
          setTestCases(testCaseResp.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        alert('Failed to load problem: ' + (error.response?.data?.error || error.message));
        navigate(-1);
      }
    };

    if (problemId) {
      fetchProblem();
    }
  }, [problemId, navigate]);

  const handleProblemChange = (e) => {
    const { name, value } = e.target;
    setProblemData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'difficulty' && {
        points: value === 'Easy' ? 10 : value === 'Medium' ? 20 : 30
      })
    }));
  };

  const handleTopicChange = (topic) => {
    setProblemData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expectedOutput: '', isHidden: false }]);
  };

  const removeTestCase = (index) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter((_, i) => i !== index));
    }
  };

  const handleTestCaseChange = (index, field, value) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], [field]: value };
    setTestCases(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!problemData.title || !problemData.description || problemData.topics.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    if (testCases.some(tc => !tc.input || !tc.expectedOutput)) {
      alert('Please fill in all test case inputs and outputs');
      return;
    }

    try {
      // Update the problem
      await axios.put(`${process.env.REACT_APP_API_URL}/challenges/${problemId}`, problemData);

      // Delete old test cases (those with IDs) and add new ones
      for (const testCase of testCases) {
        // If test case has an ID, it already exists - update it, otherwise create it
        if (testCase._id) {
          try {
            await axios.put(`${process.env.REACT_APP_API_URL}/testcases/${testCase._id}`, testCase);
          } catch (error) {
            // If update fails, try creating a new one
            await axios.post(`${process.env.REACT_APP_API_URL}/testcases/challenge/${problemId}`, testCase);
          }
        } else {
          // Create new test case
          await axios.post(`${process.env.REACT_APP_API_URL}/testcases/challenge/${problemId}`, testCase);
        }
      }

      alert('Problem updated successfully!');
      navigate(-1);
    } catch (error) {
      console.error('Error updating problem:', error);
      alert('Failed to update problem: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading problem...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Edit Problem</h1>
              <p className="text-gray-600">Update coding problem details</p>
            </div>
            <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800">← Back</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={problemData.title}
                  onChange={handleProblemChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
                <select
                  name="difficulty"
                  value={problemData.difficulty}
                  onChange={handleProblemChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                <input
                  type="number"
                  name="points"
                  value={problemData.points}
                  onChange={handleProblemChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={problemData.description}
                  onChange={handleProblemChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Topics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Topics *</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {topics.map(topic => (
                <label key={topic} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={problemData.topics.includes(topic)}
                    onChange={() => handleTopicChange(topic)}
                    className="mr-2"
                  />
                  <span className="text-sm">{topic}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Format and Constraints */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Format & Constraints</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Input Format</label>
                <textarea
                  name="inputFormat"
                  value={problemData.inputFormat}
                  onChange={handleProblemChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
                <textarea
                  name="outputFormat"
                  value={problemData.outputFormat}
                  onChange={handleProblemChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Constraints</label>
                <textarea
                  name="constraints"
                  value={problemData.constraints}
                  onChange={handleProblemChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Test Cases */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Test Cases</h2>
              <button type="button" onClick={addTestCase} className="bg-secondary-600 text-white px-4 py-2 rounded-md hover:bg-secondary-700">
                Add Test Case
              </button>
            </div>
            {testCases.map((testCase, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Test Case {index + 1}</h3>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={testCase.isHidden}
                        onChange={(e) => handleTestCaseChange(index, 'isHidden', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Hidden</span>
                    </label>
                    {testCases.length > 1 && (
                      <button type="button" onClick={() => removeTestCase(index)} className="text-accent-600 hover:text-accent-800">
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Input</label>
                    <textarea
                      value={testCase.input}
                      onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Output</label>
                    <textarea
                      value={testCase.expectedOutput}
                      onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate(-1)} className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">Update Problem</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProblem;
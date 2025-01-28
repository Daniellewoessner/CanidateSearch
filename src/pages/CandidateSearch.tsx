import React, { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type GitHubUser from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [currentUser, setCurrentUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchMode, setSearchMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchInitialUser = async () => {
      try {
        const results = await searchGithub('location:US');
        if (results.length > 0) {
          const userDetails = await searchGithubUser(results[0].login);
          setCurrentUser(userDetails);
        }
      } catch (error) {
        console.error('Failed to fetch initial user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialUser();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const results = await searchGithub(query);
      setUsers(results);
      setSearchMode(true);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = async (username: string) => {
    try {
      const userDetails = await searchGithubUser(username);
      setCurrentUser(userDetails);
      setSearchMode(false);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleSave = () => {
    if (currentUser) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, currentUser]));
      loadNextCandidate();
    }
  };

  const loadNextCandidate = async () => {
    setLoading(true);
    try {
      const results = await searchGithub('location:US');
      const randomIndex = Math.floor(Math.random() * results.length);
      const userDetails = await searchGithubUser(results[randomIndex].login);
      setCurrentUser(userDetails);
    } catch (error) {
      console.error('Failed to load next candidate:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search GitHub users..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
          <button 
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      {searchMode ? (
        <div className="space-y-4">
          {users.map(user => (
            <div 
              key={user.id} 
              onClick={() => handleUserSelect(user.login)}
              className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-700"
            >
              <img 
                src={user.avatar_url} 
                alt={user.login} 
                className="w-12 h-12 rounded-full"
              />
              <span className="font-medium">{user.login}</span>
            </div>
          ))}
        </div>
      ) : currentUser && (
        <div className="border rounded-lg p-6">
          <img 
            src={currentUser.avatar_url} 
            alt={currentUser.login} 
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-center mb-4">
            {currentUser.name || currentUser.login}
          </h2>
          <div className="space-y-2">
            <p><strong>Username:</strong> {currentUser.login}</p>
            <p><strong>Location:</strong> {currentUser.location || 'Not specified'}</p>
            <p><strong>Email:</strong> {currentUser.email || 'Not specified'}</p>
            <p><strong>Company:</strong> {currentUser.company || 'Not specified'}</p>
            <p>
              <strong>Profile:</strong> 
              <a href={currentUser.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                {currentUser.html_url}
              </a>
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={loadNextCandidate}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              -
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
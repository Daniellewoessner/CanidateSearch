import React, { useEffect, useState } from 'react';
import type GitHubUser from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<GitHubUser[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  const handleClearCandidates = () => {
    localStorage.removeItem('savedCandidates');
    setSavedCandidates([]);
  };

  const handleRemoveCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    setSavedCandidates(updatedCandidates);
  };

  if (savedCandidates.length === 0) {
    return <div className="text-center p-6">No candidates have been accepted yet</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Saved Candidates</h1>
        <button
          onClick={handleClearCandidates}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Profile</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map(candidate => (
              <tr key={candidate.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <img 
                    src={candidate.avatar_url} 
                    alt={candidate.login} 
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="p-4">
                  <div className="font-bold">{candidate.name || candidate.login}</div>
                  <div className="text-sm text-gray-600">({candidate.login})</div>
                </td>
                <td className="p-4">{candidate.location || 'Not specified'}</td>
                <td className="p-4">{candidate.email || 'Not specified'}</td>
                <td className="p-4">{candidate.company || 'Not specified'}</td>
                <td className="p-4">
                  <a 
                    href={candidate.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleRemoveCandidate(candidate.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedCandidates;
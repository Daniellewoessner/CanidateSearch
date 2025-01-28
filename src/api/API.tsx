import type GitHubUser from '../interfaces/Candidate.interface';

const searchGithub = async (_query?: string): Promise<GitHubUser[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${_query}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    console.log('Status:', response.status);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};

const searchGithubUser = async (username: string): Promise<GitHubUser | null> => {
 try {
   const response = await fetch(`https://api.github.com/users/${username}`, {
     headers: {
       Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
       'Accept': 'application/vnd.github.v3+json'
     },
   });

   if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
   }

   const data = await response.json();
   return data;
 } catch (error) {
   console.error('User search failed:', error);
   return null;
 }
};

export { searchGithub, searchGithubUser };
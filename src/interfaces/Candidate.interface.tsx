interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name?: string;
  bio?: string;
  location?: string;
  email?: string;
  company?: string;
  html_url: string;
  followers?: number;
  public_repos?: number;
}

export default GitHubUser;
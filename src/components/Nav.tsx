import { Link } from 'react-router-dom';

const Nav = () => {
  const currentPage = window.location.pathname;
  
  return (
    <nav className="w-full py-4 bg-gray-50">
      <div className="container mx-auto px-4 flex gap-8">
        <Link 
          to="/"
          className={`text-xl transition-colors ${
            currentPage === '/' 
              ? 'text-blue-900 font-bold' 
              : 'text-gray-500 hover:text-blue-700'
          }`}
        >
          Home
        </Link>
        <Link 
          to="/SavedCandidates"
          className={`text-xl transition-colors ${
            currentPage === '/Potential Canidates' 
              ? 'text-blue-900 font-bold' 
              : 'text-gray-500 hover:text-blue-700'
          }`}
        >
          Potential Canidates
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
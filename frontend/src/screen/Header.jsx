
import React, { useContext } from 'react';
import { UserContext } from '../context/user.context';

const Header = () => {
  const {user , setUser} = useContext(UserContext);
  const handleLogout = () => {
    setUser(null); 
    localStorage.removeItem("user"); 
    localStorage.removeItem("token"); 
    navigate("/"); 
};
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center top-0 left-0 w-full z-50">
      <div className="text-xl font-bold">InterviewHub</div>
      <nav className="relative">
        <ul className="hidden md:flex space-x-4">
          <li><a href="/dashboard" className="hover:text-yellow-400">Dashboard</a></li>
          {user && <li><a href="/view" className="hover:text-yellow-400">View</a></li> }
          <li><a href="/submit" className="hover:text-yellow-400">Submit</a></li>
          {!user && <li><a href="/login" className="hover:text-yellow-400">Login</a></li>}
          {user ? 
          <li><a href="/logout" onClick={handleLogout} className="hover:text-yellow-400">Logout</a></li> :
          <li><a href="/register" className="hover:text-yellow-400">Register</a></li>  
          }
        </ul>
        <button className="md:hidden text-xl" onClick={toggleMenu}>
          &#9776;
        </button>
        <ul className="absolute top-full right-0 bg-gray-700 text-white w-40 space-y-2 p-2 hidden" id="mobileMenu">
          <li><a href="/submit" className="block hover:text-yellow-400">Submit</a></li>
          <li><a href="/view" className="block hover:text-yellow-400">View</a></li>
          <li><a href="/login" className="block hover:text-yellow-400">Login</a></li>
          <li><a href="/logout" className="block hover:text-yellow-400">Logout</a></li>
        </ul>
      </nav>
    </header>
  );

  function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
  }
};

export default Header;


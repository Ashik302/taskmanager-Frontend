import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { token, timeLeft, logout } = useContext(AuthContext);

  const formatTimeLeft = (timeInMs: number) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-row items-center justify-between gap-2 rounded-4xl">
      {/* Title */}
      <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500 font-poppins text-center sm:text-left">
        Eclipse 
      </div>

      {/* Countdown */}
      {token && timeLeft > 0 && (
        <div className="text-center sm:text-left">
          <div className="text-sm sm:text-base font-mono">
            {formatTimeLeft(timeLeft)}
          </div>
          <div className="text-xs text-gray-300">Token Expires In</div>
        </div>
      )}

      {/* Logout Button */}
      {token && (
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-lg self-center"
        >
          Log Out
        </button>
      )}
    </nav>
  );
};

export default Navbar;

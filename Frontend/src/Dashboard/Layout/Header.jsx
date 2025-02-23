/* eslint-disable react/prop-types */
const Header = ({ onSearch }) => {
  return (
    <div className="main flex flex-col">
      <div className="bg-gray-800 text-white p-8 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search Teachers..."
          className="w-full max-w-md px-3 py-1 rounded bg-gray-700 text-white focus:outline-none"
          onChange={(e) => onSearch(e.target.value)} // Ensure correct search handling
        />
      </div>
    </div>
  );
};

export default Header;
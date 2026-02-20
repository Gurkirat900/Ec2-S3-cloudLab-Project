function Navbar({ setToken }) {
  return (
    <div className="bg-[#1e293b] border-b border-gray-700 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Secure Cloud IAM</h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
        className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      
      {/* Top Navbar */}
      <div className="bg-[#1e293b] border-b border-gray-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Secure Cloud IAM
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/auth";
          }}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6">

        {/* Upload Section */}
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Upload File
          </h2>

          <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Choose File
          </button>
        </div>

        {/* File List Section */}
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">
            Your Files
          </h2>

          <p className="text-gray-400">
            No files uploaded yet.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

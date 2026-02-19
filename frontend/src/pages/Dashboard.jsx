import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard({setToken}) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await api.get("/files");
      setFiles(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Top Navbar */}
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

      {/* Main Content */}
      <div className="p-6">
        {/* Upload Section */}
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-lg font-semibold mb-4">Upload File</h2>

          <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Choose File
          </button>
        </div>

        {/* File List Section */}
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Your Files</h2>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : files.length === 0 ? (
            <p className="text-gray-400">No files uploaded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700 text-gray-400">
                    <th className="py-3">File Name</th>
                    <th className="py-3">Uploaded</th>
                    <th className="py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file._id} className="border-b border-gray-800">
                      <td className="py-3">{file.filename}</td>
                      <td className="py-3">
                        {new Date(file.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3 space-x-2">
                        <button className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
                          Download
                        </button>
                        <button className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700">
                          Versions
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

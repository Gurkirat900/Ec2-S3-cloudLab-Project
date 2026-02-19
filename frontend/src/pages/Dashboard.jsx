import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard({ setToken }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [versions, setVersions] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [selectedFileInfo, setSelectedFileInfo] = useState(null);


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

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);

      await api.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully");
      setSelectedFile(null);
      fetchFiles(); // refresh list
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await api.delete(`/files/${fileId}`);
      setFiles((prev) => prev.filter((file) => file._id !== fileId));
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleDownload = async (fileId, filename) => {
    try {
      const response = await api.get(`/files/download/${fileId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", filename || "file");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Download failed");
    }
  };

  const handleVersions = async (file) => {
    try {
      const res = await api.get(`/files/versions/${file._id}`);
      setVersions(res.data.data);
      selectedFileId(file._id);
      setSelectedFileInfo({
        id: file._id,
        filename: file.filename,
      });
    } catch (error) {
      alert("Failed to fetch versions");
    }
  };

  const handleDownloadSpecific = async (fileId, versionId, filename) => {
    try {
      const response = await api.get(
        `/files/download/${fileId}?versionId=${versionId}`,
        { responseType: "blob" },
      );

      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename || "file");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Version download failed");
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

          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="mb-4 text-sm text-gray-300"
          />

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
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
                      <td className="flex gap-2">
                        <button
                          onClick={() =>
                            handleDownload(file._id, file.filename)
                          }
                          className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Download
                        </button>

                        <button
                          onClick={() => handleVersions(file)}
                          className="bg-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-700"
                        >
                          Versions
                        </button>

                        <button
                          onClick={() => handleDelete(file._id)}
                          className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedFileId && (
                <div className="mt-8 bg-[#1e293b] rounded-xl p-6 border border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">File Versions</h2>

                    <button
                      onClick={() => {
                        setSelectedFileId(null);
                        setVersions([]);
                      }}
                      className="text-sm text-red-400 hover:text-red-500"
                    >
                      Close
                    </button>
                  </div>

                  {versions.length === 0 ? (
                    <p className="text-gray-400">No versions found.</p>
                  ) : (
                    <div className="space-y-3">
                      {versions.map((version) => (
                        <div
                          key={version.VersionId}
                          className="flex justify-between items-center bg-[#0f172a] p-3 rounded-lg border border-gray-800"
                        >
                          <div>
                            <p className="text-sm text-gray-300">Version ID:</p>
                            <p className="text-xs text-gray-500 break-all">
                              {version.VersionId}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(version.LastModified).toLocaleString()}
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              handleDownloadSpecific(
                                selectedFileId,
                                version.VersionId,
                                selectedFileInfo?.filename,
                              )
                            }
                            className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

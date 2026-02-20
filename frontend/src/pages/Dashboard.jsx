import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import UploadSection from "../components/UploadSection";
import FileTable from "../components/FileTable";

function Dashboard({ setToken }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

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

  const handleUpload = async (file) => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      await api.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("File uploaded successfully");
      fetchFiles();
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

  const handleDownload = async (fileId, filename, versionId = null) => {
    try {
      const url = versionId
        ? `/files/download/${fileId}?versionId=${versionId}`
        : `/files/download/${fileId}`;

      const response = await api.get(url, {
        responseType: "blob",
      });

      const blobUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", filename || "file");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Download failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar setToken={setToken} />

      <div className="p-6">
        <UploadSection
          onUpload={handleUpload}
          uploading={uploading}
        />

        <FileTable
          files={files}
          loading={loading}
          onDelete={handleDelete}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}

export default Dashboard;

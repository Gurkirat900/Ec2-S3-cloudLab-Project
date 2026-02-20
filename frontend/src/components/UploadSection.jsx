import { useState } from "react";

function UploadSection({ onUpload, uploading }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUploadClick = () => {
    onUpload(selectedFile);
    setSelectedFile(null);
  };

  return (
    <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 mb-8">
      <h2 className="text-lg font-semibold mb-4">Upload File</h2>

      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        className="mb-4 text-sm text-gray-300"
      />

      <button
        onClick={handleUploadClick}
        disabled={uploading}
        className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default UploadSection;

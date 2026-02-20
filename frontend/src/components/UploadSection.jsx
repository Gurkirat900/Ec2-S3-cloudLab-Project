import { useState, useRef } from "react";

function UploadSection({ onUpload, uploading }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleUploadClick = async () => {
    if (!selectedFile) return;

    const success = await onUpload(selectedFile, setProgress);

    if (success) {
      setSelectedFile(null);
      setProgress(0);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 mb-8">
      <h2 className="text-lg font-semibold mb-4">Upload File</h2>

      <input
        ref={fileInputRef}
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

      {/* Progress Bar */}
      {uploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-500 h-3 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {progress}% uploaded
          </p>
        </div>
      )}
    </div>
  );
}

export default UploadSection;

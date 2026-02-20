import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import {
  HiDocumentText,
  HiPhotograph,
  HiDocument,
  HiArchive,
} from "react-icons/hi";


function FileRow({ file, onDelete, onDownload }) {
  const [open, setOpen] = useState(false);
  const [versions, setVersions] = useState([]);
  const [loadingVersions, setLoadingVersions] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const fetchVersions = async () => {
    try {
      setLoadingVersions(true);
      const res = await api.get(`/files/versions/${file._id}`);

      // Sort latest first (just in case)
      const sorted = res.data.data.sort(
        (a, b) => new Date(b.LastModified) - new Date(a.LastModified),
      );

      setVersions(sorted);
      setOpen(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch versions");
    } finally {
      setLoadingVersions(false);
    }
  };

  const handleToggle = () => {
    if (!open) {
      fetchVersions();
    } else {
      setOpen(false);
    }
  };

  const getFileIcon = (filename) => {
    const parts = filename.split(".");
    const ext = parts.length > 1 ? parts.pop().toLowerCase() : "";

    if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext))
      return <HiPhotograph className="text-blue-400" size={22} />;

    if (["pdf"].includes(ext))
      return <HiDocumentText className="text-red-400" size={22} />;

    if (["zip", "rar"].includes(ext))
      return <HiArchive className="text-yellow-400" size={22} />;

    return <HiDocument className="text-gray-400" size={22} />;
  };

  return (
    <>
      {/* Main Row */}
      <tr className="border-b border-gray-800 hover:bg-[#111827] transition">
        <td className="py-3">
          <div className="flex items-center gap-3">
            {getFileIcon(file.filename)}
            <span className="font-medium">{file.filename}</span>
          </div>
        </td>

        <td className="py-3 text-gray-400">
          {new Date(file.createdAt).toLocaleString()}
        </td>

        <td className="py-3 flex gap-2">
          <button
            onClick={() => onDownload(file._id, file.filename)}
            className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Download
          </button>

          <button
            onClick={handleToggle}
            className="bg-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-700"
          >
            {open ? "Hide" : "Versions"}
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Delete
          </button>
        </td>
      </tr>

      {/* Dropdown Row */}
      {open && (
        <tr className="bg-[#0f172a]">
          <td colSpan="3" className="p-4">
            {loadingVersions ? (
              <p className="text-gray-400">Loading versions...</p>
            ) : versions.length === 0 ? (
              <p className="text-gray-400">No versions found.</p>
            ) : (
              <div className="space-y-2">
                {versions.map((version, index) => {
                  const versionNumber = versions.length - index;
                  const isLatest = index === 0;

                  return (
                    <div
                      key={version.VersionId}
                      className="flex justify-between items-center bg-[#1e293b] p-3 rounded-lg border border-gray-700"
                    >
                      <div>
                        <span className="font-medium">v{versionNumber}</span>

                        {isLatest && (
                          <span className="ml-2 text-xs bg-green-600 px-2 py-0.5 rounded-full">
                            Latest
                          </span>
                        )}

                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(version.LastModified).toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          onDownload(file._id, file.filename, version.VersionId)
                        }
                        className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Download
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </td>
        </tr>
      )}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#1e293b] p-6 rounded-xl w-96 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Delete File?</h3>

            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white">{file.filename}</span>?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onDelete(file._id);
                  setShowConfirm(false);
                }}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FileRow;

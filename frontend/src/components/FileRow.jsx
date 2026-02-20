import { useState } from "react";
import api from "../services/api";

function FileRow({ file, onDelete, onDownload }) {
  const [open, setOpen] = useState(false);
  const [versions, setVersions] = useState([]);
  const [loadingVersions, setLoadingVersions] = useState(false);

  const fetchVersions = async () => {
    try {
      setLoadingVersions(true);
      const res = await api.get(`/files/versions/${file._id}`);

      // Sort latest first (just in case)
      const sorted = res.data.data.sort(
        (a, b) =>
          new Date(b.LastModified) - new Date(a.LastModified)
      );

      setVersions(sorted);
      setOpen(true);
    } catch (error) {
      alert("Failed to fetch versions");
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

  return (
    <>
      {/* Main Row */}
      <tr className="border-b border-gray-800">
        <td className="py-3 font-medium">{file.filename}</td>

        <td className="py-3 text-gray-400">
          {new Date(file.createdAt).toLocaleString()}
        </td>

        <td className="py-3 flex gap-2">
          <button
            onClick={() =>
              onDownload(file._id, file.filename)
            }
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
            onClick={() => onDelete(file._id)}
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
              <p className="text-gray-400">
                Loading versions...
              </p>
            ) : versions.length === 0 ? (
              <p className="text-gray-400">
                No versions found.
              </p>
            ) : (
              <div className="space-y-2">
                {versions.map((version, index) => {
                  const versionNumber =
                    versions.length - index;
                  const isLatest = index === 0;

                  return (
                    <div
                      key={version.VersionId}
                      className="flex justify-between items-center bg-[#1e293b] p-3 rounded-lg border border-gray-700"
                    >
                      <div>
                        <span className="font-medium">
                          v{versionNumber}
                        </span>

                        {isLatest && (
                          <span className="ml-2 text-xs bg-green-600 px-2 py-0.5 rounded-full">
                            Latest
                          </span>
                        )}

                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(
                            version.LastModified
                          ).toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          onDownload(
                            file._id,
                            file.filename,
                            version.VersionId
                          )
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
    </>
  );
}

export default FileRow;

import FileRow from "./FileRow";

function FileTable({ files, loading, onDelete, onDownload }) {
  return (
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
                <th className="py-3">Uploaded At</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <FileRow
                  key={file._id}
                  file={file}
                  onDelete={onDelete}
                  onDownload={onDownload}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FileTable;

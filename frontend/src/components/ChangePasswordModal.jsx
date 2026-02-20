import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function ChangePasswordModal({ onClose }) {
  const [form, setForm] = useState({
    oldpass: "",
    newpass: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api.post("/auth/change-password", form);

      toast.success("Password updated successfully");
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Password update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-[#1e293b] p-6 rounded-xl w-96 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">
          Change Password
        </h3>

        <input
          type="password"
          placeholder="Current Password"
          className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
          onChange={(e) =>
            setForm({ ...form, oldpass: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
          onChange={(e) =>
            setForm({ ...form, newpass: e.target.value })
          }
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;

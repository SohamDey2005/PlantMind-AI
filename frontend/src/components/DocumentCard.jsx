import {
  FileText,
  Trash2,
  Eye,
  Calendar,
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import api from "../services/api";

export default function DocumentCard({
  document,
  onDelete,
}) {
  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Delete ${document.filename}?`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/documents/${document.id}`);
      onDelete();
    } catch (err) {
      console.error(err);
      alert("Unable to delete document.");
    }
  }

  function handleView() {
    window.open(
      `http://127.0.0.1:8000/${document.filepath}`,
      "_blank"
    );
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-lg transition">

      <div className="flex justify-between items-start">

        <div className="flex gap-3">

          <FileText
            className="text-blue-600"
            size={32}
          />

          <div>

            <h2 className="font-semibold text-lg">
              {document.filename}
            </h2>

            <div className="mt-2">
              <StatusBadge
                status={document.status || "Ready"}
              />
            </div>

          </div>

        </div>

      </div>

      <div className="mt-5">

        <h3 className="font-semibold">
          AI Summary
        </h3>

        <p className="text-gray-600 mt-2">
          {document.summary ||
            "Summary will appear after AI processing."}
        </p>

      </div>

      <div className="flex items-center gap-2 mt-5 text-gray-500">

        <Calendar size={16} />

        <small>
          {document.upload_time
            ? new Date(document.upload_time).toLocaleString()
            : "Today"}
        </small>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={handleView}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Eye size={18} />
          View
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <Trash2 size={18} />
          Delete
        </button>

      </div>

    </div>
  );
}
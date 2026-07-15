import { useEffect, useState } from "react";
import api from "../services/api";

import DocumentUpload from "../components/DocumentUpload";
import DocumentCard from "../components/DocumentCard";

export default function Documents() {
  const [documents, setDocuments] = useState([]);

  async function fetchDocuments() {
    try {
      const response = await api.get("/documents");
      setDocuments(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Documents
      </h1>

      <DocumentUpload
        onUploadSuccess={fetchDocuments}
      />

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Uploaded Documents
        </h2>

        {documents.length === 0 ? (
          <p className="text-gray-500">
            No documents uploaded yet.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {(Array.isArray(documents) ? documents : []).map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onDelete={fetchDocuments}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
import Card from "./Card";
import { FileText } from "lucide-react";

export default function RecentDocuments({ documents }) {

  const documentList = Array.isArray(documents)
    ? documents
    : [];

  return (
    <Card>

      <h2 className="text-lg font-bold mb-5">
        Recent Documents
      </h2>

      {documentList.length === 0 ? (

        <div className="text-center py-8 text-gray-500">
          No documents uploaded yet.
        </div>

      ) : (

        <div className="space-y-4">

          {documentList.map((doc, index) => (

            <div
              key={doc.id ?? index}
              className="flex justify-between items-center border-b pb-3"
            >

              <div className="flex gap-3 items-center">

                <FileText className="text-blue-600" />

                <div>

                  <p className="font-medium">
                    {doc.filename || "Unknown File"}
                  </p>

                  <small className="text-gray-500">
                    {doc.status || "Unknown"}
                  </small>

                </div>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  doc.status === "Ready"
                    ? "bg-green-100 text-green-700"
                    : doc.status === "Processing"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {doc.status || "Unknown"}
              </span>

            </div>

          ))}

        </div>

      )}

    </Card>
  );
}
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import api from "../services/api";

export default function DocumentUpload({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setProgress(0);

    try {
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append("file", file);

        await api.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (event) => {
            const percent = Math.round(
              (event.loaded * 100) / event.total
            );
            setProgress(percent);
          },
        });
      }

      setProgress(100);

      if (onUploadSuccess) {
        onUploadSuccess();
      }

      alert("Upload Successful!");
    } catch (error) {
      console.error(error);
      alert("Upload Failed!");
    } finally {
      setUploading(false);

      setTimeout(() => {
        setProgress(0);
      }, 800);
    }
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      multiple: true,
      accept: {
        "application/pdf": [".pdf"],
      },
    });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2
        border-dashed
        rounded-xl
        p-10
        text-center
        cursor-pointer
        transition

        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300"
        }
      `}
    >
      <input {...getInputProps()} />

      <UploadCloud
        size={50}
        className="mx-auto text-blue-600"
      />

      <h2 className="mt-4 text-xl font-semibold">
        Drag & Drop PDF Files
      </h2>

      <p className="text-gray-500 mt-2">
        or click to browse
      </p>

      {uploading && (
        <div className="mt-6">

          <div className="w-full bg-gray-200 rounded-full h-3">

            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="mt-2 text-sm">
            Uploading... {progress}%
          </p>

        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import API from "../api";

export default function FileUpload({ onUploadSuccess , darkMode  }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const uploadFile = async () => {
    if (!file) {
      setStatus("⚠️ Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("✅ Uploaded Successfully!");
      onUploadSuccess(); // Notify parent that upload succeeded
    } catch (err) {
      console.error(err);
      setStatus("❌ Error uploading file. Please try again.");
    }
  };

  return (
    <div
      style={{
        border: darkMode ? "1px solid #333" : "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        background: darkMode ? "#2a2a2a" : "#fafafa",
        marginBottom: "20px",
      }}
    >
      <h3>📂 Upload Knowledge File</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: "10px", color: darkMode ? "#fff" : "#000", }}
      />
      <button
        onClick={uploadFile}
        style={{
          background: darkMode ? "#007bff" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "10px 16px",
          cursor: "pointer",
        }}
      >
        Upload
      </button>
      {status && (
        <p
          style={{
            marginTop: "10px",
            color: status.includes("✅")
            ? "limegreen"
            : darkMode
            ? "#ff6666"
            : "red",
            fontWeight: "bold",
          }}
        >
          {status}
        </p>
      )}
    </div>
  );
}

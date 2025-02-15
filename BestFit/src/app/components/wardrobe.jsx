"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import "./upload.css";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file to upload.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
  };

  return (
    <div className="upload-container">
      <input type="file" accept=".png, .jpeg, .jpg" onChange={handleFileChange} id="file-upload" />
      <label htmlFor="file-upload" className="upload-box">
        <PlusCircle size={80} color="#0070f3" />
        <p>{uploading ? "Uploading..." : "Add Clothing Item"}</p>
      </label>
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
}

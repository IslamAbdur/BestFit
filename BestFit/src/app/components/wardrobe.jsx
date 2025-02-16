"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { uploadFiles } from "@/app/api/auth.js";
import "./upload.css";

export default function UploadPage() {
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [previews, setPreviews] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [message, setMessage] = useState("");

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);
		console.log(files)
		if (files.length) {
			setSelectedFiles(files);
			setPreviews(files.map((file) => URL.createObjectURL(file)));
		}
	};

	const handleUploadAll = async () => {
		
		if (!selectedFiles.length) {
			setMessage("Please select files to upload.");
			return;
		}
		setUploading(true);
		setMessage("");
		try {
			const { data, error } = await uploadFiles(selectedFiles);
			if (error) {
				throw new Error(error.message || "Upload failed for one or more files.");
			}
			setMessage("All files uploaded successfully!");
		} catch (err) {
			console.error("Error", err);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="upload-container">
			<div className="add-clothing-btn">
				<input
					type="file"
					multiple
					accept=".png, .jpeg, .jpg"
					onChange={handleFileChange}
					id="file-upload"
				/>
				<label htmlFor="file-upload" className="upload-box">
					<PlusCircle size={80} color="#0070f3" />
					<p>{uploading ? "Uploading..." : "Add Clothing Items"}</p>
				</label>
			</div>
			{previews.length > 0 && (
				<div className="preview-container">
					{previews.map((src, index) => (
						<div key={index} className="preview-item">
							<img src={src} alt={`Preview ${index}`} className="preview-image" />
						</div>
					))}

				</div>
			)}

			<div>
				<button
					onClick={handleUploadAll}
					disabled={uploading}
					className="upload-all-button"
				>
					{uploading ? "Uploading..." : "Upload All Files"}
				</button>
			</div>
		</div>
	);
}
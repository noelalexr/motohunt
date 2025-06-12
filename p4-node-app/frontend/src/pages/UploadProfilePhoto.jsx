import React, { useState } from "react";
import { useNavigate } from "react-router";

function UploadProfilePhoto() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("photo", file);

    const res = await fetch("http://localhost:3000/api/profile/photo", {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      alert("Profile photo updated!");
      navigate("/profile");
    } else {
      alert(data.error || "Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload New Profile Photo</h2>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        <br /><br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadProfilePhoto;
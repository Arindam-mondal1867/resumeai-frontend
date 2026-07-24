import React, { useState } from "react";

function ResumeUploader({ onUpload }) {
  const [file, setFile] = useState(null);

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={() => onUpload(file)}>
        Upload & Analyze
      </button>
    </div>
  );
}

export default ResumeUploader;
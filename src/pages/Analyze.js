import React, { useState } from "react";
import axios from "axios";
import ResumeUploader from "../components/ResumeUploader";
import AnalysisResultCard from "../components/AnalysisResultCard";
import DownloadButton from "../components/DownloadButton";

function Analyze() {
  const [result, setResult] = useState(null);

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const token = localStorage.getItem("ra_token");

      const res = await axios.post(
        "https://resumeai-backend-38iy.onrender.com/api/analyze",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🔥 FINAL ANALYSIS DATA
      const analysisData = {
        ...res.data.analysis,
        analyzedAt: new Date().toLocaleString(),
      };

      console.log("FINAL ANALYSIS:", analysisData);

      // 🔥 SAVE STATE
      setResult(analysisData);

      // 🔥 SAVE LOCAL STORAGE
      localStorage.setItem(
        "analysisData",
        JSON.stringify(analysisData)
      );

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
    }
  };

  return (
    <div>
      <h1>Analyze Resume</h1>

      <ResumeUploader onUpload={handleUpload} />

      <AnalysisResultCard result={result} />

      {result && (
        <DownloadButton result={result} />
      )}
    </div>
  );
}

export default Analyze;
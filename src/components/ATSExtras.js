import React from "react";
import jsPDF from "jspdf";
import {
  Brain,
  FolderGit2,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  FileText,
  RotateCcw
} from "lucide-react";

// 🎯 BADGE COLOR
const getBadge = (score) => {
  if (score >= 80)
    return {
      text: "Strong Fit",
      color: "#22c55e",
      glow: "rgba(34,197,94,0.4)"
    };

  if (score >= 60)
    return {
      text: "Moderate Fit",
      color: "#facc15",
      glow: "rgba(250,204,21,0.4)"
    };

  return {
    text: "Weak Fit",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.4)"
  };
};

// ================= PROGRESS =================
const ProgressBar = ({ icon, label, value }) => (
  <div
    style={{
      marginBottom: "22px",
    }}
  >

    {/* TOP */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
      }}
    >
      <span
        style={{
          color: "#f8fafc",
          fontSize: "15px",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {icon} {label}
      </span>

      <span
        style={{
          color: "#94a3b8",
          fontWeight: "600",
        }}
      >
        {value}%
      </span>
    </div>

    {/* BAR */}
    <div
      style={{
        width: "100%",
        height: "12px",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "999px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          borderRadius: "999px",
          background:
            "linear-gradient(90deg,#3b82f6,#06b6d4,#22c55e)",

          boxShadow:
            "0 0 18px rgba(34,197,94,0.35)",

          transition: "all 0.6s ease",
        }}
      />
    </div>
  </div>
);

const ATSExtras = ({ data }) => {

  const badge = getBadge(data.matchScore);


  // 📄 DOWNLOAD
  const handleDownload = () => {
  const pdf = new jsPDF();

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text("AI Resume Analysis Report", 20, 20);

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");

  let y = 35;

  pdf.text(`Job Role: ${data.jobTitle}`, 20, y);
  y += 10;

  pdf.text(`Match Score: ${data.matchScore}%`, 20, y);
  y += 10;

  pdf.text(`Resume Quality: ${data.resumeQuality}%`, 20, y);
  y += 10;

  pdf.text(`ATS Score: ${data.atsLabel}`, 20, y);
  y += 15;

  pdf.setFont("helvetica", "bold");
  pdf.text("Matched Skills", 20, y);
  y += 8;

  pdf.setFont("helvetica", "normal");
  data.keySkills.forEach(skill => {
    pdf.text(`• ${skill}`, 25, y);
    y += 7;
  });

  y += 5;

  pdf.setFont("helvetica", "bold");
  pdf.text("Missing Skills", 20, y);
  y += 8;

  pdf.setFont("helvetica", "normal");
  data.missingSkills.forEach(skill => {
    pdf.text(`• ${skill}`, 25, y);
    y += 7;
  });

  y += 5;

  pdf.setFont("helvetica", "bold");
  pdf.text("Improvement Plan", 20, y);
  y += 8;

  pdf.setFont("helvetica", "normal");
  data.improvements.forEach(item => {
    const lines = pdf.splitTextToSize(`• ${item}`, 165);
    pdf.text(lines, 25, y);
    y += lines.length * 7;
  });

  pdf.save("Resume_Analysis_Report.pdf");
};

const handleRefresh = () => {

  localStorage.removeItem("analysisData");
  localStorage.removeItem("analysisResult");
  localStorage.removeItem("roadmapData");

  window.location.reload();

};

  return (
    <div
      style={{
        marginTop: "30px",

        background:
          "linear-gradient(145deg,#020617,#0f172a)",

        padding: "32px",

        borderRadius: "24px",

        border:
          "1px solid rgba(255,255,255,0.06)",

        boxShadow:
          "0 20px 60px rgba(0,0,0,0.45)",

        backdropFilter: "blur(16px)",
      }}
    >

      {/* TOP HEADER */}
      <div
        style={{
          marginBottom: "28px",
        }}
      >

        {/* BADGE */}
       <div
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",

    padding: "14px 26px",

    borderRadius: "999px",

    background:
      "rgba(255,255,255,0.04)",

    border:
      `1px solid ${badge.glow}`,

    boxShadow:
      `0 0 25px ${badge.glow}`,

    transition: "all 0.35s ease",

    cursor: "pointer",
  }}

  onMouseEnter={(e) => {

    e.currentTarget.style.transform =
      "translateY(-4px) scale(1.04)";

    e.currentTarget.style.boxShadow =
      `0 0 45px ${badge.glow}`;

  }}

  onMouseLeave={(e) => {

    e.currentTarget.style.transform =
      "translateY(0px) scale(1)";

    e.currentTarget.style.boxShadow =
      `0 0 25px ${badge.glow}`;

  }}
>

          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: badge.color,
            }}
          />

          <span
            style={{
              color: badge.color,
              fontWeight: "700",
              fontSize: "24px",
            }}
          >
            {badge.text}
          </span>
        </div>

        {/* CONFIDENCE */}
        <p
          style={{
            marginTop: "18px",
            color: "#94a3b8",
            fontSize: "18px",
          }}
        >
         Resume Quality:
          <span
            style={{
              color: "white",
              fontWeight: "700",
              marginLeft: "8px",
            }}
          >
            {data.resumeQuality}%
          </span>
        </p>

      </div>

      {/* PROGRESS */}
      <ProgressBar
  icon={<Brain size={18} color="#60a5fa" />}
  label="Skills"
  value={data.scoreBreakdown.skills}
/>

      <ProgressBar
  icon={<FolderGit2 size={18} color="#22c55e" />}
  label="Projects"
  value={data.scoreBreakdown.projects}
/>

      <ProgressBar
        icon={<BriefcaseBusiness size={18} color="#f59e0b" />}
        label="Experience"
        value={data.scoreBreakdown.experience}
      />

      <ProgressBar
        icon={<GraduationCap size={18} color="#8b5cf6" />}
        label="Education"
        value={data.scoreBreakdown.education}
      />

      <ProgressBar
        icon={<Award size={18} color="#facc15" />}
        label="Certifications"
        value={data.scoreBreakdown.certifications}
      />

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={handleDownload}
        style={{
          marginTop: "18px",

          padding: "14px 24px",

          background:
            "linear-gradient(135deg,#2563eb,#7c3aed)",

          border: "none",

          borderRadius: "14px",

          color: "white",

          fontSize: "15px",

          fontWeight: "700",

          cursor: "pointer",

          transition: "all 0.3s ease",

          boxShadow:
            "0 10px 30px rgba(37,99,235,0.35)",
        }}

        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-4px) scale(1.03)";

          e.currentTarget.style.boxShadow =
            "0 18px 40px rgba(124,58,237,0.5)";
        }}

        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0px) scale(1)";

          e.currentTarget.style.boxShadow =
            "0 10px 30px rgba(37,99,235,0.35)";
        }}
      >
        <>
  <FileText
    size={18}
    style={{ marginRight: "8px" }}
  />
  Download Report
</>
      </button>

      <button
  onClick={handleRefresh}
  style={{
    marginTop: "18px",
  
marginLeft: "auto",
marginRight: "auto",

    display: "flex",
    alignItems: "center",
    gap: "10px",

    padding: "14px 22px",

    background: "#111827",

    border: "1px solid rgba(255,255,255,.08)",

    borderRadius: "14px",

    color: "#fff",

    cursor: "pointer",

    fontWeight: "700",

    transition: ".3s",

    boxShadow:
      "0 10px 25px rgba(0,0,0,.25)"
  }}

  onMouseEnter={(e)=>{

    e.currentTarget.style.transform="translateY(-4px)";
    e.currentTarget.style.borderColor="#3b82f6";
    e.currentTarget.style.boxShadow="0 15px 35px rgba(59,130,246,.25)";

  }}

  onMouseLeave={(e)=>{

    e.currentTarget.style.transform="translateY(0px)";
    e.currentTarget.style.borderColor="rgba(255,255,255,.08)";
    e.currentTarget.style.boxShadow="0 10px 25px rgba(0,0,0,.25)";

  }}
>

<RotateCcw size={18}/>

Refresh Analysis

</button>
    </div>
  );
};

export default ATSExtras;
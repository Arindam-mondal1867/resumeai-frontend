import React, { useEffect, useState } from "react";
import {
  BarChart3,
  Eye,
  FileText,
  User,
  Star,
  BadgeCheck,
  Laptop,
  CircleX,
} from "lucide-react";
import axios from "axios";
//import Sidebar from "../components/Sidebar";

const getBadge = (score) => {
  if (score >= 80) return { text: "Strong", color: "#22c55e" };
  if (score >= 60) return { text: "Medium", color: "#facc15" };
  return { text: "Weak", color: "#ef4444" };
};

const RecruiterDashboard = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("ra_token");

      const res = await axios.get(
        "http://localhost:5000/api/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API RESPONSE:", res.data);

      setData(res.data.history || []);
      console.log("STATE DATA:", res.data.history);
    } catch (err) {
      console.error(err);
    }
  };

   // 🔥 ADD DELETE SINGLE
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("ra_token");

      await axios.delete(`http://localhost:5000/api/history/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 ADD CLEAR ALL
  const handleClearAll = async () => {
    if (!window.confirm("Delete all history?")) return;

    try {
      const token = localStorage.getItem("ra_token");

      await axios.delete("http://localhost:5000/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const sortedData = [...data].sort(
    (a, b) => b.matchScore - a.matchScore
  );

  const filteredData = sortedData.filter((item) => {
  const matchFilter =
    filter === "All" ||
    (filter === "Strong" && item.matchScore >= 80) ||
    (filter === "Medium" &&
      item.matchScore >= 60 &&
      item.matchScore < 80) ||
    (filter === "Weak" && item.matchScore < 60);

  const matchSearch = item.jobTitle
    ?.toLowerCase()
    .includes(search.toLowerCase());

  return matchFilter && matchSearch;
});

  const strongCount = data.filter((d) => d.matchScore >= 80).length;
  const mediumCount = data.filter(
    (d) => d.matchScore >= 60 && d.matchScore < 80
  ).length;
  const weakCount = data.filter((d) => d.matchScore < 60).length;

  const avgScore =
    data.length > 0
      ? Math.round(
          data.reduce((acc, item) => acc + item.matchScore, 0) /
            data.length
        )
      : 0;

 return (
  <div
   style={{
  minHeight: "100vh",
  padding: "clamp(16px,3vw,40px)",
  overflowX: "hidden",
}}
  >
       <h2
  style={{
    fontSize: "26px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: "700",
  }}
>
  <BarChart3
    size={34}
    color="#60a5fa"
    strokeWidth={2.2}
  />

  Recruiter Dashboard
</h2>

        {/* 🔥 STATS */}
        <div className="stats">
          <div className="card glow">Total: {data.length}</div>
          <div className="card glow">Avg: {avgScore}%</div>
          <div className="card green glow">🟢 {strongCount}</div>
          <div className="card yellow glow">🟡 {mediumCount}</div>
          <div className="card red glow">🔴 {weakCount}</div>
        </div>

        {/* 🔥 CLEAR ALL BUTTON */}
        <div style={{ marginTop: "15px" }}>
          <button className="clearBtn" onClick={handleClearAll}>
            🗑 Clear All
          </button>
        </div>

        {/* 🔍 SEARCH */}
<div style={{ marginTop: "20px" }}>
  <input
  type="text"
  placeholder="🔍 Search by role..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="searchInput"
/>
</div>

        {/* 🔥 FILTER */}
        <div style={{ marginTop: "25px" }}>
          {["All", "Strong", "Medium", "Weak"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filterBtn ${filter === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* 🔥 TABLE */}
        <div className="tableBox">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Role</th>
                <th>Score</th>
                <th>Status</th>
                <th>Resume</th>
                 <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item, i) => {
                 console.log("ITEM:", item);
                const badge = getBadge(item.matchScore);

                return (
                  <tr key={i} className={i === 0 ? "topRow" : ""}>
                    <td>#{i + 1}</td>
                    <td>{item.jobTitle}</td>
                    <td>{item.matchScore}%</td>
                    <td>
                      <span
                        className="badge"
                        style={{ background: badge.color }}
                      >
                        {badge.text}
                      </span>
                    </td>
                    <td>
                   <button
  onClick={() => {
    if (!item) {
  return;
}

setSelectedResume(item);
console.log(item);
    setSelectedResume(item);
  }}
  style={{
    padding: "8px 14px",
    background: "#3b82f6",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",

    margin: "0 auto",
    fontWeight: "600",
  }}
>
  <Eye size={16} />
  Preview
</button>
                 </td>
                 {/* 🔥 DELETE BUTTON */}
                    <td>
                      <button
                        className="deleteBtn"
                        onClick={() => handleDelete(item._id)}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
         {/* 🔥 MODAL */}
 {/* 🔥 MODAL */}
{selectedResume && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(8px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "linear-gradient(145deg,#020617,#0f172a)",
       padding:"clamp(18px,3vw,30px)",
        borderRadius: "16px",
        width:"min(900px,95%)",
        maxHeight: "85vh",
        overflowY: "auto",
        color: "white",
        position: "relative",
        boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
      }}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={() => setSelectedResume(null)}
        style={{
          position: "absolute",
          top: "15px",
          right: "20px",
          background: "#ef4444",
          border: "none",
          padding: "6px 14px",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        ✕ Close
      </button>

      {/* HEADER */}
     <div
style={{
marginBottom:"20px"
}}
>

<h2
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <FileText size={28} color="#60a5fa" />
  Resume Preview
</h2>

<p
style={{
marginTop:"8px",

color:"#94a3b8",

fontSize:"15px",
}}
>

AI Formatted Resume View

</p>

</div>

      {/* RESUME CONTENT */}
      <div
        style={{
        background:
"linear-gradient(145deg,#020617,#0f172a)",
          padding: "25px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div>

<h2
  style={{
    color: "#60a5fa",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <User size={28} />
  Personal Information
</h2>
<p>
<b>Role :</b> {selectedResume.jobTitle}
</p>

<br/>

<h2
  style={{
    color: "#60a5fa",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <Star size={28} color="#facc15" />
  Match Score
</h2>

<p>{selectedResume.matchScore}%</p>

<br/>

<h2
  style={{
    color: "#60a5fa",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <BadgeCheck size={28} color="#22c55e" />
  ATS Rating
</h2>

<p>{selectedResume.atsProbability}</p>

<br/>

<h2
  style={{
    color: "#60a5fa",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <Laptop size={28} />
  Skills
</h2>

<div
style={{
display:"flex",
flexWrap:"wrap",
gap:"10px"
}}
>

{selectedResume.keySkills?.map((skill,index)=>(

<span
key={index}
style={{
background:"#22c55e",
padding:"7px 14px",
borderRadius:"20px"
}}
>
{skill}
</span>

))}

</div>

<br/>

<h2
  style={{
    color: "#ef4444",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <CircleX size={28} />
  Missing Skills
</h2>

<div
style={{
display:"flex",
flexWrap:"wrap",
gap:"10px"
}}
>

{selectedResume.missingSkills?.map((skill,index)=>(

<span
key={index}
style={{
background:"#ef4444",
padding:"7px 14px",
borderRadius:"20px"
}}
>
{skill}
</span>

))}

</div>

<br/>

<h2 style={{color:"#facc15"}}>
📄 Resume Preview
</h2>

{/* Resume Summary */}
<div style={{ marginTop: "30px" }}>
  <h2
    style={{
      color: "#facc15",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <FileText size={28} />
    Resume Summary
  </h2>

  <div
    style={{
      marginTop: "15px",
      background: "#0f172a",
      borderRadius: "12px",
      padding: "20px",
      lineHeight: "1.8",
      color: "#cbd5e1",
    }}
  >
    <p>
      <strong>Name:</strong>{" "}
      {selectedResume.formattedResume?.name || "Not Available"}
    </p>

    <p>
      <strong>Email:</strong>{" "}
      {selectedResume.formattedResume?.email || "Not Available"}
    </p>

    <p>
      <strong>Phone:</strong>{" "}
      {selectedResume.formattedResume?.phone || "Not Available"}
    </p>

    <p>
      <strong>Summary:</strong>{" "}
      {selectedResume.formattedResume?.summary || "Not Available"}
    </p>

   <div style={{ marginTop: "20px" }}>
  <h3 style={{ color: "#60a5fa" }}>🎓 Education</h3>

  {Array.isArray(selectedResume.formattedResume?.education) ? (
    selectedResume.formattedResume.education.map((edu, index) => (
      <div
        key={index}
        style={{
          background: "#1e293b",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>{edu.degree}</strong>
        <br />
        {edu.college}
        <br />
        {edu.year}
      </div>
    ))
  ) : (
    <p>No Education Found</p>
  )}
</div>

    <div style={{ marginTop: "20px" }}>
  <h3 style={{ color: "#60a5fa" }}>💼 Experience</h3>

  {Array.isArray(selectedResume.formattedResume?.experience) ? (
    selectedResume.formattedResume.experience.map((exp, index) => (
      <div
        key={index}
        style={{
          background: "#1e293b",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>{exp.company}</strong>
        <br />
        {exp.role}
        <br />
        {exp.duration}
      </div>
    ))
  ) : (
    <p>Fresher</p>
  )}
</div>

    <div style={{ marginTop: "20px" }}>
  <h3 style={{ color: "#60a5fa" }}>🚀 Projects</h3>

  {Array.isArray(selectedResume.formattedResume?.projects) ? (
    selectedResume.formattedResume.projects.map((project, index) => (
      <div
        key={index}
        style={{
          background: "#1e293b",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>{project.name}</strong>

        <br />

        {project.description}
      </div>
    ))
  ) : (
    <p>No Projects</p>
  )}
</div>
  </div>
</div>
</div>
      </div>
    </div>
  </div>
)}
        {/* STYLE */}
        <style>{`
.stats {
  display:flex;
  gap:20px;
  margin-top:20px;
}

/* CARD */
.card {
  padding:18px;
  border-radius:12px;
  background:#1e293b;
  transition:0.3s;
  cursor:pointer;
  flex:1;
  text-align:center;
  font-weight:600;
}

.glow:hover {
  transform:translateY(-6px);
  box-shadow:0 0 20px #3b82f6;
}

.green { background:#022c22; }
.yellow { background:#3f2d00; }
.red { background:#3f0000; }

/* FILTER */
.filterBtn {
  margin-right:10px;
  padding:8px 16px;
  border:none;
  border-radius:20px;
  background:#1e293b;
  color:white;
  cursor:pointer;
  transition:0.3s;
}

.filterBtn:hover {
  transform:scale(1.1);
  box-shadow:0 0 10px #3b82f6;
}

.active {
  background:#3b82f6;
}

/* TABLE BOX */
.tableBox{
margin-top:30px;
border-radius:15px;
overflow-x:auto;
overflow-y:hidden;
width:100%;
box-shadow:0 10px 30px rgba(0,0,0,.5);
}

/* TABLE FIX */
table{
width:100%;
min-width:850px;
border-collapse:collapse;
table-layout:fixed;
}

/* HEADER */
th{

background:linear-gradient(
90deg,
#1e293b,
#334155
);

padding:16px;

font-size:17px;

font-weight:700;

letter-spacing:.5px;

}

/* DATA */
td {
  padding:14px;
  border-bottom:1px solid #334155;
  text-align:center; /* 🔥 FIX ALIGN */
  vertical-align:middle;
}

/* ROW */
tr {
  transition:0.3s;
}

tr:hover {
  background:#020617;
}

/* TOP ROW */
.topRow {
  background:linear-gradient(90deg,#022c22,#064e3b);
  font-weight:bold;
}

/* BADGE */
.badge {
  padding:6px 12px;
  border-radius:20px;
  color:black;
  font-weight:600;
  display:inline-block;
  min-width:70px;
}

/* BUTTON FIX */
td button {
  display:inline-block;
}
  /* 🔍 SEARCH INPUT */
.searchInput {
  padding: 12px 18px;
  width: 260px;
  border-radius: 25px;
  border: 1px solid #334155;
  background: #020617;
  color: white;
  outline: none;
  transition: all 0.3s ease;
  font-size: 14px;
}

/* 🔥 HOVER EFFECT */
.searchInput:hover {
  transform: scale(1.05);
  border: 1px solid #3b82f6;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}

/* 🔥 FOCUS EFFECT */
.searchInput:focus {
  transform: scale(1.07);
  border: 1px solid #6366f1;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.8);
}

/* PLACEHOLDER */
.searchInput::placeholder {
  color: #94a3b8;
}

/* 🔥 DELETE BUTTON */
.deleteBtn {
  padding:6px 10px;
  background:#ef4444;
  border:none;
  border-radius:6px;
  color:white;
  cursor:pointer;
  transition:0.3s;
}

.deleteBtn:hover {
  transform:scale(1.2);
  box-shadow:0 0 10px #ef4444;
}

/* 🔥 CLEAR BUTTON */
.clearBtn {
  padding:8px 18px;
  background:#ef4444;
  border:none;
  border-radius:8px;
  color:white;
  cursor:pointer;
  font-weight:600;
  transition:0.3s;
}

.clearBtn:hover {
  transform:scale(1.08);
  box-shadow:0 0 15px #ef4444;
}
  *{
box-sizing:border-box;
}
/* ==========================================
TABLET
========================================== */

@media (max-width:1024px){

.stats{

display:grid;

grid-template-columns:repeat(2,1fr);

gap:15px;

}

.searchInput{

width:100%;

max-width:350px;

}

}

/* ==========================================
MOBILE
========================================== */

@media (max-width:768px){

.stats{

grid-template-columns:1fr;

gap:15px;

}

.card{

padding:16px;

}

.searchInput{

width:100%;

}

.filterBtn{

margin-bottom:10px;

}

table{

min-width:760px;

}

.clearBtn{

width:100%;

margin-bottom:15px;

}

}
`}</style>
      </div>
    //</div>
  );
};

export default RecruiterDashboard;
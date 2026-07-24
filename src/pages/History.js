import React, { useEffect, useState } from "react";
import { FolderOpen } from "lucide-react";
import axios from "axios";
import ScoreRing from "../components/ScoreRing";

const History = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("ra_token");

      const res = await axios.get(
        "https://resumeai-backend-38iy.onrender.com/api/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data.history || []);

    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 FILTER + SEARCH
  const filteredData = data.filter((item) => {

    const matchSearch = item.jobTitle
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" ||
      item.atsProbability === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div>

      <div
  style={{
    minHeight: "100vh",
    padding: window.innerWidth < 768 ? "20px" : "40px",
    overflowX: "hidden",
  }}
>

       <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "25px",
  }}
>
  <FolderOpen
    size={38}
    color="#fbbf24"
    strokeWidth={2.2}
  />

  <div>
    <h1
style={{
margin:0,
fontSize:window.innerWidth < 768 ? "28px" : "42px",
fontWeight:800
}}
>
      Analysis History
    </h1>

    <p
      style={{
        color: "#94a3b8",
        marginTop: "6px",
      }}
    >
      View every AI resume analysis you've completed.
    </p>
  </div>
</div>

        {/* SEARCH + FILTER */}
        <div
         style={{
display:"flex",
flexDirection:window.innerWidth < 768 ? "column" : "row",
gap:"10px",
marginTop:"20px",
}}
        >

          <input
            placeholder="Search by role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              width:window.innerWidth < 768 ? "100%" : "200px",
            }}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

        </div>

        {/* CARDS */}
        <div
          style={{
            marginTop: "25px",
            display: "grid",
            gridTemplateColumns:

window.innerWidth < 768

? "1fr"

: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "20px",
          }}
        >

          {filteredData.map((item, i) => (

            <div
              key={i}
              onClick={() => setSelected(item)}
              style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform =
                  "scale(1)")
              }
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >

                <ScoreRing score={item.matchScore} />

                <div>
                  <h3 style={{ margin: 0 }}>
                    {item.jobTitle}
                  </h3>

                  <p
                    style={{
                      marginTop: "5px",
                      color: "#94a3b8",
                    }}
                  >
                    ATS: {item.atsProbability}
                  </p>
                </div>

              </div>

              {/* SKILLS PREVIEW */}
              <div style={{ marginTop: "10px" }}>

                <strong>Skills:</strong>

                <div>
                  {item.keySkills
                    ?.slice(0, 3)
                    .map((s, idx) => (

                      <span
                        key={idx}
                        style={{
                          background: "#22c55e",
                          padding: "4px 8px",
                          margin: "3px",
                          borderRadius: "6px",
                          display: "inline-block",
                          fontSize: "12px",
                        }}
                      >
                        {s}
                      </span>

                  ))}
                </div>

              </div>

            </div>

          ))}

        </div>

        {/* MODAL */}
        {selected && (

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",

              background:
                "rgba(0,0,0,0.7)",

              backdropFilter: "blur(6px)",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              zIndex: 999,
            }}
          >

            <div
              style={{
                background:
                  "linear-gradient(145deg,#020617,#0f172a)",

               padding:window.innerWidth < 768 ? "20px" : "30px",

                borderRadius: "16px",

                width:window.innerWidth < 768 ? "95%" : "600px",

                maxHeight: "80vh",

                overflowY: "auto",

                color: "white",

                position: "relative",
              }}
            >

              {/* CLOSE */}
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "20px",

                  background: "#ef4444",

                  border: "none",

                  color: "white",

                  padding: "6px 12px",

                  borderRadius: "8px",

                  cursor: "pointer",
                }}
              >
                Close
              </button>

              {/* HEADER */}
              <div
                style={{
                 display:"flex",
flexDirection:window.innerWidth < 768 ? "column" : "row",
alignItems:"center",
gap:"20px",
                }}
              >

                <ScoreRing
                  score={selected.matchScore}
                />

                <div>
                  <h2 style={{ margin: 0 }}>
                    {selected.jobTitle}
                  </h2>

                  <p style={{ color: "#94a3b8" }}>
                    ATS:
                    {" "}
                    {selected.atsProbability}
                  </p>
                </div>

              </div>

              {/* MATCHED */}
              <div style={{ marginTop: "25px" }}>

                <h3>Matched Skills</h3>

                {selected.keySkills?.length > 0 ? (

                  selected.keySkills.map((s, i) => (

                    <span
                      key={i}
                      style={{
                        background: "#22c55e",

                        padding: "6px 12px",

                        margin: "5px",

                        borderRadius: "20px",

                        display: "inline-block",
                      }}
                    >
                      {s}
                    </span>

                  ))

                ) : (

                  <p style={{ color: "#94a3b8" }}>
                    No matched skills
                  </p>

                )}

              </div>

              {/* MISSING */}
              <div style={{ marginTop: "25px" }}>

                <h3>Missing Skills</h3>

                {selected.missingSkills?.length > 0 ? (

                  selected.missingSkills.map((s, i) => (

                    <span
                      key={i}
                      style={{
                        background: "#ef4444",

                        padding: "6px 12px",

                        margin: "5px",

                        borderRadius: "20px",

                        display: "inline-block",
                      }}
                    >
                      {s}
                    </span>

                  ))

                ) : (

                  <p style={{ color: "#22c55e" }}>
                    No missing skills
                  </p>

                )}

              </div>

              {/* SUGGESTIONS */}
              <div style={{ marginTop: "25px" }}>

                <h3>Suggestions</h3>

                {selected.suggestions?.length > 0 ? (

                  <ul>
                    {selected.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>

                ) : (

                  <p style={{ color: "#94a3b8" }}>
                    No suggestions
                  </p>

                )}

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default History;
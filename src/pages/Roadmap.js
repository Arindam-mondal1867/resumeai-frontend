import React from "react";

const getDifficultyColor = (difficulty) => {
  if (!difficulty) return "#64748b";

  const level = difficulty.toLowerCase();

  if (level.includes("beginner")) return "#22c55e";
  if (level.includes("intermediate")) return "#facc15";

  return "#ef4444";
};

const getStatus = (index) => {
  if (index < 2) {
    return {
      text: "Completed",
      color: "#22c55e",
    };
  }

  if (index === 2) {
    return {
      text: "In Progress",
      color: "#3b82f6",
    };
  }

  return {
    text: "Upcoming",
    color: "#64748b",
  };
};

// ==============================
// SAFE FORMAT FUNCTION
// ==============================

const formatValue = (value) => {
  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (
    typeof value === "object" &&
    value !== null
  ) {
    return (
      value.title ||
      value.name ||
      value.week ||
      value.topic ||
      value.Content ||
      value.Summary ||
      value["Job Title"] ||
      Object.values(value)[0]
    );
  }

  return "N/A";
};

function Roadmap() {

  // ==============================
  // GET ROADMAP FROM LOCAL STORAGE
  // ==============================

  let roadmapData = [];

  try {

    const stored =
      localStorage.getItem("roadmapData");

    const parsed =
      JSON.parse(stored);

    roadmapData =
      Array.isArray(parsed)
        ? parsed
        : [];

  } catch (err) {

    roadmapData = [];

  }

  // ==============================
  // REMOVE DUPLICATES
  // ==============================

  const uniqueRoadmap =
    roadmapData.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            formatValue(t.title) ===
            formatValue(item.title)
        )
    );

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "clamp(16px,3vw,40px)",
        overflowX: "hidden",
        background: "#020617",
      }}
    >

      {/* HEADER */}

      <div className="roadmapHero">

        <h1 className="roadmapTitle">
          AI Career Roadmap
        </h1>

        <p className="roadmapSub">
          Personalized AI-generated roadmap
          based on your resume analysis.
        </p>

      </div>

      {/* EMPTY */}

      {uniqueRoadmap.length === 0 && (

        <div className="emptyBox">

          <h2>No Roadmap Found</h2>

          <p>
            Analyze your resume first
            to generate roadmap.
          </p>

        </div>

      )}

      {/* TIMELINE */}

      <div className="timeline">

        {uniqueRoadmap.map(
          (item, index) => {

            const status =
              getStatus(index);

            return (

              <div
                key={index}
                className="roadmapCard"
              >

                {/* LEFT TIMELINE */}

                <div className="timelineLeft">

                  <div className="timelineDot"></div>

                  {index !==
                    uniqueRoadmap.length - 1 && (
                    <div className="timelineLine"></div>
                  )}

                </div>

                {/* RIGHT */}

                <div className="timelineRight">

                  {/* TOP */}

                  <div className="weekRow">

                    <h3>
                      {formatValue(
                        item.week
                      )}
                    </h3>

                    <div className="badgeGroup">

                      {/* STATUS */}

                      <span
                        className="statusBadge"
                        style={{
                          background:
                            status.color,
                        }}
                      >
                        {status.text}
                      </span>

                      {/* DIFFICULTY */}

                      <span
                        className="difficultyBadge"
                        style={{
                          background:
                            getDifficultyColor(
                              formatValue(
                                item.difficulty
                              )
                            ),
                        }}
                      >
                        {formatValue(
                          item.difficulty
                        )}
                      </span>

                    </div>

                  </div>

                  {/* TITLE */}

                  <h2 className="topicTitle">
                    {formatValue(
                      item.title
                    )}
                  </h2>

                  {/* HOURS */}

                  <div className="metaInfo">

                    <span>
                      Estimated Time:
                      <strong>
                        {" "}
                        {formatValue(
                          item.hours
                        )}
                      </strong>
                    </span>

                  </div>

                  {/* SKILLS */}

                  {Array.isArray(
                    item.skills
                  ) &&
                    item.skills.length > 0 && (

                      <div className="topicsWrapper">

                        {item.skills.map(
                          (
                            skill,
                            idx
                          ) => (

                            <span
                              key={idx}
                              className="topicTag"
                            >

                              {formatValue(
                                skill
                              )}

                            </span>

                          )
                        )}

                      </div>

                    )}

                  {/* MINI PROJECT */}

                  {item.miniProject && (

                    <div className="projectBox">

                      <p className="projectLabel">
                        Mini Project
                      </p>

                      <h4>
                        {formatValue(
                          item.miniProject
                        )}
                      </h4>

                    </div>

                  )}

                  {/* PROGRESS */}

                  <div className="progressWrapper">

                    <div
                      className="progressFill"
                      style={{
                        width: `${Math.min(
                          (index + 1) * 12,
                          100
                        )}%`,
                      }}
                    ></div>

                  </div>

                  {/* CHECKBOX */}

                  <div className="checkboxRow">

                    <input
                      type="checkbox"
                      className="weekCheckbox"
                    />

                    <span>
                      Mark as Completed
                    </span>

                  </div>

                </div>

              </div>

            );

          }
        )}

      </div>

      {/* CSS */}

      <style>{`

body{
  background:#020617;
}

.roadmapHero{
  margin-bottom:40px;
}

.roadmapTitle{
  font-size:58px;
  font-weight:800;
  letter-spacing:-2px;

  background:
    linear-gradient(
      90deg,
      #3b82f6,
      #8b5cf6
    );

  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;

  font-family:'Sora',sans-serif;
}

.roadmapSub{
  color:#94a3b8;
  font-size:18px;
  margin-top:12px;
}

/* EMPTY */

.emptyBox{

  padding:50px;

  text-align:center;

  border-radius:24px;

  background:
    rgba(15,23,42,0.8);

  border:
    1px solid rgba(255,255,255,0.06);

  color:white;
}

/* TIMELINE */

.timeline{
  position:relative;
}

.roadmapCard{
  display:flex;
  gap:20px;
  margin-bottom:35px;
}

.timelineLeft{
  display:flex;
  flex-direction:column;
  align-items:center;
}

.timelineDot{
  width:18px;
  height:18px;

  border-radius:50%;

  background:
    linear-gradient(
      135deg,
      #3b82f6,
      #8b5cf6
    );

  box-shadow:
    0 0 18px rgba(59,130,246,0.6);
}

.timelineLine{
  width:3px;
  flex:1;

  background:
    rgba(255,255,255,0.08);

  margin-top:5px;
}

.timelineRight{
  flex:1;

  background:
    linear-gradient(
      145deg,
      rgba(15,23,42,0.95),
      rgba(30,41,59,0.88)
    );

  border:
    1px solid rgba(255,255,255,0.06);

  border-radius:24px;

  padding:28px;

  transition:0.35s ease;

  backdrop-filter:blur(14px);
}

.timelineRight:hover{

  transform:
    translateY(-6px);

  box-shadow:
    0 18px 40px rgba(59,130,246,0.2);

  border:
    1px solid rgba(59,130,246,0.25);
}

.weekRow{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;
}

.weekRow h3{
  color:#94a3b8;
  font-size:28px;
}

.badgeGroup{
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

.statusBadge{
  padding:8px 18px;

  border-radius:999px;

  font-size:13px;
  font-weight:700;
  color:white;

  box-shadow:
    0 0 18px rgba(255,255,255,0.12);
}

.difficultyBadge{
  padding:8px 18px;

  border-radius:999px;

  font-size:13px;
  font-weight:700;

  color:white;
}

.topicTitle{
  margin-top:18px;

  font-size:42px;

  color:white;

  font-weight:800;

  line-height:1.2;
}

.metaInfo{
  margin-top:16px;

  color:#94a3b8;

  font-size:18px;
}

/* TOPICS */

.topicsWrapper{

  display:flex;
  flex-wrap:wrap;
  gap:12px;

  margin-top:24px;
}

.topicTag{

  padding:10px 18px;

  border-radius:999px;

  background:
    rgba(59,130,246,0.12);

  border:
    1px solid rgba(59,130,246,0.2);

  color:#bfdbfe;

  font-size:14px;
  font-weight:700;

  transition:0.3s;
}

.topicTag:hover{

  transform:
    translateY(-3px);

  box-shadow:
    0 0 18px rgba(59,130,246,0.3);
}

/* PROJECT */

.projectBox{

  margin-top:24px;

  padding:20px;

  border-radius:18px;

  background:
    rgba(255,255,255,0.03);

  border:
    1px solid rgba(255,255,255,0.06);
}

.projectLabel{

  color:#94a3b8;

  font-size:14px;

  margin-bottom:10px;
}

.projectBox h4{

  color:white;

  font-size:20px;
}

/* PROGRESS */

.progressWrapper{

  width:100%;
  height:10px;

  margin-top:26px;

  border-radius:999px;

  overflow:hidden;

  background:
    rgba(255,255,255,0.06);
}

.progressFill{

  height:100%;

  border-radius:999px;

  background:
    linear-gradient(
      90deg,
      #3b82f6,
      #8b5cf6
    );
}

/* CHECKBOX */

.checkboxRow{

  display:flex;
  align-items:center;
  gap:12px;

  margin-top:22px;

  color:#cbd5e1;

  font-size:15px;
  font-weight:600;
}

.weekCheckbox{

  width:18px;
  height:18px;

  accent-color:#3b82f6;

  cursor:pointer;
}

/* RESPONSIVE */

/* =====================================
TABLET
===================================== */

@media (max-width:1024px){

.roadmapTitle{

font-size:46px;

}

.topicTitle{

font-size:34px;

}

.timelineRight{

padding:22px;

}

}

/* =====================================
MOBILE
===================================== */

@media (max-width:768px){

.roadmapHero{

text-align:center;

margin-bottom:30px;

}

.roadmapTitle{

font-size:32px;

line-height:1.2;

letter-spacing:-1px;

}

.roadmapSub{

font-size:15px;

}

.roadmapCard{

gap:12px;

align-items:flex-start;

}

.timelineRight{

padding:18px;

border-radius:18px;

}

.weekRow{

flex-direction:column;

align-items:flex-start;

gap:12px;

}

.weekRow h3{

font-size:22px;

}

.badgeGroup{

width:100%;

}

.statusBadge,

.difficultyBadge{

font-size:12px;

padding:7px 14px;

}

.topicTitle{

font-size:26px;

}

.metaInfo{

font-size:15px;

}

.topicTag{

font-size:13px;

padding:8px 14px;

}

.projectBox{

padding:16px;

}

.projectBox h4{

font-size:17px;

}

.checkboxRow{

font-size:14px;

flex-wrap:wrap;

}

}

*{
box-sizing:border-box;
}

      `}</style>

    </div>
  );
}

export default Roadmap;
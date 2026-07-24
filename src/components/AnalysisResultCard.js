import React, {
  useEffect,
  useState
} from "react";

import {
  BadgeCheck,
  CircleAlert,
  TriangleAlert,
  TrendingUp,
  ShieldCheck,
  Target,
  CheckCircle2,
  Users,
  Sparkles,
  Copy,
  Check,
  Star,
  StarHalf
} from "lucide-react";
import ScoreRing from "./ScoreRing";
//import ATSChart from "./ATSChart";
import ATSExtras from "./ATSExtras";

const getATSColor = (ats) => {

  if (ats === "Low")
    return "#ef4444";

  if (ats === "Medium")
    return "#eab308";

  if (ats === "High")
    return "#22c55e";

  return "#64748b";
};

// ================= CARD =================

const Card = ({
  title,
  subtitle,
  icon,
  children
}) => {

  return (

    <div className="card-box">

      <div className="card-header">

       <div className="card-icon">
  {icon || (
    <Sparkles
      size={24}
      color="#fbbf24"
      strokeWidth={2.2}
    />
  )}
</div>

        <div>

          <h3 className="card-title">

            {title}

          </h3>

          {

            subtitle && (

              <p className="card-subtitle">

                {subtitle}

              </p>

            )

          }

        </div>

      </div>

      {children}

    </div>

  );

};

// ================= TAG =================

const Tag = ({
  text,
  color
}) => (

  <span
    className="tag"
    style={{
      background: color
    }}
  >
    {text}
  </span>
);

const AnalysisResultCard = ({
  data,
  loading
}) => {

  const getStarRating = (score) => {
  if (score >= 90) return 5;
  if (score >= 80) return 4.5;
  if (score >= 70) return 4;
  if (score >= 60) return 3.5;
  if (score >= 50) return 3;
  if (score >= 40) return 2.5;
  if (score >= 30) return 2;
  if (score >= 20) return 1.5;
  if (score >= 10) return 1;
  return 0.5;
};

const rating = getStarRating(data.matchScore);





 const loadingSteps = [

  "Matching skills...",

  "Calculating ATS score...",

  "Checking projects...",

  "Analyzing experience...",

  "Generating roadmap..."
];

const [visibleSteps,
setVisibleSteps] =
  useState([]);

  const [copiedIndex, setCopiedIndex] = useState(null);

const copyText = async (text, index) => {
  try {
    await navigator.clipboard.writeText(text);

    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 1500);

  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {

  if (!loading) return;

  let stepIndex = 0;

  const interval =
    setInterval(() => {

      setVisibleSteps((prev) => {

        const updated = [

          ...prev,

          loadingSteps[stepIndex]

        ];

        return updated.slice(-4);
      });

      stepIndex++;

      if (
        stepIndex >=
        loadingSteps.length
      ) {

        clearInterval(interval);
      }

    }, 700);

  return () =>
    clearInterval(interval);

}, [loading]);
  // =========================
  // LOADING SCREEN
  // =========================

  if (loading) {

    return (

      <div className="loadingBox">

        <div className="ai-loader">

  <div className="ring ring1"></div>

  <div className="ring ring2"></div>

  <div className="ring ring3"></div>

  <div className="ring-center"></div>

</div>

        <h2>
          AI is analyzing your resume...
        </h2>

       <div className="loadingSteps">

  {visibleSteps.map(
    (step, index) => (

      <div
        key={index}
        className="stepItem"
      >

        {step}

      </div>

    )
  )}

</div>

        <style>{`

.loadingBox{

  margin-top:40px;

  padding:60px;

  border-radius:30px;

  background:
    linear-gradient(
      145deg,
      rgba(15,23,42,0.95),
      rgba(30,41,59,0.88)
    );

  border:
    1px solid rgba(255,255,255,0.08);

  display:flex;

  flex-direction:column;

  align-items:center;

  justify-content:center;

  text-align:center;

  color:white;
}

.loaderRing{

  width:90px;
  height:90px;

  border-radius:50%;

  border:
    8px solid rgba(255,255,255,0.08);

  border-top:
    8px solid #3b82f6;

  animation:
    spin 1s linear infinite;

  margin-bottom:25px;

  box-shadow:
    0 0 40px rgba(59,130,246,0.35);
}

@keyframes spin{

  from{
    transform:rotate(0deg);
  }

  to{
    transform:rotate(360deg);
  }
}

.loadingBox h2{

  font-size:34px;

  margin-bottom:12px;
}

.loadingBox p{

  color:#94a3b8;

  font-size:16px;
}
  .ai-loader{
  position: relative;
  width: 140px;
  height: 140px;
  margin: auto;
}

.ring{
  position: absolute;
  border-radius: 50%;
  border: 6px solid transparent;
  animation: rotate 2s linear infinite;
}

.ring1{
  width: 140px;
  height: 140px;

  border-top: 6px solid #3b82f6;

  box-shadow:
  0 0 25px #3b82f6;
}

.ring2{
  width: 105px;
  height: 105px;

  top: 17px;
  left: 17px;

  border-top: 6px solid #8b5cf6;

  animation-direction: reverse;

  box-shadow:
  0 0 25px #8b5cf6;
}

.ring3{
  width: 70px;
  height: 70px;

  top: 35px;
  left: 35px;

  border-top: 6px solid #06b6d4;

  box-shadow:
  0 0 20px #06b6d4;
}

.ring-center{
  position: absolute;

  width: 18px;
  height: 18px;

  background: white;

  border-radius: 50%;

  top: 61px;
  left: 61px;

  box-shadow:
  0 0 30px white;
}

@keyframes rotate{

  0%{
    transform: rotate(0deg);
  }

  100%{
    transform: rotate(360deg);
  }

}

.loadingSteps{

  margin-top:25px;

  height:140px;

  overflow:hidden;

  display:flex;

  flex-direction:column;

  justify-content:flex-end;

  align-items:center;

  gap:10px;
}

.stepItem{

  color:#cbd5e1;

  font-size:20px;

  font-weight:500;

  opacity:0;

  animation:
    slideUp 0.6s ease forwards;
}

@keyframes slideUp{

  from{

    opacity:0;

    transform:
      translateY(35px);

  }

  to{

    opacity:1;

    transform:
      translateY(0px);

  }

}

        `}</style>

      </div>
    );
  }

  // =========================
  // NO DATA
  // =========================

  if (!data)
    return null;

  return (

    <div style={{ marginTop: "30px" }}>

      {/* ================= TOP ================= */}

     <div className="top-box">

  {/* LEFT */}
  <div className="top-left">

    <div className="scoreWrapper">

      <ScoreRing
        score={data.matchScore}
        size={window.innerWidth < 768 ? 120 : 170}
      />

      <div className="scoreRating">

       <div className="stars">

  {[1, 2, 3, 4, 5].map((star) => {

    if (rating >= star) {
      return (
        <Star
          key={star}
          size={18}
          fill="#facc15"
          color="#facc15"
        />
      );
    }

    if (rating >= star - 0.5) {
      return (
        <StarHalf
          key={star}
          size={18}
          fill="#facc15"
          color="#facc15"
        />
      );
    }

    return (
      <Star
        key={star}
        size={18}
        color="#facc15"
        style={{ opacity: 0.3 }}
      />
    );

  })}

</div>
        

        <div className="ratingText">

          {data.matchScore >= 90
            ? "Outstanding Match"
            : data.matchScore >= 80
            ? "Excellent Match"
            : data.matchScore >= 70
            ? "Good Match"
            : data.matchScore >= 60
            ? "Average Match"
            : "Needs Improvement"}

        </div>

      </div>

    </div>

  </div>

  {/* RIGHT */}

  <div className="top-right">

    <div className="hero-badge">
      AI Resume Analysis
    </div>

    <h2 className="hero-title">
      {data.jobTitle}
    </h2>

    <div
      className="fit-status"
      style={{
        background:
          data.fitStatus === "Excellent Fit"
            ? "#16a34a"
            : data.fitStatus === "Good Match"
            ? "#2563eb"
            : data.fitStatus === "Average Fit"
            ? "#eab308"
            : "#ef4444",
      }}
    >
      {data.fitStatus}
    </div>

    <p className="hero-summary">
      {data.summary}
    </p>

    <div className="progress">

      <div
        className="progress-fill"
        style={{
          width: `${data.matchScore}%`,
        }}
      />

    </div>

    <div className="progress-text">

      <span>Overall Job Fit</span>

      <span>{data.matchScore}%</span>

    </div>

    {/* HERO INFO MOVED HERE */}

    <div className="hero-info">

      <div className="info-row">
        <span>Role</span>
        <strong>{data.jobTitle}</strong>
      </div>

      <div className="info-row">
        <span>Experience Level</span>
        <strong>{data.experienceLevel}</strong>
      </div>

      <div className="info-row">
        <span>Industry</span>
        <strong>{data.industry}</strong>
      </div>

      <div className="info-row">
        <span>Analysis Date</span>
        <strong>{data.analysisDate}</strong>
      </div>

    </div>

  </div>

</div>

<div className="stats-grid">

  <div className="stat-card">

  <CheckCircle2
    className="stat-icon"
    size={22}
    color="#22c55e"
  />

  <h2>{data.matchScore}%</h2>

  <p>Match Score</p>

  <small>Resume ↔ JD Match</small>

</div>

 <div className="stat-card">

  <ShieldCheck
    className="stat-icon"
    size={22}
    color="#3b82f6"
  />

  <h2>{data.atsProbability}</h2>

  <p>ATS Score</p>

  <small>ATS Success Rate</small>

</div>

 <div className="stat-card">

  <TriangleAlert
    className="stat-icon"
    size={22}
    color="#f59e0b"
  />

  <h2>{data.missingSkillsCount}</h2>

  <p>Missing Skills</p>

  <small>Need Improvement</small>

</div>

  <div className="stat-card">

  <Users
    className="stat-icon"
    size={22}
    color="#8b5cf6"
  />

  <h2>{data.matchedSkillsCount}</h2>

  <p>Matched Skills</p>

  <small>Strong Skills Found</small>

</div>

</div>

      {/* ================= GRID ================= */}

      <div className="grid-box">

        {/* MATCH */}

       <Card
title="AI Skill Match"
subtitle="Matched technologies from your resume."
icon={<BadgeCheck size={24} color="#22c55e" />}
>

          {

            data.keySkills?.map(
              (s, i) => (

                <Tag
                  key={i}
                  text={s}
                  color="green"
                />

              )
            )

          }

        </Card>

        {/* MISSING */}

       <Card
title="Skill Deficiencies"
subtitle="Skills missing for the target role."
icon={<CircleAlert size={24} color="#ef4444" />}
>

          {

            data.missingSkills?.map(
              (s, i) => (

                <Tag
                  key={i}
                  text={s}
                  color="red"
                />

              )
            )

          }

        </Card>

        {/* GAP */}

       <Card
title="Critical Skill Gaps"
subtitle="High priority skills to improve."
icon={<TriangleAlert size={24} color="#f59e0b" />}
>

          {

            data.skillGap?.map(
              (item, i) => (

                <Tag

                  key={i}

                  text={

                    `${item.skill}
                     (${item.priority})`

                  }

                  color={

                    item.priority ===
                    "High"

                      ? "#ef4444"

                      : item.priority ===
                        "Medium"

                      ? "#f59e0b"

                      : "#22c55e"
                  }

                />

              )
            )

          }

        </Card>

        {/* ATS */}

      <Card
title="ATS Success Rate"
subtitle="Estimated ATS screening performance."
icon={<TrendingUp size={24} color="#facc15" />}
>

          <span

            className="ats-badge"

            style={{
              backgroundColor:
                getATSColor(
                  data.atsProbability
                ),
            }}

          >

            {
              data.atsProbability
            }

          </span>

        </Card>

        {/* STRENGTH */}

        <Card
title="Verified Strengths"
subtitle="Strong areas detected from your resume."
icon={<ShieldCheck size={24} color="#22c55e" />}
>

          <ul>

            {

              data.strengths?.map(
                (s, i) => (

                 <li className="strengthItem">

<span className="strengthDot"></span>

{s}

</li>

                )
              )

            }

          </ul>

        </Card>

        {/* IMPROVE */}

        <Card
title="Personalized Improvement Plan"
subtitle="Recommended next steps to improve your profile."
icon={<Target size={24} color="#8b5cf6" />}
>

          {

            data.improvements?.map(
              (imp, i) => (

                <div className="improveItem">

<div className="improveArrow">

→

</div>

<span>

{imp}

</span>

</div>

              )
            )

          }

        </Card>

      </div>

      {/* ================= REWRITE ================= */}

     <Card
title="AI Resume Rewrite"
//subtitle="AI generated ATS optimized bullet points."
icon={
  <Sparkles
    size={26}
    color="#fbbf24"
    strokeWidth={2.2}
  />
}
>

       <div className="rewriteList">

{
data.rewrittenResume?.length > 0 ?

data.rewrittenResume.map((item,index)=>(

<div
key={index}
className="rewriteItem"

style={{
display:"flex",
justifyContent:"space-between",
alignItems:"flex-start",
gap:"15px"
}}

>

<div
style={{
flex:1,
lineHeight:1.8
}}
>

{item}

</div>

<button

onClick={()=>copyText(item,index)}

title="Copy"

style={{

width:"38px",
height:"38px",

display:"flex",
alignItems:"center",
justifyContent:"center",

background:"rgba(255,255,255,.04)",

border:"1px solid rgba(255,255,255,.08)",

borderRadius:"10px",

cursor:"pointer",

transition:"all .25s ease",

flexShrink:0

}}

onMouseEnter={(e)=>{

e.currentTarget.style.background="#2563eb";
e.currentTarget.style.transform="translateY(-2px)";
e.currentTarget.style.borderColor="#3b82f6";

}}

onMouseLeave={(e)=>{

e.currentTarget.style.background="rgba(255,255,255,.04)";
e.currentTarget.style.transform="translateY(0px)";
e.currentTarget.style.borderColor="rgba(255,255,255,.08)";

}}

>

{

copiedIndex===index ?

<Check
size={18}
color="#22c55e"
/>

:

<Copy
size={18}
color="#e2e8f0"
/>

}

</button>

</div>

))

:

<p>No rewrite suggestions</p>

}

</div>

      </Card>

      {/* EXTRA */}

      <ATSExtras data={data} />

      {/* ================= CSS ================= */}

      <style>{`

.top-box{
display:grid;
grid-template-columns:260px 1fr;
gap:40px;
align-items:center;
}

/* LEFT */

.top-left{
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:100%;
}

/* RIGHT */

.top-right{
display:flex;
flex-direction:column;
align-items:flex-start;
text-align:left;
width:100%;
}

.top-right h2{

  font-size:38px;

  color:white;

  margin-bottom:14px;
}

/* RESPONSIVE */

@media (max-width:768px){



.top-left{
margin-bottom:20px;
}

.scoreWrapper{
align-items:center;
}

.top-right{
align-items:flex-start;
text-align:left;
}

.hero-title{
font-size:34px;
line-height:1.2;
}

.hero-summary{
text-align:left;
}

.progress{
width:100%;
}

.progress-text{
width:100%;
}

  .top-box{
    grid-template-columns:1fr;
    gap:20px;
    justify-items:center;
text-align:center;
padding:0 8px;
  }

  .stats-grid{
    grid-template-columns:1fr;
  }
    .stars svg{
width:18px;
height:18px;
}

  .grid-box{
    grid-template-columns:1fr;
  }

  .hero-info{
margin-top:25px;
display:grid;
grid-template-columns:repeat(2,1fr);
gap:16px;
}

}

/* GRID */

.grid-box{

  display:grid;

  grid-template-columns:
    1fr 1fr;

  gap:20px;

  margin-top:20px;
}

/* CARD */

.card-box{

  background:
    linear-gradient(
      145deg,
      rgba(15,23,42,0.95),
      rgba(30,41,59,0.88)
    );

  backdrop-filter:blur(16px);

  padding:28px;

  border-radius:22px;

  border:
    1px solid rgba(255,255,255,0.06);

  transition:all 0.35s ease;

  cursor:pointer;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.35);

  overflow:hidden;

  position:relative;
}

/* HOVER */

.card-box:hover{

  transform:
    translateY(-8px)
    scale(1.02);

  box-shadow:
    0 20px 50px
    rgba(59,130,246,0.25);

  border:
    1px solid
    rgba(59,130,246,0.35);
}

/* TAG */

.tag{

  padding:8px 16px;

  margin:6px;

  border-radius:999px;

  display:inline-flex;

  align-items:center;

  font-size:13px;

  font-weight:500;

  color:white;

  transition:all 0.35s ease;

  box-shadow:
    0 6px 18px
    rgba(0,0,0,0.25);

  overflow:hidden;
}

/* TAG HOVER */

.tag:hover{

  transform:
    translateY(-4px)
    scale(1.06);

  box-shadow:
    0 0 18px
    rgba(255,255,255,0.15),

    0 0 30px
    rgba(59,130,246,0.25);

  filter:brightness(1.08);
}

/* ATS */

.ats-badge{

  padding:10px 18px;

  border-radius:12px;

  font-weight:bold;

  color:white;

  display:inline-block;

  transition:all 0.3s ease;

  cursor:pointer;
}

/* ATS HOVER */

.ats-badge:hover{

  transform:scale(1.15);

  box-shadow:
    0 0 25px
    rgba(255,255,255,0.6);
}

/* REWRITE */

.rewriteList{

  display:flex;

  flex-direction:column;

  gap:14px;
}

.rewriteItem{

  padding:16px;

  border-radius:14px;

  background:
    rgba(255,255,255,0.04);

  border:
    1px solid rgba(255,255,255,0.05);

  line-height:1.7;

  color:#e2e8f0;

  transition:0.3s;
}

/* REWRITE HOVER */

.rewriteItem:hover{

  transform:translateY(-4px);

  border:
    1px solid
    rgba(59,130,246,0.4);

  box-shadow:
    0 10px 30px
    rgba(59,130,246,0.15);
}
    .strengthItem{

display:flex;

align-items:flex-start;

gap:10px;

margin-bottom:12px;

color:#dbe4f0;

font-size:15px;

line-height:1.7;

list-style:none;

}

.strengthDot{

width:8px;

height:8px;

border-radius:50%;

background:#22c55e;

margin-top:8px;

flex-shrink:0;

}
.improveItem{

display:flex;

gap:12px;

margin-bottom:14px;

align-items:flex-start;

}

.improveArrow{

width:24px;

height:24px;

border-radius:50%;

display:flex;

justify-content:center;

align-items:center;

background:#6d28d9;

color:white;

font-size:13px;

font-weight:bold;

flex-shrink:0;

}

.improveItem span{

font-size:15px;

line-height:1.7;

color:#dbe4f0;

}
.card-header{

display:flex;

align-items:flex-start;

gap:14px;

margin-bottom:18px;

}

.card-icon{

width:46px;

height:46px;

border-radius:14px;

display:flex;

align-items:center;

justify-content:center;

background:rgba(255,255,255,.05);

border:1px solid rgba(255,255,255,.08);

}

.card-title{

margin:0;

font-size:22px;

font-weight:700;

color:white;

}

.card-subtitle{

margin-top:6px;

font-size:13px;

color:#94a3b8;

line-height:1.5;

}
.hero-badge{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:6px 14px;
  background:linear-gradient(
90deg,
#2563eb,
#7c3aed
);
  color:#fff;
  border-radius:999px;
  font-size:11px;
  letter-spacing:.5px;
  font-weight:700;
}

.hero-title{

font-size:clamp(22px,5vw,42px);

font-weight:700;

line-height:1.2;

color:#fff;

margin-bottom:10px;

word-break:break-word;

}

.fit-status{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:8px 16px;
  border-radius:999px;
  background:#16a34a;
  color:#fff;
  font-size:14px;
  font-weight:600;
  width:fit-content;
  margin:16px 0;
}

.hero-summary{

color:#94a3b8;

font-size:14px;

line-height:1.6;

width:100%;

max-width:100%;

margin-bottom:18px;

}

.progress{

width:100%;

height:8px;

background:rgba(255,255,255,.08);

border-radius:999px;

overflow:hidden;

}

.progress-fill{

height:100%;

background:linear-gradient(90deg,#2563eb,#22c55e);

border-radius:999px;

}

.progress-text{

display:flex;

justify-content:space-between;

margin-top:10px;

font-size:13px;

color:#94a3b8;

}
.hero-info{

display:flex;
flex-direction:column;
gap:18px;

padding-left:20px;

border-left:1px solid rgba(255,255,255,.08);

}

.info-row{

display:flex;
flex-direction:column;

}

.info-row span{

font-size:12px;

color:#94a3b8;

margin-bottom:4px;

}

.info-row strong{

color:white;

font-size:15px;

font-weight:600;

}

.stats-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
  margin-top:30px;
}

.stat-card{
  background:linear-gradient(145deg,#111827,#1e293b);
  border:1px solid rgba(255,255,255,.06);
  border-radius:16px;
  padding:18px;
  min-height:105px;

  cursor:pointer;

  transition:
    transform .35s ease,
    box-shadow .35s ease,
    border-color .35s ease;

  will-change:transform;
}

.stat-card:hover{
  transform:translateY(-8px) scale(1.02);

  border-color:#3b82f6;

  box-shadow:
      0 20px 40px rgba(59,130,246,.22);

}

.stat-card h2{
  font-size:34px;
  margin:0;
  color:#fff;
}

.stat-card p{
  font-size:16px;
  font-weight:600;
  margin:6px 0 2px;
}

.stat-card small{
  font-size:12px;
  color:#94a3b8;
}
  .stat-icon{

  margin-bottom:12px;

  opacity:.9;

  transition:all .35s ease;

  pointer-events:none;

}

.stat-card:hover .stat-icon{

    transform:scale(1.15);

}
  .hero-container{

background:#0f172a;

border-radius:24px;

padding:35px;

border:1px solid rgba(255,255,255,.08);

box-shadow:0 20px 60px rgba(0,0,0,.35);

}
.scoreWrapper{
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:100%;
}

.stars{

display:flex;

align-items:center;

justify-content:center;

gap:4px;

animation:starGlow 2.8s ease-in-out infinite;

}

.ratingText{

font-size:17px;

font-weight:700;

color:#22c55e;

}

@keyframes starGlow{

0%{

transform:translateY(0);

filter:drop-shadow(0 0 3px rgba(250,204,21,.18));

}

50%{

transform:translateY(-2px);

filter:drop-shadow(0 0 8px rgba(250,204,21,.35));

}

100%{

transform:translateY(0);

filter:drop-shadow(0 0 3px rgba(250,204,21,.18));

}

}
/* ===========================================
TABLET (768px - 1023px)
=========================================== */

@media (max-width:1023px){

.stars{
display:none;
}

.top-box{
grid-template-columns:180px 1fr;
gap:24px;
align-items:start;
text-align:left;
}

.top-left{
padding-left:0;
display:flex;
justify-content:center;
align-items:flex-start;
}

.top-right{
max-width:100%;
}

.hero-title{
font-size:34px;
}

.hero-info{
border-top:none;
border-left:1px solid rgba(255,255,255,.08);
padding-top:0;
padding-left:20px;
margin-top:0;
}

.stats-grid{
grid-template-columns:repeat(2,1fr);
}

.grid-box{
grid-template-columns:1fr;
}

.card-box{
padding:22px;
}

.scoreWrapper svg{
width:135px;
height:135px;
}

}

/* ===========================================
MOBILE (0px - 767px)
=========================================== */

@media(max-width:767px){

.stars{
display:none;
}

.top-box{

grid-template-columns:1fr;

gap:22px;

justify-items:center;

text-align:center;

}

.top-left{
padding-left:0;
}

.hero-title{
font-size:28px;
line-height:1.3;
text-align:center;
}

.hero-summary{
font-size:14px;
text-align:center;
}

.hero-badge{
margin:auto;
}

.fit-status{
margin:15px auto;
}

.progress-text{
font-size:12px;
}

.hero-info{

grid-template-columns:1fr;

width:100%;

margin-top:20px;

}

.info-row{

width:100%;

}

.info-row{
align-items:center;
text-align:center;
}

.stats-grid{
grid-template-columns:1fr;
gap:15px;
}

.grid-box{
grid-template-columns:1fr;
gap:15px;
}

.card-box{
padding:18px;
}

.stat-card h2{
font-size:28px;
}

.stat-card p{
font-size:15px;
}

.stat-card small{
font-size:11px;
}

.card-title{
font-size:18px;
}

.card-subtitle{
font-size:12px;
}

.scoreWrapper svg{
width:130px;
height:130px;
}

.ratingText{
font-size:15px;
text-align:center;
}

.tag{
font-size:12px;
padding:7px 12px;
}

.rewriteItem{
flex-direction:column !important;
gap:12px !important;
}

.rewriteItem button{
width:100%;
height:42px;
}

.loadingBox{
padding:30px 20px;
}

.loadingBox h2{
font-size:24px;
}

.stepItem{
font-size:16px;
}

.ai-loader{
transform:scale(.8);
}
.top-right{

width:100%;

max-width:100%;

display:flex;

flex-direction:column;

align-items:center;

}
.hero-badge{

display:table;

margin:0 auto;

}

.top-right{

display:flex;

flex-direction:column;

align-items:center;

}

.hero-summary{

text-align:center;

}

.progress{

width:100%;

}

.progress-text{

width:100%;

}

.progress{
width:100%;
}

.scoreWrapper{
width:100%;
}



}


      `}</style>

    </div>
  );
};

export default AnalysisResultCard;
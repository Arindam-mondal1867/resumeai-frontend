import React, {
  useState,
  useRef
} from "react";
import axios from "axios";
import AnalysisResultCard from "../components/AnalysisResultCard";
import {
  UploadCloud,
  FileText
} from "lucide-react";

function Dashboard({ collapsed, dark }) {

const theme = dark ? "dark" : "light";

  const [jobDescription, setJobDescription] =
    useState("");

  const [resumeFile, setResumeFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [analysisData, setAnalysisData] =
    useState(null);
    const resultRef = useRef(null);

  const [analysisSteps, setAnalysisSteps] =
    useState([]);

  // =========================
  // ANALYSIS ANIMATION
  // =========================

  const startFakeSteps = () => {

    const steps = [

      "Matching skills...",

      "Checking projects...",

      "Analyzing experience...",

      "Calculating ATS score...",

      "Optimizing resume...",

      "Generating roadmap..."
    ];

    setAnalysisSteps([]);

    steps.forEach((step, index) => {

      setTimeout(() => {

        setAnalysisSteps(prev => [
          ...prev,
          step
        ]);

      }, index * 700);

    });

  };

  // =========================
  // ANALYZE
  // =========================

  const handleAnalyze = async () => {

    if (!resumeFile) {

      alert("Please upload resume");

      return;
    }

    try {

      setLoading(true);

      setAnalysisData(null);

      startFakeSteps();

      setTimeout(() => {

        const loader =
          document.getElementById(
            "analysis-loader"
          );

        if (loader) {

          loader.scrollIntoView({

            behavior: "smooth",

            block: "center"

          });

        }

      }, 300);

      const formData =
        new FormData();

      formData.append(
        "resume",
        resumeFile
      );

      formData.append(
        "jobDescription",
        jobDescription
      );

      const token =
        localStorage.getItem(
          "ra_token"
        );

      const response =
        await axios.post(

          "https://resumeai-backend-38iy.onrender.com/api/analyze",

          formData,

          {
            headers: {

              Authorization:
                `Bearer ${token}`

            }
          }
        );

      const analysis =

        response.data.analysis ||

        response.data ||

        {};

      const roadmap =

        analysis.roadmap ||

        response.data.roadmap ||

        [];

      localStorage.setItem(

        "roadmapData",

        JSON.stringify(roadmap)

      );

      localStorage.setItem(

        "analysisResult",

        JSON.stringify(analysis)

      );

      setTimeout(() => {

  setAnalysisData(analysis);

  setLoading(false);

  setTimeout(() => {

    resultRef.current?.scrollIntoView({

      behavior: "smooth",

      block: "start"

    });

  },100);

},4500);

    } catch (error) {

      console.log(error);

      alert("Analysis Failed");

      setLoading(false);

    }

  };

  return (

    <>

      <div className="dashboard">

        {/* BACKGROUND */}

        <div className="bgGlowOne"></div>

        <div className="bgGlowTwo"></div>

        <div className="animatedGrid"></div>

        {/* HERO */}

        <div className="heroCard">

          <div className="aiBadge">

            AI Powered

          </div>

          <h1 className="heroTitle">

            Resume Analyzer

          </h1>

          <p className="heroSubtitle">

            AI-powered ATS analysis, hiring prediction, and personalized recommendations to maximize your interview success.

          </p>

          <div className="heroButtons">

            <button className="heroBtn">

              Instant Analysis

            </button>

            <button className="heroBtn">

              Skill Matching

            </button>

            <button className="heroBtn">

              ATS Score

            </button>

            <button className="heroBtn">

            Hiring Prediction

            </button>

            <button className="heroBtn">

             AI Insights

            </button>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="mainGrid">

          {/* LEFT */}

         <div className="glassCard jdCard">

  {/* HEADER */}

  <div className="jdHeader">

    <div className="jdLeft">

      <div className="jdIcon">

        <FileText
          size={28}
          color="#ff5ea8"
        />

      </div>

      <div>

        <h2 className="jdTitle">

          Job Description

        </h2>

        <p className="jdSub">

          Paste roles and core requirements

        </p>

      </div>

    </div>

    <button

      className="clearBtn"

      onClick={() =>
        setJobDescription("")
      }

    >

      Clear

    </button>

  </div>

  {/* SAMPLE BUTTONS */}

  <div className="sampleBox">

    <span className="sampleLabel">

      SAMPLES:

    </span>

    <button

      className="sampleBtn"

      onClick={() =>

        setJobDescription(

`We are looking for a Senior Full Stack Developer proficient in React, Node.js, Express, JavaScript, and TypeScript. Experience with PostgreSQL, MongoDB, Docker, Kubernetes, AWS, and CI/CD pipelines is highly desired. The candidate should be comfortable with Agile development, Scrum, Git, and writing clean, testable code with Unit Testing.`

        )

      }

    >

      Senior Full Stack Developer

    </button>

    <button

      className="sampleBtn"

      onClick={() =>

        setJobDescription(

`Looking for a Data Scientist / ML Engineer with expertise in Python, Machine Learning, Deep Learning, TensorFlow, PyTorch, NLP, and Data Visualization. Experience with Pandas, NumPy, Scikit-learn, SQL, and deploying ML models is preferred.`

        )

      }

    >

      Data Scientist / ML Engineer

    </button>

    <button

      className="sampleBtn"

      onClick={() =>

        setJobDescription(

`Seeking a Technical Product Manager with strong communication skills, Agile/Scrum experience, product strategy knowledge, stakeholder management, roadmap planning, and familiarity with SaaS platforms.`

        )

      }

    >

      Technical Product Manager

    </button>

  </div>

  {/* TEXTAREA */}

  <textarea

    className="jobInput premiumInput"

    placeholder=
    "Paste the target job description here..."

    value={jobDescription}

    onChange={(e) =>

      setJobDescription(
        e.target.value
      )

    }

  ></textarea>

</div>
          {/* RIGHT */}

          <label

            htmlFor="resumeUpload"

            className="uploadCard"

          >

            {/* ICON */}

            <div className="uploadIconBox">

              <UploadCloud
                size={58}
                color="#7c93ff"
              />

            </div>

            {/* TITLE */}

            <h2 className="uploadTitle">

              Upload Resume

            </h2>

            {/* SUBTITLE */}

            <p className="uploadSub">

              PDF and DOCX formats accepted
              (Max 10MB)

            </p>

            {/* INPUT */}

            <input

              type="file"

              id="resumeUpload"

              hidden

              accept=".pdf,.doc,.docx"

              onChange={(e) =>

                setResumeFile(
                  e.target.files[0]
                )

              }

            />

            {/* FILE NAME */}

            {resumeFile && (

              <p className="fileName">

                {resumeFile.name}

              </p>

            )}

            {/* ANALYZE */}

            <button

              className="analyzeBtn"

              onClick={(e) => {

                e.preventDefault();

                handleAnalyze();

              }}

            >

              {loading
                ? "Analyzing..."
                : "Analyze Resume"}

            </button>

          </label>

        </div>

        {/* LOADER */}

        {loading && (

          <div
            id="analysis-loader"
            className="loaderContainer"
          >

            <div className="ringWrap">

              <div className="ringOuter"></div>

              <div className="ringInner"></div>

              <div className="ringCenter"></div>

            </div>

            <h1 className="loaderTitle">

              AI is analyzing your resume...

            </h1>

            <div className="stepsBox">

              {analysisSteps.map(

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

          </div>

        )}

        {/* RESULT */}

       {!loading && analysisData && (

<div ref={resultRef}>

  <AnalysisResultCard
      data={analysisData}
  />

</div>

)}

      </div>

      {/* CSS */}

      <style>{`

body{

  margin:0;

  background:${theme === "dark" ? "#020617" : "#f1f5f9"};

  font-family:Inter,sans-serif;
}

/* ======================
DASHBOARD
====================== */

.dashboard{

  min-height:100vh;

  padding:14px;

  box-sizing:border-box;

  overflow-x:hidden;

  position:relative;

  background:${theme === "dark" ? "#020617" : "#f1f5f9"};
}

/* ======================
GLOW
====================== */

.bgGlowOne{

  position:absolute;

  width:320px;
  height:320px;

  background:#3b82f6;

  border-radius:50%;

  filter:blur(80px);

  opacity:0.18;

  top:-100px;
  right:-100px;
}

.bgGlowTwo{

  position:absolute;

  width:300px;
  height:300px;

  background:#8b5cf6;

  border-radius:50%;

  filter:blur(80px);

  opacity:0.12;

  bottom:-120px;
  left:-120px;
}

/* ======================
GRID
====================== */

.animatedGrid{

  position:absolute;

  inset:0;

  background-image:

    linear-gradient(
      rgba(255,255,255,0.03) 1px,
      transparent 1px
    ),

    linear-gradient(
      90deg,
      rgba(255,255,255,0.03) 1px,
      transparent 1px
    );

  background-size:40px 40px;
}

/* ======================
HERO
====================== */

.heroCard{

  position:relative;

  z-index:2;

  padding:14px 18px;

  border-radius:28px;

  background:
    linear-gradient(
      145deg,
      rgba(15,23,42,0.96),
      rgba(30,41,59,0.88)
    );

  border:
    1px solid rgba(255,255,255,0.07);

  backdrop-filter:blur(10px);

  box-shadow:
    0 0 40px rgba(59,130,246,0.12);

  margin-bottom:14px;

  overflow:hidden;

  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
}

.heroCard:hover{

  transform:
    translateY(-4px);

  box-shadow:
    0 25px 50px rgba(59,130,246,0.18);
}

/* SCAN EFFECT */

.heroCard::before{

  content:"";

  position:absolute;

  top:0;
  left:-40%;

  width:30%;
  height:100%;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.08),
      transparent
    );

  transform:
    skewX(-20deg);

  animation:
    scanMove 5s linear infinite;
}

@keyframes scanMove{

  0%{
    left:-40%;
  }

  100%{
    left:130%;
  }
}

/* BADGE */

.aiBadge{

  display:inline-block;

  padding:8px 16px;

  border-radius:999px;

  background:
    rgba(59,130,246,0.16);

  color:#60a5fa;

  font-weight:700;

  font-size:13px;

  margin-bottom:16px;
}

/* TITLE */

.heroTitle{

  margin:0;

  font-size:32px;

  line-height:1;

  font-weight:900;

  letter-spacing:-2px;

  background:
    linear-gradient(
      90deg,
      #3b82f6,
      #8b5cf6
    );

  -webkit-background-clip:text;

  -webkit-text-fill-color:
    transparent;
}

/* SUBTITLE */

.heroSubtitle{

  margin-top:10px;

  max-width:700px;

 color:${theme === "dark" ? "#94a3b8" : "#475569"};

  font-size:13px;

  line-height:1.6;
}

/* BUTTONS */

.heroButtons{

  display:flex;

  gap:8px;

  margin-top:20px;

  flex-wrap:wrap;
}

.heroBtn{

  border:none;

padding:7px 14px;

  border-radius:14px;

  cursor:pointer;

  font-size:13px;

  font-weight:700;

  color:${theme === "dark" ? "white" : "#0f172a"};

  background:
    linear-gradient(
      90deg,
      rgba(59,130,246,0.22),
      rgba(139,92,246,0.22)
    );

  transition:0.3s;
}

.heroBtn:hover{

  transform:
    translateY(-3px) scale(1.03);

  box-shadow:
    0 10px 20px rgba(99,102,241,0.25);
}

/* ======================
MAIN GRID
====================== */

.mainGrid{

  position:relative;

  z-index:2;

  display:grid;

  grid-template-columns:
    1.4fr 0.8fr;

 gap:14px;
}

/* ======================
CARDS
====================== */

.glassCard,
.uploadCard{

  padding:18px;

  border-radius:24px;

 background:

${theme === "dark"

? "rgba(15,23,42,0.75)"

: "rgba(255,255,255,0.92)"};

  border:
    1px solid rgba(255,255,255,0.06);

 backdrop-filter:blur(10px);

  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border 0.35s ease;

  position:relative;

  overflow:hidden;
}

/* HOVER EFFECT */

.glassCard:hover,
.uploadCard:hover{

  transform:
    translateY(-8px)
    scale(1.01);

  border:
    1px solid rgba(59,130,246,0.45);

  box-shadow:
    0 25px 45px rgba(59,130,246,0.18);
}

/* TITLE */

.sectionTitle{

  color:${theme === "dark" ? "white" : "#0f172a"};

  font-size:20px;

  font-weight:700;

  margin-bottom:16px;
}

/* INPUT */

.jobInput{

  width:100%;

  height:180px;

  border:none;

  outline:none;

  resize:none;

  border-radius:18px;

  padding:18px;

  font-size:15px;

  color:${theme === "dark" ? "white" : "#0f172a"};

  background:
    rgba(2,6,23,0.9);

  border:
    1px solid rgba(59,130,246,0.3);

  transition:
    border 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.jobInput:focus{

  border:
    1px solid rgba(96,165,250,0.8);

  box-shadow:
    0 0 20px rgba(59,130,246,0.25);

  transform:
    scale(1.01);
}

/* ======================
UPLOAD CARD
====================== */

.uploadCard{

  min-height:280px;

  display:flex;

  flex-direction:column;

  justify-content:center;

  align-items:center;

  text-align:center;

  gap:18px;

  border:
    2px dashed rgba(59,130,246,0.22);

  cursor:pointer;

  background:
    linear-gradient(
      145deg,
      rgba(15,23,42,0.92),
      rgba(2,6,23,0.92)
    );
}

.uploadIconBox{

  width:75px;

  height:75px;

  border-radius:30px;

  display:flex;

  align-items:center;

  justify-content:center;

  margin-bottom:8px;

  background:
    linear-gradient(
      145deg,
      rgba(15,23,42,0.95),
      rgba(30,41,59,0.75)
    );

  border:
    1px solid rgba(255,255,255,0.05);

  box-shadow:
    0 0 30px rgba(59,130,246,0.14);

  transition:0.35s ease;

  animation:
    pulseGlow 3s infinite;
}

.uploadCard:hover .uploadIconBox{

  transform:
    translateY(-5px)
    scale(1.06);

  box-shadow:
    0 0 45px rgba(59,130,246,0.25);
}

.uploadTitle{

  color:${theme === "dark" ? "white" : "#0f172a"};

  font-size:18px;

  font-weight:800;

  margin:0;
}

.uploadSub{

  color:${theme === "dark" ? "#94a3b8" : "#475569"};
  margin-top:0px;

  margin-bottom:12px;

  font-size:15px;

  line-height:1.5;

  max-width:260px;
}

.fileName{

  color:#cbd5e1;

  font-size:14px;

  word-break:break-all;
}

/* BUTTON */

.analyzeBtn{

  margin-top:0px;

  border:none;

  padding:11px 22px;

  border-radius:16px;

  font-size:14px;

  font-weight:800;

  cursor:pointer;

  color:${theme === "dark" ? "white" : "#0f172a"};

  background:
    linear-gradient(
      90deg,
      #3b82f6,
      #8b5cf6
    );

  box-shadow:
    0 12px 30px rgba(59,130,246,0.35);

  transition:0.3s;
}

.analyzeBtn:hover{

  transform:
    translateY(-4px) scale(1.04);

  box-shadow:
    0 18px 35px rgba(59,130,246,0.45);
}

/* ======================
LOADER
====================== */

.loaderContainer{

  min-height:70vh;

  display:flex;

  flex-direction:column;

  align-items:center;

  justify-content:center;

  text-align:center;

  position:relative;

  z-index:5;
}

.ringWrap{

  position:relative;

  width:170px;
  height:170px;

  margin-bottom:30px;
}

.ringOuter{

  position:absolute;

  inset:0;

  border-radius:50%;

  border:10px solid
    rgba(59,130,246,0.12);

  border-top:
    10px solid #3b82f6;

  animation:
    rotateRing 2s linear infinite;

  box-shadow:
    0 0 40px rgba(59,130,246,0.5);
}

.ringInner{

  position:absolute;

  inset:28px;

  border-radius:50%;

  border:8px solid
    rgba(139,92,246,0.12);

  border-top:
    8px solid #8b5cf6;

  animation:
    rotateRingReverse 1.5s linear infinite;
}

.ringCenter{

  position:absolute;

  inset:62px;

  border-radius:50%;

  background:white;

  box-shadow:
    0 0 30px white;
}

@keyframes rotateRing{

  from{
    transform:rotate(0deg);
  }

  to{
    transform:rotate(360deg);
  }
}

@keyframes rotateRingReverse{

  from{
    transform:rotate(360deg);
  }

  to{
    transform:rotate(0deg);
  }
}

.loaderTitle{

 color:${theme === "dark" ? "white" : "#0f172a"};
  font-size:42px;

  margin-bottom:20px;
}

.stepsBox{

  display:flex;

  flex-direction:column;

  gap:12px;

  align-items:center;
}

.stepItem{

  color:#cbd5e1;

  font-size:20px;

  animation:
    floatUp 0.5s ease;
}

@keyframes floatUp{

  from{

    opacity:0;

    transform:
      translateY(25px);

  }

  to{

    opacity:1;

    transform:
      translateY(0px);

  }
}

@keyframes pulseGlow{

  0%{

    box-shadow:
      0 0 20px rgba(59,130,246,0.10);

  }

  50%{

    box-shadow:
      0 0 45px rgba(59,130,246,0.28);

  }

  100%{

    box-shadow:
      0 0 20px rgba(59,130,246,0.10);

  }

}

/* ======================
RESPONSIVE
====================== */

@media(max-width:1000px){

  .mainGrid{

   grid-template-columns:
1.2fr 0.7fr;
  }

  .heroTitle{

    font-size:38px;
  }

  .loaderTitle{

    font-size:32px;
  }
}

/* =========================
PREMIUM JD SECTION
========================= */

.jdCard{

  padding:20px;
}

.jdHeader{

  display:flex;

  align-items:flex-start;

  justify-content:space-between;

  margin-bottom:22px;
}

.jdLeft{

  display:flex;

  gap:16px;

  align-items:center;
}

.jdIcon{

  width:64px;

  height:64px;

  border-radius:18px;

  display:flex;

  align-items:center;

  justify-content:center;

  background:
    linear-gradient(
      145deg,
      rgba(255,94,168,0.12),
      rgba(255,94,168,0.06)
    );

  border:
    1px solid rgba(255,94,168,0.2);

  box-shadow:
    0 0 25px rgba(255,94,168,0.12);
}

.jdTitle{

  margin:0;

 color:${theme === "dark" ? "white" : "#0f172a"};

font-size:22px;

  font-weight:800;
}

.jdSub{

  margin-top:4px;

  color:${theme === "dark" ? "#94a3b8" : "#475569"};

  font-size:13px;
}

.clearBtn{

  border:none;

  background:transparent;

 color:${theme === "dark" ? "#94a3b8" : "#475569"};
  font-size:15px;

  cursor:pointer;

  transition:0.3s;
}

.clearBtn:hover{

  color:${theme === "dark" ? "white" : "#0f172a"};
}

.sampleBox{

  display:flex;

  gap:14px;

  flex-wrap:wrap;

  align-items:center;

  padding:12px;

  border-radius:22px;

  margin-bottom:22px;

  background:
    rgba(2,6,23,0.55);

  border:
    1px solid rgba(255,255,255,0.05);
}

.sampleLabel{

  color:#64748b;

  font-size:14px;

  font-weight:700;
}

.sampleBtn{

  border:none;

  padding:9px 14px;

  border-radius:16px;

  cursor:pointer;

  color:#cbd5e1;

 font-size:12px;

  font-weight:700;

  background:
    rgba(15,23,42,0.95);

  transition:0.3s;
}

.sampleBtn:hover{

  transform:
    translateY(-2px);

  color:${theme === "dark" ? "white" : "#0f172a"};

  background:
    linear-gradient(
      90deg,
      rgba(59,130,246,0.28),
      rgba(139,92,246,0.22)
    );

  box-shadow:
    0 10px 25px rgba(59,130,246,0.15);
}

.premiumInput{

   min-height:130px;

  font-size:14px;

  line-height:1.8;

  padding:24px;
}
  /* ===========================================
TABLET
=========================================== */

@media (max-width:1024px){

.dashboard{

padding:18px;
}

.heroTitle{

font-size:38px;

text-align:center;

line-height:1.2;

}

.heroSubtitle{

text-align:center;

max-width:100%;

}

.heroButtons{

justify-content:center;

}

.mainGrid{

grid-template-columns:1fr;

gap:20px;

}

.uploadCard{

min-height:250px;

}

.jobInput{

height:170px;

}

.loaderTitle{

font-size:32px;

}

}

/* ===========================================
MOBILE
=========================================== */

@media (max-width:768px){

.dashboard{

padding:14px;

}

.heroCard{

padding:20px;

border-radius:20px;

}

.heroTitle{

font-size:28px;

line-height:1.3;

text-align:center;

letter-spacing:-1px;

}

.heroSubtitle{

font-size:14px;

text-align:center;

}

.heroButtons{

justify-content:center;

gap:8px;

}

.heroBtn{

width:100%;

}

.mainGrid{

grid-template-columns:1fr;

gap:18px;

}

.jdHeader{

flex-direction:column;

align-items:flex-start;

gap:18px;

}

.jdLeft{

width:100%;

}

.clearBtn{

align-self:flex-end;

}

.sampleBox{

flex-direction:column;

align-items:flex-start;

}

.sampleBtn{

width:100%;

}

.jobInput{

height:180px;

font-size:14px;

}

.uploadCard{

padding:24px;

min-height:260px;

}

.uploadTitle{

font-size:22px;

}

.uploadSub{

font-size:14px;

}

.fileName{

font-size:13px;

text-align:center;

}

.analyzeBtn{

width:100%;

}

.loaderTitle{

font-size:24px;

}

.stepItem{

font-size:16px;

}

.ringWrap{

transform:scale(.8);

}

.animatedGrid{
display:none;
}
.bgGlowOne,
.bgGlowTwo{

display:none;

}

.heroCard::before{

animation:none;

}

.uploadIconBox{

animation:none;

}

.heroCard:hover{

transform:none;

box-shadow:none;

}

.glassCard:hover,
.uploadCard:hover{

transform:none;

box-shadow:none;

}
html,
body{

-webkit-overflow-scrolling:touch;

scroll-behavior:smooth;

}

}

      `}</style>

    </>

  );
}

export default Dashboard;
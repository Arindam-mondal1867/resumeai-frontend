import React,{
useState,
useContext,
useEffect
} from "react";
import { ThemeContext } from "./context/ThemeContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Roadmap from "./pages/Roadmap";
import Sidebar from "./components/Sidebar";
import AskAI from "./pages/AskAI";
function App() {

  const token =
    localStorage.getItem(
      "ra_token"
    );

    const { dark } = useContext(ThemeContext);

  // =========================
  // SIDEBAR STATE
  // =========================

  const [collapsed, setCollapsed] =
    useState(false);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {

  const handleResize = () => {

    setIsMobile(window.innerWidth < 768);

  };

  window.addEventListener("resize", handleResize);

  return () =>
    window.removeEventListener("resize", handleResize);

}, []);



    // =========================
// THEME STATE
// =========================



  return (

    <Router>

     {token && isMobile && (

<div
style={{
position:"fixed",
top:0,
left:0,
right:0,
height:"60px",
background:"#020617",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"0 16px",
zIndex:3000,
borderBottom:"1px solid rgba(255,255,255,.08)"
}}
>

<button
onClick={()=>setMobileMenuOpen(true)}
style={{
background:"transparent",
border:"none",
color:"white",
fontSize:"28px",
cursor:"pointer"
}}
>
☰
</button>

<h3
style={{
margin:0,
color:"white",
fontWeight:"700"
}}
>
ResumeAI
</h3>

<div style={{width:"28px"}} />

</div>

)}

      <div
        style={{

          display: "flex",

        background: dark ? "#020617" : "#f8fafc",
          overflowX: "hidden",

          minHeight: "100vh"

        }}
      >

        {/* =========================
        SIDEBAR
        ========================= */}

        {token && (

         <Sidebar
  collapsed={collapsed}
  setCollapsed={setCollapsed}
  dark={dark}
  //setDark={setDark}
  mobileMenuOpen={mobileMenuOpen}
  setMobileMenuOpen={setMobileMenuOpen}
/>


        )}
        {token && isMobile && mobileMenuOpen && (

  <div
    onClick={() => setMobileMenuOpen(false)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.45)",
      zIndex: 999,
    }}
  />

)}

        {/* =========================
        MAIN CONTENT
        ========================= */}

        <div

          style={{

            flex: 1,

            minHeight: "100vh",

            overflowX: "hidden",

            transition:
              "all 0.4s ease",

          marginLeft:

token

? (

isMobile

? "0px"

: (

collapsed

? "90px"

: "250px"

)

)

: "0px",
paddingTop: isMobile ? "60px" : "0px",

          }}
        >

          <Routes>

            <Route

              path="/"

              element={

                token

                  ? <Navigate to="/dashboard" />

                  : <Login />

              }

            />

            <Route

              path="/register"

              element={

                token

                  ? <Navigate to="/dashboard" />

                  : <Register />

              }

            />

            <Route

              path="/dashboard"

              element={

                token

                  ? (

                    <Dashboard
collapsed={collapsed}
dark={dark}
/>

                  )

                  : <Navigate to="/" />

              }

            />

            <Route

              path="/history"

              element={

                token

                  ? <History />

                  : <Navigate to="/" />

              }

            />

            <Route

              path="/recruiter"

              element={

                token

                  ? <RecruiterDashboard />

                  : <Navigate to="/" />

              }

            />

            <Route

              path="/roadmap"

              element={

                token

                  ? <Roadmap />

                  : <Navigate to="/" />

              }

            />
            <Route

  path="/ask-ai"

  element={

    token

      ? <AskAI />

      : <Navigate to="/" />

  }

/>

          </Routes>

        </div>

      </div>

    </Router>

  );
}

export default App;
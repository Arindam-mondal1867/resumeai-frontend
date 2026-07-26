import React, { useEffect, useState } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {

  LayoutDashboard,
  History,
  BriefcaseBusiness,
  Map,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Rocket,
  Sparkles,

  User,
  Mail,
  Pencil,
  Lock

} from "lucide-react";



const Sidebar = ({
  collapsed,
  setCollapsed,
  dark,
  //setDark,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  handleResize();

  window.addEventListener("resize", handleResize);

  return () =>
    window.removeEventListener("resize", handleResize);

}, []);

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "ra_user"
      )
    );

  // =========================
  // ANALYSIS STATE
  // =========================

  

    const [profileOpen, setProfileOpen] = useState(false);

  // =========================
  // AUTO UPDATE
  // =========================

 

  // =========================
  // MENU
  // =========================

  const menu = [

    {
      name: "Analyze",

      path: "/dashboard",

      icon:
        <LayoutDashboard
          size={22}
          strokeWidth={2}
        />
    },

    {
      name: "History",

      path: "/history",

      icon:
        <History
          size={22}
          strokeWidth={2}
        />
    },

    {
      name: "Recruiter",

      path: "/recruiter",

      icon:
        <BriefcaseBusiness
          size={22}
          strokeWidth={2}
        />
    },

    {
      name: "Roadmap",

      path: "/roadmap",

      icon:
        <Map
          size={22}
          strokeWidth={2}
        />
    }

  ];

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem(
      "ra_token"
    );

    localStorage.removeItem(
      "ra_user"
    );

    window.location.href = "/";

  };

  // =========================
  // UI
  // =========================

  return (

    <div

      style={{

       position: "fixed",

top: 0,

left: isMobile
  ? (mobileMenuOpen ? "0px" : "-260px")
  : "0px",

        zIndex: 1000,

     width: isMobile
  ? "250px"
  : (collapsed ? "82px" : "230px"),

minWidth: isMobile
  ? "250px"
  : (collapsed ? "90px" : "260px"),

        height: "100vh",

        overflowY: "auto",

        overflowX: "hidden",

        flexShrink: 0,

      padding:

isMobile

? "24px 18px"

: (collapsed ? "24px 10px" : "24px 18px"),

        boxSizing:
          "border-box",

        display: "flex",

        flexDirection: "column",

        justifyContent:
          "space-between",

        background:

 dark

    ? "linear-gradient(180deg,#020617,#020617,#030a1a)"

    : "linear-gradient(180deg,#f8fafc,#f1f5f9,#e2e8f0)",

        backdropFilter:
          "blur(18px)",

       borderRight:

 dark

    ? "1px solid rgba(255,255,255,0.05)"

    : "1px solid rgba(0,0,0,0.08)",

        boxShadow:

  dark

    ? "8px 0 30px rgba(0,0,0,0.45)"

    : "8px 0 30px rgba(0,0,0,0.08)",

        transition:
          "all 0.4s ease"

      }}
    >

      {/* =========================
      TOGGLE BUTTON
      ========================= */}

      <div

        onClick={() => {

          if (

            typeof setCollapsed
            === "function"

          ) {

            setCollapsed(
              !collapsed
            );

          }

        }}

        style={{

          position: "absolute",

          top: "30px",

          right: "-14px",

          width: "28px",

          height: "48px",

          borderRadius: "12px",

         background:

 dark

    ? "#111827"

    : "#ffffff",

          border:
            "1px solid rgba(255,255,255,0.08)",

          display: isMobile ? "none" : "flex",

          alignItems: "center",

          justifyContent: "center",

          cursor: "pointer",

          transition:
            "all 0.3s ease",

          zIndex: 10,

         color:

 dark

    ? "white"

    : "#0f172a"

        }}

        onMouseEnter={(e) => {

          e.currentTarget.style.transform =
            "scale(1.08)";

        }}

        onMouseLeave={(e) => {

          e.currentTarget.style.transform =
            "scale(1)";

        }}

      >

        {

          collapsed

            ? (

              <PanelLeftOpen
                size={18}
              />

            )

            : (

              <PanelLeftClose
                size={18}
              />

            )

        }

      </div>

      {/* =========================
TOP SECTION
========================= */}

<div>

{isMobile && mobileMenuOpen && (

  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "15px",
    }}
  >
    <button
      onClick={() => setMobileMenuOpen(false)}
      style={{
        background: "transparent",
        border: "none",
        color: "white",
        fontSize: "30px",
        cursor: "pointer",
        padding: "0",
      }}
    >
      ☰
    </button>
  </div>

)}

{/* PROFILE */}

        <div
  style={{
    position: "relative",
    marginBottom: "25px",
  }}
>

  {/* Profile Header */}

  <div
    onClick={() => setProfileOpen(!profileOpen)}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      cursor: "pointer",
    }}
  >

    <div
      style={{
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        background: "#1e293b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "22px",
        fontWeight: "700",
      }}
    >
      {user?.name?.charAt(0)?.toUpperCase() || "U"}
    </div>

    {(!collapsed || isMobile) && (
      <div>
        <div
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: "18px",
          }}
        >
          {user?.name}
        </div>

        <div
          style={{
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Developer
        </div>
      </div>
    )}

  </div>

  {profileOpen && (

    <div
      style={{
        position: "absolute",
        top: "65px",
        left: "0",
        width: "240px",
        background: "#111827",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: "18px",
        padding: "18px",
        boxShadow: "0 20px 40px rgba(0,0,0,.45)",
        zIndex: 9999,
      }}
    >

      <h3
        style={{
          color: "white",
          marginBottom: "15px",
        }}
      >
        My Profile
      </h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          color: "#94a3b8",
          marginBottom: "8px",
        }}
      >
        <User size={18} />
        <span>{user?.name}</span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          color: "#94a3b8",
        }}
      >
        <Mail size={18} />
        <span>{user?.email}</span>
      </div>

      <hr
        style={{
          margin: "15px 0",
          opacity: .2,
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          cursor: "pointer",
        }}
      >
        <Pencil size={18} />
        <span>Edit Profile</span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          cursor: "pointer",
        }}
      >
        <Lock size={18} />
        <span>Change Password</span>
      </div>

      <div
        onClick={handleLogout}
        style={{
          display: "flex",
          gap: "10px",
          color: "#ef4444",
          cursor: "pointer",
        }}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </div>

    </div>

  )}

</div>

        {/* =========================
        LOGO
        ========================= */}

        <div

          style={{

            display: "flex",

            alignItems:
              "center",

            justifyContent:

collapsed

? "center"

: "flex-start",

            gap: "10px",

            marginBottom:
              "30px",

            color:

  dark

    ? "white"

    : "#0f172a"

          }}
        >

          <Rocket
            size={28}
            strokeWidth={2.5}
          />

         {(!collapsed || isMobile) && (

            <h2

              style={{

                margin: 0,

                fontSize:
                  "26px",

                fontWeight:
                  "800",

                letterSpacing:
                  "-1px"

              }}
            >

              ResumeAI

            </h2>

          )}

        </div>

        {/* =========================
        MENU
        ========================= */}

        {

          menu.map(

            (
              item,
              index
            ) => {

              const isActive =

                location.pathname
                === item.path;

              return (

                <div

                  key={index}

                  onClick={() =>
                    navigate(
                      item.path
                    )
                  }

                  title={

                    collapsed

                      ? item.name

                      : ""

                  }

                  style={{

                    padding:
                      "14px",

                    marginBottom:
                      "14px",

                    borderRadius:
                      "16px",

                    cursor:
                      "pointer",

                    display:
                      "flex",

                    alignItems:
                      "center",

                    justifyContent:

collapsed

? "center"

: "flex-start",

                    gap:
                      "14px",

                    background:

                      isActive

                       ? (

   dark

      ? "#111827"

      : "#e2e8f0"

  )

                        : "transparent",

                    color:

                      isActive

                        ? "white"

                        : "#94a3b8",

                    transition:
                      "all 0.3s ease",

                    border:

                      isActive

                        ? "1px solid rgba(255,255,255,0.08)"

                        : "1px solid transparent"

                  }}

                  onMouseEnter={(e) => {

                    if (!isActive) {

                      e.currentTarget.style.background =
                        dark

  ? "rgba(255,255,255,0.04)"

  : "rgba(0,0,0,0.05)";

                      e.currentTarget.style.color =

 dark

    ? "white"

    : "#0f172a";

                    }

                  }}

                  onMouseLeave={(e) => {

                    if (!isActive) {

                      e.currentTarget.style.background =
                        "transparent";

                      e.currentTarget.style.color =
                        "#94a3b8";

                    }

                  }}

                >

                  {/* ICON */}

                  <span

                    style={{

                      display:
                        "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center"

                    }}
                  >

                    {item.icon}

                  </span>

                  {/* TEXT */}

                  {(!collapsed || isMobile) && (

                    <span

                      style={{

                        fontWeight:
                          "600",

                        fontSize:
                          "15px",

                        letterSpacing:
                          "0.2px"

                      }}
                    >

                      {item.name}

                    </span>

                  )}

                </div>

              );

            }

          )

        }

      </div>

      {/* =========================
      ASK AI
      ========================= */}

      {
  (() => {

    const isAskAI =
      location.pathname === "/ask-ai";

    return (

      <div

        onClick={() =>
          navigate("/ask-ai")
        }

        title={
          collapsed
            ? "Ask AI"
            : ""
        }

        style={{

          padding: "14px",

          marginBottom: "14px",

          borderRadius: "16px",

          cursor: "pointer",

          display: "flex",

          alignItems: "center",

         justifyContent:

collapsed

? "center"

: "flex-start",

          gap: "14px",

         background:

isAskAI

? (
    dark
      ? "#111827"
      : "#e2e8f0"
  )

: "transparent",

          color:

            isAskAI

              ? "white"

              : "#94a3b8",

          transition:
            "all 0.3s ease",

          border:

            isAskAI

              ? "1px solid rgba(255,255,255,0.08)"

              : "1px solid transparent"

        }}

        onMouseEnter={(e) => {

          if (!isAskAI) {

          e.currentTarget.style.background =
dark
? "rgba(255,255,255,0.04)"
: "rgba(0,0,0,0.05)";

e.currentTarget.style.color =
dark
? "white"
: "#0f172a";

          }

        }}

        onMouseLeave={(e) => {

          if (!isAskAI) {

            e.currentTarget.style.background =
              "transparent";

            e.currentTarget.style.color =
              "#94a3b8";

          }

        }}

      >

        {/* ICON */}

        <span

          style={{

            display: "flex",

            alignItems: "center",

            justifyContent: "center"

          }}

        >

          <Sparkles
            size={22}
            strokeWidth={2}
          />

        </span>

        {/* TEXT */}

        {(!collapsed || isMobile) && (

          <div>

            <div

              style={{

                fontWeight: "600",

                fontSize: "15px",

                letterSpacing: "0.2px"

              }}

            >

              Ask AI

            </div>

            <div

              style={{

                fontSize: "11px",

               color:

  dark

    ? "#94a3b8"

    : "#475569",
                marginTop: "2px"

              }}

            >

              Resume Assistant

            </div>

          </div>

        )}

      </div>

    );

  })()
}

      {/* =========================
      LOGOUT
      ========================= */}

      <div>

        <div

          onClick={
            handleLogout
          }

          title={
            collapsed
              ? "Logout"
              : ""
          }

          style={{

            padding:
              "15px",

            borderRadius:
              "16px",

           background:

  dark

    ? "#111827"

    : "#ffffff",

            border:
              "1px solid rgba(255,255,255,0.08)",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            gap: "10px",

            cursor:
              "pointer",

            fontWeight:
              "600",

            fontSize:
              "15px",

           color:

 dark

    ? "white"

    : "#0f172a",

            transition:
              "all 0.3s ease"

          }}

          onMouseEnter={(e) => {

            e.currentTarget.style.background =

  dark

    ? "#1f2937"

    : "#e2e8f0";

          }}

          onMouseLeave={(e) => {

           e.currentTarget.style.background =
dark

    ? "#111827"

    : "#ffffff";
          }}

        >

          <LogOut
            size={20}
          />

          {(!collapsed || isMobile) && (

            <span>
              Logout
            </span>

          )}

        </div>

      </div>

    </div>

  );

};

export default Sidebar;
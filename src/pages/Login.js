import React, { useState } from "react";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
//import { ThemeContext } from "../context/ThemeContext";
//import ThemeToggle from "../components/ThemeToggle";

const Login = () => {
   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  //const { dark } = useContext(ThemeContext);

  const handleLogin = async () => {
    if (!email || !password) return alert("Fill all fields");

    try {
      setLoading(true);

      const res = await axios.post(
        "https://resumeai-backend-38iy.onrender.com/api/auth/login",
        { email, password }
      );

     localStorage.setItem("ra_token", res.data.token);

// 🔥 ADD THIS LINE
localStorage.setItem("ra_user", JSON.stringify(res.data.user));
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.error || "Login Failed ❌");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    alert("Google login coming soon 🚀");

    // 👉 future backend connect
     window.location.href = "https://resumeai-backend-38iy.onrender.com/api/auth/google";
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2 className="title"> AI Resume Analyzer</h2>
        <p className="subtitle">Login to continue your journey</p>

        {/* EMAIL */}
        <div className="input-box">
          <input
            type="email"
             autoComplete="off" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>

        {/* PASSWORD */}
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
             autoComplete="new-password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>

          {/* 👁️ / 🙈 */}
          <span
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "🙈"}
          </span>
        </div>

        {/* LOGIN BUTTON */}
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* GOOGLE LOGIN */}
        <div className="google-btn" onClick={handleGoogleLogin}>
        <FaGoogle className="google-icon" />
        <span>Continue with Google</span>
        </div>

        {/* FOOTER */}
         <p className="footer">
          New user?{" "}
          <span
            className="register"
            onClick={() => navigate("/register")} // 🔥 FIX
          >
            Register
          </span>
        </p>

      </div>

      {/* ================= CSS ================= */}
      <style>{`

        /* BACKGROUND */
        .login-container {
          height: 100vh;
          padding:20px;
box-sizing:border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #020617, #0f172a, #020617);
          background-size: 400% 400%;
          animation: bgMove 10s ease infinite;
        }

        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* CARD */
        .login-card {
          width:min(420px,100%);
padding:clamp(20px,4vw,30px);
          background: rgba(30,41,59,0.6);
          backdrop-filter: blur(15px);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          text-align: center;
          transition: all 0.3s ease;
        }

        .login-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(59,130,246,0.4);
        }

        /* TITLE */
        .title {
          color: white;
          margin-bottom: 10px;
          font-size: 24px;
        }

        .subtitle {
          color: #94a3b8;
          margin-bottom: 25px;
          font-size: 14px;
        }

        /* INPUT */
        .input-box {
          position: relative;
          margin-bottom: 20px;
        }

        .input-box input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          outline: none;
          background: #020617;
          color: white;
          transition: 0.3s;
        }

        .input-box label {
          position: absolute;
          left: 12px;
          top: 12px;
          color: #94a3b8;
          transition: 0.3s;
          pointer-events: none;
        }

        .input-box input:focus + label,
        .input-box input:valid + label {
          top: -10px;
          font-size: 12px;
          color: #3b82f6;
        }

        .input-box input:focus {
          box-shadow: 0 0 10px #3b82f6;
        }

        /* EYE */
        .eye {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          font-size: 18px;
          transition: 0.3s;
        }

        .eye:hover {
          transform: translateY(-50%) scale(1.2);
        }

        /* BUTTON */
        button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.3s;
        }

        button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px #3b82f6;
        }

        .google-btn {
  margin-top: 15px;
  padding: 12px;
  background: white;
  border-radius: 10px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-weight: 600;
  color: #111; /* 🔥 IMPORTANT FIX */
  transition: 0.3s;
}

.google-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px white;
}

/* ICON */
.google-icon {
  color: #ea4335;
  font-size: 18px;
}

        /* FOOTER */
        .footer {
          margin-top: 15px;
          color: #94a3b8;
          font-size: 14px;
        }

        .register {
          color: #3b82f6;
          cursor: pointer;
        }

        .register:hover {
          text-decoration: underline;
        }

        /* ===========================
TABLET
=========================== */

@media (max-width:992px){

.login-card{

max-width:460px;

}

}

/* ===========================
MOBILE
=========================== */

@media (max-width:768px){

.login-card{

width:100%;

border-radius:18px;

}

.title{

font-size:22px;

}

.subtitle{

font-size:13px;

}

.input-box input{

padding:14px;

font-size:15px;

}

button{

padding:14px;

}

.google-btn{

padding:14px;

font-size:14px;

}

.footer{

font-size:13px;

}

}

      `}</style>

    </div>
  );
};

export default Login;
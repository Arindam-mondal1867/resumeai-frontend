import React, { useState } from "react";
import { registerUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(password);
};

  const handleRegister = async () => {
  // 🔹 Step 1: empty check
  if (!form.name || !form.email || !form.password) {
    return alert("Fill all fields");
  }

  // 🔥 Step 2: password validation add
  if (!validatePassword(form.password)) {
    return alert(
      "Password must be at least 6 characters and include 1 letter & 1 number"
    );
  }
    try {
      await registerUser(form);
      alert("Account created ✅");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Register failed ❌");
    }
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h2 className="title">✨ Create Account</h2>
        <p className="subtitle">Join AI Resume Analyzer</p>

        {/* NAME */}
        <div className="input-box">
         <input
  type="text"
  autoComplete="off"
  required
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>
          <label>Name</label>
        </div>

        {/* EMAIL */}
        <div className="input-box">
         <input
  type="email"
  autoComplete="new-email"
  required
  value={form.email}
  onChange={(e) => setForm({ ...form, email: e.target.value })}
/>
          <label>Email</label>
        </div>

        {/* PASSWORD */}
        <div className="input-box">
          <input
  type="password"
  autoComplete="new-password"
  required
  value={form.password}
  onChange={(e) => setForm({ ...form, password: e.target.value })}
/>
          <label>Password</label>
        </div>

        {/* BUTTON */}
        <button onClick={handleRegister}>
           Create Account
        </button>

        {/* FOOTER */}
        <p className="footer">
          Already have account?{" "}
          <span onClick={() => navigate("/")}>
            Login
          </span>
        </p>

      </div>

      {/* ================= CSS ================= */}
      <style>{`

        /* 🔥 DIFFERENT BACKGROUND */
        .register-container {
          height: 100vh;
          padding:20px;
box-sizing:border-box;
          display: flex;
          justify-content: center;
          align-items: center;

          background: linear-gradient(135deg, #020617, #1e1b4b, #020617);
          background-size: 400% 400%;
          animation: bgMove 12s ease infinite;
        }

        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* CARD */
        .register-card {
          width:min(430px,100%);
padding:clamp(22px,4vw,35px);
          background: rgba(30,41,59,0.6);
          backdrop-filter: blur(15px);
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 50px rgba(0,0,0,0.6);
          text-align: center;
          transition: 0.3s;
        }

        .register-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 70px rgba(139,92,246,0.4);
        }

        /* TITLE */
        .title {
          color: white;
          margin-bottom: 10px;
          font-size: 26px;
        }

        .subtitle {
          color: #a5b4fc;
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
          border-radius: 10px;
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
          color: #8b5cf6;
        }

        .input-box input:focus {
          box-shadow: 0 0 12px #8b5cf6;
        }

        /* BUTTON */
        button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          border: none;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-size: 15px;
          transition: 0.3s;
        }

        button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px #8b5cf6;
        }

        /* FOOTER */
        .footer {
          margin-top: 15px;
          color: #94a3b8;
        }

        .footer span {
          color: #8b5cf6;
          cursor: pointer;
        }

        .footer span:hover {
          text-decoration: underline;
        }

        /* =====================================
TABLET
===================================== */

@media (max-width:992px){

.register-card{

max-width:460px;

}

}

/* =====================================
MOBILE
===================================== */

@media (max-width:768px){

.register-card{

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

font-size:15px;

}

.footer{

font-size:13px;

}

}

      `}</style>

    </div>
  );
};

export default Register;
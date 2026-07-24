import React, { useEffect, useState } from "react";

const ScoreRing = ({ score = 0, size = 150 }) => {
  const [progress, setProgress] = useState(0);

  const radius = size / 2;
  const stroke = 10;

  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  // ================================
  // 🔥 SMOOTH ANIMATION
  // ================================
  useEffect(() => {
    let animationFrame;
    let start = 0;

    const animate = () => {
      start += (score - start) * 0.07;

      if (Math.abs(score - start) < 0.5) {
        start = score;
      } else {
        animationFrame = requestAnimationFrame(animate);
      }

      setProgress(Math.round(start));
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [score]);

  // ================================
  // 🎯 COLOR LOGIC
  // ================================
  const getColor = () => {
    if (score >= 80) return "#22c55e"; // green
    if (score >= 50) return "#facc15"; // yellow
    return "#ef4444"; // red
  };

  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <div
  className="score-ring"
  style={{
    width: size,
    height: size,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    filter: `drop-shadow(0 0 18px ${getColor()})`,
    animation: "ringFloat 3s ease-in-out infinite",
  }}
>
      <svg height={size} width={size}>
        
        {/* ========================= */}
        {/* 🎨 GRADIENT */}
        {/* ========================= */}
        <defs>
          <linearGradient id="gradientStroke">
            <stop offset="0%" stopColor={getColor()} />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* ========================= */}
        {/* BACKGROUND CIRCLE */}
        {/* ========================= */}
        <circle
          stroke="#1e293b"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* ========================= */}
        {/* GLOW LAYER */}
        {/* ========================= */}
        <circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={stroke}
          strokeOpacity="0.2"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* ========================= */}
        {/* PROGRESS CIRCLE */}
        {/* ========================= */}
        <circle
          stroke="url(#gradientStroke)"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 0.4s ease",
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>

      {/* ========================= */}
      {/* 🔥 CENTER TEXT */}
      {/* ========================= */}
      <div
        style={{
          position: "absolute",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {progress}%
        </div>

        <div
          style={{
            fontSize: "12px",
            color: "#94a3b8",
            marginTop: "2px",
          }}
        >
          Match Score
        </div>
      </div>
      <style>{`

@keyframes ringFloat{

0%{
transform:translateY(0px) scale(1);
}

50%{
transform:translateY(-8px) scale(1.03);
}

100%{
transform:translateY(0px) scale(1);
}

}

`}</style>
    </div>
    
  );
};

export default ScoreRing;
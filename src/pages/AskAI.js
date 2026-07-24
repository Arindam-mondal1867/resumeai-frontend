import React, {
  useState,
  useEffect,
  useRef
} from "react";

import axios from "axios";

import ReactMarkdown from "react-markdown";

function AskAI() {

  const [input, setInput] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [listening, setListening] =
    useState(false);

  const recognitionRef =
    useRef(null);

  const messagesEndRef =
    useRef(null);

  // =========================
  // VOICE RECOGNITION
  // =========================

  useEffect(() => {

    const SpeechRecognition =

      window.SpeechRecognition ||

      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      console.log(
        "Speech recognition not supported"
      );

      return;

    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.onstart = () => {

      setListening(true);

    };

    recognition.onend = () => {

      setListening(false);

    };

    recognition.onresult = (event) => {

      const transcript =

        event.results[0][0]
          .transcript;

      setInput(transcript);

    };

    recognition.onerror = (event) => {

      console.log(event.error);

      setListening(false);

    };

    recognitionRef.current =
      recognition;

  }, []);

  // =========================
  // AUTO SCROLL
  // =========================

  useEffect(() => {

    messagesEndRef.current
      ?.scrollIntoView({

        behavior: "smooth"

      });

  }, [messages, loading]);

  // =========================
  // SEND MESSAGE
  // =========================

  const sendMessage =
    async () => {

      if (!input.trim()) return;

      const userText = input;

      const userMessage = {

        role: "user",

        text: userText

      };

      setMessages((prev) => [

        ...prev,

        userMessage

      ]);

      setInput("");

      setLoading(true);

      try {

        const res =
          await axios.post(

            "http://localhost:5000/api/ask-ai",

            {

              message: userText,

              analysis:
                JSON.parse(

                  localStorage.getItem(
                    "analysisData"
                  )

                )

            }

          );

        setMessages((prev) => [

          ...prev,

          {

            role: "assistant",

            text:
              res.data.reply

          }

        ]);

      }

      catch (err) {

        console.log(err);

      }

      setLoading(false);

    };

  // =========================
  // START LISTENING
  // =========================

  const startListening =
    () => {

      if (
        recognitionRef.current
      ) {

        recognitionRef.current
          .start();

      }

    };

  return (

    <div

      style={{

        height: "100vh",

        overflow: "hidden",

        display: "flex",

        flexDirection: "column",

        padding: "clamp(12px,2vw,22px)",

        color: "white",

        background:
          "radial-gradient(circle at top,#0f172a,#020617 60%)",

        backgroundImage: `
linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
`,

        backgroundSize:
          "40px 40px"

      }}

    >

      {/* HERO */}

      <div
        style={{
          marginBottom: "18px"
        }}
      >

        <div

          style={{

            display:
              "inline-block",

            padding:
              "7px 16px",

            borderRadius:
              "999px",

            background:
              "rgba(59,130,246,0.15)",

            color: "#60a5fa",

            fontWeight: "600",

            fontSize: "13px",

            marginBottom:
              "12px"

          }}

        >

          AI Assistant

        </div>

        <h1

          style={{

           fontSize: "clamp(24px,4vw,30px)",

            fontWeight: "800",

            lineHeight: "1",

            margin: 0,

            background:
              "linear-gradient(90deg,#3b82f6,#8b5cf6)",

            WebkitBackgroundClip:
              "text",

            WebkitTextFillColor:
              "transparent"

          }}

        >

          Ask ResumeAI

        </h1>

        <p

          style={{

            color: "#94a3b8",

            fontSize: "14px",

            marginTop: "12px",

            maxWidth: "650px",

            lineHeight: "1.6"

          }}

        >

          AI-powered career assistant
          for resumes, ATS
          optimization, and
          interview preparation.

        </p>

      </div>

      {/* SAMPLES */}

      <div
        style={{
          marginBottom: "18px"
        }}
      >

        <div

          style={{

            color: "#64748b",

            fontSize: "13px",

            fontWeight: "700",

            marginBottom:
              "12px",

            letterSpacing: "1px"

          }}

        >

          SAMPLES:

        </div>

        <div

          style={{

            display: "flex",

            gap: "12px",

            flexWrap: "wrap"

          }}

        >

          {

            [

              "Improve ATS score",

              "Best frontend projects",

              "React interview tips",

              "Improve resume summary",

              "Full stack roadmap"

            ].map(
              (
                item,
                index
              ) => (

                <button

                  key={index}

                  onClick={() =>
                    setInput(item)
                  }

                  onMouseEnter={(
                    e
                  ) => {

                    e.target.style
                      .transform =
                      "translateY(-4px) scale(1.04)";

                    e.target.style
                      .background =
                      "linear-gradient(90deg, rgba(37,99,235,0.28), rgba(124,58,237,0.28))";

                    e.target.style
                      .border =
                      "1px solid rgba(96,165,250,0.45)";

                    e.target.style
                      .boxShadow =
                      "0 10px 30px rgba(59,130,246,0.18)";

                  }}

                  onMouseLeave={(
                    e
                  ) => {

                    e.target.style
                      .transform =
                      "translateY(0px) scale(1)";

                    e.target.style
                      .background =
                      "rgba(15,23,42,0.95)";

                    e.target.style
                      .border =
                      "1px solid rgba(255,255,255,0.05)";

                    e.target.style
                      .boxShadow =
                      "0 4px 18px rgba(0,0,0,0.2)";

                  }}

                  style={{

                    padding:
                      "12px 20px",

                    borderRadius:
                      "18px",

                    border:
                      "1px solid rgba(255,255,255,0.05)",

                    background:
                      "rgba(15,23,42,0.95)",

                    color:
                      "#e2e8f0",

                    cursor:
                      "pointer",

                    fontWeight:
                      "600",

                    fontSize:
                      "14px",

                    transition:
                      "all 0.25s ease",

                    boxShadow:
                      "0 4px 18px rgba(0,0,0,0.2)"

                  }}

                >

                   {item}

                </button>

              )
            )

          }

        </div>

      </div>

      {/* CHAT */}

      <div

        style={{

          flex: 1,

          overflowY: "auto",

          paddingBottom:"120px",

          scrollBehavior:
            "smooth"

        }}

      >

        {

          messages.map(
            (
              msg,
              index
            ) => (

              <div key={index}>

                {/* USER */}

                {

                  msg.role ===
                    "user" && (

                    <div

                      style={{

                        display:
                          "flex",

                        justifyContent:
                          "flex-end",

                        marginBottom:
                          "14px"

                      }}

                    >

                      <div

                        style={{

                         maxWidth:"min(700px,85%)",

                          padding:
                            "14px 18px",

                          borderRadius:
                            "22px",

                          background:
                            "linear-gradient(90deg,#2563eb,#7c3aed)",

                          color:
                            "white",

                          fontSize:
                            "15px",

                          lineHeight:
                            "1.7"

                        }}

                      >

                        {msg.text}

                      </div>

                    </div>

                  )

                }

                {/* AI */}

                {

                  msg.role ===
                    "assistant" && (

                    <div

                      style={{

                        display:
                          "flex",

                        justifyContent:
                          "flex-start",

                        marginBottom:
                          "16px"

                      }}

                    >

                      <div

                        style={{

                         maxWidth:"min(750px,88%)",

                          padding:"clamp(14px,2vw,18px)",

                          borderRadius:
                            "28px",

                          background:
                            "rgba(15,23,42,0.92)",

                          border:
                            "1px solid rgba(255,255,255,0.06)",

                          color:
                            "white",

                          lineHeight:
                            "1.9",

                          fontSize:"clamp(14px,2vw,15px)",

                          boxShadow:
                            "0 8px 30px rgba(0,0,0,0.25)"

                        }}

                      >

                        <ReactMarkdown>

                          {msg.text}

                        </ReactMarkdown>

                      </div>

                    </div>

                  )

                }

              </div>

            )
          )

        }

        {

          loading && (

            <div

              style={{

                marginTop: "20px",

                color:
                  "#94a3b8",

                fontSize: "14px"

              }}

            >

              AI is thinking...

            </div>

          )

        }

        <div
          ref={messagesEndRef}
        ></div>

      </div>

      {/* INPUT */}

      <div

        style={{

          position: "sticky",

          bottom: 0,

          width: "100%",

          paddingBottom:
            "10px",

          background:
            "linear-gradient(to top,#020617 70%,transparent)"

        }}

      >

        <div

          style={{

            display: "flex",

            alignItems:
              "center",

            gap: "12px",

            padding:
  "8px 10px",

            borderRadius:
              "22px",

            background:
              "rgba(15,23,42,0.96)",

            border:
              "1px solid rgba(255,255,255,0.06)",

            backdropFilter:
              "blur(14px)",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.25)"

          }}

        >

          <input

            value={input}

            onChange={(e) =>
              setInput(
                e.target.value
              )
            }

            placeholder="Ask anything about your resume..."

            onKeyDown={(e) => {

              if (
                e.key ===
                "Enter"
              ) {

                sendMessage();

              }

            }}

            style={{

              flex: 1,

              background:
                "transparent",

              border: "none",

              outline: "none",

              color: "white",

              fontSize: "15px",

              padding: "10px"

            }}

          />

          {/* MIC */}

          <div

            onClick={
              startListening
            }

            style={{

             width: "40px",
height: "40px",

              borderRadius:
                "50%",

              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              color: "white",

              cursor: "pointer",

              transition:
                "all 0.25s ease",

              background:
                listening

                  ? "rgba(239,68,68,0.2)"

                  : "transparent",

              border:
                listening

                  ? "1px solid #ef4444"

                  : "1px solid transparent"

            }}

          >

            <svg

              xmlns="http://www.w3.org/2000/svg"

              width="22"

              height="22"

              viewBox="0 0 24 24"

              fill="none"

              stroke="currentColor"

              strokeWidth="2"

              strokeLinecap="round"

              strokeLinejoin="round"

            >

              <path d="M12 1v11" />

              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />

              <line
                x1="12"
                y1="19"
                x2="12"
                y2="23"
              />

              <line
                x1="8"
                y1="23"
                x2="16"
                y2="23"
              />

            </svg>

          </div>

          {/* SEND BUTTON */}

          <button

            onClick={sendMessage}

            disabled={loading}

            onMouseEnter={(e) => {

              e.currentTarget.style
                .transform =
                "scale(1.08)";

              e.currentTarget.style
                .boxShadow =
                "0 0 35px rgba(59,130,246,0.5)";

            }}

            onMouseLeave={(e) => {

              e.currentTarget.style
                .transform =
                "scale(1)";

              e.currentTarget.style
                .boxShadow =
                "0 0 25px rgba(59,130,246,0.25)";

            }}

            style={{

              width: "44px",
height: "44px",
minWidth: "44px",

              borderRadius:
                "50%",

              border: "none",

              cursor: "pointer",

              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              background: "#000",

              color: "white",

              transition:
                "all 0.25s ease",

              boxShadow:
                "0 0 25px rgba(59,130,246,0.25)"

            }}

          >

            {

              loading ? (

                <div

                  style={{

                    width: "18px",

                    height: "18px",

                    border:
                      "2px solid rgba(255,255,255,0.3)",

                    borderTop:
                      "2px solid white",

                    borderRadius:
                      "50%",

                    animation:
                      "spin 1s linear infinite"

                  }}

                />

              ) : (

                <svg

                  xmlns="http://www.w3.org/2000/svg"

                  width="22"

                  height="22"

                  viewBox="0 0 24 24"

                  fill="none"

                  stroke="currentColor"

                  strokeWidth="2.5"

                  strokeLinecap="round"

                  strokeLinejoin="round"

                >

                  <path d="M12 19V5" />

                  <path d="M5 12l7-7 7 7" />

                </svg>

              )

            }

          </button>

        </div>

      </div>

      <style>{`
*{
box-sizing:border-box;
}

@media (max-width:768px){

h1{
line-height:1.2;
}

input{
font-size:14px !important;
}

button{
width:auto;
max-width:100%;
}

}
`}</style>

    </div>

  );

}

export default AskAI;
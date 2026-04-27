"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function SearchComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7012/api/Search?inputValue=Hello name`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Status:", err.response?.status);
        console.error("Error:", err.response?.data); // <-- this shows the real message
      });
  }, []);

  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // Angel Text Effect
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let frame;

    const animate = () => {
      setAngle((prev) => (prev + 1) % 360);
      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  // =======================================

  // moving elements with mouse

  const myRef = useRef(null);
  const myParentRef = useRef(null);

  useEffect(() => {
    const container = myRef.current;
    const parent = myParentRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const elements = container.querySelectorAll(".float");

      elements.forEach((el) => {
        const speed = el.getAttribute("data-speed") || 40;

        const offsetX = (x - centerX) / speed;
        const offsetY = (y - centerY) / speed;

        el.style.setProperty("--mx", `${offsetX}px`);
        el.style.setProperty("--my", `${offsetY}px`);
      });
    };

    parent.addEventListener("mousemove", handleMouseMove);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Voice Recognition

  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser not supported");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();

      recognition.lang = "ar-EG";
      recognition.interimResults = true;

      recognition.onstart = () => setListening(true);

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setText(transcript);
      };

      recognition.onend = () => setListening(false);

      recognitionRef.current = recognition;
    }

    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // ===============================================

  return (
    <div
      ref={myParentRef}
      className="search-section text-center flex flex-col items-center justify-center"
    >
      <div className="up-sec">
        <h1
          className="bg-clip-text text-transparent inline-block"
          style={{
            backgroundImage: `linear-gradient(${angle}deg, #4F46E5, #6366F1, #1F2937)`,
          }}
        >
          Explore the <br /> Infinite.
        </h1>

        <p>
          AI-powered discovery engine for the next generation of creative
          <br />
          minds.
        </p>
      </div>

      <div className="dn-sec searchField flex items-center gap-2">
        <img src="/searchIcon.svg" alt="search-icon" />

        <input
          className="searchInput outline-none"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search or speak..."
        />

        <button
          className={`cursor-pointer ${
            listening ? "shadowListen" : "shadowNo"
          }`}
          onClick={handleVoice}
          style={{
            backgroundImage: listening
              ? "url('/listeningIcon.png')"
              : "url('/micIcon.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "24px",
            backgroundPosition: "center",
            width: "50px",
            height: "50px",
          }}
        />
      </div>
      <div ref={myRef} className="floatingElements h-full w-full absolute ">
        <img
          className="absolute left-80 top-100 z-0 float"
          src="../floating1.svg"
          alt=""
          data-speed="50"
        />
        <img
          className="absolute right-190 bottom-5 z-0 float"
          src="../floating2.svg"
          alt=""
          data-speed="60"
        />
        <img
          className="absolute right-120 top-50 z-0 float"
          src="../floating3.svg"
          alt=""
          data-speed="40"
        />
      </div>
      <div>
        <h1>Data:</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

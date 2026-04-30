"use client";
import { useState, useEffect, useRef, createElement } from "react";
import ResultSearchComponent from "./ResultSearchComponent";

export default function SearchComponent() {
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

  const handleVoice = (lang) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser not supported");
      return;
    }
    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();

      recognition.lang = lang;
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
      setTimeout(() => {
        recognitionRef.current.lang = lang;
        recognitionRef.current.start();
      }, 200);
    }
  };

  // ===============================================
  // Handle Popup Keys Effect

  const popUpTexts = (vl, x, y) => {
    setTimeout(() => {
      const body = document.body;

      const div = document.createElement("div");
      const h1 = document.createElement("h1");
      div.classList.add("popUpText");

      div.style.top = x * 50 + "svh";
      div.style.right = y * 250 + "svh";

      const len = vl.length;
      h1.textContent = vl[len - 1];

      div.appendChild(h1);
      body.appendChild(div);

      setTimeout(() => {
        div.remove();
      }, 800);
    }, 300);
  };

  return (
    <div
      ref={myParentRef}
      className="search-section text-center flex flex-col items-center justify-center"
    >
      <div className="up-sec ">
        <h1
          className="bg-clip-text text-transparent inline-block animate__animated animate__tada"
          style={{
            backgroundImage: `linear-gradient(${angle}deg, #4F46E5, #6366F1, #1F2937)`,
            textShadow: "2px 8px 15px rgba(0, 0, 0, 0.26)",
          }}
        >
          Explore the <br /> Infinite.
        </h1>

        <p>
          Search Fast Be The Fastest One Who Reaches useful
          <br />
          Informations.
        </p>
      </div>

      <div className="dn-sec searchField flex items-center gap-2 animate__animated animate__fadeInUp">
        <img src="/searchIcon.svg" alt="search-icon" />

        <input
          className="searchInput outline-none "
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            popUpTexts(e.target.value, Math.random(), Math.random());
          }}
          placeholder="Search or speak..."
        />

        <button
          command="show-modal"
          commandfor="dialog"
          className="voiceBtn rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
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
        ></button>
        <el-dialog>
          <dialog
            id="dialog"
            aria-labelledby="dialog-title"
            className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
          >
            <el-dialog-backdrop className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

            <div
              tabIndex={0}
              className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0"
            >
              <el-dialog-panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="size-6 text-green-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9Zm0 0c2.5 2.5 4 6 4 9s-1.5 6.5-4 9m0-18c-2.5 2.5-4 6-4 9s1.5 6.5 4 9M3 12h18"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        id="dialog-title"
                        className="text-base font-semibold text-gray-900"
                      >
                        Choose Language
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          We want to know what language are you talking ?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    command="close"
                    commandfor="dialog"
                    onClick={() => {
                      handleVoice("en-US");
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-purple-500 sm:ml-3 sm:w-auto"
                  >
                    English
                  </button>
                  <button
                    type="button"
                    command="close"
                    commandfor="dialog"
                    onClick={() => {
                      handleVoice("ar-EG");
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-xs inset-ring inset-ring-gray-300 hover:bg-purple-500 sm:mt-0 sm:w-auto"
                  >
                    Arabic
                  </button>
                </div>
              </el-dialog-panel>
            </div>
          </dialog>
        </el-dialog>
      </div>

      <ResultSearchComponent valSearchInput={text} />

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
    </div>
  );
}

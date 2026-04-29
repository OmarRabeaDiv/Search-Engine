"use client";
import { useState } from "react";

export default function HeaderNavComponent() {
  const [isOpen, setOpen] = useState(false);

  return (
    <header
      style={{
        padding: "35px 32px",
      }}
    >
      <nav className="flex items-center justify-between h-full">
        <div className="lft-side flex items-center h-full">
          <img
            src={"../Logo.png"}
            alt="Logo Fire"
            className="w-12 select-none"
          />
          <h1 className="titleNavBar text-3xl ml-2 select-none">
            ContentSearch
          </h1>
        </div>
        <div className="rgt-side flex items-center h-full relative">
          <button
            title="Our Credits"
            className="headerBtn flex text-center justify-center shadow-md select-none cursor-pointer border-none transition duration-300 ease-in-out"
            onClick={() => {
              setOpen(!isOpen);
            }}
          >
            <img className="w-6" src="../HumbergerIcon.svg" alt="selectImg" />
          </button>

          <div
            style={{
              padding: "0px",
              height: isOpen ? "200px" : "0px",
              overflowY: "scroll",
              transition: "0.2s ease",
            }}
            className="dragger absolute right-0 top-15 shadow-lg flex flex-col  p-3 text-lg"
          >
            <h1 className="bg-purple-500 text-white w-half text-center rounded-lg m-2 select-none">
              Credits
            </h1>
            <ul className="pl-4 text-sm">
              <li className="mt-2">Mohamed Abdelnasser - Frontend</li>
              <li className="mt-2">Seif el-din karam salah - Backend</li>
              <li className="mt-2">Mazen Mostafa - Scraping</li>
              <li className="mt-2">Omar Rabie - Backend</li>
              <li className="mt-2">Omar Nagy - Scraping</li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

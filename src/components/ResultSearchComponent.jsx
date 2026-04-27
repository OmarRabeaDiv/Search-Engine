import { useState, useEffect } from "react";
import axios from "axios";

export default function ResultSearchComponent({ valSearchInput }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!valSearchInput) return;

    const delay = setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://localhost:7012/api/Search?inputValue=${valSearchInput}`,
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [valSearchInput]);

  if (!valSearchInput || data.length === 0) return null;

  return (
    <div className="resultComponent">
      <div className="content">
        <ul>
          {data.map((item, index) => (
            <li key={index} className="text-start flex items-center">
              <a href="" className="flex items-center gap-2">
                <div className="img">
                  <img
                    className="w-8 h-8"
                    src="./resultIcon.svg"
                    alt="result-icon"
                  />
                </div>
                <p>{/* CALL DATA FROM API HERE */}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

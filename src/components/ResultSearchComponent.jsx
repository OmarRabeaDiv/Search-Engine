import { useState, useEffect } from "react";
import axios from "axios";

export default function ResultSearchComponent({ valSearchInput }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!valSearchInput) return;

    const connect = setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://localhost:7012/api/Search?inputValue=${valSearchInput}`
        );
        console.log(res.data);
        const rawData = res.data;
        const allUrls = Object.values(rawData).flat();

        
        const uniqueUrls = [...new Set(allUrls)];

        setData(uniqueUrls);
      } catch (err) {
        console.log(err);
      }
    }, 500);

    return () => clearTimeout(connect);
  }, [valSearchInput]);

  if (!valSearchInput || data.length === 0) return null;

  return (
    <div className="resultComponent">
      <div className="content">
        <ul>
          {data.map((url, index) => (
            <li key={index} className="text-start flex items-center">
              <a href={url} target="_blank" className="flex items-center gap-2">
                <div className="img">
                  <img
                    className="w-8 h-8"
                    src="./resultIcon.svg"
                    alt="result-icon"
                  />
                </div>
                <p>{url}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
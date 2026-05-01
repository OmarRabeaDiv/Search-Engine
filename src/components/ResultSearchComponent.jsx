import { useState, useEffect } from "react";
import axios from "axios";

export default function ResultSearchComponent({ valSearchInput }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!valSearchInput) return;

    const connect = setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://localhost:7012/api/Search?inputValue=${valSearchInput}`,
        );

        const rawData = res.data;
        const allUrls = Object.values(rawData).flat();
        const uniqueUrls = [...new Set(allUrls)];

        setData(uniqueUrls);
      } catch (err) {
        console.log(err);
      }
    }, 100);

    return () => clearTimeout(connect);
  }, [valSearchInput]);

  if (!valSearchInput || data.length === 0) return null;

  // ! Handling Links
  const highlightQuery = encodeURIComponent(
    valSearchInput.trim().split(/\s+/).join(","),
  );

  return (
    <div className="resultComponent">
      <div className="content">
        <ul>
          {data.map((url, index) => {
            const finalUrl = `${url}?highlight=${highlightQuery}`;

            return (
              <li key={index} className="text-start flex items-center">
                <a
                  href={finalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <div className="img">
                    <img
                      className="w-8 h-8"
                      src="./resultIcon.svg"
                      alt="result-icon"
                    />
                  </div>

                  <p>{url.length > 50 ? url.slice(0, 50) + "..." : url}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

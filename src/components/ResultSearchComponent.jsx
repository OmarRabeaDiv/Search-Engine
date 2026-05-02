import { useState, useEffect } from "react";
import axios from "axios";

export default function ResultSearchComponent({ valSearchInput }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!valSearchInput) return;

    const connect = setTimeout(async () => {
      try {
        // console.log("iam in");
        const res = await axios.get(
          `http://26.172.216.82:5070/api/Search?inputValue=${valSearchInput}`,
        );
        const rawData = res.data;

        // console.log(valSearchInput);
        // const allUrls = Object.values(rawData);
        // console.log(Object.values(rawData).length);

        let finalData = [];
        for (let i = 0; i < Object.values(rawData).length; i++) {
          finalData = finalData.concat(Object.values(rawData)[i]);
        }

        setData(finalData);
      } catch (err) {
        console.log(err);
      }
    }, 500);

    return () => clearTimeout(connect);
  }, [valSearchInput]);

  // * Safety Place
  if (!valSearchInput || data.length === 0) return null;

  return (
    <div className="resultComponent">
      <div className="content">
        <ul>
          {data.map((url, index) => {
            //const words = valSearchInput.split(/\s+/);

            //WORDS = ["HELLO","WORLD"]
            // test = "HELLO"
            /*if (words.length > 1) {
              textToHighlight = words[0];
            }*/

            const finalUrl = `${url}#:~:text=${encodeURIComponent(valSearchInput)}`;

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

                  <p>
                    {window.innerWidth >= 673
                      ? url.slice(0, 50) + "..."
                      : url.slice(0, 20) + "..."}
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

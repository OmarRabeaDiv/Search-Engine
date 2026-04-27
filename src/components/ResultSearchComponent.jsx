import { useState, useEffect } from "react";
import axios from "axios";

export default function ResultSearchComponent({ valSearchInput }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!valSearchInput) return;

    const connect = setTimeout(async () => {
      try {
        const res = await axios.get("www");

        const index = res.data; // your inverted index
        const words = valSearchInput.toLowerCase().split(" ");

        let urls = [];

        if (words.length === 1) {
          // single word
          urls = Object.keys(index[words[0]] || {});
        } else {
          // multi-word phrase (basic intersection for now)
          const docs = words.map((word) => Object.keys(index[word] || {}));

          urls = docs.reduce((acc, curr) =>
            acc.filter((url) => curr.includes(url)),
          );
        }

        setData(urls);
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

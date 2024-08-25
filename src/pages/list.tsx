import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const List = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/list`, { method: "GET" })
      .then((res) => res.json())
      .then((json) => setData(json.ids));
  }, []);

  return (
    <>
      <h1>リスト</h1>
      {data.map((element) => {
        const url = `/list/${element}`;
        return (
          <Link to={url}>
            <p>{element}</p>
          </Link>
        );
      })}
    </>
  );
};

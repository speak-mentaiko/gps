import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type data = {
  id: string;
  data: [
    {
      longitude: number;
      latitude: number;
    }
  ];
};

export const Contents = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<data | undefined>(undefined);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/list/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);
  return (
    <>
      <h1>詳細</h1>
      <p>id:{data?.id}</p>
      {data?.data.map((element) => {
        return (
          <p>
            lon:{element.longitude}
            <br />
            lat:{element.latitude}
            <br />
            ----------------------------
          </p>
        );
      })}
    </>
  );
};

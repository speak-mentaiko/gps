import { useEffect, useState } from "react";
import "./styles/App.css";

export const Home = () => {
  type data = {
    latitude: number;
    longitude: number;
  };

  const [location, setLocation] = useState<data>({ latitude: 0, longitude: 0 });
  const [isWatch, setWatchStatus] = useState(false);
  const [loclist, setLoclist] = useState<data[]>([]);

  const startWatchPosition = () => {
    getLocation();
    setWatchStatus(true);
  };

  const stopWatchPosition = () => {
    setWatchStatus(false);
    fetch(`${import.meta.env.VITE_API_URL}/list/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loclist),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setLoclist([]);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const newLocation = { latitude, longitude };
      setLocation(newLocation);
      setLoclist((prevLoclist) => [...prevLoclist, location]);
    });
  };

  useEffect(() => {
    if (isWatch) {
      const interval = setInterval(() => {
        getLocation();
      }, 10000); // 10秒間隔で実行
      console.log(location);
      return () => clearInterval(interval);
    }
  }, [isWatch, location]);

  return (
    <>
      <button onClick={startWatchPosition}>位置情報取得開始</button>
      <button onClick={stopWatchPosition}>位置情報取得終了</button>
      <div>{location.latitude}</div>
      <div>{location.longitude}</div>
      {isWatch ? <p>記録中</p> : <p></p>}
    </>
  );
};

import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import "./styles/App.css";

export const Home = () => {
  const dataAtom = atom({
    key: "dataAtom",
    default: [
      {
        latitude: 0,
        longitude: 0,
      },
    ],
  });

  const isWatchAtom = atom({
    key: "isWatchAtom",
    default: false,
  });

  const [loclist, setLoclist] = useRecoilState(dataAtom);
  const [isWatch, setWatchStatus] = useRecoilState(isWatchAtom);

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
      setLoclist((prevLoclist) => [...prevLoclist, newLocation]);
    });
  };

  useEffect(() => {
    if (isWatch) {
      const interval = setInterval(() => {
        getLocation();
      }, 10000); // 10秒間隔で実行
      return () => clearInterval(interval);
    }
  }, [isWatch]);

  return (
    <>
      <button onClick={startWatchPosition}>位置情報取得開始</button>
      <button onClick={stopWatchPosition}>位置情報取得終了</button>
      {isWatch ? <p>記録中</p> : <p></p>}
    </>
  );
};

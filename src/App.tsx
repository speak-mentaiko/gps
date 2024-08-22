import { useEffect, useState } from "react";
import "./App.css";

function App() {
  type data = {
    latitude: number;
    longitude: number;
  };

  const [location, setLocation] = useState<data>({ latitude: 0, longitude: 0 });
  const [watchStatus, setWatchStatus] = useState(false);
  const [loclist, setLoclist] = useState<data[]>([]);

  const startWatchPosition = () => {
    setWatchStatus(true);
  };

  const stopWatchPosition = () => {
    setWatchStatus(false);
    setLoclist([]);
  };

  useEffect(() => {
    if (watchStatus) {
      const interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { latitude, longitude };
          setLocation(newLocation);
          setLoclist((prevLoclist) => [...prevLoclist, location]);
        });
      }, 10000); // 10秒間隔で実行
      return () => clearInterval(interval);
    }
  }, [watchStatus, location]);

  return (
    <>
      <button onClick={startWatchPosition}>位置情報取得開始</button>
      <button onClick={stopWatchPosition}>位置情報取得終了</button>
      <div>{location.latitude}</div>
      <div>{location.longitude}</div>
    </>
  );
}

export default App;

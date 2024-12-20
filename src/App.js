import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Clock from "./Clock";
// import "font-awesome/css/font-awesome.min.css"; // + Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [resData, setResData] = useState(null);
  const [location, setLocation] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // API URL
  const apiUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-065?Authorization=CWA-AA4679D5-2248-4FEB-B537-F80379B08E42&LocationName=%E5%A4%A7%E7%A4%BE%E5%8D%80%2C%E9%B3%A5%E6%9D%BE%E5%8D%80%2C%E5%A4%A7%E6%A8%B9%E5%8D%80%2C%E4%BB%81%E6%AD%A6%E5%8D%80%2C%E5%A4%A7%E5%AF%AE%E5%8D%80&ElementName=%E5%A4%A9%E6%B0%A3%E9%A0%90%E5%A0%B1%E7%B6%9C%E5%90%88%E6%8F%8F%E8%BF%B0`;

  useEffect(() => {
    // 請求 API 資料
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API Response:", response.data); // 檢查 API 回應的數據結構
        setResData(response.data.records.Locations[0]); // 修正為 Locations[0]
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("無法獲取天氣資料");
        setLoading(false);
      });
  }, []);

  // 切換所選的區域
  const changeLocation = (locationName) => {
    setLocation(locationName);
    setWeatherType(""); // 重置氣候選項
  };

  // 切換氣候選項
  const changeElement = (elementName) => {
    setWeatherType(elementName);
  };

  // 切換黑暗模式
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }; /*  */

  // 顯示Loading和錯誤訊息
  if (loading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`weather-container ${darkMode ? "dark" : ""}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "切換為無背景模式" : "切換為有背景模式"}
      </button>
      <div className="forclock">
        <Clock />
      </div>
      <h3>{resData?.DatasetDescription}</h3>
      <h5>
        縣市：{resData?.LocationsName} (ID：{resData?.Dataid})
      </h5>
      <h5>區域：{location}</h5>
      <div className="location-buttons">
        {resData?.Location?.map((res, index) => (
          <button
            key={index}
            className="location-button"
            onClick={() => changeLocation(res.LocationName)}
          >
            {res.LocationName}
          </button>
        ))}
      </div>

      <h5>氣候選項：{weatherType}</h5>
      {resData?.Location?.map(
        (res, index) =>
          res.LocationName === location &&
          res.WeatherElement?.map((weather, index) => (
            <button
              key={index}
              className="weather-type-button"
              onClick={() => changeElement(weather.ElementName)}
            >
              {weather.ElementName}
              <FontAwesomeIcon icon={faHome} />
              {/* //不知道為何只有這可以用 */}
            </button>
          ))
      )}

      <div className="weather-info">
        {resData?.Location?.map(
          (res, index) =>
            res.LocationName === location &&
            res.WeatherElement?.map(
              (weather, index) =>
                weather.ElementName === weatherType &&
                weather.Time?.map((time, index) => (
                  <div key={index} className="weather-card">
                    <h5 className="time-range">
                      {time.StartTime} ————— {time.EndTime}
                    </h5>
                    <div className="weather-description">
                      <p>{time.ElementValue[0]?.WeatherDescription}</p>
                    </div>
                  </div>
                ))
            )
        )}
      </div>
    </div>
  );
}

export default App;

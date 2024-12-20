import "./clock.css";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const deg = 6;
    const hr = document.querySelector("#hr");
    const mn = document.querySelector("#mn");
    const sc = document.querySelector("#sc");

    setInterval(() => {
      let day = new Date();
      let h = day.getHours() * 30;
      let m = day.getMinutes() * deg;
      let s = day.getSeconds() * deg;

      hr.style.transform = `rotateZ(${h + m / 12}deg)`;
      mn.style.transform = `rotateZ(${m}deg)`;
      sc.style.transform = `rotateZ(${s}deg)`;
    }, 1000);
  }, []);

  return (
    <div className="clock">
      <div className="twol">12</div>
      <div className="three">-3</div>
      <div className="six">6</div>
      <div className="nine">9-</div>
      <div className="hour">
        <div className="hr" id="hr"></div>
      </div>
      <div className="min">
        <div className="mn" id="mn"></div>
      </div>
      <div className="sec">
        <div className="sc" id="sc"></div>
      </div>
    </div>
  );
}

export default App;

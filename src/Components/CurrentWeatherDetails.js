import React from "react";
import styles from "../Styles/CurrentWeatherDetails.module.css";
import CircleProgressBar from "./CircleProgressBar";

const CurrentWeatherDetails = (props) => {
  return (
    <div className={styles.daily_weather_infos}>
      {props.children}
      <hr />
      <div className={styles.infos}>
        <div className={styles.item}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <p className={styles.title}>sunrise</p>
              <img
                className={styles.icon}
                src="./icons/sunrise.png"
                alt="sunrise"
              />
            </div>
            <p className={styles.time}>{props.sunrise}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <p className={styles.title}>sunset</p>
              <img
                className={styles.icon}
                src="./icons/sunset.png"
                alt="sunset"
              />
            </div>
            <p className={styles.time}>{props.sunset}</p>
          </div>
        </div>
        <div className={styles.item}>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div>
                <p className={styles.title}>moonrise</p>
                <img
                  className={styles.icon}
                  src="./icons/moonrise.png"
                  alt="sunrise"
                />
              </div>
              <p className={styles.time}>{props.moonrise}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <p className={styles.title}>moonset</p>
                <img
                  className={styles.icon}
                  src="./icons/moonset.png"
                  alt="sunset"
                />
              </div>
              <p className={styles.time}>{props.moonset}</p>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <p className={styles.title} style={{ marginBottom: "15px" }}>
            Moon phase
          </p>
          <div className={styles.moon}>
            <div
              style={{ transform: `rotateY(${props.moonphase}deg)` }}
              className={styles.disk}
            ></div>
          </div>
        </div>
        <div className={`${styles.item} ${styles.charts_container}`}>
          <div className={styles.chart_container}>
            <h1>humidity</h1>
            {/* circle progress bar tekes a prop
            percent: the percent that it should fill the bar */}
            <CircleProgressBar percent={props.humidity} />
          </div>
          <div className={styles.chart_container}>
            <h1>precipation</h1>
            <CircleProgressBar percent={props.precipitation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherDetails;

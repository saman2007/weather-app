import React from "react";
import styles from "../Styles/CurrentWeather.module.css";

const CurrentWeather = (props) => {
  return (
    <div className={styles.current_weather_container}>
      <h1 className={styles.place}>{props.place}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <img
          className={styles.weather_icon}
          src={`https://www.foreca.com/public/images/symbols/${props.icon}`}
          alt="weather icon"
        />
        <p className={styles.temp}>
          {props.temp}
          <sup>°</sup>
        </p>
        <div
          style={{ display: "flex", flexFlow: "column", marginLeft: "20px" }}
        >
          {/* if user clicked on one of the button,
           check if tempSign is F or C then change the App component temp sign state to C or F */}
          {/* if tempSign is F or C add active class to the button */}
          <button
            onClick={() => {
              if (props.tempSign === "F") {
                props.changeTempSign("C");
              }
            }}
            className={`${styles.temp_sign} ${
              props.tempSign === "C" ? styles.active : ""
            }`}
          >
            C
          </button>
          <button
            onClick={() => {
              if (props.tempSign === "C") {
                props.changeTempSign("F");
              }
            }}
            className={`${styles.temp_sign} ${
              props.tempSign === "F" ? styles.active : ""
            }`}
          >
            F
          </button>
        </div>
      </div>
      <h2 className={styles.situation}>{props.situation}</h2>
      <h2 className={styles.time}>Updated as of {props.time}</h2>
      <div className={styles.more_infos}>
        <p>Humidity: {props.Humidity} %</p>
        <p>
          Dew Point: {props.DewPoint}
          <sup>°</sup>
        </p>
        <p>Wind: {props.Wind} km/h</p>
        <p>Visibility: {props.Visibility} km</p>
      </div>
    </div>
  );
};

export default CurrentWeather;

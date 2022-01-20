import styles from "../Styles/DailyForecastItem.module.css";

const DailyForecastItem = (props) => {
  return (
    //if user clicked on a day container, change the apps selected day to its day
    <div
      onClick={() => {
        props.selectDay(props.day);
      }}
      className={`${styles.weather_item} ${
        //if its day is equal to selected day in app component, add selected class
        props.selectedDay === props.day ? styles.selected : ""
      }`}
    >
      <h1 className={styles.date}>{props.date}</h1>
      <img
        src={`https://www.foreca.com/public/images/symbols/${props.icon}`}
        alt="weather icon"
      />
      <div style={{display: "flex", justifyContent: "space-around", alignItems: "flex-end", width: "50%"}}>
        <p>
          {props.temp}
          <sup>°</sup>
        </p>
        <p style={{fontSize: "15px"}}>
          {props.minTemp}
          <sup>°</sup>
        </p>
      </div>
      <p>{props.situation}</p>
    </div>
  );
};

export default DailyForecastItem;

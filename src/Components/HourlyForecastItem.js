import styles from "../Styles/HourlyForecastItem.module.css";

const HourlyForecastItem = (props) => {
  return (
    <div className={styles.hourly_forecast_item}>
      <img
        src={`https://www.foreca.com/public/images/symbols/${props.icon}`}
        alt="icon"
        className={styles.icon}
      />
      <p className={styles.temp}>
        {props.temp}
        <sup>°</sup>
      </p>
      <p className={styles.situation}>{props.situation}</p>
      <p
        style={{
          marginBottom: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="25"
          height="25"
          viewBox="0 0 172 172"
          style={{ fill: "#000000" }}
        >
          <g
            fill="none"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
            style={{ mixBlendMode: "normal" }}
          >
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g fill="#000000">
              <path d="M58.7165,149.7475c0.65217,0.50883 1.43333,0.7525 2.20017,0.7525c1.06783,0 2.12133,-0.473 2.83083,-1.38317l50.16667,-64.5c1.21833,-1.56233 0.93167,-3.81267 -0.6235,-5.02383c-1.56233,-1.2255 -3.8055,-0.93167 -5.031,0.63067l-50.16667,64.5c-1.21833,1.55517 -0.93883,3.81267 0.6235,5.02383z"></path>
              <path d="M100.33333,121.83333c-7.90483,0 -14.33333,6.4285 -14.33333,14.33333c0,7.90483 6.4285,14.33333 14.33333,14.33333c7.90483,0 14.33333,-6.4285 14.33333,-14.33333c0,-7.90483 -6.4285,-14.33333 -14.33333,-14.33333zM100.33333,143.33333c-3.94883,0 -7.16667,-3.21067 -7.16667,-7.16667c0,-3.956 3.21783,-7.16667 7.16667,-7.16667c3.94883,0 7.16667,3.21067 7.16667,7.16667c0,3.956 -3.21783,7.16667 -7.16667,7.16667z"></path>
              <path d="M71.66667,107.5c7.90483,0 14.33333,-6.4285 14.33333,-14.33333c0,-7.90483 -6.4285,-14.33333 -14.33333,-14.33333c-7.90483,0 -14.33333,6.4285 -14.33333,14.33333c0,7.90483 6.4285,14.33333 14.33333,14.33333zM71.66667,86c3.94883,0 7.16667,3.21067 7.16667,7.16667c0,3.956 -3.21783,7.16667 -7.16667,7.16667c-3.94883,0 -7.16667,-3.21067 -7.16667,-7.16667c0,-3.956 3.21783,-7.16667 7.16667,-7.16667z"></path>
              <path d="M35.26,143.03233c8.987,16.39733 25.85733,27.14017 45.13567,28.73833c1.84183,0.14333 3.71233,0.22933 5.60433,0.22933c1.892,0 3.7625,-0.086 5.61867,-0.22933c19.264,-1.59817 36.13433,-12.341 45.12133,-28.73833c8.5355,-15.57317 8.73617,-34.17067 0.53033,-49.751l-48.10267,-91.36783c-1.23983,-2.35067 -5.10267,-2.35067 -6.3425,0l-48.0955,91.36783c-8.20583,15.58033 -8.00517,34.17783 0.53033,49.751zM41.065,96.621l44.935,-85.34783l44.935,85.34783c7.18817,13.64533 7.01617,29.3045 -0.473,42.96417c-7.83317,14.276 -22.56783,23.64283 -39.42383,25.04033c-3.311,0.26517 -6.76533,0.26517 -10.05483,0c-16.86317,-1.3975 -31.605,-10.76433 -39.431,-25.04033c-7.5035,-13.65967 -7.66833,-29.31167 -0.48733,-42.96417z"></path>
            </g>
          </g>
        </svg>
        {props.humidity}%
      </p>
      <p
        style={{
          marginBottom: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://img.icons8.com/ios-glyphs/25/000000/wind--v1.png"
          alt="wind"
        />
        {props.windSpeed} km/h
      </p>
      <p style={{ marginBottom: "5px" }}>{props.hour}</p>
    </div>
  );
};

export default HourlyForecastItem;

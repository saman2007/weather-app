import styles from "../Styles/ForecastContainer.module.css";

const ForecastContainer = (props) => {
    return (
        <div className={styles.daily_forecast_container}>
            {props.children}
        </div>
    )
}

export default ForecastContainer;
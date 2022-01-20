import styles from "../Styles/CircleProgressBar.module.css";

const CircleProgressBar = (props) => {
  let rightDegree = 0;
  let leftDegree = 0;
  
  //if (props.percent * 0.01) * 360 is bigger than 180, it means that the bar should be bigger than 180 
  //else it means percent is less than 50
  if ((props.percent * 0.01) * 360 > 180) {
    rightDegree = 180;
    leftDegree = (props.percent * 0.01) * 180;
  } else {
    rightDegree = (props.percent * 0.01) * 360;
  }

  return (
    <div className={styles.circular}>
      <div className={styles.inner}></div>
      <div className={styles.number}>{props.percent + "%"}</div>
      <div className="circle">
        <div className={`${styles.bar}`}>
          <div
            className={styles.progress}
            //right degree is for the first 50%
            style={{ transform: `rotate(${rightDegree}deg)` }}
          ></div>
        </div>
        <div className={`${styles.bar} ${styles.left}`}>
          <div
            className={styles.progress}
            //left degree is for the second 50%
            style={{ transform: `rotate(${leftDegree}deg)` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CircleProgressBar;

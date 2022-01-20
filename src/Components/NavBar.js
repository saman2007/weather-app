import styles from "../Styles/NavBar.module.css";

const NavBar = (props) => {
  return (
    <nav className={styles.nav}>
      <h2 className={styles.title}>Weather Forecast App</h2>
      {props.children}
    </nav>
  );
};

export default NavBar;

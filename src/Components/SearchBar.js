import React, { useState, useRef, useImperativeHandle } from "react";
import styles from "../Styles/SearchBar.module.css";

//this component forwards its ref to app component
const SearchBar = React.forwardRef((props, ref) => {
  //a state to store the users entered city
  const [city, setCity] = useState("");
  //buttons ref
  const searchBtn = useRef();
  //forwarding some functions to work with search btn's dom property
  useImperativeHandle(ref, () => {
    return {
      //disable function is to disable the search btn
      disable: () => {
        searchBtn.current.disabled = true;
      },
      //enable function is to enable search btn
      enable: () => {
        searchBtn.current.disabled = false;
      },
    };
  });
  return (
    <form
      className={styles.form}
      /* if user submit the city name,
      disable the first button and the send the city name to fetchDatas function in app
      component */
      onSubmit={(e) => {
        e.preventDefault();
        searchBtn.current.disabled = true;
        props.getResults(city);
      }}
    >
      <input
        className={styles.search_bar}
        type="text"
        placeholder="enter a city name"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <button type="submit" className={styles.search} ref={searchBtn}>
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
});

export default SearchBar;

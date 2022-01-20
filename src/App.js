import React, { useMemo, useState, useEffect, useRef } from "react";
import CurrentWeather from "./Components/CurrentWeather";
import ForecastContainer from "./Components/ForecastContainer";
import DailyForecastItem from "./Components/DailyForecastItem";
import Main from "./Components/Main";
import NavBar from "./Components/NavBar";
import SearchBar from "./Components/SearchBar";
import "./Reset.css";
import styles from "./Styles/App.module.css";
import HourlyForecastItem from "./Components/HourlyForecastItem";
import CurrentWeatherDetails from "./Components/CurrentWeatherDetails";

const App = () => {
  //state for the day selection
  const [selectedDay, setSelectedDay] = useState(0);
  //state to change the kind of temp or etc
  const [tempSign, setTempSign] = useState("C");
  //to store the weather infos like current weather and daily weather and etc
  const [weatherInfos, setWeatherInfos] = useState({});
  //to select the background randomly and dont change the number for every render of app component i use useMemo
  const bgNumber = useMemo(() => Math.floor(Math.random() * 7) + 1, []);
  //to show the loading
  const [loading, setLoading] = useState(false);
  //to show the error
  const [error, setError] = useState(false);

  //to disable and enable the search button, i use useRef hook
  const searchBtn = useRef();
  //i want to get the users location to show the weather of his/her city
  useEffect(() => {
    //window.navigator.geolocation is unavailable in some browsers so i put it in an if statement
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (location) => {
          //show the loading
          setLoading(true);
          //disable the search button
          searchBtn.current.disable();
          //fetch the city infos with longitude and latitude to get the city name
          fetch(
            `https://fnw-us.foreca.com/api/v1/location/${location.coords.longitude},${location.coords.latitude}`,
            {
              method: "GET",
              headers: {
                Authorization:
                  "*",
              },
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((value) => {
              //to get the other weather infos i call fetchDatas
              fetchDatas({ type: "get_weather_c", city_name: value.name });
            });
        },
        (fail) => {}
      );
    }
    //execute this function only in first render of App
  }, []);

  //a fnction to return the hurlyForcast components
  function getHourlyForecastItems() {
    //to store the lists of components
    let lists = [];

    //to filter the hourly forcasts data using the index
    weatherInfos.hourly_forecast.c
      .filter(
        (value, index) =>
          //return only the 24 indexes that for a specific day
          index >= selectedDay * 24 && index < selectedDay * 24 + 24
      ) //after filtering the objects we should oush components with their props to lists array
      .every((value, index) => {
        //store the hour number
        let time = new Date(value.time).getHours();
        //push the hourly forecast item to the lists
        lists.push(
          <HourlyForecastItem
            //if hour is bigger than 12 add pm to it else add am
            hour={time > 12 ? time + "  pm" : time + "  am"}
            icon={value.symbol + ".svg"}
            situation={value.symbolPhrase}
            //if temp sign is c get c temp else get f temp
            temp={
              tempSign === "C"
                ? weatherInfos.hourly_forecast.c[index].temperature
                : weatherInfos.hourly_forecast.f[index].temperature
            }
            windSpeed={value.windSpeed}
            humidity={value.relHumidity}
            key={index}
          />
        );

        //to make every continue i should return true
        return true;
      });
    //return the lists of hourly item component
    return lists;
  }

  //a function to return daily forecast items
  function getDailyForecastItems() {
    //to select the day name, i store them in an array
    let weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    //to store daily forecast items component
    let items = [];
    //push daily forecast item in items for each item
    weatherInfos.daily_forecast.c.forEach((value, index) => {
      let date = new Date(value.date);
      items.push(
        <DailyForecastItem
          day={index}
          selectedDay={selectedDay}
          date={weekDays[date.getDay()] + "     " + date.getDate()}
          icon={value.symbol + ".svg"}
          temp={
            tempSign === "C"
              ? weatherInfos.daily_forecast.c[index].maxTemp
              : weatherInfos.daily_forecast.f[index].maxTemp
          }
          minTemp={
            tempSign === "C"
              ? weatherInfos.daily_forecast.c[index].minTemp
              : weatherInfos.daily_forecast.f[index].minTemp
          }
          situation={value.symbolPhrase}
          selectDay={setSelectedDay}
          key={index}
        />
      );
    });
    return items;
  }

  //a function to get the full weather infos
  /* 
  it gets an object with two key
  type select that the function should get details with C or F
  city_name is for getting the weather infos of that city
  */
  function fetchDatas(action) {
    //set error false if it is true
    if (error) setError(false);
    //a function to store the informations
    let informations = {};
    //if action.type is get_weather_c get c weather
    if (action.type === "get_weather_c") {
      //show the loading
      setLoading(true);
      //to get the city informations
      fetch(
        `https://fnw-us.foreca.com/api/v1/location/search/${action.city_name}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "*",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((city) => {
          //store the first city location in city_infos property
          informations.city_infos = city.locations[0];
          fetch(
            `https://fnw-us.foreca.com/api/v1/current/${city.locations[0].id}?windunit=KMH&dataset=full`,
            {
              method: "GET",
              headers: {
                Authorization:
                  "*",
              },
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((current) => {
              //create current_weather propersty
              informations.current_weather = {};
              //store the current weather infos in c
              informations.current_weather["c"] = current.current;
              fetch(
                `https://fnw-us.foreca.com/api/v1/forecast/daily/${city.locations[0].id}?windunit=KMH&dataset=full&periods=7`,
                {
                  method: "GET",
                  headers: {
                    Authorization:
                      "*",
                  },
                }
              )
                .then((response) => {
                  return response.json();
                })
                .then((daily_forecast) => {
                  //create daily_forecast property
                  informations.daily_forecast = {};
                  //store daily forecasts in c
                  informations.daily_forecast["c"] = daily_forecast.forecast;
                  fetch(
                    `https://fnw-us.foreca.com/api/v1/forecast/hourly/${city.locations[0].id}?windunit=KMH&dataset=full&periods=168`,
                    {
                      method: "GET",
                      headers: {
                        Authorization:
                          "*",
                      },
                    }
                  )
                    .then((response) => {
                      return response.json();
                    })
                    .then((hourly_weather) => {
                      //create hourly_forecast property
                      informations.hourly_forecast = {};
                      //add hourly forecasts in c property
                      informations.hourly_forecast["c"] =
                        hourly_weather.forecast;
                      //the default request is for celcius so if temp sign is f set it to c
                      if (tempSign === "F") setTempSign("C");
                      //disable the loading
                      setLoading(false);
                      //enable the search btn so user can search for other cities weather
                      searchBtn.current.enable();
                      //set the weatherInfos to all of the informations
                      setWeatherInfos(informations);
                    });
                });
            });
        })
        .catch((reason) => {
          //if there is an error, show error
          setError(true);
          //disable loading
          setLoading(false);
          //enable search button
          searchBtn.current.enable();
        });
    }
    //if action.type is get_weather_f get the weather with farenhite
    if (action.type === "get_weather_f") {
      /*
      i add farnhite version of infos to their specific property 
      so just send request for farenhite weather if current weather doesnt have f property
      if current weather has f property it means other parts like hourly weather and etc have f
      */
      if (weatherInfos.current_weather.f === undefined) {
        searchBtn.current.disable();
        informations = weatherInfos;
        setLoading(true);
        fetch(
          `https://fnw-us.foreca.com/api/v1/current/${informations.city_infos.id}?windunit=KMH&dataset=full&tempunit=F`,
          {
            method: "GET",
            headers: {
              Authorization:
                "*",
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((current) => {
            informations.current_weather["f"] = current.current;
            fetch(
              `https://fnw-us.foreca.com/api/v1/forecast/daily/${informations.city_infos.id}?windunit=KMH&dataset=full&tempunit=F&periods=7`,
              {
                method: "GET",
                headers: {
                  Authorization:
                    "*",
                },
              }
            )
              .then((response) => {
                return response.json();
              })
              .then((daily_forecast) => {
                informations.daily_forecast["f"] = daily_forecast.forecast;
                fetch(
                  `https://fnw-us.foreca.com/api/v1/forecast/hourly/${informations.city_infos.id}?windunit=KMH&dataset=full&tempunit=F&periods=168`,
                  {
                    method: "GET",
                    headers: {
                      Authorization:
                        "*",
                    },
                  }
                )
                  .then((response) => {
                    return response.json();
                  })
                  .then((hourly_weather) => {
                    informations.hourly_forecast["f"] = hourly_weather.forecast;
                    setLoading(false);
                    setWeatherInfos(informations);
                    searchBtn.current.enable();
                    setTempSign("F");
                  });
              });
          })
          .catch((reason) => {
            setError(true);
            setLoading(false);
            searchBtn.current.enable();
          });
        //if current weather has f property
      } else {
        //set temp sign to F
        setTempSign("F");
      }
    }
  }

  return (
    <React.Fragment>
      {/* for bacground */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `url(../background_photos/${bgNumber}.jpg)`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          position: "fixed",
        }}
      ></div>

      {/* navigation bar */}
      <NavBar>
        {/* search bar with ref prop and getResult prop to get send request */}
        <SearchBar
          ref={searchBtn}
          getResults={(name) => {
            fetchDatas({ type: "get_weather_c", city_name: name });
          }}
        />
      </NavBar>
      {/* main component */}
      <Main>
        {/* if loading is true show the loading */}
        {loading && (
          <div className={styles.loading_container}>
            <img src="./loading/loading.gif" alt="loading..." />
            <h1>getting weather datas...</h1>
          </div>
        )}
        {/* if error is true show the error */}
        {error && (
          <div className={styles.error}>
            <h1>
              <i class="fas fa-exclamation"></i> an error occured
            </h1>
          </div>
        )}

        {/* if weather infos object has property show the other components */}
        {Object.keys(weatherInfos).length !== 0 && (
          <>
            {/* currentweather to show the current weather of a city */}
            {/*
          place: it is for city name and country
          icon: it is for weather icon
          temp: it is for temperature
          tempSighn: to show what kind of weather infos is displaying(c or f)
          situation: weather situation
          changeTemp: if user want to see weather infos with farenhite or celcius
          humidity: it is for humidity
          dew point: it is for dew point
          wind: wind speed with km/h
          Visibility: visibility
          time: to show the time
          */}
            <CurrentWeather
              place={`${weatherInfos.city_infos.country}, ${weatherInfos.city_infos.name}`}
              icon={`${weatherInfos.current_weather.c.symbol}.svg`}
              temp={
                tempSign === "C"
                  ? weatherInfos.current_weather.c.temperature
                  : weatherInfos.current_weather.f.temperature
              }
              tempSign={tempSign}
              situation={weatherInfos.current_weather.c.symbolPhrase}
              changeTempSign={(sign) => {
                if (tempSign === "C") fetchDatas({ type: "get_weather_f" });
                if (tempSign === "F") setTempSign("C");
              }}
              Humidity={weatherInfos.current_weather.c.relHumidity}
              DewPoint={
                tempSign === "C"
                  ? weatherInfos.current_weather.c.dewPoint
                  : weatherInfos.current_weather.f.dewPoint
              }
              Wind={weatherInfos.current_weather.c.windSpeed}
              Visibility={(
                weatherInfos.current_weather.c.visibility / 1000
              ).toFixed(2)}
              time={`${new Date(
                weatherInfos.current_weather.c.time
              ).getHours()}:${new Date(
                weatherInfos.current_weather.c.time
              ).getMinutes()}`}
            />

            {/* forecast container that its children are daily forecast */}
            <ForecastContainer>
              <h1 className={styles.list_title}>Daily weather forecast</h1>
              <div className={styles.list}>{getDailyForecastItems()}</div>
            </ForecastContainer>

            {/* forecast container that its children are hourly forecast */}
            <ForecastContainer>
              <h1 className={styles.list_title}>Hourly weather forecast</h1>
              <div className={styles.list}>{getHourlyForecastItems()}</div>
            </ForecastContainer>

            {/* a component to show more detail of the day
              sunrise: time of sunrise
              sunset: time of sunset
              moonrise: time of moonrise
              moonset: time of moonset
              moonphase: the degree of moon phase
              humidity: the percent of humidity
              precipitation: the percent of precipitation
            */}
            <CurrentWeatherDetails
              sunrise={weatherInfos.daily_forecast.c[0].sunrise}
              sunset={weatherInfos.daily_forecast.c[0].sunset}
              moonrise={weatherInfos.daily_forecast.c[0].moonrise}
              moonset={weatherInfos.daily_forecast.c[0].moonset}
              moonphase={weatherInfos.daily_forecast.c[0].moonPhase}
              humidity={weatherInfos.daily_forecast.c[0].minRelHumidity}
              precipitation={weatherInfos.daily_forecast.c[0].precipProb}
            >
              <h1 className={styles.list_title}>Day details</h1>
            </CurrentWeatherDetails>
          </>
        )}
      </Main>
    </React.Fragment>
  );
};

export default App;

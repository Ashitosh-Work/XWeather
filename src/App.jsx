import { useState } from 'react';
import "./App.css"

const Card = ({ text, info }) => {
  return (
    <div className='weather-card'>
      <h3>{text}</h3>
      <p>{info}</p>
    </div>
  )
}

function App() {

  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "93ef1a5af98641c6b27135421240911";
  const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  const fetchData = async () => {
    try {
      let res = await fetch(URL);
      let data = await res.json();
      return data;
    }
    catch {
      alert("Failed to fetch weather data");
    }
  }

  const changeHandler = (event) => {
    setCity(event.target.value);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setShowCard(false);
    setIsLoading(true);
    let fetchedData = await fetchData();
    try {
      if (fetchedData.current.temp_c) {
        setWeatherData(fetchedData);
        setIsLoading(false);
        setShowCard(true);
      }
      console.log("tried")
    } catch {
      alert("Failed to fetch weather data");
    }
  }

  return (
    <div className='App'>
      <h1>XWEATHER</h1>
      <form onSubmit={(event) => submitHandler(event)} className='search-bar'>
        <input type='text' required value={city} onChange={(event) => changeHandler(event)} placeholder='Enter city name' name='city' />
        <button>Search</button>
      </form>
      {isLoading ? <p>Loading data...</p> : null}
      {showCard ?
        <div className='weather-cards'>
          <Card text={"Temperature"} info={`${weatherData.current.temp_c} °C`} />
          <Card text={"Humidity"} info={`${weatherData.current.humidity}%`} />
          <Card text={"Condition"} info={`${weatherData.current.condition.text}`} />
          <Card text={"Wind Speed"} info={`${weatherData.current.wind_kph} kph`} />
        </div> :
        null
      }
    </div>
  )
}

export default App

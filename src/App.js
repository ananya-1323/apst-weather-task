import React, {useState} from "react";
import backgroundImage from './assets/sunset.jpg';
import './styles.css'; 

import axios from "axios";
function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=794ee95e63c5a32aaf88cd813fa2e425`
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="search">
      <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text" />
    </div>
    <div className="container">
      <div className="top">
        <div className="location">
        {data.name ? <p className="bold large">{data.name}</p> : null}
        </div>
        <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>

      {data.name !== undefined && (
  <div className="bottom">
    <div className="info-box">
      <div className="feels">
        {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
        <p>Feels Like</p>
      </div>
    </div>
    <div className="info-box">
      <div className="humidity">
        {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
        <p>Humidity</p>
      </div>
    </div>
    <div className="info-box">
      <div className="wind">
        {data.wind ? <p className="bold">{(data.wind.speed * 3.6).toFixed()} KMPH</p> : null}
        <p>Wind Speed</p>
      </div>
    </div>
  </div>
)}




    </div>
  </div>
);
}

export default App;
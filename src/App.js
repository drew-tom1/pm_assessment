import './App.css';
import { useState } from 'react';

function App() {
  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState({
    temp: 'N/A',
    temp_min: 'N/A',
    temp_max: 'N/A',
    feels_like: 'N/A'
  })
  const API_KEY = process.env.REACT_APP_API_KEY


  async function handleWeather() {
    try {
      const coordinates = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`)
      const coordinateData = await coordinates.json()

      const {lat, lon} = coordinateData[0]

      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`)
      const weatherData = await weatherResponse.json()

      setWeather({
        temp: weatherData.main.temp,
        temp_min: weatherData.main.temp_min,
        temp_max: weatherData.main.temp_max,
        feels_like: weatherData.main.feels_like
      })
    } catch (err) {
        console.error('Error', err)
    }
  }
  
  return (
    <div>
      <input onChange={(e) => setLocation(e.target.value)} />
      <button onClick={handleWeather}>Search</button>
      {weather && (
        <table>
          <tbody>
            <tr>
              <td>Current Temp:</td>
              <td>{weather.temp}°F</td>
            </tr>
            <tr>
              <td>Lowest Temp:</td>
              <td>{weather.temp_min}°F</td>
            </tr>
            <tr>
              <td>Highest Temp:</td>
              <td>{weather.temp_max}°F</td>
            </tr>
            <tr>
              <td>Feels Like:</td>
              <td>{weather.feels_like}°F</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App;

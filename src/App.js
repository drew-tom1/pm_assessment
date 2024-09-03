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
      <p>
        The Product Manager Accelerator Program is designed to support PM professionals through every stage of their career. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.

        Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavours.

        Learn product management for free today on our YouTube channel 
        https://www.youtube.com/c/drnancyli?sub_confirmation=1

        Interested in PM Accelerator Pro? 
        Step 1️⃣: Attend the Product Masterclass to learn more about the program details, price, different packages, and stay until the end to get FREE  AI Course. 

        Learn how to create a killer product portfolio 2 two weeks that will help you land any PM job( traditional or AI) even if you were laid off or have zero PM experience

        https://www.drnancyli.com/masterclass

        Step 2️⃣: Reserve your early bird ticket and submit an application to talk to our Head of Admission

        Step 3️⃣: Successful applicants join our PMA Pro community to receive customized coaching!
      </p>
      <input onChange={(e) => setLocation(e.target.value)} placeholder='enter a city' />
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

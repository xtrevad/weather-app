import { format, fromUnixTime } from 'date-fns';

const displayCurrentWeatherCard = (weatherPacket) => {
  const container = document.getElementsByClassName(
    'current-card-container'
  )[0];
  // Clean up
  if (container.firstChild) {
    container.firstChild.remove();
  }
  const card = document.createElement('div');
  card.classList.add('current-weather-card');
  const cardLeft = document.createElement('div');
  cardLeft.classList.add('card-left');
  card.appendChild(cardLeft);
  const cardRight = document.createElement('div');
  cardRight.classList.add('card-right');
  card.appendChild(cardRight);
  // City name display
  const title = document.createElement('h2');
  title.textContent = weatherPacket.city_name;
  cardLeft.appendChild(title);
  // Icon display
  const icon = document.createElement('img');
  const iconCode = weatherPacket.data.current.weather[0].icon;
  icon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  cardLeft.appendChild(icon);

  // Current conditions display
  const cond = document.createElement('p');
  cond.textContent =
    weatherPacket.data.current.weather[0].description[0].toUpperCase() +
    weatherPacket.data.current.weather[0].description.substring(1);
  cardLeft.appendChild(cond);
  // Temperature display
  const temp = (weatherPacket.data.current.temp - 273.15).toFixed(1) + '°';
  const tempText = document.createElement('h3');
  tempText.textContent = temp;
  cardRight.appendChild(tempText);
  // Temp hi and low
  const tempHigh =
    (weatherPacket.data.daily[0].temp.max - 273.15).toFixed(1) + '°';
  const tempLow =
    (weatherPacket.data.daily[0].temp.min - 273.15).toFixed(1) + '°';
  const highText = document.createElement('p');
  highText.textContent = 'High: ' + tempHigh;
  const lowText = document.createElement('p');
  lowText.textContent = 'Low: ' + tempLow;
  cardRight.appendChild(highText);
  cardRight.appendChild(lowText);
  // Chance of rain display
  const pop = document.createElement('p');
  pop.textContent =
    'Precipitation: ' + (weatherPacket.data.daily[0].pop * 100).toFixed() + '%';
  cardRight.appendChild(pop);

  container.appendChild(card);
};

const displayHourlyForecast = (weatherPacket) => {
  const container = document.getElementsByClassName(
    'hourly-forecast-container'
  )[0];
  if (container.firstChild) {
    container.firstChild.remove();
  }
  // Create sub-container to hold cards
  const subContainer = document.createElement('div');
  subContainer.classList.add('sub-container');
  container.appendChild(subContainer);
  // Create cards
  const hourlyData = weatherPacket.data.hourly;
  for (const hour of hourlyData) {
    const card = document.createElement('div');
    card.classList.add('hourly-weather-card');
    // Timestamp
    const time = format(fromUnixTime(hour.dt), 'ha');
    const timestamp = document.createElement('h5');
    timestamp.textContent = time;
    card.appendChild(timestamp);
    // Icon
    const icon = document.createElement('img');
    const iconCode = hour.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    card.appendChild(icon);
    // Current conditions display
    const cond = document.createElement('p');
    cond.textContent =
      hour.weather[0].description[0].toUpperCase() +
      hour.weather[0].description.substring(1);
    card.appendChild(cond);
    // Temperature display
    const temp = (hour.temp - 273.15).toFixed(1) + '°';
    const tempText = document.createElement('h3');
    tempText.textContent = temp;
    card.appendChild(tempText);
    // Chance of rain display
    const pop = document.createElement('p');
    pop.textContent = 'Precipitation: ' + (hour.pop * 100).toFixed() + '%';
    card.appendChild(pop);
    // Append card, move on to the next
    subContainer.appendChild(card);
  }
};

const displayWeeklyForecast = (weatherPacket) => {
  const container = document.getElementsByClassName(
    'weekly-forecast-container'
  )[0];
  if (container.firstChild) {
    container.firstChild.remove();
  }
  // Create sub-container to hold cards
  const subContainer = document.createElement('div');
  subContainer.classList.add('sub-container');
  container.appendChild(subContainer);
  // Create cards
  const dailyData = weatherPacket.data.daily;
  for (const day of dailyData) {
    const card = document.createElement('div');
    card.classList.add('hourly-weather-card');
    // Timestamp
    const date = format(fromUnixTime(day.dt), 'cccc');
    const daystamp = document.createElement('h5');
    daystamp.textContent = date;
    card.appendChild(daystamp);
    // Icon
    const icon = document.createElement('img');
    const iconCode = day.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    card.appendChild(icon);
    // Current conditions display
    const cond = document.createElement('p');
    cond.textContent =
      day.weather[0].description[0].toUpperCase() +
      day.weather[0].description.substring(1);
    card.appendChild(cond);
    // Temperature display
    const temp = (day.temp.day - 273.15).toFixed(1) + '°';
    const tempText = document.createElement('h3');
    tempText.textContent = temp;
    card.appendChild(tempText);
    // Temp high and low
    const tempHigh = (day.temp.max - 273.15).toFixed(1) + '°';
    const tempLow = (day.temp.min - 273.15).toFixed(1) + '°';
    const highText = document.createElement('p');
    highText.textContent = 'High: ' + tempHigh;
    const lowText = document.createElement('p');
    lowText.textContent = 'Low: ' + tempLow;
    card.appendChild(highText);
    card.appendChild(lowText);
    // Chance of rain display
    const pop = document.createElement('p');
    pop.textContent = 'Precipitation: ' + day.pop.toFixed() * 100 + '%';
    card.appendChild(pop);
    // Append card, move on to the next
    subContainer.appendChild(card);
  }
};

const setBackground = (weatherPacket) => {
  // sets background image on current weather
  switch (weatherPacket.data.current.weather[0].icon) {
    case '01d':
      document.body.style.backgroundImage = "url('assets/sun.jpg')";
      break;
    case '01n':
      document.body.style.backgroundImage = "url('assets/night-clear.jpg')";
      break;
    case '02d':
      document.body.style.backgroundImage = "url('assets/clouds.jpg')";
      break;
    case '03d':
    case '04d':
      document.body.style.backgroundImage = "url('assets/overcast.jpg')";
      break;
    case '02n':
    case '03n':
    case '04n':
      document.body.style.backgroundImage = "url('assets/night-clouds.jpg')";
      break;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      document.body.style.backgroundImage = "url('assets/rain.jpg')";
      break;
    case '11d':
    case '11n':
      document.body.style.backgroundImage = "url('assets/thunderstorm.jpg')";
      break;
    case '13d':
    case '13n':
      document.body.style.backgroundImage = "url('assets/snow.jpg')";
      break;
    case '50d':
    case '50n':
      document.body.style.backgroundImage = "url('assets/mist.jpg')";
      break;
    default:
      document.body.style.backgroundImage = "url('assets/sun.jpg')";
  }
};

const displayAllWeather = (weatherPacket) => {
  displayCurrentWeatherCard(weatherPacket);
  displayHourlyForecast(weatherPacket);
  displayWeeklyForecast(weatherPacket);
  setBackground(weatherPacket);
};

export default displayAllWeather;

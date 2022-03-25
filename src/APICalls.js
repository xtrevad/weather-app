import displayAllWeather from './DOMstuff';

let lat;
let lon;
lat = -37.8;
lon = 144.9;
let weatherPacket = {};

const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => searchLocation());

const getWeather = async (weatherPacket) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=b4f1fce15dcb78cc634772177311bb48`,
    { mode: 'cors' }
  );
  const data = await response.json();
  weatherPacket.data = data;
  console.log(data);
  // console.log((data.current.temp - 273.15).toFixed(1));
  displayAllWeather(weatherPacket);
};

const searchLocation = async () => {
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=b4f1fce15dcb78cc634772177311bb48`,
    { mode: 'cors' }
  );
  const data = await response.json();
  weatherPacket.city_name = data[0].name;
  lat = data[0].lat;
  lon = data[0].lon;
  getWeather(weatherPacket);
};

const geoFindMe = () => {
  async function success(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=b4f1fce15dcb78cc634772177311bb48`,
      { mode: 'cors' }
    );
    const data = await response.json();
    weatherPacket.city_name = data[0].name;
    getWeather(weatherPacket);
  }

  function error() {
    alert('Unable to retrieve your location');
  }

  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

export { getWeather, geoFindMe, searchLocation };

// TODO:: Implement week-ahead forecast cards for 7 days
// todo:: Implement hourly temperature/rain cards (24hrs ahead)

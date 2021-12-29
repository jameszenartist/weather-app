let destination = document.querySelector(".data");
let button = document.getElementById("submit");
let city = document.querySelector("input[name='city']");
let country = document.querySelector("input[name='country']");

button.addEventListener("click", async () => {
  if (city.value === "") {
    alert("Please enter a city");
  }
  const url = `/api?q=${city.value},${country.value}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === "404") {
    alert("City not found");
    return;
  }

  if (data.cod === 401) {
    alert("Invalid API key");
    return;
  }

  displayWeather(data);
});

const displayWeather = (data) => {
  destination.innerHTML = `City: ${
    data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase()
  }
        <br>
        Country: ${data.sys.country}
        <br>
        Temp: ${kelvinToFahrenheit(data.main.temp)} &deg;F
        <br>
        Humidity: ${data.main.humidity}%
        <br>
        Wind: ${data.wind.speed} mph`;
  city.value = "";
  country.value = "";
};

const kelvinToFahrenheit = (temp) => {
  return Math.ceil(((temp - 273.15) * 9) / 5 + 32);
};

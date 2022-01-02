let destination = document.querySelector(".data");
let button = document.getElementById("submit");
let city = document.querySelector("input[name='city']");
let country = document.querySelector("input[name='country']");

let trigger = true;

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
        <div class="temp">Temp:  ${kelvinToFahrenheit(
          data.main.temp
        )} &deg;F</div>
        
        Humidity: ${data.main.humidity}%
        <br>
        Wind: ${data.wind.speed} mph
        <br>
        <button class="change" onclick="convert()">Celsius</button>`;

  city.value = "";
  country.value = "";
};

let celsius;
let fahrenheit;
const kelvinToFahrenheit = (temp) => {
  celsius = Math.ceil(temp - 273.15);
  fahrenheit = Math.ceil(((temp - 273.15) * 9) / 5 + 32);
  return fahrenheit;
};

function convert() {
  if (trigger) {
    document.querySelector(".temp").textContent = `Temp:  ${parseInt(
      celsius
    )} °C`;
    document.querySelector(".change").textContent = "Fahrenheit";
    trigger = false;
  } else {
    document.querySelector(".temp").textContent = `Temp:  ${fahrenheit} °F`;
    document.querySelector(".change").textContent = "Celsius";
    trigger = true;
  }
}

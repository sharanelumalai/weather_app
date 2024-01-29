let loc = "";
const btn = document.getElementById("searchbtn");
const a = "done";
const currentDate = new Date();
const padZero = (num) => (num < 10 ? "0" + num : num);
btn.addEventListener("click", ()=> {
  loc = document.getElementById("searchtext").value;
  checkweather();
  dailyupdate();
});
async function checkweather() {
  try {
    const apikey = "162c385692b7fd8490d3ed2967cbc6ec";
    const api =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      loc +
      "&appid=" +
      apikey;
    const response = await fetch(api);
    const data = await response.json();
    let temperature, preusre, Humidity, Windspeed, weather2;
    console.log(data);
    //location name
    const locname = document.querySelector(".lname");
    locname.innerHTML = data.city.name;
    //date
    const dnum = document.querySelector(".dnum");
    dnum.innerHTML = date();
    //---------------------------------------------------------------

    let hours = padZero(currentDate.getHours());
    let hours1 = padZero(parseInt(currentDate.getHours(), 10) + 1);
    let hours2 = padZero(parseInt(currentDate.getHours(), 10) + 2);
    let minutes1 = "00";
    let seconds1 = "00";

    let dt1 = date() + " " + hours + ":" + minutes1 + ":" + seconds1;
    const dt2 = date() + " " + hours1 + ":" + minutes1 + ":" + seconds1;
    const dt3 = date() + " " + hours2 + ":" + minutes1 + ":" + seconds1;
    console.log(dt1 + "------" + dt2 + "------" + dt3);
    const filterdata = data.list.map((entry) => {
      const fdata = entry.dt_txt;
      const tempFahrenheit = entry.main.temp;
      const ftemp = tempFahrenheit - 273.15;
      const fpresure = entry.main.pressure;
      const fhumidity = entry.main.humidity;
      const fwindspeed = entry.wind.speed;
      const fweathers = entry.weather[0].description;

      return (
        fdata +
        "|" +
        ftemp +
        "|" +
        fpresure +
        "|" +
        fhumidity +
        "|" +
        fweathers +
        "|" +
        fwindspeed
      );
    });

    const op = filterdata.filter((notes) => {
      const total = notes.split("|");
      let fdate = total[0];
      //if suppose time is above 21 means because we are not getting value from the api..
      if (
        padZero(currentDate.getHours()) === 22 ||
        padZero(currentDate.getHours()) === 23 ||
        padZero(currentDate.getHours()) === 24
      ) {
        if (padZero(currentDate.getHours()) === 24) {
          dt1 = date() + " " + "00" + ":" + minutes1 + ":" + seconds1;
        } else {
          dt1 = date() + " " + "21" + ":" + minutes1 + ":" + seconds1;
        }
      }

      if (fdate === dt1 || fdate === dt2 || fdate === dt3) {
        temperature = Math.round(total[1]);
        preusre = total[2];
        Humidity = total[3];
        Windspeed = total[5];
        weather2 = total[4];
      }
    });
    //temperature
    const temp1 = document.querySelector(".tep");
    temp1.innerHTML = temperature;
    //weather
    const weather1 = document.querySelector(".weather");
    weather1.innerHTML = weather2;
    //pressure
    const preval = document.querySelector(".preval");
    preval.innerHTML = preusre;
    //humidity
    const humval = document.querySelector(".humval");
    humval.innerHTML = Humidity;
    //wind speed
    const windval = document.querySelector(".windval");
    windval.innerHTML = Windspeed;
  } catch (err) {
    alert("Enter your correct location!");
  }
   
}
function date() {
  const year = currentDate.getFullYear();
  const month = padZero(currentDate.getMonth() + 1); // Months are zero-based, so add 1
  const day = padZero(currentDate.getDate());
  // Format the date
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function time() {
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format the time
  const formattedTime = ` ${hours}:${minutes}:${seconds}`;
  return formattedTime;
}
async function dailyupdate() {
  const apikeys = "162c385692b7fd8490d3ed2967cbc6ec";
  const apis =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    loc +
    "&appid=" +
    apikeys;
  const responses = await fetch(apis);
  const dgree = await responses.json();
  const forecastContainer = document.getElementById("forecastContainer");

  for (let i = 1; i <= 40; i++) {
    const goat = dgree.list[i - 1].dt_txt;
    const goatemp = dgree.list[i - 1].main.temp;
    const gftemp = goatemp - 273.15;
    const splitgoat = goat.split(" ");

    const fdate = splitgoat[0]; //date
    const ftime = splitgoat[1]; //tiem
    const ftemperature = Math.round(gftemp); //temp
    const tweather = dgree.list[i - 1].weather[0].description.split(" ");
    const fweather = tweather[0];
   
    // const day = weatherData[i];<p class="weathernow deg2">${day.weather}</p>
    const forecastBox = document.createElement("div");
    forecastBox.classList.add("minibox1");
    forecastBox.innerHTML = `
        <div class="date1 dob1"> ${fdate}
                        <span class="duration1">${ftime}</span>
                    </div>
                    <div class="degree1">
                        <p class="degree deg1">${ftemperature}°</p>
                        <p class="weathernow deg2"><span><img class="wimg" alt="" src="img/cloudy (2).png"/></span> ${fweather}</p>
                    </div>
          
        `;

    forecastContainer.appendChild(forecastBox);
    console.log(fdate + "------" + ftime + "------" + ftemperature+ "------" +fweather);

  }
  let isDragging = false;
  let startX;

  forecastContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
  });

  forecastContainer.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      forecastContainer.scrollLeft -= deltaX;
      startX = e.clientX;
    }
  });

  forecastContainer.addEventListener("mouseup", () => {
    isDragging = false;
  });

  forecastContainer.addEventListener("mouseleave", () => {
    isDragging = false;
  });
}

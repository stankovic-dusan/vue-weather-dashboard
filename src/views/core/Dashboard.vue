<template>
  <div class="max-w-[1200px] m-auto p-10">
    <Navbar @location-input="searchLocation" />
    <div class="w-full flex justify-between items-center my-4 bg-white rounded-md">
      <!--Ovde nisam siguran oko sirine i visine nesto se ne uklapa, ja sam na pocetku definisao visinu, dali mora da bude u tacno u px? -->
      <div class="w-full h-full flex justify-between items-center p-6">
        <div class="flex flex-col items-start">
          <h2 class="text-[#1C294F] capitalize">{{ city }}</h2>
          <p class="text-[#1C294F]">{{ country }}</p>
          <svg class="my-2" width="83" height="2" viewBox="0 0 83 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1H82.5" stroke="#E8ECF6" />
          </svg>
          <p class="text-[#6D7791]">{{ day }}, {{ time }}</p>
        </div>
        <h1 class="text-[#1C294F] flex justify-center items-center">
          {{ temp }}
          <sup class="text-[32px] font-semibold text-[#6D7791]">°C</sup>
        </h1>
      </div>
      <div class="w-[190px] h-full">
        <!--Ovde nisam siguran oko sirine i visine nesto se ne uklapa, kad stavim bg, vidi se oko njega beli bg sto ne bi trebalo -->
        <img width="200px" :src="icon" alt="" />
      </div>
    </div>
    <div class="w-full h-[380px] flex flex-col bg-[#EDF1FB] p-6 rounded-md">
      <div class="flex justify-between">
        <h6 class="uppercase text-[#6D7791]">Forecast</h6>
        <div class="flex">
          <button @click="setSelectedTab('today-forcast')"><h5 class="text-[#1C294F] mr-4">Today</h5></button>
          <button @click="setSelectedTab('weekly-forcast')"><h5 class="text-[#8C95AF]">This week</h5></button>
        </div>
      </div>
      <div class="w-full h-full flex justify-between items-center mt-4 gap-2">
        <component :is="selectedTab" :data="weatherDataDays"></component>
      </div>
    </div>
    <div class="w-full h-[380px] flex flex-col bg-[#EDF1FB] mt-4 p-6 rounded-md">
      <h6 class="uppercase text-[#6D7791]">Today details</h6>
      <div class="w-full h-full flex flex-wrap justify-center items-center gap-2 mt-4">
        <DetailsCard title="Sunrise" :detail="sunrise" />
        <DetailsCard title="Sunset" :detail="sunset" />
        <DetailsCard title="Precipitation" :detail="precip" pref="%" />
        <DetailsCard title="Humidity" :detail="humidity" pref="%" />
        <DetailsCard title="Wind" :detail="windspeed" pref="km/h" />
        <DetailsCard title="Pressure" :detail="pressure" pref="%" />
        <DetailsCard title="Visibility" :detail="visibility" pref="km" />
        <DetailsCard title="UV index" :detail="uvindex" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import Navbar from "@/components/Navbar.vue";
import DetailsCard from "@/components/DetailsCard.vue";

import ForecastInfoCard from "@/components/ForecastInfoCard.vue";

import TodayForcast from "@/views/pages/TodayForcast.vue";
import WeeklyForcast from "@/views/pages/WeeklyForcast.vue";

export default {
  name: "Dashboard",
  components: { Navbar, DetailsCard, TodayForcast, WeeklyForcast, ForecastInfoCard },
  data() {
    return {
      weatherAPIKey: process.env.VUE_APP_WEATHER_API_KEY,
      weatherData: {},
      locationDefault: "Belgrade",
      locationInput: "",
      city: "",
      country: "",
      timezone: "",
      day: "",
      time: "",
      temp: 0,
      icon: "",
      sunrise: "",
      sunset: "",
      precip: 0,
      humidity: 0,
      windspeed: 0,
      pressure: 0,
      visibility: 0,
      uvindex: 0,
      weatherDataDays: [],
      selectedTab: "weekly-forcast",
    };
  },

  methods: {
    searchLocation(locationInput) {
      this.locationInput = locationInput;
      this.fetchWeather(this.locationInput);
    },

    fetchTime(timezone) {
      axios.get(`http://localhost:8080/api/Time/current/zone?timeZone=${timezone}`).then((response) => {
        this.day = response.data.dayOfWeek;
        this.time = response.data.time;
      });
    },

    fetchWeather(location) {
      if (this.locationInput == "") location = this.locationDefault;
      else location = this.locationInput;
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${this.weatherAPIKey}`)
        .then((response) => response.json())
        .then((data) => {
          this.weatherData = data;
          console.log(this.weatherData);
          this.city = this.weatherData.address;
          this.country = this.weatherData.resolvedAddress.split(",")[2];
          this.timezone = this.weatherData.timezone;
          this.weatherDataDays = this.weatherData.days.slice(0, 7);
          console.log(this.weatherDataDays);
          this.fetchTime(this.timezone);
          this.temp = Math.round(this.weatherData.currentConditions.temp);
          this.icon = this.getWeatherIcon(this.weatherData.currentConditions.icon);
          this.sunrise = this.weatherData.currentConditions.sunrise;
          this.sunset = this.weatherData.currentConditions.sunset;
          this.precip = this.weatherData.currentConditions.precipprob;
          this.humidity = Math.round(this.weatherData.currentConditions.humidity);
          this.windspeed = this.weatherData.currentConditions.windspeed;
          this.pressure = Math.round(this.weatherData.currentConditions.pressure / 100);
          this.visibility = this.weatherData.currentConditions.visibility;
          this.uvindex = this.weatherData.currentConditions.uvindex;
        });
    },

    getWeatherIcon(condition) {
      if (condition === "partly-cloudy-day") {
        return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-2.svg";
      } else if (condition === "partly-cloudy-night") {
        return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-night-2.svg";
      } else if (condition === "rain") {
        return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-6.svg";
      } else if (condition === "clear-day") {
        return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/day.svg";
      } else if (condition === "clear-night") {
        return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/night.svg";
      } else if (condition === "snow") {
        return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/snowy-5.svg";
      } else {
        return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/day.svg";
      }
    },

    setSelectedTab(selectedTab) {
      this.selectedTab = selectedTab;
    },
  },

  mounted() {
    this.fetchWeather();
  },
};
</script>

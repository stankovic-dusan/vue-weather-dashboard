<template>
  <div class="max-w-[1200px] min-h-[100vh] m-auto p-10 sm:p-4">
    <div class="" v-show="isLoading">
      <Navbar @search-input="searchLocation" @search-current-location="searchCurrentLocation" />
      <div class="w-full h-auto flex justify-between items-center my-4 bg-header-bg rounded-md">
        <div class="w-full h-full flex justify-between items-center">
          <div class="w-auto flex flex-col items-start ml-6 sm:ml-4 sm:my-[25px]">
            <h2 class="text-primary capitalize sm:text-2xl">{{ city }}</h2>
            <p class="text-primary sm:text-base">{{ country }}</p>
            <svg class="my-2 text-main-bg dark:text-custom" width="83" height="2" viewBox="0 0 83 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 1H82.5" stroke="currentColor" />
            </svg>
            <p class="text-secondary sm:text-base">{{ day }}, {{ time }}</p>
          </div>
          <div class="w-auto flex sm:flex-col-reverse sm:w-[120px]">
            <h1 class="text-primary flex justify-center items-center sm:text-5xl">
              {{ temp }}
              <sup class="text-[32px] font-semibold text-secondary sm:text-2xl">°C</sup>
            </h1>
            <div class="w-[156px] h-full ml-4 mx-2 sm:w-[78px]">
              <img class="w-full" :src="icon" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-auto flex flex-col bg-dark p-6 rounded-md">
        <div class="flex justify-between sm:flex-col">
          <h6 class="uppercase text-secondary">Forecast</h6>
          <div class="flex sm:mt-4 justify-around">
            <button @click="setSelectedTab('today-forcast')"><h5 class="text-[#8C95AF] mr-4" :class="activeBtnMode('today-forcast')">Today</h5></button>
            <button @click="setSelectedTab('weekly-forcast')"><h5 class="text-[#8C95AF]" :class="activeBtnMode('weekly-forcast')">This week</h5></button>
          </div>
        </div>
        <div class="w-full h-auto flex justify-between items-center mt-4 gap-2 sm:flex-col">
          <KeepAlive>
            <component :is="selectedTab" :dataToday="weatherDataToday" :dataWeek="weatherDataWeek"></component>
          </KeepAlive>
        </div>
      </div>
      <div class="w-full h-auto flex flex-col bg-dark mt-4 p-6 rounded-md">
        <h6 class="uppercase text-secondary">Today details</h6>
        <div class="w-full h-full flex flex-wrap justify-center items-center gap-2 mt-4">
          <DetailsCard :icon="require('@/assets/icons/sunrise.svg')" title="Sunrise" :detail="sunrise" />
          <DetailsCard :icon="require('@/assets/icons/sunset.svg')" title="Sunset" :detail="sunset" />
          <DetailsCard :icon="require('@/assets/icons/umbrella.svg')" title="Precipitation" :detail="precip" pref="%" />
          <DetailsCard :icon="require('@/assets/icons/droplet.svg')" title="Humidity" :detail="humidity" pref="%" />
          <DetailsCard :icon="require('@/assets/icons/wind.svg')" title="Wind" :detail="windspeed" pref="km/h" />
          <DetailsCard :icon="require('@/assets/icons/thermometer.svg')" title="Pressure" :detail="pressure" pref="%" />
          <DetailsCard :icon="require('@/assets/icons/eye.svg')" title="Visibility" :detail="visibility" pref="km" />
          <DetailsCard :icon="require('@/assets/icons/sun.svg')" title="UV index" :detail="uvindex" />
        </div>
      </div>
    </div>
    <Loader class="mt-auto" v-show="!isLoading" />
  </div>
</template>
<script>
import axios from "axios";

import Navbar from "@/components/Navbar.vue";
import DetailsCard from "@/components/DetailsCard.vue";
import TodayForcast from "@/views/pages/TodayForcast.vue";
import WeeklyForcast from "@/views/pages/WeeklyForcast.vue";

import Loader from "@/components/Loader.vue";

export default {
  name: "Dashboard",
  components: { Navbar, DetailsCard, WeeklyForcast, TodayForcast, Loader },
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
      weatherDataToday: [],
      weatherDataWeek: [],
      selectedTab: "weekly-forcast",
      iconsPackLink: "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/",
      isLoading: false,
    };
  },

  methods: {
    searchCurrentLocation() {
      const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        axios.get(geoApiUrl).then((response) => {
          this.fetchWeatherData(response.data.city);
        });
      };

      const error = () => {
        alert("Allow to vue-weather-dashboard to access this device location!\n\nThe application will use defalut location: Belgrade, Serbia");
        this.fetchWeatherData("Belgrade");
      };

      navigator.geolocation.getCurrentPosition(success, error);
    },

    searchLocation(locationInput) {
      this.locationInput = locationInput;
      this.fetchWeatherData(this.locationInput);
    },

    fetchTime(timezone) {
      const CORSproxy = `https://corsproxy.io/?`;

      axios
        .get(`${CORSproxy}https://timeapi.io/api/Time/current/zone?timeZone=${timezone}`)
        .then((response) => {
          this.day = response.data.dayOfWeek;
          this.time = response.data.time;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    fetchWeatherData(location) {
      axios
        .get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${this.weatherAPIKey}`)
        .then((response) => {
          this.weatherData = response.data;
          this.city = this.weatherData.address;
          this.country = this.weatherData.resolvedAddress.split(",").pop();
          this.timezone = this.weatherData.timezone;
          this.fetchTime(this.timezone);
          this.temp = Math.round(this.weatherData.currentConditions.temp);
          this.icon = this.getWeatherIcon(this.weatherData.currentConditions.icon);
          this.sunrise = this.weatherData.currentConditions.sunrise.match(/^\d{2}:\d{2}/)[0];
          this.sunset = this.weatherData.currentConditions.sunset.match(/^\d{2}:\d{2}/)[0];
          this.precip = this.weatherData.currentConditions.precipprob;
          this.humidity = Math.round(this.weatherData.currentConditions.humidity);
          this.windspeed = Math.round(this.weatherData.currentConditions.windspeed);
          this.pressure = Math.round(this.weatherData.currentConditions.pressure / 100);
          this.visibility = Math.round(this.weatherData.currentConditions.visibility);
          this.uvindex = this.weatherData.currentConditions.uvindex;
          this.weatherDataWeek = this.weatherData.days.slice(0, 7);
          this.weatherDataToday = this.weatherData.days[0].hours.slice(0, 7);

          this.isLoading = true;
        })
        .catch(function (error) {
          alert("City not found in our database");
        });
    },

    getWeatherIcon(condition) {
      if (condition === "partly-cloudy-day") return `${this.iconsPackLink}/cloudy-day-2.svg`;
      else if (condition === "partly-cloudy-night") return `${this.iconsPackLink}/cloudy-night-2.svg`;
      else if (condition === "rain") return `${this.iconsPackLink}/rainy-6.svg`;
      else if (condition === "clear-day") return `${this.iconsPackLink}/day.svg`;
      else if (condition === "clear-night") return `${this.iconsPackLink}/night.svg`;
      else if (condition === "snow") return `${this.iconsPackLink}/snowy-5.svg`;
      else return `${this.iconsPackLink}/day.svg`;
    },

    setSelectedTab(selectedTab) {
      this.selectedTab = selectedTab;
      return this.selectedTab === selectedTab ? "text-active" : "text-[#8C95AF]";
    },

    activeBtnMode(tab) {
      return this.selectedTab === tab ? "text-active" : "text-[#8C95AF]";
    },
  },

  mounted() {
    this.searchCurrentLocation();
  },
};
</script>

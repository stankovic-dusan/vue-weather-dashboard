<template>
  <ForecastInfoCard v-for="day in data" :key="day" :day="day.datetime" :icon="getWeatherIcon(day.icon)" :temp="Math.round(day.temp)" :windIcon="getWindDirection(day.winddir)" :wind="day.windspeed" />
</template>
<script>
import ForecastInfoCard from "@/components/ForecastInfoCard.vue";

export default {
  name: "TodayForcast",
  components: { ForecastInfoCard },
  data() {
    return {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    };
  },
  props: ["data"],
  methods: {
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

    getWindDirection(windDir) {
      if (windDir === 0 || windDir === 360) {
        return "@/assets/icons/arrow-up-right.svg";
      } else if (windDir === 90) {
        return "@/assets/icons/arrow-up-right.svg";
      } else if (windDir === 180) {
        return "@/assets/icons/arrow-up-right.svg";
      } else if (windDir === 270) {
        return "@/assets/icons/arrow-up-right.svg";
      } else if (windDir > 0 && windDir < 90) {
        return "@/assets/icons/arrow-up-right.svg";
      } else if (windDir > 90 && windDir < 180) {
        return "@/assets/icons/arrow-up-right.svg";
      } else if (windDir > 180 && windDir < 270) {
        return "@/assets/icons/arrow-up-right.svg";
      } else if (windDir > 270 && windDir < 360) {
        return "@/assets/icons/arrow-up-right.svg";
      } else {
        return "@/assets/icons/arrow-up-right.svg";
      }
    },
  },
};
</script>

<template>
  <forecast-card v-for="(hour, index) in dataToday" :key="hour" :time="hour.datetime.match(/^\d{2}:\d{2}/)[0]" :icon="getWeatherIcon(hour.icon)" :temp="Math.round(hour.temp)" tempmin="" :wind="Math.round(hour.windspeed)" />
</template>
<script>
export default {
  name: "TodayForcast",
  data() {
    return {
      iconsPackLink: "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/",
    };
  },
  props: ["dataToday"],
  methods: {
    getWeatherIcon(condition) {
      if (condition === "partly-cloudy-day") return `${this.iconsPackLink}/cloudy-day-2.svg`;
      else if (condition === "partly-cloudy-night") return `${this.iconsPackLink}/cloudy-night-2.svg`;
      else if (condition === "rain") return `${this.iconsPackLink}/rainy-6.svg`;
      else if (condition === "clear-day") return `${this.iconsPackLink}/day.svg`;
      else if (condition === "clear-night") return `${this.iconsPackLink}/night.svg`;
      else if (condition === "snow") return `${this.iconsPackLink}/snowy-5.svg`;
      else return `${this.iconsPackLink}/day.svg`;
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
  inheritAttrs: false,
};
</script>

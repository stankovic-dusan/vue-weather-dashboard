<template>
  <forecast-card v-for="day in dataWeek" :key="day" :day="getDayName(day.datetime)" :icon="getWeatherIcon(day.icon)" :temp="Math.round(day.tempmax)" :tempmin="Math.round(day.tempmin)" wind="" />
</template>
<script>
export default {
  name: "WeeklyForcast",
  data() {
    return {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      iconsPackLink: "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/",
    };
  },
  inheritAttrs: false,
  props: ["dataWeek"],
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

    getDayName(data) {
      return this.days[new Date(data).getDay()].slice(0, 3);
    },
  },
};
</script>

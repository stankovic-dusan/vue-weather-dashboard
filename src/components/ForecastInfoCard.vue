<template>
  <div class="w-full bg-[#F5F7FF] flex flex-col justify-center items-center py-4 rounded-md">
    <!--Ovo je bio samo test upeglaj visinu i sirinu-->
    <h4 class="text-[#6D7791]">{{ time }} {{ day }}</h4>
    <img class="my-2" width="96px" :src="icon" alt="forecast-day-icon" />
    <h3 class="text-[#1C294F]">{{ temp }}°C</h3>
    <img class="my-2" :src="windIcon" alt="wind-direction" />
    <p class="mb-">{{ wind }} {{ minTemp }} km/h</p>
  </div>
</template>
<script>
export default {
  name: "ForecastInfoCard",
  props: ["time", "day", "icon", "temp", "windIcon", "wind", "minTemp"],
};
</script>

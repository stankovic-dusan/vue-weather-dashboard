<template>
  <div class="w-full min-h-[282px] bg-light flex flex-col justify-center items-center py-4 rounded-md sm:flex-row sm:min-h-0 sm:py-0 sm:px-4 sm:justify-between">
    <!--Ovo je bio samo test upeglaj visinu i sirinu-->
    <h4 class="text-secondary font-light sm:w-[55px]">{{ time }} {{ day }}</h4>
    <img class="my-2 sm:my-0" width="96px" :src="icon" alt="forecast-day-icon" />
    <div class="flex flex-col items-center">
      <h3 class="text-primary">{{ temp }}°C</h3>
      <img v-show="wind !== ''" class="my-2 sm:hidden" src="@/assets/icons/arrow-up-right.svg" />
      <p v-show="wind !== ''" class="text-secondary">{{ wind }}km/h</p>
      <p v-show="tempmin !== ''" class="text-secondary font-light">{{ tempmin }}°C</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "ForecastInfoCard",
  props: ["time", "day", "icon", "temp", "windIcon", "wind", "tempmin"],
};
</script>

<script setup></script>

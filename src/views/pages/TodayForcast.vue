<template>
  <h1>Today Forcast</h1>
</template>
<script>
import ForecastInfoCard from "@/components/ForecastInfoCard.vue";

export default {
  name: "TodayForcast",
  props: ["data"],
  components: { ForecastInfoCard },
  mounted() {},
};
</script>

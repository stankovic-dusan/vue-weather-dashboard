<template>
  <div class="flex">
    <DarkModeBtn />
    <SearchBar @location-input="searchLocation" />
    <CurrentLocationBtn />
  </div>
</template>
<script>
import DarkModeBtn from "@/components/DarkModeBtn.vue";
import SearchBar from "@/components/SearchBar.vue";
import CurrentLocationBtn from "@/components/CurrentLocationBtn.vue";

export default {
  name: "Navbar",
  components: { DarkModeBtn, SearchBar, CurrentLocationBtn },
  methods: {
    searchLocation(locationInput) {
      this.$emit("location-input", locationInput);
    },
  },
};
</script>

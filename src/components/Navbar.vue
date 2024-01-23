<template>
  <div class="flex">
    <DarkModeBtn />
    <SearchBar @location-input="$emit('search-input', $event)" />
    <CurrentLocationBtn @current-location="$emit('search-current-location')" />
  </div>
</template>
<script setup>
import DarkModeBtn from "@/components/DarkModeBtn.vue";
import SearchBar from "@/components/SearchBar.vue";
import CurrentLocationBtn from "@/components/CurrentLocationBtn.vue";
</script>

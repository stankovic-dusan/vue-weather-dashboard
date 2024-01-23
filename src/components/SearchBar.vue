<template>
  <div class="w-full h-auto flex justify-start items-center bg-custom rounded-md">
    <label class="flex w-full my-4 ml-6">
      <svg class="feather feather-search text-grey" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input class="w-full bg-transparent pl-4 outline-none capitalize placeholder-grey text-grey" type="text" placeholder="Search your preferred city..." v-model="locationInput" @keypress.enter="$emit('location-input', locationInput)" />
    </label>
  </div>
</template>

<script setup>
import { ref } from "vue";

const locationInput = ref("");
</script>

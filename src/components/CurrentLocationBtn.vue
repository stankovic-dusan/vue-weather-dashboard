<template>
  <button class="w-auto ml-6 flex justify-start items-center bg-active text-white rounded-md px-6" @click="$emit('current-location')">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin w-6">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
    <p class="text-nowrap ml-4 font-semibold sm:hidden">Current location</p>
  </button>
</template>

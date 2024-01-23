<template>
  <div class="w-1/5 bg-light flex flex-auto flex-col justify-center rounded-md p-6 sm:w-1/3">
    <div class="flex justify-start items-center">
      <img class="w-6" :src="icon" alt="sunrise-icon" />
      <p class="ml-2 text-secondary">{{ title }}</p>
    </div>
    <h2 class="font-light text-primary mt-4 sm:text-2xl">{{ detail }}{{ pref }}</h2>
  </div>
</template>
<script>
export default {
  name: "DetailsCard",
  props: ["icon", "title", "detail", "pref"],
};
</script>

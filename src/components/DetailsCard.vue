<template>
  <div class="w-1/5 bg-[#F5F7FF] flex flex-auto flex-col justify-center rounded-md p-6">
    <div class="flex justify-start items-center">
      <img width="24px" src="@/assets/icons/sunrise.svg" alt="sunrise-icon" />
      <p class="ml-2 text-[#6D7791]">{{ title }}</p>
    </div>
    <h2 class="font-light text-[#1C294F] mt-4">{{ detail }} {{ pref }}</h2>
  </div>
</template>
<script>
export default {
  name: "DetailsCard",
  props: ["icon", "title", "detail", "pref"],
};
</script>

<template>
  <div class="w-full flex justify-start items-center bg-[#F5F7FF] rounded-md px-[24px] mx-[24px]">
    <label class="flex w-full" for="">
      <img class="w-2xl text-[#444444]" src="@/assets/icons/search.svg" alt="search-icon" />
      <input class="w-full bg-transparent pl-[16px] outline-none capitalize" type="text" placeholder="Search your preferred city..." v-model="locationInput" @keypress.enter="sendLocationInput" />
    </label>
  </div>
</template>
<script>
export default {
  name: "SearchBar",
  data() {
    return {
      locationInput: "",
    };
  },
  methods: {
    sendLocationInput() {
      this.$emit("location-input", this.locationInput);
    },
  },
};
</script>

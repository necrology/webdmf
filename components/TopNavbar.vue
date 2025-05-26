<template>
  <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
    <div class="text-xl font-semibold">WEBDMF</div>
    <div class="relative" ref="dropdownRef">
      <button @click="dropdownOpen = !dropdownOpen" class="flex items-center space-x-3 focus:outline-none">
        <img src="/assets/img/user.png" class="w-8 h-8 rounded-full object-cover" />
        <span class="font-medium text-gray-800">John Doe</span>
      </button>
      <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded py-2 z-10">
        <NuxtLink to="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</NuxtLink>
        <NuxtLink to="/logout" class="block px-4 py-2 hover:bg-gray-100">Logout</NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const dropdownOpen = ref(false);
const dropdownRef = ref(null);

onClickOutside(dropdownRef, () => {
  dropdownOpen.value = false;
});
</script>

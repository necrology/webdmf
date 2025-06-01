<template>
  <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
    <div class="text-xl font-semibold">LMS Sesko AU</div>
    <div class="relative" ref="dropdownRef">
      <button @click="dropdownOpen = !dropdownOpen" class="flex items-center space-x-3 focus:outline-none">
        <img src="/assets/img/user.png" class="w-8 h-8 rounded-full object-cover" />
        <span class="font-medium text-gray-800">{{ user?.name || "User" }}</span>
      </button>
      <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded py-2 z-10">
        <NuxtLink to="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</NuxtLink>
        <button @click="confirmLogout" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";
import { onClickOutside } from "@vueuse/core";

const dropdownOpen = ref(false);
const dropdownRef = ref(null);
const { user } = useAuth();
const router = useRouter();

onClickOutside(dropdownRef, () => {
  dropdownOpen.value = false;
});

const confirmLogout = async () => {
  const confirmed = window.confirm("Apakah Anda yakin ingin logout?");
  if (!confirmed) return;

  try {
    await fetch("http://localhost:8888/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Gagal logout:", error);
  }

  user.value = null;
  router.push("/");
};
</script>

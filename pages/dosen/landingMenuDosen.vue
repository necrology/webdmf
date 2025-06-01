<template>
  <div>
    <!-- Topbar -->
    <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div class="text-xl font-semibold">LMS Sesko AU</div>
      <div class="relative" ref="dropdownRef">
        <button @click="dropdownOpen = !dropdownOpen" class="flex items-center space-x-3 focus:outline-none">
          <img src="/assets/img/user.png" class="w-8 h-8 rounded-full object-cover" />
          <span class="font-medium text-gray-800">{{ user?.name || "User" }}</span>
        </button>
        <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded py-2 z-10">
          <NuxtLink to="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</NuxtLink>
          <button @click="confirmLogout" class="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
        </div>
      </div>
    </header>

    <!-- Dashboard menu -->
    <section class="min-h-screen bg-gray-100 py-12 px-6">
      <h1 class="text-4xl font-bold text-center mb-12 text-gray-800">Dashboard Menu</h1>

      <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <!-- Card Siswa -->
        <div
          @click="goTo('siswa')"
          class="cursor-pointer bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          <div
            class="bg-blue-500 text-white rounded-full p-5 mb-6"
            style="box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 14a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0v1a3 3 0 01-6 0v-1m6 0v-2a3 3 0 00-6 0v2m6 0H6"
              />
            </svg>
          </div>
          <h2 class="text-xl font-semibold mb-2 text-gray-900">Siswa</h2>
          <p class="text-gray-600">Kelola data siswa secara lengkap dan mudah.</p>
        </div>

        <!-- Card Kelas -->
        <div
          @click="goTo('kelas')"
          class="cursor-pointer bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          <div
            class="bg-green-500 text-white rounded-full p-5 mb-6"
            style="box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M4 6h16v12H4z"
              />
            </svg>
          </div>
          <h2 class="text-xl font-semibold mb-2 text-gray-900">Kelas</h2>
          <p class="text-gray-600">Atur dan monitor kelas serta jadwalnya.</p>
        </div>

        <!-- Card Mata Pelajaran -->
        <div
          @click="goTo('mapel')"
          class="cursor-pointer bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          <div
            class="bg-purple-600 text-white rounded-full p-5 mb-6"
            style="box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold mb-2 text-gray-900">Mata Pelajaran</h2>
          <p class="text-gray-600">Kelola daftar mata pelajaran dan materi belajar.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";
import { onClickOutside } from "@vueuse/core";

// Nonaktifkan layout default
definePageMeta({
  layout: false,
  middleware: ["auth"], // optional, redirect kalau sudah login
});

const router = useRouter();
const dropdownOpen = ref(false);
const dropdownRef = ref(null);
const { user, logout } = useAuth();

onClickOutside(dropdownRef, () => {
  dropdownOpen.value = false;
});

function goTo(menu) {
  switch (menu) {
    case "siswa":
      router.push("/siswa");
      break;
    case "kelas":
      router.push("/kelas");
      break;
    case "mapel":
      router.push("/mata-pelajaran");
      break;
  }
}

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

<style>
/* Custom styles jika perlu */
</style>

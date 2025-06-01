<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center"
    style="background-image: url('/assets/img/login-bg.jpg')"
  >
    <div class="bg-white/60 backdrop-blur-lg border border-white/20 shadow-xl p-8 rounded-2xl w-full max-w-md">
      <!-- Logo -->
      <div class="flex justify-center mb-4">
        <img src="/assets/img/logo_seskoau.png" alt="Logo SESKO AU" class="h-50 w-auto" />
      </div>

      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">LMS SESKO AU</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block mb-1 text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="block mb-1 text-gray-600">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>

      <p v-if="errorMessage" class="text-red-600 text-center mt-4">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

// Nonaktifkan layout default
definePageMeta({
  layout: false,
  middleware: ["guest"], // optional, redirect kalau sudah login
});

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();
const { user } = useAuth();

const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:8888/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // simpan cookie session
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const data = await response.json();

    if (!response.ok) {
      errorMessage.value = data.error || "Login gagal";
      return;
    }

    // Simpan user ke state global
    user.value = data.user;

    // Multi-level redirect berdasarkan role_id
    console.log("User role_id:", data.user.role_id);
    switch (data.user.role_id) {
      case 1:
        router.push("/dashboard");
        break;
      case 2:
        router.push("/dosen/landingMenuDosen");
        break;
      case 3:
        router.push("/siswa/landingMenuSiswa");
        break;
      default:
        router.push("/dashboard"); // fallback
    }

    errorMessage.value = "";
  } catch (error) {
    console.error("Terjadi kesalahan saat login:", error);
    errorMessage.value = "Terjadi kesalahan saat login";
  }
};
</script>

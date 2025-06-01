<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Settings</h1>
    <p class="text-gray-600">Ini adalah halaman Settings.</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>
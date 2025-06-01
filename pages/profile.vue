<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Profile</h1>
    <p class="text-gray-600">Ini adalah halaman Profile.</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <TopNavbar />
      <main class="p-6 bg-gray-100 min-h-screen">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "~/components/Sidebar.vue";
import TopNavbar from "~/components/TopNavbar.vue";
</script>

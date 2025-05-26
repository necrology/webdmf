<template>
  <aside
    :class="[
      'bg-gray-800 text-white min-h-screen flex flex-col transition-width duration-300',
      isCollapsed ? 'w-16' : 'w-64',
    ]"
  >
    <div class="flex items-center justify-between p-4 border-b border-gray-700">
      <span v-if="!isCollapsed" class="text-lg font-semibold">WEBDMF</span>
      <button
        @click="isCollapsed = !isCollapsed"
        class="p-1 rounded hover:bg-gray-700 focus:outline-none"
        aria-label="Toggle sidebar"
      >
        <!-- Hamburger Icon (3 garis) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <nav class="flex-1 overflow-auto">
      <ul class="mt-4">
        <li class="mb-1" v-for="item in menuItems" :key="item.name">
          <NuxtLink
            :to="item.to"
            class="flex items-center px-4 py-3 rounded hover:bg-gray-700 transition-colors"
            :class="{ 'bg-gray-700': route.path === item.to }"
          >
            <component :is="item.icon" class="w-6 h-6" />
            <span v-if="!isCollapsed" class="ml-3">{{ item.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { HomeIcon, UserIcon, Cog6ToothIcon } from "@heroicons/vue/24/outline";

const route = useRoute();

// Auto kecil saat load
const isCollapsed = ref(true);

const menuItems = [
  { name: "Dashboard", to: "/", icon: HomeIcon },
  { name: "Users", to: "/users", icon: UserIcon },
  { name: "Settings", to: "/settings", icon: Cog6ToothIcon },
];
</script>

<style>
/* Transisi untuk width */
.transition-width {
  transition-property: width;
}
</style>

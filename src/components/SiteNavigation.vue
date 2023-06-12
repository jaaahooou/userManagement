<template>
  <header class="sticky top-0 bg-white shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-black py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3 flex-1">
          <p class="text-2xl">Home</p>
        </div>
      </RouterLink>
    </nav>
  </header>
</template>
<script setup>
import { RouterLink } from "vue-router";
</script>

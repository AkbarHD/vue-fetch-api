<script setup>
import { RouterLink, RouterView } from 'vue-router';
// import HomeView from './views/HomeView.vue';
</script>

<template>

  <!-- dengan menggunakan suspend di sini dari HomeView  agar fetch data lebih cepat-->

  <!-- <Suspense>
      <template #default>
        <HomeView />
      </template>
<template #fallback>
        <p>Loading...</p>
      </template>
</Suspense> -->
  <RouterView />

</template>

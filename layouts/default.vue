<template>
  <div class="min-h-screen bg-white">
    <div class="fixed w-full h-fit">
      <Navbar />
    </div>
    <main class="pt-20 px-5">
      <slot />
    </main>
    <div class="w-full mt-10">
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
</script>

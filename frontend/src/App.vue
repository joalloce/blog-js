<script setup>
import Header from "@/components/Header.vue";
import GlobalLoader from "./components/GlobalLoader.vue";
import Footer from "@/components/Footer.vue";

import { RouterView, useRoute } from "vue-router";

const route = useRoute();

</script>

<template>
  <Header />
  <RouterView :key="route.fullPath" />
  <Footer />
</template>

<style scoped></style>

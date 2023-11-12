<script setup>
import Header from "@/components/Header.vue";
import GlobalLoader from "./components/GlobalLoader.vue";
import Footer from "@/components/Footer.vue";

import { RouterView, useRoute } from "vue-router";

const route = useRoute();

</script>

<template>
  <Header />
  <RouterView v-slot="{ Component }" :key="route.fullPath">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <!-- main content -->
            <component :is="Component"></component>

            <!-- loading state -->
            <template #fallback>
              <GlobalLoader />
            </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
  <Footer />
</template>

<style scoped></style>

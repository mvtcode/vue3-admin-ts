<template>
  <DefaultLayout>
    <div class="home">
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </div>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
    DefaultLayout,
  },
});
</script>

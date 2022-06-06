<template>
  <v-app>
    <v-app-bar app color="primary" dark> </v-app-bar>
    <v-main>
      <GoodRead />
    </v-main>
  </v-app>
</template>

<script>
import GoodRead from "./components/GoodRead.vue";

export default {
  name: "App",

  components: {
    GoodRead,
  },
};
</script>

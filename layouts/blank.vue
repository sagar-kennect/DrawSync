<template>
  <v-app dark>
    <v-main>
      <c-snackbar>
        <v-container fluid>
          <slot />
        </v-container>
      </c-snackbar>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// import CSnackbar from "~~/components/feedback/c-snackbar.vue";
</script>

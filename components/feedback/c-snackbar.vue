<template>
  <div>
    <slot />
    <ClientOnly>
      <v-snackbar
        :timeout="sn.snackbarTime"
        v-model="sn.showSnackbar"
        :color="snackbarColor"
        app
        location="bottom start"
        variant="elevated"
      >
        {{ sn.snackbarText }}
        <template v-slot:actions>
          <v-btn icon @click="sn.showSnackbar = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { snackbar, snackBarOptions } from "~~/provide/snackbar";

let sn = ref({
  snackbarTime: 4000,
  showSnackbar: false,
  snackbarType: "info",
  snackbarText: "Operation Successful",
  closeSnackbar: () => {},
});
const snackbarColor = computed(() => {
  switch (sn.value.snackbarType) {
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "info":
      return "info";
    case "error":
      return "red";
    default:
      return "info";
  }
});

function showSnackBar(options: snackBarOptions) {
  const { snackbarTime = 4000, snackbarType, snackbarText } = options;

  sn.value.snackbarText = snackbarText;
  sn.value.snackbarTime = snackbarTime;
  sn.value.snackbarType = snackbarType;
  sn.value.showSnackbar = true;
}

provide("showSnackBar", showSnackBar);
provide(snackbar, showSnackBar);
</script>

<style scoped></style>

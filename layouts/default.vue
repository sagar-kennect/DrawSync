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

<script>
import {
  mdiAccount,
  mdiApps,
  mdiChartBubble,
  mdiChevronLeft,
  mdiChevronRight,
  mdiRepeat,
} from "@mdi/js";
import CSnackbar from "~~/components/feedback/c-snackbar.vue";
// import { authByOpener } from "@common-ui/authenticator/child/authByOpener";
// import { authBySessionStorage } from "@common-ui/authenticator/child/authBySessionStorage";
// import authUtils from '@common-ui/authenticator/child/authUtils'
import { mapActions } from "pinia";

export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: mdiApps,
          title: "Welcome",
          to: "/",
        },
        {
          icon: mdiChartBubble,
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      mdiAccount,
      mdiChevronLeft,
      mdiChevronRight,
      mdiRepeat,
      hashParams: { load: "", opener: "" },
    };
  },
  components: { CSnackbar },
};
</script>

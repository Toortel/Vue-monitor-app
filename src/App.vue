<template>
  <v-app>
    <v-app-bar color="blue accent-5" dense dark app>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>MonitorApp - {{ this.$route.name }}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed left temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

          <router-link
            v-for="(item, idx) in directions"
            :key="idx"
            :to="item.path"
            style="text-decoration: none; color: inherit"
          >
            <v-list-item
              :to="item.path"
              exact
              active-class="blue--text text--accent-2"
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
        <v-select
          class="px-2 my-10"
          :label="$t('langSelector')"
          dense
          v-model="$i18n.locale"
          @change="toggleDrawer"
          :items="languages"
        ></v-select>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container v-if="isLoading" fluid fill-height>
        <v-layout align-center justify-center>
          <v-progress-circular
            indeterminate
            :size="70"
            color="primary"
          ></v-progress-circular>
        </v-layout>
      </v-container>
      <transition v-else name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import data from "../data/data.json";

export default {
  name: "App",
  created() {
    this.$store.commit("setData", data);
  },
  data: () => ({
    languages: ["en", "pl"],
    drawer: false,
    directions: [
      { name: "Home", path: "/" },
      { name: "Analytics", path: "/analytics" },
    ],
  }),

  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
  computed: {
    deviceData() {
      return this.$store.getters.getDeviceData;
    },
    currentRoute() {
      return this.$route.path;
    },
    isLoading() {
      return this.$store.getters.getPageLoadingState;
    },
  },
};
</script>

<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-leave,
.fade-enter-to {
  opacity: 1;
}

.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-active {
  transition: opacity 0.2s;
}
</style>

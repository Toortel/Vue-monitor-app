<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card>
          <v-card-title> {{ $t("homeTitle") }} </v-card-title>
          <v-card-text>
            <p>
              {{ $t("homeMsgOne") }}
            </p>
            <p>
              {{ $t("homeMsgTwo") }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="goToAnalytics">{{
              $t("homeBtn")
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    goToAnalytics() {
      this.$router.push({ path: "/analytics" });
    },
  },
};
</script>

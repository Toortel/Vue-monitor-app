<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="error-card">
          <v-card-title class="error-title">
            {{ $t("errorTitle") }}
          </v-card-title>
          <v-card-text>
            <v-icon size="100">mdi-alert-circle-outline</v-icon>
            <p>
              {{ $t("errorMsgOne") }}
            </p>
            <p>{{ $t("errorMsgTwo") }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="goBack"></v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "ErrorView",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.error-card {
  text-align: center;
  padding: 20px;
}
.error-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>

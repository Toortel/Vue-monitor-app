<template>
  <v-container fluid>
    <v-row>
      <v-col xs12 md6>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              class="px-3 pt-3 pb-0"
              :label="rangeText ? rangeText : $t('selectRange')"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dates"
            range
            :locale="$i18n.locale"
            :selected-items-text="'{0} ' + $t('selectedDateText')"
            ><v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">{{
              $t("cancel")
            }}</v-btn>
            <v-btn text color="primary" @click="updateDate">
              OK
            </v-btn></v-date-picker
          >
        </v-menu>
        <v-btn small class="mx-5" @click="clearDate">{{
          $t("clearDate")
        }}</v-btn>
        <v-btn small class="mx-5" @click="clearChartData">{{
          $t("clearChartData")
        }}</v-btn>
        <v-data-table
          v-model="selectedRecords"
          show-select
          dense
          :headers="[
            { text: this.$t('tableName'), value: 'name' },
            { text: this.$t('tableValue'), value: 'value' },
            { text: this.$t('tableDate'), value: 'date' },
          ]"
          :items="filteredData.length === 0 ? deviceData : filteredData"
          item-key="date"
          class="elevation-1 ma-5"
          :footer-props="{
            itemsPerPageText: $t('itemsPerPageText'),
            itemsPerPageAllText: $t('itemsPerPageAllText'),
            pageText: `{0} - {1} ${$t('pageText')} {2}`,
          }"
        ></v-data-table>
      </v-col>
      <v-col xs12 md6>
        <v-tabs horizontal>
          <v-tab
            ><v-icon left>mdi-chart-line</v-icon>{{ $t("temperature") }}</v-tab
          >
          <v-tab
            ><v-icon left>mdi-chart-line</v-icon>{{ $t("pressure") }}</v-tab
          >
          <v-tab><v-icon left>mdi-chart-line</v-icon>{{ $t("all") }}</v-tab>
          <v-tab-item>
            <PlotlyChart :chartData="selectedTemperatureRecords"></PlotlyChart>
          </v-tab-item>
          <v-tab-item>
            <PlotlyChart :chartData="selectedPressureRecords"></PlotlyChart>
          </v-tab-item>
          <v-tab-item>
            <PlotlyChart
              :temperatureData="selectedTemperatureRecords"
              :pressureData="selectedPressureRecords"
            ></PlotlyChart>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlotlyChart from "@/charts/PlotlyChart.vue";

export default {
  components: { PlotlyChart },
  data() {
    return {
      selectedRecords: [],
      dates: [],
      filteredData: [],
      menu: false,
      // headers for v-data-table are placed directly in component due to problem with their reactivity when switching language
    };
  },
  methods: {
    clearChartData() {
      this.selectedRecords = [];
    },
    updateDate() {
      this.$store.commit("setRangeOfDate", this.dates);

      const filtered = this.filterByDate(this.dates[0], this.dates[1]);
      this.filteredData = filtered;

      this.menu = false;
    },
    clearDate() {
      this.dates = [];
      this.$store.commit("setRangeOfDate", this.dates);

      const filtered = this.filterByDate(null, null);
      this.filteredData = filtered;
    },
    filterByDate(minDate, maxDate) {
      const min = new Date(minDate);
      const max = new Date(maxDate);
      const filtered = this.deviceData.filter((el) => {
        const elDate = new Date(el.date);
        if (elDate >= min && elDate <= max) {
          return true;
        }
      });

      return filtered;
    },
  },
  computed: {
    rangeText() {
      return this.$store.getters.getRangeOfDate.join(this.$t("dateJoin"));
    },
    deviceData() {
      return this.$store.getters.getDeviceData;
    },
    selectedPressureRecords() {
      return this.selectedRecords.filter((el) => el.name === "Ciśnienie");
    },
    selectedTemperatureRecords() {
      return this.selectedRecords.filter((el) => el.name === "Temperatura");
    },
  },
};
</script>

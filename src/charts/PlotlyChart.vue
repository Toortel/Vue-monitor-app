<template>
  <Plotly
    :data="parsedData"
    :layout="layout"
    :config="config"
    :display-mode-bar="true"
  ></Plotly>
</template>

<script>
import { Plotly } from "vue-plotly";

export default {
  components: {
    Plotly,
  },
  props: {
    chartData: {
      default: null,
    },
    pressureData: {
      default: null,
    },
    temperatureData: {
      default: null,
    },
  },

  data() {
    return {
      parsedData: [],
      layout: {},
      config: {
        responsive: true,
        locale: this.$i18n.locale,
      },
      defaultLayout: {
        autosize: true,
        yaxis: { title: this.$t("values") },
        xaxis: {
          type: "date",
          title: this.$t("date"),
          tickformat: "%Y-%m-%d",
          tickangle: 45,
        },
      },
    };
  },
  created() {
    this.formatData();
  },
  watch: {
    "$i18n.locale"() {
      this.defaultLayout.xaxis.title = this.$t("date");
      this.defaultLayout.yaxis.title = this.$t("values");
      this.formatData();
    },
    chartData() {
      this.formatData();
    },
    pressureData() {
      this.formatData();
    },
    temperatureData() {
      this.formatData();
    },
  },
  methods: {
    formatData() {
      this.layout = JSON.parse(JSON.stringify(this.defaultLayout));
      if (this.chartData) {
        const recordData = [];
        for (const record of this.chartData) {
          recordData.push({ x: record.date, y: record.value });
        }
        recordData.sort((a, b) => {
          const dateA = new Date(a.x);
          const dateB = new Date(b.x);

          return dateA - dateB;
        });

        const x = recordData.map((el) => el.x);
        const y = recordData.map((el) => el.y);
        this.parsedData = [];
        this.parsedData = [{ x, y, type: "scatter" }];
      }

      if ((this.pressureData || this.temperatureData) && !this.chartData) {
        // TEMPERATURE
        let tempX, tempY;
        if (this.temperatureData) {
          const tempChartData = [];
          for (const record of this.temperatureData) {
            tempChartData.push({ x: record.date, y: record.value });
          }
          tempChartData.sort((a, b) => {
            const dateA = new Date(a.x);
            const dateB = new Date(b.x);
            return dateA - dateB;
          });
          tempX = tempChartData.map((el) => el.x);
          tempY = tempChartData.map((el) => el.y);
        }
        // PRESSURE
        let pressX, pressY;
        if (this.pressureData) {
          const pressChartData = [];
          for (const record of this.pressureData) {
            pressChartData.push({ x: record.date, y: record.value });
          }
          pressChartData.sort((a, b) => {
            const dateA = new Date(a.x);
            const dateB = new Date(b.x);
            return dateA - dateB;
          });
          pressX = pressChartData.map((el) => el.x);
          pressY = pressChartData.map((el) => el.y);
        }

        // FINAL ASSIGNMENTS
        const pressure = {
          x: pressX,
          y: pressY,
          type: "scatter",
          name: this.$t("pressure"),
        };
        const temperature = {
          x: tempX,
          y: tempY,
          type: "scatter",
          name: this.$t("temperature"),
        };
        if (this.temperatureData && this.pressureData) {
          this.parsedData = [pressure, temperature];
        } else if (this.temperatureData && !this.pressureData) {
          this.parsedData = [temperature];
        } else if (!this.temperatureData && this.pressureData) {
          this.parsedData = [pressure];
        }
      }
    },
  },
};
</script>

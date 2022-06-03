<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
      class="my-5"
    >
      <v-col
        sm="12"
        md="12"
        lg="12"
      >
        <v-card
          class="pa-3 card-border"
          elevation="8"
          width="100%"
          rounded="lg"
          outlined
        >
          <v-card-title>
            Dashboard
          </v-card-title>
          <v-divider class="py-5" />
          <v-row justify="space-between">
            <v-col>
              <VueApexCharts
                width="350"
                type="area"
                :options="chartAreaOptions"
                :series="series"
              />
            </v-col>
            <v-col>
              <VueApexCharts
                width="350"
                type="pie"
                :options="chartAreaOptions"
                :series="[44, 55, 13, 43, 22]"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'UserDashboardPage',

  components: {
    VueApexCharts
  },

  layout: 'admin_dashboard',

  data () {
    return {
      chartAreaOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91]
      }]
    }
  }
}
</script>

<style scoped>
  .card-border {
    border: 1px solid var(--v-blue-base);
  }
</style>

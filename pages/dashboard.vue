<template>
  <v-container
    fluid
    :class="`main-content-bg fill-height align-start ${mobile ? 'pa-5' : 'pa-10'}`"
  >
    <v-row>
      <v-col class="mt-5">
        <!-- BEGIN HEADER TITLE -->
        <c-text
          v-if="!mobile"
          font-size="32"
          v-text="'Dashboard'"
        />
        <v-text-field
          v-if="mobile"
          v-model="searchKeyword"
          class="search-field-wrapper mb-5"
          placeholder="Cari Tagihan"
          hide-details=""
          color="primary"
          background-color="white"
          append-icon="mdi-magnify"
          outlined
          dense
        />
        <!-- END HEADER TITLE -->

        <!-- BEGIN STATISTICS COUNT -->
        <StatsCountDashboardPage
          v-if="!mobile"
          :statistics-count="statisticsCount"
        />
        <StatsCountMobileDashboardPage
          v-else
          :statistics-count="statisticsCount"
        />
        <!-- END STATISTICS COUNT -->

        <!-- BEGIN CHART -->
        <v-card
          v-if="!mobile"
          class="pa-5 mb-5"
        >
          <v-container>
            <v-row
              justify="space-between"
            >
              <v-col cols="auto">
                <c-text
                  font-size="20"
                  font-weight="bold"
                  class="ma-0"
                  v-text="'Tinjauan Pendapatan Tahunan'"
                />
              </v-col>
              <v-col
                sm="12"
                md="2"
                lg="2"
              >
                <v-select
                  v-model="yearIncome"
                  :items="selectYears"
                  item-text="text"
                  item-value="value"
                  color="primary"
                  hide-details=""
                  outlined
                  dense
                />
              </v-col>
            </v-row>
          </v-container>
          <VueApexCharts
            v-if="showChart"
            width="100%"
            height="300"
            type="line"
            :options="chartAreaOptions"
            :series="series"
          />
        </v-card>
        <!-- END CHART -->

        <!-- BEGIN REPORT -->
        <v-container fluid>
          <v-row>
            <v-col
              v-if="mobile"
              class="px-0"
            >
              <TopClientTableMobileDashboardPage
                :top-clients-report="topClientsReport"
              />
            </v-col>
            <v-col
              v-if="!mobile"
              :class="`${mobile ? 'px-0' : 'ps-0'}`"
              sm="12"
              md="7"
              lg="7"
            >
              <TopClientTableDashboardPage
                :top-clients-report="topClientsReport"
              />
            </v-col>
            <v-col
              v-if="!mobile"
              :class="`${mobile ? 'px-0' : 'pe-0'}`"
              sm="12"
              md="5"
              lg="5"
            >
              <ProductReportDashboardPage
                :date-report-selected="dateReportSelected"
                :date-report-picker="dateReportPicker"
                :data-product-reports="dataProductReports"
                @on-changed-date-picker="updateDatePicker"
                @save-selected-date="saveSelectedDate"
                @set-date-picker="setDatePicker"
              />
            </v-col>
          </v-row>
        </v-container>
        <!-- END REPORT -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import TopClientTableDashboardPage from '@/components/component-pages/dashboard/TopClientTableDashboardPage.vue'
import TopClientTableMobileDashboardPage from '@/components/component-pages/dashboard/TopClientTableMobileDashboardPage.vue'
import ProductReportDashboardPage from '@/components/component-pages/dashboard/ProductReportDashboardPage.vue'
import StatsCountDashboardPage from '@/components/component-pages/dashboard/StatsCountDashboardPage.vue'
import StatsCountMobileDashboardPage from '@/components/component-pages/dashboard/StatsCountMobileDashboardPage.vue'
import * as numberFormat from '@/utils/numberFormat'

export default {
  name: 'DashboardPage',

  components: {
    VueApexCharts,
    TopClientTableDashboardPage,
    TopClientTableMobileDashboardPage,
    ProductReportDashboardPage,
    StatsCountDashboardPage,
    StatsCountMobileDashboardPage
  },

  layout: 'dashboard',

  middleware: ['auth'],

  data () {
    return {
      searchKeyword: '',
      showChart: false,
      yearIncome: 2022,
      dateReportSelected: '',
      dateReportPicker: '',
      statisticsCount: [
        {
          title: 'Total Tagihan',
          value: 12000
        },
        {
          title: 'Tagihan Dibayar',
          value: 5500
        },
        {
          title: 'Tagihan Yang Belum Dibayar',
          value: 6500
        },
        {
          title: 'Total Klien',
          value: 8300
        },
        {
          title: 'Total Produk',
          value: 10000
        }
      ],
      chartAreaOptions: {
        chart: {
          height: '100px',
          id: 'year-income-overview',
          toolbar: false
        },
        stroke: {
          curve: 'smooth'
        },
        legend: {
          position: 'right'
        },
        colors: ['#0000ff', '#ff0000'],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des']
        }
      },
      series: [
        {
          name: 'Arus Masuk',
          data: [500, 4000, 2000, 7500, 5500, 8000, 4000, 5500, 3000, 7000, 1000, 8000]
        },
        {
          name: 'Arus Keluar',
          data: [3000, 4000, 3000, 3000, 3000, 1500, 5500, 5000, 4500, 6500, 2500, 9000]
        }
      ],
      selectYears: [
        {
          text: '2022',
          value: 2022
        },
        {
          text: '2021',
          value: 2021
        },
        {
          text: '2020',
          value: 2020
        }
      ],
      topClientsReport: [
        {
          name: 'Fabian Valerian',
          image: '/images/profile/dashboard/top-clients/client-1.png',
          totalInvoices: 1003,
          totalPayment: 11300000
        },
        {
          name: 'Nabila Salma K',
          image: '/images/profile/dashboard/top-clients/client-2.png',
          totalInvoices: 830,
          totalPayment: 5500000
        },
        {
          name: 'Fabian Valerian',
          image: '/images/profile/dashboard/top-clients/client-3.png',
          totalInvoices: 550,
          totalPayment: 3400000
        },
        {
          name: 'Nabila Salma K',
          image: '/images/profile/dashboard/top-clients/client-4.png',
          totalInvoices: 430,
          totalPayment: 2100000
        },
        {
          name: 'Fabian Valerian',
          image: '/images/profile/dashboard/top-clients/client-4.png',
          totalInvoices: 130,
          totalPayment: 1100000
        }
      ],
      dataProductReports: [
        {
          title: 'Total Produk yang Dipesan',
          icon: '/images/icon/dashboard/product-report/data-pending.svg',
          value: 300
        },
        {
          title: 'Total Terbayarkan',
          icon: '/images/icon/dashboard/product-report/paid.svg',
          value: numberFormat.currency(3000000)
        },
        {
          title: 'Total Tertunda',
          icon: '/images/icon/dashboard/product-report/add-shopping-cart.svg',
          value: numberFormat.currency(3000000)
        }
      ]
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    }
  },

  mounted () {
    this.showChart = true
    this.dateReportSelected = this.$moment().format('DD/MM/YYYY')
  },

  methods: {
    updateDatePicker (value) {
      this.dateReportPicker = value
    },

    setDatePicker () {
      this.dateReportPicker = this.$moment(this.dateReportSelected, 'DD/MM/YYYY').format('YYYY-MM-DD')
    },

    saveSelectedDate () {
      this.dateReportSelected = this.$moment(this.dateReportPicker, 'YYYY-MM-DD').format('DD/MM/YYYY')
    }
  }
}
</script>

<style scoped>
  .search-field-wrapper {
    font-size: 14px;
  }

  .search-field-wrapper >>> .v-text-field__slot input,
  .search-field-wrapper >>> .v-input__icon--append i {
    color: var(--v-primary-base)
  }

  .search-field-wrapper >>> .v-text-field__slot input::placeholder {
    color: var(--v-primary400-base)
  }
</style>

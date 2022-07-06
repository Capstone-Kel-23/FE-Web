<template>
  <v-container class="pa-0 mt-3">
    <!-- BEGIN TABLE CATEGORIES -->
    <v-container class="px-0 pt-0">
      <v-row justify="center">
        <v-btn
          :outlined="category.toLowerCase() !== 'paid' ? true : false"
          color="primary"
          class="rounded-0"
          @click="changeCategory('paid')"
          v-text="'Paid'"
        />
        <v-btn
          :outlined="category.toLowerCase() !== 'unpaid' ? true : false"
          color="primary"
          class="rounded-0"
          @click="changeCategory('unpaid')"
          v-text="'Unpaid'"
        />
        <v-btn
          :outlined="category.toLowerCase() !== 'clients' ? true : false"
          color="primary"
          class="rounded-0"
          @click="changeCategory('clients')"
          v-text="'Client'"
        />
      </v-row>
      <v-data-table
        class="mt-10 table-report-wrapper"
        :headers="headers"
        :header-props="{ sortIcon: null }"
        :items="dataReports"
        :items-per-page="-1"
        hide-default-footer
        :sort-by.sync="category"
        :sort-desc.sync="sortDesc"
        dense
        mobile-breakpoint=""
      >
        <template #[`item.paid`]="{ item }">
          <c-text
            class="text-right ma-0"
            font-size="12"
            v-text="format.currency(item.paid)"
          />
        </template>
      </v-data-table>
    </v-container>
    <!-- END TABLE CATEGORIES -->
  </v-container>
</template>

<script>
import * as numberFormat from '@/utils/numberFormat'

export default {
  name: 'TableMobileReportsPage',

  data () {
    return {
      category: 'paid',
      sortDesc: true,
      dataReports: [],
      headers: [
        { text: 'Month', value: 'month' },
        { text: 'Clients', value: 'clients', align: 'center' },
        { text: 'Invoices', value: 'invoices', align: 'center' },
        { text: 'Paid', value: 'paid', align: 'center' }
      ]
    }
  },

  computed: {
    format () {
      return numberFormat
    }
  },

  mounted () {
    this.setDummy()
  },

  methods: {
    setDummy () {
      this.dataReports.push({ month: 2022, clients: 0, invoices: 0, paid: this.format.currency(0) })
      let totalClients = 0
      let totalInvoices = 0
      let totalPaid = 0
      for (let index = 0; index < 12; index++) {
        const tempClients = this.randomInt(0, 15)
        const tempInvoices = this.randomInt(0, 30)
        const tempPaid = this.randomInt(0, 2000000)
        this.dataReports.push({
          month: this.$moment.months(index),
          clients: tempClients,
          invoices: tempInvoices,
          paid: tempPaid
        })
        totalClients += tempClients
        totalInvoices += tempInvoices
        totalPaid += tempPaid
      }
      this.dataReports[0].clients = totalClients
      this.dataReports[0].invoices = totalInvoices
      this.dataReports[0].paid = totalPaid
    },

    randomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },

    changeCategory (value) {
      this.category = value.toLowerCase()
      // let index = this.headers.findIndex(h => h.value === this.category)
      // index = (index + 1) % this.headers.length
      // this.category = this.headers[index].value
      // this.sortDesc = true
      // console.log(this.category)
    }
  }
}
</script>

<style scoped>
  .table-report-wrapper >>> th,
  .table-report-wrapper >>> td {
    font-size: 12px !important;
  }

  .table-report-wrapper >>> thead th {
    color: black !important;
  }

  .table-report-wrapper >>> tr th,
  .table-report-wrapper >>> tr td {
    border-bottom: 1px solid var(--v-neutral600-base) !important;
    padding: 0 !important;
  }

  .table-report-wrapper >>> tr th:first-child,
  .table-report-wrapper >>> tr td:first-child {
    padding-left: 5px !important;
  }

  .table-report-wrapper {
    border-top: 1px solid var(--v-neutral600-base) !important;
  }
</style>

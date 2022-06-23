<template>
  <v-simple-table class="elevation-2 client-table">
    <template #default>
      <thead class="table-head">
        <tr>
          <th>
            <c-text
              font-weight="600"
              font-size="14"
              color="black"
              class="text-center ma-0"
              v-text="'Top Client'"
            />
          </th>
          <th>
            <c-text
              font-weight="600"
              font-size="14"
              color="black"
              class="text-center ma-0"
              v-text="'Client'"
            />
          </th>
          <th>
            <c-text
              font-weight="600"
              font-size="14"
              color="black"
              class="text-center ma-0"
              v-text="'Total Invoices'"
            />
          </th>
          <th>
            <c-text
              font-weight="600"
              font-size="14"
              color="black"
              class="text-center ma-0"
              v-text="'Total Payment'"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(client, index) in topClientsReport"
          :key="index"
        >
          <td class="border-">
            <c-text
              font-size="13"
              class="ma-0 text-center"
              v-text="(index + 1)"
            />
          </td>
          <td class="d-flex align-center">
            <v-img
              max-width="30"
              max-height="30"
              class="me-3"
              :lazy-src="client.image"
              :src="client.image"
            />
            <c-text
              font-size="13"
              class="ma-0"
              v-text="client.name"
            />
          </td>
          <td>
            <c-text
              font-size="13"
              class="ma-0 text-center"
              v-text="client.totalInvoices"
            />
          </td>
          <td>
            <c-text
              font-size="13"
              class="ma-0 text-center"
              v-text="format.currency(client.totalPayment)"
            />
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import * as numberFormat from '@/utils/numberFormat'

export default {
  name: 'TopClientTableDashboardPage',

  props: {
    topClientsReport: {
      type: null,
      default: []
    }
  },

  computed: {
    format () {
      return numberFormat
    }
  }
}
</script>

<style scoped>
  .client-table th,
  .client-table td {
    border: none !important;
  }

  .table-head {
    background-color: var(--v-grey-base);
  }
</style>

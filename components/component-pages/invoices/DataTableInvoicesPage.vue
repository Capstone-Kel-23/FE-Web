<template>
  <v-container class="pa-0 mt-3">
    <!-- BEGIN SEARCH FIELD -->
    <v-container class="pa-0">
      <v-row justify="end">
        <v-col cols="5">
          <v-text-field
            v-model="searchKeyword"
            placeholder="Search Invoices"
            color="white"
            solo
            append-icon="mdi-magnify"
            @click:append="search"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- END SEARCH FIELD -->

    <!-- BEGIN CATEGORY -->
    <v-container class="btn-categories">
      <v-row justify="end">
        <v-btn
          elevation="0"
          dark
          :color="selectedCategory === 'All'.toLowerCase() ? 'primary900' : 'primary400'"
          @click="changeCategory('All')"
          v-text="'All'"
        />
        <v-btn
          elevation="0"
          dark
          :color="selectedCategory === 'Paid'.toLowerCase() ? 'primary900' : 'primary400'"
          @click="changeCategory('Paid')"
          v-text="'Paid'"
        />
        <v-btn
          elevation="0"
          dark
          :color="selectedCategory === 'Unpaid'.toLowerCase() ? 'primary900' : 'primary400'"
          @click="changeCategory('Unpaid')"
          v-text="'Unpaid'"
        />
      </v-row>
    </v-container>
    <!-- END CATEGORY -->

    <!-- BEGIN TABLE -->
    <v-data-table
      v-model="selectedRow"
      :headers="headers"
      :items="invoices"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-2 data-table-wrapper"
      show-select
      @page-count="pageCount = $event"
    >
      <template #item.id="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="item.id"
        />
      </template>
      <template #item.date="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="item.date"
        />
      </template>
      <template #item.to="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="item.to"
        />
      </template>
      <template #item.amount="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="format.currency(item.amount)"
        />
      </template>
      <template #item.dueDate="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="item.dueDate"
        />
      </template>
      <template #item.statusInvoice="{ item }">
        <v-chip
          style="font-size: 12px"
          :color="item.statusInvoice === 0 ? 'grey' : 'primary200'"
          v-text="item.statusInvoice === 0 ? 'Unpaid' : 'Paid'"
        />
      </template>
      <template #item.action="{ item }">
        <v-btn
          icon
          small
          @click="deleteInvoice(item.id)"
        >
          <v-icon
            size="20"
            v-text="item.action"
          />
        </v-btn>
      </template>
      <template #item.statusPayment="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
        >
          <v-icon
            :color="statusPaymentColor(item.statusPayment).color"
            size="10"
            v-text="'mdi-circle'"
          />
          {{ statusPaymentColor(item.statusPayment).text }}
        </c-text>
      </template>
    </v-data-table>
    <v-container>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-container class="px-0">
            <v-row>
              <v-col
                align-self="center"
                class="px-0"
              >
                <div
                  :class="`btn-pagination elevation-2 pa-1 px-0 ${page === 1 ? 'btn-pagination-disabled' : ''}`"
                  @click="page = 1"
                >
                  <v-icon
                    color="black"
                    v-text="'mdi-chevron-left'"
                  />
                  <v-icon
                    color="black"
                    v-text="'mdi-chevron-left'"
                  />
                </div>
              </v-col>
              <v-col
                class="px-0"
              >
                <v-pagination
                  v-model="page"
                  :length="pageCount"
                  :total-visible="totalVisiblePagination"
                  class="pagination-wrapper"
                />
              </v-col>
              <v-col
                align-self="center"
                class="px-0"
              >
                <div
                  :class="`btn-pagination elevation-2 pa-1 px-0 ${page === pageCount ? 'btn-pagination-disabled' : ''}`"
                  @click="page = pageCount"
                >
                  <v-icon
                    color="black"
                    v-text="'mdi-chevron-right'"
                  />
                  <v-icon
                    color="black"
                    v-text="'mdi-chevron-right'"
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col
          v-if="mobile"
          cols="3"
          align-self="center"
        >
          <v-container>
            <v-select
              v-model="itemsPerPage"
              :items="itemsPerPageSelect"
              item-text="text"
              item-value="value"
              dense
              solo
              @input="() => {page = 1; totalVisiblePagination = 5;}"
            />
          </v-container>
        </v-col>
        <v-col cols="auto" class="d-flex px-0 justify-end">
          <v-col
            v-if="!mobile"
            cols="2"
            class="px-0"
          >
            <v-select
              v-model="itemsPerPage"
              :items="itemsPerPageSelect"
              item-text="text"
              item-value="value"
              dense
              solo
              @input="() => {page = 1; totalVisiblePagination = 5;}"
            />
          </v-col>
          <v-col cols="auto" :class="`pe-0 ${mobile ? 'ps-0' : ''}`">
            <v-btn
              color="primary"
              v-text="'Remind'"
            />
          </v-col>
          <v-col cols="auto" class="pe-0">
            <v-btn
              color="primary"
              v-text="'Export'"
            />
          </v-col>
          <v-col cols="auto" class="pe-0">
            <v-btn
              color="primary"
              v-text="'Import'"
            />
          </v-col>
        </v-col>
      </v-row>
    </v-container>
    <!-- END TABLE -->
  </v-container>
</template>

<script>
import * as numberFormat from '@/utils/numberFormat'

export default {
  name: 'DataTableInvoicesPage',

  data () {
    return {
      searchKeyword: '',
      selectedCategory: 'all',
      page: 1,
      pageCount: 0,
      totalVisiblePagination: 5,
      itemsPerPage: 10,
      itemsPerPageSelect: [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: '50', value: 50 }
      ],
      selectedRow: [],
      headers: [
        {
          text: 'Invoice ID',
          value: 'id'
        },
        { text: 'Invoice Date', value: 'date', align: 'center' },
        { text: 'Invoice To', value: 'to', align: 'center' },
        { text: 'Amount', value: 'amount', align: 'center' },
        { text: 'Due Date', value: 'dueDate', align: 'center' },
        { text: 'Status Invoice', value: 'statusInvoice', align: 'center' },
        { text: 'Status Payment', value: 'statusPayment', align: 'center' },
        { text: 'Action', value: 'action', align: 'center' }
      ],
      invoices: []
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    },

    checkedAll () {
      return false
    },

    format () {
      return numberFormat
    }
  },

  mounted () {
    this.setDummy()
  },

  methods: {
    statusPaymentColor (value) {
      let statusColor = 'neutral700'
      let statusText = 'Pending'
      if (value === 0) {
        statusColor = 'neutral700'
        statusText = 'Pending'
      } else if (value === 1) {
        statusColor = 'green'
        statusText = 'Success'
      } else if (value === 2) {
        statusColor = 'orange'
        statusText = 'Expired'
      } else if (value === 3) {
        statusColor = 'red'
        statusText = 'Failed'
      }

      return {
        color: statusColor,
        text: statusText
      }
    },

    setDummy () {
      for (let i = 0; i < 60; i++) {
        this.invoices.push({
          id: i >= 10 ? `451049${i}` : (i >= 100 ? `45104${i}` : `4510490${i}`),
          date: 'Mei 30, 2022',
          to: 'Alterra Academy',
          amount: this.randomInt(10, 90) * 100000,
          dueDate: 'in 12 days',
          statusInvoice: this.randomInt(0, 1),
          statusPayment: this.randomInt(0, 3),
          action: 'mdi-delete'
        })
      }
    },

    randomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },

    search () {},

    changeCategory (category) {
      this.selectedCategory = category.toLowerCase()
    },

    checkToAll () {},

    deleteInvoice (invoiceId) {}
  }
}
</script>

<style scoped>
  .btn-categories button {
    border-radius: 0px 0px 0px 0px;
    margin-left: 0.8px;
    margin-right: 0.8px;
  }

  .btn-categories button:last-child {
    border-radius: 0px 7px 0px 0px;
    margin-left: 0px;
    margin-right: 0px;
  }

  .btn-categories button:first-child {
    border-radius: 7px 0px 0px 0px;
    margin-left: 0px;
    margin-right: 0px;
  }

  .data-table-wrapper >>> table thead {
    background-color: var(--v-grey-base);
  }

  .data-table-wrapper >>> table thead tr th,
  .data-table-wrapper >>> table tbody tr td {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }

  .data-table-wrapper >>> table tr .v-simple-checkbox i {
    color: var(--v-primary-base);
  }

  .pagination-wrapper >>> .v-pagination__navigation {
    background-color: var(--v-grey-base) !important;
  }

  .pagination-wrapper >>> .v-pagination__navigation i {
    color: var(--v-black-base) !important;
  }

  .btn-pagination-disabled {
    opacity: 0.6;
    cursor: default !important;
  }

  .btn-pagination {
    background-color: var(--v-grey-base);
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-pagination >>> i:last-child {
    transform: translateX(-7.5px);
  }

  .btn-pagination >>> i:first-child {
    transform: translateX(7.5px);
  }
</style>

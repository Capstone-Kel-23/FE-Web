<template>
  <v-container class="pa-0 mt-3">
    <!-- BEGIN SEARCH FIELD -->
    <v-container class="px-0 pt-0">
      <v-text-field
        v-model="searchKeyword"
        class="search-field-wrapper"
        placeholder="Search Invoice"
        color="primary"
        hide-details=""
        background-color="white"
        append-icon="mdi-magnify"
        outlined
        dense
      />
      <v-container class="mt-3">
        <v-row justify="space-around">
          <v-col
            :class="`${selectedCategory === 'all' ? 'active-tab-catagory-wrapper' : ''} pb-1`"
            cols="auto"
            @click="changeCategory('All')"
          >
            <c-text
              font-size="14"
              :color="selectedCategory === 'all' ? 'black' : 'primary'"
              :class="`tab-list-category ma-0 ${selectedCategory === 'all' ? '' : 'unselected-category'}`"
              v-text="'All'"
            />
          </v-col>
          <v-col
            :class="`${selectedCategory === 'paid' ? 'active-tab-catagory-wrapper' : ''} pb-1`"
            cols="auto"
            @click="changeCategory('Paid')"
          >
            <c-text
              font-size="14"
              :color="selectedCategory === 'paid' ? 'black' : 'primary'"
              :class="`tab-list-category ma-0 ${selectedCategory === 'paid' ? '' : 'unselected-category'}`"
              v-text="'Paid'"
            />
          </v-col>
          <v-col
            :class="`${selectedCategory === 'unpaid' ? 'active-tab-catagory-wrapper' : ''} pb-1`"
            cols="auto"
            @click="changeCategory('Unpaid')"
          >
            <c-text
              font-size="14"
              :color="selectedCategory === 'unpaid' ? 'black' : 'primary'"
              :class="`tab-list-category ma-0 ${selectedCategory === 'unpaid' ? '' : 'unselected-category'}`"
              v-text="'Unpaid'"
            />
          </v-col>
        </v-row>
      </v-container>
      <!-- END SEARCH FIELD -->

      <!-- BEGIN INVOICE LIST -->
      <v-container v-if="invoices.length > 0">
        <v-card
          v-for="(item, index) in invoices"
          v-show="filterByCategory(item.statusInvoice)"
          :key="index"
          class="mb-3"
          outlined
        >
          <v-container>
            <v-row>
              <v-col class="d-flex">
                <v-img
                  max-width="55"
                  max-height="55"
                  :src="item.image"
                  :lazy-src="item.image"
                />
                <v-container class="py-0">
                  <c-text
                    font-size="14"
                    font-weight="bold"
                    color="primary"
                    class="ma-0"
                    v-text="item.name"
                  />
                  <c-text
                    font-size="12"
                    color="neutral700"
                    class="ma-0"
                    v-text="item.date"
                  />
                  <c-text
                    font-size="12"
                    color="primary"
                    class="ma-0"
                    v-text="format.currency(item.amount)"
                  />
                </v-container>
              </v-col>
              <v-col
                cols="auto"
                align-self="center"
              >
                <v-chip
                  class="text--black status-invoice-chip"
                  small
                  :color="item.statusInvoice === 0 ? 'grey' : 'primary200'"
                  v-text="item.statusInvoice === 0 ? 'Unpaid' : 'Paid'"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
      <v-container v-else>
        <v-img
          max-width="246"
          max-height="225"
          class="mx-auto mt-5"
          src="/images/illustrations/support-bw.png"
          lazy-src="/images/illustrations/support-bw.png"
        />
        <c-text
          font-size="12"
          color="primary"
          class="text-center mt-5"
          v-text="'Your invoices will show up here. Click the plus button below to Create your first invoice!'"
        />
      </v-container>
      <!-- END INVOICE LIST -->
    </v-container>
    <v-btn
      color="primary"
      class="floating-add-btn"
      dark
      small
      bottom
      right
      fixed
      fab
    >
      <v-icon size="35">
        mdi-plus
      </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import * as numberFormat from '@/utils/numberFormat'

export default {
  name: 'DataTableMobileInvoicesPage',

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
          image: `/images/profile/dashboard/top-clients/mobile/client-${this.randomInt(1, 3)}.png`,
          name: this.randomInt(1, 2) === 2 ? 'Fauzan Fadly' : 'Valerian Fabian',
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

    filterByCategory (status) {
      if (this.selectedCategory.toLowerCase() !== 'all') {
        return this.selectedCategory.toLowerCase() === (status === 0 ? 'unpaid' : 'paid')
      } else {
        return true
      }
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

  .unselected-category {
    opacity: 0.6;
    transition: 0.2s all;
  }

  .tab-list-category {
    cursor: pointer;
  }

  .active-tab-catagory-wrapper {
    border-bottom: 2px solid var(--v-primary-base);
    transition: 0.2s all;
  }

  .active-tab-catagory-wrapper .tab-list-category {
    cursor: default !important;
  }

  .status-invoice-chip {
    font-size: 12px;
    border-radius: 0;
  }

  .floating-add-btn {
    transform: translate(0px, -50px);
  }
</style>

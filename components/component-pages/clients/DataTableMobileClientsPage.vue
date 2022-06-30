<template>
  <v-container class="pa-0 mt-3">
    <!-- BEGIN SEARCH FIELD -->
    <v-container class="px-0 pt-0">
      <v-text-field
        v-model="searchKeyword"
        class="search-field-wrapper mx-3"
        placeholder="Search Client"
        color="primary"
        hide-details=""
        background-color="white"
        append-icon="mdi-magnify"
        outlined
        dense
      />
      <!-- END SEARCH FIELD -->

      <!-- BEGIN CLIENTS LIST -->
      <v-container
        v-if="clients.length > 0"
        class="pb-0"
      >
        <v-card
          v-for="index in (currentPageItems - 1)"
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
                  :src="clients[index].image"
                  :lazy-src="clients[index].image"
                />
                <v-container class="py-0">
                  <c-text
                    font-size="14"
                    font-weight="bold"
                    color="primary"
                    class="ma-0"
                    v-text="clients[index].fullName"
                  />
                  <c-text
                    font-size="12"
                    color="neutral700"
                    class="ma-0"
                    v-text="clients[index].email"
                  />
                  <c-text
                    font-size="12"
                    color="neutral700"
                    class="ma-0"
                    v-text="clients[index].phone"
                  />
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-btn
          v-show="currentPageItems < clients.length"
          width="100%"
          color="primary"
          class="mt-3"
          outlined
          @click="addMore"
        >
          Lihat Lebih Banyak
          <v-icon>mdi-chevron-double-down</v-icon>
        </v-btn>
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
      <!-- END CLIENTS LIST -->
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
  name: 'DataTableMobileClientsPage',

  data () {
    return {
      searchKeyword: '',
      currentPageItems: 0,
      itemsPerPage: 5,
      clients: []
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    },

    format () {
      return numberFormat
    }
  },

  mounted () {
    this.setDummy()
  },

  methods: {
    setDummy () {
      for (let index = 0; index < 20; index++) {
        this.clients.push({
          id: index >= 10 ? `451049${index}` : (index >= 100 ? `45104${index}` : `4510490${index}`),
          image: `/images/profile/dashboard/top-clients/mobile/client-${this.randomInt(1, 3)}.png`,
          fullName: 'Fabian Valerian',
          email: 'valerianfabian@gmail.com',
          location: 'DKI Jakarta, Indonesia',
          phone: '081287976322',
          kodePos: '123456',
          action: 'mdi-delete'
        })
        if (this.currentPageItems <= this.itemsPerPage) {
          this.currentPageItems++
        }
      }
    },

    randomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },

    addMore () {
      const maxItem = (this.itemsPerPage + this.currentPageItems) - 1
      const currentCount = this.currentPageItems - 1
      this.clients.map((element, index) => {
        if (index > currentCount && index <= maxItem) {
          this.currentPageItems++
        }
        return null
      })
    },

    search () {},

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

  .tab-catagory-wrapper {
    padding-bottom: 6px;
  }

  .tab-catagory-wrapper-active {
    border-bottom: 2px solid var(--v-primary-base);
    padding-bottom: 4px;
  }

  .tab-catagory-wrapper-active .tab-list-category {
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

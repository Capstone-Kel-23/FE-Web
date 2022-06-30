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

    <!-- BEGIN TABLE -->
    <v-data-table
      :headers="headers"
      :items="clients"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :search="searchKeyword"
      hide-default-footer
      class="elevation-2 data-table-wrapper"
      @page-count="pageCount = $event"
    >
      <template #[`item.id`]="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="item.id"
        />
      </template>
      <template #[`item.fullName`]="{ item }">
        <div class="d-flex align-center">
          <v-img
            max-width="25"
            max-height="25"
            class="me-3"
            :src="`/images/profile/dashboard/top-clients/client-${randomInt(1, 4)}.png`"
            :lazy-src="`/images/profile/dashboard/top-clients/client-${randomInt(1, 4)}.png`"
          />
          <c-text
            font-size="12"
            class="ma-0"
            v-text="item.fullName"
          />
        </div>
      </template>
      <template #[`item.email`]="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="item.email"
        />
      </template>
      <template #[`item.location`]="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="item.location"
        />
      </template>
      <template #[`item.phone`]="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="item.phone"
        />
      </template>
      <template #[`item.kodePos`]="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="item.kodePos"
        />
      </template>
      <template #[`item.action`]="{ item }">
        <v-btn
          icon
          small
          @click="deleteClient(item.id)"
        >
          <v-icon
            size="20"
            v-text="item.action"
          />
        </v-btn>
      </template>
    </v-data-table>
    <!-- END TABLE -->

    <!-- BEGIN PAGINATION -->
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
          cols="auto"
          align-self="center"
        >
          <v-select
            v-model="itemsPerPage"
            :items="itemsPerPageSelect"
            item-text="text"
            item-value="value"
            hide-details=""
            dense
            solo
            @input="() => {page = 1; totalVisiblePagination = 5;}"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- END PAGINATION -->
  </v-container>
</template>

<script>
export default {
  name: 'DataTableClientsPage',

  data () {
    return {
      searchKeyword: '',
      page: 1,
      pageCount: 0,
      totalVisiblePagination: 7,
      itemsPerPage: 10,
      itemsPerPageSelect: [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: '50', value: 50 }
      ],
      headers: [
        { text: 'Client ID', value: 'id' },
        { text: 'Full Name', value: 'fullName', align: 'center' },
        { text: 'Email', value: 'email', align: 'center' },
        { text: 'Location', value: 'location', align: 'center' },
        { text: 'Phone', value: 'phone', align: 'center' },
        { text: 'Kode Pos', value: 'kodePos', align: 'center' },
        { text: 'Action', value: 'action', align: 'center' }
      ],
      clients: []
    }
  },

  mounted () {
    this.setDummy()
  },

  methods: {
    setDummy () {
      for (let i = 0; i < 60; i++) {
        this.clients.push({
          id: i >= 10 ? `451049${i}` : (i >= 100 ? `45104${i}` : `4510490${i}`),
          fullName: 'Fabian Valerian',
          email: 'alterraacademyeducation@gmail.com',
          location: 'DKI Jakarta, Indonesia',
          phone: '081287976633',
          kodePos: '123456',
          action: 'mdi-delete'
        })
      }
    },

    randomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },

    search () {},

    deleteClient (clientId) {}
  }
}
</script>

<style scoped>
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

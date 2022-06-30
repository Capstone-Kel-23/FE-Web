<template>
  <v-container>
    <v-row>
      <v-col class="px-0">
        <c-text
          font-size="14"
          font-weight="bold"
          v-text="'Top 3 Client'"
        />
        <v-card
          v-for="(client, index) in topClientsMobileReport"
          :key="index"
          outlined
          class="mb-3"
          elevation="0"
        >
          <v-container>
            <v-row>
              <v-col class="pa-0">
                <v-container>
                  <v-row>
                    <v-col cols="auto">
                      <v-img
                        max-width="50"
                        max-height="50"
                        :src="client.image"
                        :lazy-src="client.image"
                      />
                    </v-col>
                    <v-col cols="auto">
                      <c-text
                        font-size="12"
                        font-weight="bold"
                        class="ma-0"
                        v-text="client.name"
                      />
                      <c-text
                        font-size="12"
                        class="ma-0"
                        v-text="client.invoicesValue"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col cols="auto" align-self="center">
                <c-text
                  font-size="12"
                  class="ma-0"
                  v-text="format.currency(client.amount)"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as numberFormat from '@/utils/numberFormat'

export default {
  name: 'TopClientTableMobileDashboardPage',

  props: {
    topClientsReport: {
      type: null,
      default: []
    }
  },

  data () {
    return {
      topClientsMobileReport: [
        {
          name: 'Fabian Valerian',
          image: '/images/profile/dashboard/top-clients/mobile/client-1.png',
          invoicesValue: 1003,
          amount: 100000000
        },
        {
          name: 'Fabian Valerian',
          image: '/images/profile/dashboard/top-clients/mobile/client-2.png',
          invoicesValue: 550,
          amount: 90200000
        },
        {
          name: 'Fabian Valerian',
          image: '/images/profile/dashboard/top-clients/mobile/client-3.png',
          invoicesValue: 803,
          amount: 18500000
        }
      ]
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

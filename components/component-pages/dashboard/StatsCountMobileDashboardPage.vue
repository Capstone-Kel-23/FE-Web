<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col class="ps-0">
        <v-card
          class="px-5 py-3"
        >
          <c-text
            font-size="14"
            font-weight="600"
            class="ma-0"
            color="neutral700"
            v-text="'Total Invoice'"
          />
          <c-text
            font-size="12"
            class="ma-0"
            v-text="'Paid'"
          />
          <c-text
            font-weight="bold"
            font-size="14"
            class="ma-0"
            v-text="format.currency(11300000)"
          />
        </v-card>
      </v-col>
      <v-col class="pe-0">
        <v-card
          class="px-5 py-3"
        >
          <c-text
            font-size="14"
            font-weight="600"
            color="neutral700"
            class="ma-0"
            v-text="'Total Invoice'"
          />
          <c-text
            font-size="12"
            class="ma-0"
            v-text="'Unpaid'"
          />
          <c-text
            font-weight="bold"
            font-size="14"
            class="ma-0"
            v-text="format.currency(11300000)"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="px-0">
        <v-card
          outlined
          elevation="0"
        >
          <v-container>
            <v-row justify="space-between">
              <v-col cols="auto" align-self="center">
                <c-text
                  font-size="14"
                  font-weight="bold"
                  class="ma-0"
                  v-text="'Create New'"
                />
                <c-text
                  font-size="12"
                  font-weight="bold"
                  class="ma-0"
                  v-text="'Invoice'"
                />
              </v-col>
              <v-col cols="auto">
                <v-btn
                  color="primary"
                  depressed
                  large
                  tile
                  to="/invoices/create"
                  v-text="'Start Now'"
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
  name: 'StatsCountMobileDashboardPage',

  props: {
    statisticsCount: {
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

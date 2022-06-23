<template>
  <v-container
    fluid
    class="mb-5"
  >
    <v-row>
      <v-col
        v-for="(stat, index) in statisticsCount"
        :key="index"
        :class="`${index === 0 ? 'ps-0' : ''} ${index === (statisticsCount.length - 1) ? 'pe-0' : ''}`"
      >
        <v-card
          class="px-5 py-3"
        >
          <c-text
            font-weight="600"
            color="neutral700"
            v-text="stat.title"
          />
          <c-text
            font-weight="bold"
            class="ma-0"
            v-text="format.number(stat.value)"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as numberFormat from '@/utils/numberFormat'

export default {
  name: 'StatsCountDashboardPage',

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

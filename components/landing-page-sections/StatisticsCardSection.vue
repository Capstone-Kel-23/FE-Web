<template>
  <v-row justify="center">
    <v-col
      sm="12"
      md="10"
      lg="10"
    >
      <v-container
        fluid
        :class="`${mobile ? '' : 'statistics-wrapper'}`"
        :style="`${breakPoint.md ? 'transform: translateY(-100px)' : ''}`"
      >
        <v-row>
          <v-col
            v-for="(statistic, index) in statisticsList"
            :key="index"
            sm="12"
            md="4"
            lg="4"
          >
            <v-card
              class="py-5 px-15"
              elevation="4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <c-text
                font-size="24"
                font-weight="bold"
                color="primary"
                class="text-center"
                v-text="statistic.value"
              />
              <c-text
                font-weight="600"
                color="primary"
                class="text-center ma-0"
                v-text="statistic.title"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'StatisticsCardSection',

  data () {
    return {
      statisticsList: [
        {
          title: 'Download Users',
          value: '2.000'
        },
        {
          title: 'Cloud Users',
          value: '1.000'
        },
        {
          title: 'Community Contributors',
          value: '500'
        }
      ]
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    },
    breakPoint () {
      return {
        sm: this.$vuetify.breakpoint.sm,
        md: this.$vuetify.breakpoint.md,
        lg: this.$vuetify.breakpoint.lg
      }
    }
  }
}
</script>

<style scoped>
  .statistics-wrapper {
    transform: translateY(-100px);
  }
</style>

<template>
  <v-row justify="center">
    <v-col
      sm="12"
      md="10"
      lg="10"
      data-aos="fade-up"
      data-aos-delay="900"
    >
      <c-text
        font-size="40"
        font-weight="bold"
        class="text-center"
        v-text="'Dipercaya oleh banyak perusahaan dari seluruh dunia'"
      />
      <c-text
        :class="`text-center ma-0 ${!mobile || breakPoint.md ? 'py-5 pb-7' : ''}`"
        color="neutral800"
        v-text="'Statistik Tagihin untuk bisnis mereka.'"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'StatisticsSection',

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

<template>
  <v-container
    fluid
    class="pb-15"
    :style="{ backgroundColor: 'var(--v-neutral400-base)' }"
  >
    <v-row>
      <v-col class="pa-0">
        <!-- BEGIN CALL TO ACTION SECTION -->
        <v-container
          ref="callToAction"
          fluid
          :class="`${mobile ? 'pa-5 py-10' : 'pa-10 py-15'}`"
          :style="{ backgroundColor: 'var(--v-primary800-base)' }"
        >
          <CallToActionSection />
        </v-container>
        <!-- END CALL TO ACTION SECTION -->

        <!-- BEGIN FEATURES SECTION -->
        <v-container
          ref="features"
          fluid
        >
          <FeaturesSection />
        </v-container>
        <!-- END FEATURES SECTION -->

        <!-- BEGIN AVAILABLE DEVICES SECTION -->
        <v-container
          ref="devices"
          :class="`${mobile ? 'pa-5 py-10' : 'pa-10 py-15'}`"
        >
          <DevicesSection />
        </v-container>
        <!-- END AVAILABLE DEVICES SECTION -->

        <!-- BEGIN STATISTICS SECTION -->
        <v-container
          ref="statistics"
          fluid
          :class="`${mobile ? 'pa-5 py-10' : 'pa-10 py-15'}`"
          :style="{
            backgroundColor: 'var(--v-neutral200-base)',
            borderRadius: '20px',
            paddingBottom: breakPoint.md ? '100px !important' : ''
          }"
        >
          <StatisticsSection />
        </v-container>
        <v-container
          fluid
          :class="`${mobile ? 'pa-5 pb-10' : 'pa-10 pb-0'}`"
        >
          <StatisticsCardSection />
        </v-container>
        <!-- END STATISTICS SECTION -->

        <!-- BEGIN SUBSCRIBE SECTION -->
        <v-container
          ref="subscribe"
          :class="`${mobile ? 'pa-5 py-10' : 'pa-10 py-15'}`"
          :style="{
            backgroundColor: 'var(--v-neutral200-base)',
            borderRadius: '20px',
          }"
        >
          <SubscribeSection />
        </v-container>
        <!-- END SUBSCRIBE SECTION -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CallToActionSection from '~/components/landing-page-sections/CallToActionSection.vue'
import FeaturesSection from '~/components/landing-page-sections/FeaturesSection.vue'
import DevicesSection from '~/components/landing-page-sections/DevicesSection.vue'
import StatisticsSection from '~/components/landing-page-sections/StatisticsSection.vue'
import StatisticsCardSection from '~/components/landing-page-sections/StatisticsCardSection.vue'
import SubscribeSection from '~/components/landing-page-sections/SubscribeSection.vue'

export default {
  name: 'LandingPage',

  components: {
    CallToActionSection,
    FeaturesSection,
    DevicesSection,
    StatisticsSection,
    StatisticsCardSection,
    SubscribeSection
  },

  layout: 'main',

  data () {
    return {
      options: {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      }
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

<style>
  @media screen and (max-width: 600px) {
    [data-aos] {
      pointer-events: auto !important;
    }

    html:not(.no-js) [data-aos^=fade][data-aos^=fade] {
      opacity: 1 !important;
    }

    html:not(.no-js) [data-aos=fade-up] {
      transform: none !important;
    }
  }
</style>

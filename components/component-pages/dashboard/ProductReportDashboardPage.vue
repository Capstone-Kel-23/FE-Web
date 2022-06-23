<template>
  <v-card class="pa-5">
    <v-container fluid>
      <v-row justify="space-between">
        <v-col cols="auto">
          <c-text
            font-weight="bold"
            font-size="20"
            v-text="'Product Report'"
          />
        </v-col>
        <v-col
          sm="12"
          md="5"
          lg="5"
        >
          <v-menu
            v-model="dateReportMenu"
            transition="slide-y-transition"
            :close-on-click="false"
            :close-on-content-click="false"
            offset-y
          >
            <template #activator="{ on, attrs }">
              <v-card
                class="pa-1 ps-2 date-report-input d-flex justify-space-between"
                outlined
                v-bind="attrs"
                v-on="on"
                @click="setDatePicker"
              >
                {{ dateReportSelected }}
                <v-icon
                  color="black"
                  v-text="dateReportMenu ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                />
              </v-card>
            </template>
            <v-card
              class="pa-3"
            >
              <v-date-picker
                :full-width="$vuetify.breakpoint.mobile"
                :value="dateReportPicker"
                no-title
                color="primary"
                event-color="primary"
                @input="onChangedDateReportPicker($event)"
              />
              <v-divider />
              <v-container>
                <v-row justify="space-between">
                  <v-col>
                    <v-btn
                      small
                      width="100%"
                      outlined
                      color="primary"
                      @click="dateReportMenu = !dateReportMenu"
                      v-text="'CANCEL'"
                    />
                  </v-col>
                  <v-col>
                    <v-btn
                      small
                      width="100%"
                      color="primary"
                      @click="saveSelectedDate"
                      v-text="'SAVE'"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row
        v-for="(report, index) in dataProductReports"
        :key="index"
      >
        <v-col cols="auto">
          <v-img
            max-width="40"
            max-height="40"
            :src="report.icon"
          />
        </v-col>
        <v-col>
          <c-text
            color="neutral700"
            class="ma-0"
            v-text="report.title"
          />
          <c-text
            font-size="20"
            font-weight="bold"
            class="ma-0"
            v-text="report.value"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import * as numberFormat from '@/utils/numberFormat'

export default {
  name: 'ProductReportDashboardPage',

  props: {
    dateReportSelected: {
      type: String,
      default: ''
    },
    dateReportPicker: {
      type: String,
      default: ''
    },
    dataProductReports: {
      type: null,
      default: []
    }
  },

  emits: [
    'on-changed-date-picker',
    'save-selected-date',
    'set-date-picker'
  ],

  data () {
    return {
      dateReportMenu: false
    }
  },

  computed: {
    format () {
      return numberFormat
    }
  },

  methods: {
    onChangedDateReportPicker (value) {
      return this.$emit('on-changed-date-picker', value)
    },

    setDatePicker () {
      return this.$emit('set-date-picker')
    },

    saveSelectedDate () {
      this.dateReportMenu = !this.dateReportMenu
      return this.$emit('save-selected-date')
    }
  }
}
</script>

<style scoped>
  .date-report-input {
    border: 2px solid var(--v-primary-base);
  }
</style>

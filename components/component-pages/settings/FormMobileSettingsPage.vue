<template>
  <v-container class="pa-0 mt-3">
    <!-- BEGIN SEARCH FIELD -->
    <v-card
      rounded="lg"
    >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-container>
          <v-row
            justify="space-between"
            class="align-center grey rounded-t-lg pa-4"
          >
            <c-text
              class="ma-0"
              v-text="'Business'"
            />
            <v-btn
              text
              color="red"
              v-text="'Edit'"
            />
          </v-row>
          <v-row class="pa-4">
            <c-text
              color="neutral700"
              class="ma-0"
              v-text="'All of the preferences below are directly associated with the current business you are currently using. Changes on this page will only affect the current business.'"
            />
          </v-row>
          <v-row><v-divider class="neutral600" /></v-row>
          <v-row class="pa-4 pb-0 flex-column">
            <c-text
              color="neutral700"
              class="ma-0 mb-1"
            >
              Business Name <span class="red--text">*</span>
            </c-text>
            <v-text-field
              v-model="businessName"
              placeholder="Enter Business Name"
              solo
              background-color="neutral400"
            />
          </v-row>
          <v-row><v-divider class="neutral600" /></v-row>
          <v-row class="pa-4 pb-0 flex-column">
            <c-text
              color="neutral700"
              class="ma-0 mb-1"
            >
              Job <span class="red--text">*</span>
            </c-text>
            <v-text-field
              v-model="job"
              placeholder="Enter Job"
              solo
              background-color="neutral400"
            />
          </v-row>
          <v-row><v-divider class="neutral600" /></v-row>
          <v-row class="pa-4">
            <v-btn
              color="primary"
              v-text="'Save Changes'"
            />
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <!-- END SEARCH FIELD -->
  </v-container>
</template>

<script>
export default {
  name: 'FormMobileSettingsPage',

  data () {
    return {
      valid: false,
      businessName: '',
      job: ''
    }
  },

  mounted () {
    this.setDummy()
  },

  methods: {
    setDummy () {
      this.businessName = 'Nabila Salma K'
      this.job = 'Sales Manager'
    }
  }
}
</script>

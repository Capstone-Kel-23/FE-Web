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
              v-text="'Bisnis'"
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
              v-text="'Semua preferensi di bawah ini terkait langsung dengan bisnis saat ini yang sedang Anda gunakan. Perubahan pada halaman ini hanya akan mempengaruhi bisnis saat ini.'"
            />
          </v-row>
          <v-row><v-divider class="neutral600" /></v-row>
          <v-row class="pa-4 pb-0 flex-column">
            <c-text
              color="neutral700"
              class="ma-0 mb-1"
            >
              Nama Bisnis <span class="red--text">*</span>
            </c-text>
            <v-text-field
              v-model="businessName"
              placeholder="Masukkan Nama Bisnis"
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
              Pekerjaan <span class="red--text">*</span>
            </c-text>
            <v-text-field
              v-model="job"
              placeholder="Masukkan Pekerjaan"
              solo
              background-color="neutral400"
            />
          </v-row>
          <v-row><v-divider class="neutral600" /></v-row>
          <v-row class="pa-4">
            <v-btn
              color="primary"
              v-text="'Simpan Perubahan'"
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
  name: 'FormSettingsPage',

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

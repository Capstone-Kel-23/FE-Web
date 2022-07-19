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
              :rules="requiredRules('Nama Bisnis')"
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
              :rules="requiredRules('Pekerjaan')"
              placeholder="Masukkan Pekerjaan"
              solo
              background-color="neutral400"
            />
          </v-row>
          <v-row><v-divider class="neutral600" /></v-row>
          <v-row class="pa-4">
            <v-btn
              color="primary"
              @click="submitDialog"
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
      this.businessName = 'PT Mitra Makmur Sejahtera'
      this.job = 'Sales Manager'
    },

    requiredRules (field) {
      return [
        v => !!v || `${field} tidak boleh kosong!`
      ]
    },

    submitDialog () {
      return this.$refs.form.validate()
        ? this.$nuxt.$emit('open-message-dialog', {
          message: 'Ubah Profil Bisnis',
          description: 'Apakah anda yakin ingin mengubah informasi bisnis anda?',
          icon: 'mdi-help-circle-outline',
          iconColor: 'primary',
          actionButtons: [
            { color: 'primary', text: 'Ya', action: () => { this.submitAction() } },
            { color: 'red', text: 'Batal' }
          ]
        })
        : this.$nuxt.$emit('open-snackbar', {
          message: 'Form tidak valid, silakan cek kembali!',
          status: 400
        })
    },

    submitAction () {
      return this.$nuxt.$emit('open-snackbar', {
        message: 'Profil Bisnis berhasil diubah!',
        status: 200
      })
    }
  }
}
</script>

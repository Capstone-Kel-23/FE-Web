<template>
  <v-col
    sm="10"
    md="8"
    lg="6"
  >
    <v-container
      :class="`mb-5 ${mobile ? 'mt-5' : 'bg-container pa-10'}`"
      style="border-radius: 10px"
    >
      <v-row justify="center">
        <v-col>
          <c-text
            v-if="!mobile"
            font-size="24"
            font-weight="bold"
            class="text-center mb-10"
            v-text="'Lupa Password'"
          />
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <c-text
              v-if="mobile"
              class="mb-15"
              font-size="14"
              v-text="'Masukkan email yang kamu daftarkan di Tagihin agar kamu dapat menerima instruksi untuk mereset password kamu melalui email.'"
            />
            <c-text
              font-size="14"
              font-weight="bold"
              class="ma-0"
              v-text="'Email'"
            />
            <v-text-field
              v-model="email"
              :rules="emailRules"
              placeholder="Masukkan Email"
              dense
              solo
              flat
              background-color="white"
              :class="!mobile ? 'mb-10' : 'mb-5'"
              style="font-size: 14px"
            />
            <div v-if="!mobile">
              <v-btn
                width="100%"
                color="primary"
                class="mb-5"
                v-text="'Atur Ulang Password'"
              />
              <v-btn
                width="100%"
                color="primary"
                outlined
                class="bg-white"
                @click="() => $router.go(-1)"
                v-text="'Kembali'"
              />
            </div>
            <v-btn
              v-if="mobile"
              width="100%"
              color="primary"
              @click="submit"
              v-text="'Reset Password'"
            />
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
export default {
  name: 'ForgotPasswordPage',

  layout: 'auth',

  middleware: ['guest'],

  data () {
    return {
      headerTitle: 'Lupa Password',
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'Email tidak boleh kosong!',
        v => /.+@.+/.test(v) || 'Email tidak valid'
      ]
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    }
  }
}
</script>

<style scoped>
  .bg-white {
    background-color: white;
  }
</style>

<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <!-- BEGIN FIELD NAMA -->
    <c-text
      font-size="14"
      font-weight="600"
      class="ma-0 mb-1"
      v-text="'Nama'"
    />
    <v-text-field
      v-model="name"
      :rules="nameRules"
      placeholder="Masukkan nama"
      dense
      solo
      flat
      background-color="white"
      style="font-size: 14px"
    />
    <!-- END FIELD NAMA -->

    <!-- BEGIN FIELD EMAIL -->
    <c-text
      font-size="14"
      font-weight="600"
      class="ma-0 mb-1"
      v-text="'Email'"
    />
    <v-text-field
      v-model="email"
      :rules="emailRules"
      placeholder="Masukkan email"
      dense
      solo
      flat
      background-color="white"
      style="font-size: 14px"
    />
    <!-- END FIELD EMAIL -->

    <!-- BEGIN FIELD PASSWORD -->
    <c-text
      font-size="14"
      font-weight="600"
      class="ma-0 mb-1"
      v-text="'Password'"
    />
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      placeholder="Masukkan password"
      :type="viewPassword ? 'text' : 'password'"
      dense
      solo
      flat
      background-color="white"
      style="font-size: 14px"
      :append-icon="viewPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="viewPassword = !viewPassword"
    />
    <!-- END FIELD PASSWORD -->

    <!-- BEGIN FIELD KONFIRMASI PASSWORD -->
    <c-text
      font-size="14"
      font-weight="600"
      class="ma-0 mb-1"
      v-text="'Konfirmasi Password'"
    />
    <v-text-field
      v-model="rePassword"
      :rules="rePasswordRules"
      placeholder="Masukkan password"
      :type="viewRePassword ? 'text' : 'password'"
      dense
      solo
      flat
      background-color="white"
      style="font-size: 14px"
      :append-icon="viewRePassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="viewRePassword = !viewRePassword"
    />
    <!-- END FIELD KONFIRMASI PASSWORD -->
    <v-container>
      <v-row justify="center">
        <v-col
          sm="12"
          md="10"
          lg="10"
          :class="mobile ? 'px-0' : ''"
        >
          <c-text
            v-if="!mobile"
            font-size="12"
            class="text-center"
          >
            Dengan menekan tombol DAFTAR, saya menyetujui
            <span class="link-user-agreement">
              Disclaimer, Kebijakan Privasi, serta Syarat
            </span>
            dan Ketentuan dari Tagihin.
          </c-text>
          <v-container v-else>
            <v-row>
              <v-col
                cols="auto"
                class="pa-0"
                align-self="start"
              >
                <v-checkbox
                  v-model="agreement"
                  class="ma-0"
                  hide-details=""
                />
              </v-col>
              <v-col class="py-0">
                <c-text
                  font-size="10"
                  class="ma-0"
                >
                  Dengan mendaftar, saya menyetujui
                  <span class="link-user-agreement">
                    Syarat & Ketentuan, Kebijakan Privasi dan Disclaimer
                  </span>
                </c-text>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-btn
      width="100%"
      color="primary"
      class="mt-10"
      :disabled="!agreement"
      @click="submit"
      v-text="'DAFTAR'"
    />
  </v-form>
</template>

<script>
export default {
  name: 'FormRegisterPage',

  data () {
    return {
      valid: false,
      agreement: false,
      name: '',
      nameRules: [
        v => !!v || 'Nama tidak boleh kosong!'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Email tidak boleh kosong!',
        v => /.+@.+/.test(v) || 'Email tidak valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password tidak boleh kosong!',
        v => v.length >= 8 || 'Masukkan password minimal 8 karakter'
      ],
      rePassword: '',
      rePasswordRules: [
        v => !!v || 'Password tidak boleh kosong!',
        v => this.matchPassword(v)
      ],
      viewPassword: false,
      viewRePassword: false
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    }
  },

  methods: {
    previewPassword () {
      this.viewPassword = !(this.viewPassword)
    },

    lengthPassword () {

    },

    matchPassword (value) {
      if (value !== this.password) {
        return 'Konfirmasi Password tidak sesuai!'
      }
      return true
    },

    async submit () {
      let result = null
      if (this.$refs.form.validate()) {
        await this.$nuxt.$emit('open-loading', true)
        result = {
          status: 201,
          data: { message: 'Pendaftaran berhasil!' }
        }
        // result = await this.$store.dispatch('user/login', {
        //   email: this.email,
        //   password: this.password
        // }).finally(() => {
        //   this.$nuxt.$emit('open-loading', false)
        // })
      } else {
        result = {
          status: 400,
          data: { message: 'Form tidak valid, silakan cek kembali!' }
        }
      }
      await this.$nuxt.$emit('open-snackbar', {
        message: result.data.message,
        status: result.status
      })
      return result.status >= 200 && result.status < 300 ? this.$router.push('/user/dashboard') : null
    }
  }
}
</script>

<style scoped>
  .link-text {
    color: var(--v-primary-base);
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
  }

  .link-user-agreement {
    color: var(--v-primary-base);
    cursor: pointer;
    text-decoration: transparent underline;
    transition: 0.2s all;
  }

  .link-user-agreement:hover {
    text-decoration: var(--v-primary-base) underline;
  }
</style>

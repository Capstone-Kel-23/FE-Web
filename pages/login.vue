<template>
  <v-container
    fluid
    class="fill-height"
  >
    <v-row justify="center">
      <v-col
        sm="10"
        md="8"
        lg="6"
      >
        <v-container v-if="!mobile">
          <v-row justify="center">
            <v-col
              cols="auto"
              align-self="center"
            >
              <v-img
                src="/images/logo/logo.png"
                max-width="60"
                class="mx-auto"
              />
            </v-col>
            <v-col
              cols="auto"
              align-self="center"
            >
              <c-text
                font-size="40"
                font-weight="bold"
                color="primary400"
                class="ma-0"
                v-text="'TAGIHIN'"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container
          :class="`mb-5 ${mobile ? '' : 'bg-container pa-10'}`"
          style="border-radius: 10px"
        >
          <v-row justify="center">
            <v-col>
              <v-container v-if="!mobile">
                <v-row>
                  <v-col cols="auto" class="px-0">
                    <v-btn
                      icon
                      color="black"
                      link
                      @click="() => $router.go(-1)"
                    >
                      <v-icon size="40">
                        mdi-chevron-left
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <c-text
                      font-size="24"
                      font-weight="bold"
                      class="text-center mb-10"
                      v-text="headerTitle"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  placeholder="Masukkan Email"
                  dense
                  solo
                  flat
                  background-color="white"
                  style="font-size: 14px"
                  prepend-inner-icon="mdi-email"
                />
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  placeholder="Masukkan Password"
                  :type="viewPassword ? 'text' : 'password'"
                  dense
                  solo
                  flat
                  background-color="white"
                  style="font-size: 14px"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="viewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append="viewPassword = !viewPassword"
                />
                <v-container class="mb-10">
                  <v-row justify="end">
                    <nuxt-link
                      to="/forgot"
                      class="link-text"
                      v-text="'Lupa Password'"
                    />
                  </v-row>
                </v-container>
                <v-btn
                  width="100%"
                  color="primary"
                  :disabled="email != '' && password != '' ? false : true"
                  @click="submit"
                  v-text="headerTitle"
                />
              </v-form>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-if="!mobile">
          <v-row justify="center">
            <div>
              <c-text
                color="primary"
                font-weight="bold"
                font-size="14"
                v-text="'Belum punya akun ?'"
              />
              <v-btn
                color="primary"
                width="100%"
                v-text="'Daftar'"
              />
            </div>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CText from '~/components/CText.vue'

export default {
  name: 'LoginPage',

  components: { CText },

  layout: 'auth',

  middleware: ['guest'],

  data () {
    return {
      valid: false,
      headerTitle: 'Masuk',
      email: '',
      emailRules: [
        v => !!v || 'Email tidak boleh kosong!',
        v => /.+@.+/.test(v) || 'Email tidak valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password tidak boleh kosong!'
      ],
      viewPassword: false
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

    async submit () {
      let result = null
      if (this.$refs.form.validate()) {
        await this.$nuxt.$emit('open-loading', true)
        result = await this.$store.dispatch('user/login', {
          email: this.email,
          password: this.password
        }).finally(() => {
          this.$nuxt.$emit('open-loading', false)
        })
      } else {
        result = {
          status: 400,
          data: { message: 'Oops... Sorry, Your form is invalidate, please check again!' }
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
</style>

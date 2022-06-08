<template>
  <v-container
    fluid
    class="fill-height"
  >
    <v-row justify="center">
      <v-col cols="auto">
        <v-container :class="mobile ? '' : 'main-container-wrapper'">
          <v-row justify="center">
            <v-col align-self="center">
              <!-- BEGIN LOGO -->
              <v-img
                max-width="85"
                class="mx-auto"
                src="/images/logo/logo.png"
              />
              <c-text
                font-weight="600"
                color="primary400"
                class="text-center"
                v-text="'TAGIHIN'"
              />
              <!-- END LOGO -->
              <!-- BEGIN WELCOME MESSAGE -->
              <c-text
                font-size="20"
                class="font-weight-bold text-center ma-0"
                color="black"
                v-text="'Halo! Selamat Datang'"
              />
              <c-text
                font-size="14"
                class="text-center mb-10"
                color="black"
                v-text="'Buat inovices dalam hitungan detik!'"
              />
              <!-- END WELCOME MESSAGE -->
              <!-- BEGIN BUTTON LIST -->
              <v-btn
                width="100%"
                color="primary"
                class="white--text mb-5"
                link
                v-text="'DAFTAR'"
              />
              <v-btn
                width="100%"
                color="primary"
                class="mb-5 bg-white"
                outlined
                to="/login"
                v-text="mobile ? 'Sudah memiliki akun? MASUK' : 'MASUK'"
              />
              <!-- <v-btn
                width="100%"
                color="grey"
                link
                to="/user/dashboard"
                v-text="'GUEST'"
              /> -->
              <!-- END BUTTON LIST -->
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'WelcomePage',

  layout: 'auth',

  middleware: ['guest'],

  data () {
    return {
      fadeLogo: 0
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

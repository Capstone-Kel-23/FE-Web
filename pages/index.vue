<template>
  <v-container
    fluid
    class="fill-height bg-container"
    :style="{ backgroundColor: fadeLogo > 0 ? 'var(--v-primary100-base)' : 'white' }"
  >
    <v-row
      justify="center"
    >
      <v-col cols="auto">
        <v-img
          max-width="182"
          src="images/logo/logo.png"
          class="splash-logo"
          :style="{
            opacity: fadeLogo,
            transform: `scale(${fadeLogo})`
          }"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SplashScreenPage',

  layout: 'auth',

  data () {
    return {
      fadeLogo: 0
    }
  },

  mounted () {
    this.fadeLogo = 0
    this.showLogo()
  },

  methods: {
    showLogo () {
      setTimeout(() => {
        this.fadeLogo += 0.1
        if (this.fadeLogo < 0.9) {
          this.showLogo()
        } else {
          this.toNextPage()
        }
      }, 80)
    },

    toNextPage () {
      setTimeout(() => {
        if (this.$store.state.user.token) {
          this.$router.push('/user/dashboard')
        } else {
          this.$router.push('/welcome')
        }
      }, 2000)
    }
  }
}
</script>

<style scoped>
  .splash-logo {
    transition: linear 0.1s;
  }
</style>

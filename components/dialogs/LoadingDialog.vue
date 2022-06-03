<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="300"
    >
      <v-card
        color="blue"
        elevation="0"
        class="pa-3"
        dark
      >
        <v-card-text>
          Loading...
          <v-progress-linear
            indeterminate
            color="white"
            class="mt-3"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'LoadingDialog',

  data () {
    return {
      dialog: false
    }
  },

  created () {
    this.$nuxt.$on('open-loading', (data) => {
      this.dialog = data
    })
  },

  beforeDestroy () {
    this.$nuxt.$off('open-loading')
  }
}
</script>

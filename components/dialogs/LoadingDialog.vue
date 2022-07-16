<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="fit-content"
    >
      <v-card
        color="primary"
        elevation="0"
        class="pa-3"
        dark
      >
        <v-progress-circular
          indeterminate
          width="7"
          color="white"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'LoadingDialog',

  data () {
    return {
      dialog: false,
      showTooltip: true
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

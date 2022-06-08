<template>
  <div>
    <v-snackbar
      v-for="(snackbar, index) in stackSnackbar"
      :key="index"
      v-model="snackbar.show"
      :style="{ 'top': calcMargin(index) }"
      :color="snackbar.status >= 200 && snackbar.status < 300 ? 'white' : 'red'"
      :timeout="3000"
      top
      right
    >
      <span
        :class="(snackbar.status >= 200 && snackbar.status < 300 ? 'blue' : 'white') + '--text'"
        v-text="snackbar.message"
      />
      <template #action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          :color="snackbar.status >= 200 && snackbar.status < 300 ? 'blue' : 'white'"
          @click="removeSnackbar (index)"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'SnackBar',

  data () {
    return {
      stackSnackbar: []
    }
  },

  created () {
    this.$nuxt.$on('open-snackbar', (data) => {
      this.stackSnackbar.push({
        message: data.message,
        status: data.status,
        show: true
      })
      setTimeout(() => {
        this.stackSnackbar.splice(0, 1)
      }, 3000)
    })
  },

  beforeDestroy () {
    this.$nuxt.$off('open-snackbar')
  },

  methods: {
    removeSnackbar (index) {
      return this.stackSnackbar.splice(index, 1)
    },

    calcMargin (index) {
      return (index * 60) + 'px'
    }
  }
}
</script>

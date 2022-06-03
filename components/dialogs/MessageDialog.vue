<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card class="pa-5 card-border" width="100%">
        <v-row justify="center">
          <v-col cols="auto" class="pb-3">
            <v-icon
              v-if="icon !== ''"
              size="100"
              :color="iconColor !== '' ? iconColor : 'blue'"
            >
              {{ icon }}
            </v-icon>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto" class="py-0">
            <p
              class="text-center"
              style="font-size: 24px"
              v-text="message"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto" class="py-0">
            <p v-if="description !== ''" class="text-center">
              {{ description }}
            </p>
          </v-col>
        </v-row>
        <v-card-actions v-if="actionButtons.length > 0" class="mt-10">
          <v-row justify="space-between">
            <v-col
              v-for="(button, index) in actionButtons"
              :key="index"
              :cols="actionButtons.length === 1 ? '' : 'auto'"
            >
              <v-btn
                :width="actionButtons.length === 1 ? '100%' : 'auto'"
                :color="button.color ? button.color : 'blue'"
                :class="(button.textColor ? button.textColor : 'white') + '--text'"
                @click="button.action ? customAction (button.action) : dialog = false"
              >
                {{ button.text }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
        <v-card-actions v-else class="mt-10">
          <v-row justify="space-between">
            <v-col>
              <v-btn
                width="100%"
                color="blue"
                class="white--text"
                @click="dialog = false"
              >
                Okay
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'MessageDialog',

  data () {
    return {
      dialog: false,
      message: '',
      description: '',
      icon: '',
      iconColor: '',
      actionButtons: []
    }
  },

  created () {
    this.$nuxt.$on('open-message-dialog', (data) => {
      this.dialog = data.dialog ?? true
      this.message = data.message
      this.description = data.description ?? ''
      this.icon = data.icon ?? ''
      this.iconColor = data.iconColor ?? 'blue'
      this.actionButtons = data.actionButtons ? data.actionButtons : []
    })
  },

  beforeDestroy () {
    this.$nuxt.$off('open-message-dialog')
  },

  methods: {
    customAction (action) {
      action()
      this.dialog = false
    }
  }
}
</script>

<style scoped>
  .card-border {
    border: 1px solid var(--v-blue-base);
  }

  p {
    margin: 0;
  }
</style>

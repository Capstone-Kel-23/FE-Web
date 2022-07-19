<template>
  <v-card>
    <v-list
      class="pb-0 rounded-b-0"
      tile
      dense
    >
      <v-list-item>
        <v-list-item-content>
          <c-text
            font-size="16"
            class="text-center"
            v-text="'Ingatkan Tagihan ini?'"
          />
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-3" />
      <v-list-item
        @click="remindInvoice"
      >
        <v-list-item-content>
          <c-text
            font-size="12"
            class="text-center"
            v-text="'Ya'"
          />
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item
        class="primary rounded-b-0"
        @click="closeDialog"
      >
        <v-list-item-content>
          <c-text
            font-size="14"
            color="white"
            class="text-center"
            v-text="'Batal'"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'DeleteDialogDetailMobileInvoicePage',

  emits: [
    'close-dialog',
    'remind-invoice'
  ],

  methods: {
    closeDialog () {
      return this.$emit('close-dialog')
    },

    remindInvoice () {
      return this.$emit('remind-invoice')
    }
  }
}
</script>

<style scoped>
  p {
    margin: 0;
  }
</style>

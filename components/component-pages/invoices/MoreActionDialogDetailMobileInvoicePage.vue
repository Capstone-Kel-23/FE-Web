<template>
  <v-card>
    <v-list
      class="pb-0 rounded-b-0"
      tile
      dense
    >
      <v-list-item
        @click="openDeleteDialog"
      >
        <v-list-item-content>
          <c-text
            font-size="12"
            class="ma-0 text-center"
            v-text="'Hapus'"
          />
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <c-text
            font-size="12"
            class="ma-0 text-center"
            v-text="'Kirim Pengingat'"
          />
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <c-text
            font-size="12"
            class="ma-0 text-center"
            v-text="'Download Template'"
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
            class="ma-0 text-center"
            v-text="'Batalkan'"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'MoreActionDialogDetailMobileInvoicePage',

  emits: [
    'close-dialog',
    'open-delete-dialog'
  ],

  methods: {
    closeDialog () {
      return this.$emit('close-dialog')
    },

    openDeleteDialog () {
      return this.$emit('open-delete-dialog')
    }
  }
}
</script>

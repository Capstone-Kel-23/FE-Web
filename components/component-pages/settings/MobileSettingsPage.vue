<template>
  <v-container class="pa-0 mt-3 px-3">
    <!-- BEGIN SEARCH FIELD -->
    <c-text
      font-size="20"
      font-weight="bold"
      class="ma-0 text-center"
      v-text="'Pengaturan'"
    />
    <v-card
      rounded="lg"
      class="rounded-b-0 mt-5"
    >
      <v-container>
        <v-row
          class="align-center grey rounded-t-lg px-3 py-2"
        >
          <c-text
            font-size="14"
            font-weight="600"
            class="ma-0"
            v-text="'Pengaturan Bisnis'"
          />
        </v-row>
        <v-row>
          <v-list
            dense
            class="pa-0"
            color="white"
            elevation="0"
            flat
            width="100%"
          >
            <v-list-item
              to="/settings/business"
              dense
              exact
              color="black"
            >
              <v-list-item-content>
                <c-text
                  font-size="12"
                  class="ma-0"
                  v-text="'Ubah Informasi Bisnis'"
                />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </v-container>
    </v-card>
    <v-card
      rounded="lg"
      class="rounded-b-0 mt-5"
    >
      <v-container>
        <v-row
          class="align-center grey rounded-t-lg px-3 py-2"
        >
          <c-text
            font-size="14"
            font-weight="600"
            class="ma-0"
            v-text="'Akun'"
          />
        </v-row>
        <v-row>
          <v-list
            dense
            class="pa-0"
            color="white"
            elevation="0"
            flat
            width="100%"
          >
            <v-list-item
              dense
              color="black"
              @click="logoutDialog"
            >
              <v-list-item-content>
                <c-text
                  font-size="12"
                  class="ma-0"
                  v-text="'Keluar'"
                />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </v-container>
    </v-card>
    <!-- END SEARCH FIELD -->
  </v-container>
</template>

<script>
export default {
  name: 'MobileSettingsPage',

  methods: {
    logoutDialog () {
      this.$nuxt.$emit('open-message-dialog', {
        message: 'Log-out Account',
        description: 'Apakah anda yakin ingin keluar dari akun anda?',
        icon: 'mdi-help-circle-outline',
        iconColor: 'primary',
        actionButtons: [
          { color: 'primary', text: 'Ya', action: () => { this.logoutAction() } },
          { color: 'red', text: 'Batal' }
        ]
      })
    },

    logoutAction () {
      this.$store.dispatch('user/logout')
        .finally(async () => {
          const status = 200
          await this.$nuxt.$emit('open-snackbar', {
            message: 'Terima kasih, sampai jumpa!',
            status: parseInt(status)
          })
          return await this.$router.push('/login')
        })
    }
  }
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col class="pb-0">
        <v-container>
          <v-row justify="space-between">
            <v-col
              cols="auto"
              class="d-flex"
              align-self="center"
            >
              <v-img
                width="40"
                height="40"
                class="me-3"
                src="/images/logo/circle-logo.png"
              />
              <c-text
                font-size="24"
                font-weight="bold"
                class="ma-0"
                color="primary400"
                v-text="'TAGIHIN'"
              />
            </v-col>
            <v-col
              cols="auto"
              align-self="center"
            >
              <c-text
                font-weight="600"
                color="white"
                class="ma-0"
                v-text="'Situs Generate Inovice System Terpercaya #1 di Indonesia'"
              />
            </v-col>
            <v-col
              cols="auto"
              align-self="center"
              class="d-flex"
            >
              <v-btn
                class="mx-2"
                color="white"
                icon
              >
                <v-icon
                  v-text="'mdi-facebook'"
                />
              </v-btn>
              <v-btn
                class="mx-2"
                color="white"
                icon
              >
                <v-icon
                  v-text="'mdi-twitter'"
                />
              </v-btn>
              <v-btn
                class="mx-2"
                color="white"
                icon
              >
                <v-icon
                  v-text="'mdi-instagram'"
                />
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-divider dark class="my-5" />
        <v-container>
          <v-row
            :justify="`${!mobile ? 'space-around' : 'start'}`"
          >
            <v-col cols="6">
              <c-text
                font-size="24"
                font-weight="bold"
                color="white"
                v-text="'TAGIHIN'"
              />
              <c-text
                font-size="14"
                color="neutral800"
                v-text="'Perangkat lunak akuntansi online, open source, dan gratis yang dibuat dengan teknologi modern. Lacak pendapatan dan pengeluaran Anda dengan mudah.'"
              />
            </v-col>
            <v-col
              v-for="(menu, index) in footerMenus"
              :key="index"
              cols="auto"
            >
              <c-text
                font-size="18"
                font-weight="bold"
                color="white"
                v-text="menu.title"
              />
              <div
                v-for="(subMenu, subIndex) in menu.subMenus"
                :key="subIndex"
              >
                <c-text
                  font-size="14"
                  color="white"
                  class="mb-1"
                  v-text="subMenu.title"
                />
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-divider dark class="mt-5" />
        <v-container>
          <v-row justify="space-between">
            <v-col cols="auto">
              <c-text
                font-size="12"
                color="white"
                class="ma-0"
                v-text="'2022 PT Tagih Mitra Persada'"
              />
            </v-col>
            <v-col cols="auto">
              <c-text
                font-size="12"
                color="white"
                class="ma-0"
                v-text="'Didukung oleh Alterra Academy'"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FooterMainLayout',

  data () {
    return {
      footerMenus: [
        {
          title: 'Informasi',
          subMenus: [
            {
              title: 'Tentang Kami'
            },
            {
              title: 'Karir'
            },
            {
              title: 'Pengumuman'
            },
            {
              title: 'Biaya'
            }
          ]
        },
        {
          title: 'Produk',
          subMenus: [
            {
              title: 'Platform Inovice'
            },
            {
              title: 'Platform Akuntan'
            },
            {
              title: 'Buat Proposal'
            },
            {
              title: 'Kontrak'
            }
          ]
        },
        {
          title: 'Resources',
          subMenus: [
            {
              title: 'Proposal Template'
            },
            {
              title: 'Invoice Template'
            },
            {
              title: 'Tutorial'
            },
            {
              title: 'Cara Membuat Kontrak'
            }
          ]
        }
      ]
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    },
    breakPoint () {
      return {
        sm: this.$vuetify.breakpoint.sm,
        md: this.$vuetify.breakpoint.md,
        lg: this.$vuetify.breakpoint.lg
      }
    }
  }
}
</script>

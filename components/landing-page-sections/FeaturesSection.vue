<template>
  <v-row>
    <v-col class="pa-0">
      <!-- BEGIN INTRO HEADER -->
      <v-container
        fluid
        data-aos="fade-up"
        data-aos-delay="300"
        :class="`${mobile ? 'pa-5 py-10' : 'pa-10 py-15'}`"
      >
        <v-row justify="center">
          <v-col
            class="py-0"
            sm="12"
            md="6"
            lg="6"
          >
            <c-text
              font-size="40"
              font-weight="bold"
              class="text-center"
              v-text="'Lebih cepat dengan aplikasi invoice terbaik Indonesia'"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            sm="10"
            md="4"
            lg="4"
          >
            <c-text
              class="text-center ma-0"
              v-text="'Tagihin menyediakan fitur-fitur komprehensif yang memudahkan berbagai kebutuhan bisnis seperti manajemen invoice penjualan'"
            />
          </v-col>
        </v-row>
      </v-container>
      <!-- END INTRO HEADER -->

      <!-- BEGIN CONTENT SECTION -->
      <v-container
        fluid
        :class="`${mobile ? 'pa-5 py-10' : 'pa-10 py-15'}`"
        :style="{
          backgroundColor: 'var(--v-neutral200-base)',
          borderRadius: '20px'
        }"
      >
        <v-row justify="center">
          <v-col
            cols="auto"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <c-text
              color="primary"
              font-size="24"
              font-weight="500"
              class="text-center"
              v-text="'Kenapa Memilih TAGIHIN ?'"
            />
            <c-text
              font-size="40"
              font-weight="bold"
              class="text-center"
              v-text="'Memiliki Banyak Fitur'"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            sm="12"
            md="9"
            lg="9"
          >
            <v-container>
              <v-row justify="space-between">
                <v-col
                  v-for="(feature, index) in featuresList"
                  :key="index"
                  sm="12"
                  md="6"
                  lg="6"
                >
                  <v-card
                    data-aos="fade-up"
                    data-aos-delay="500"
                    :class="`pa-${mobile ? '3' : '5'}`"
                    elevation="0"
                  >
                    <v-container>
                      <v-row>
                        <v-col cols="auto">
                          <v-img
                            max-width="50"
                            :src="feature.icon"
                          />
                        </v-col>
                        <v-col>
                          <c-text
                            font-size="22"
                            font-weight="bold"
                            v-text="feature.title"
                          />
                          <c-text
                            color="neutral700"
                            class="ma-0"
                            v-text="feature.description"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
      <!-- END CONTENT SECTION -->
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FeaturesSection',

  data () {
    return {
      featuresList: [
        {
          icon: '/images/icon/section-features/icon-process.png',
          title: 'Arus Kas',
          description: 'Dapat memantau pemasukan dan pengeluaran anda sehingga dapat menentukan pilihan yang cerdas dan tepat.'
        },
        {
          icon: '/images/icon/section-features/icon-notepad.png',
          title: 'Pembuatan invoice mudah',
          description: 'Membuat client anda kagum dengan profesionalisme anda. Mencari invoice dengan mudah dan dibayar lebih cepat.'
        },
        {
          icon: '/images/icon/section-features/icon-document.png',
          title: 'Pelacakan Biaya',
          description: 'Dapat melacak status invoice anda serta melihat pengeluaran dan aliran dana yang masuk.'
        },
        {
          icon: '/images/icon/section-features/icon-file-explorer.png',
          title: 'Kategori Transaksi',
          description: 'Membuat kategori untuk pendapatan dan pengeluaran anda serta melihat alur barang di invoice.'
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

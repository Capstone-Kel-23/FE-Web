<template>
  <v-row justify="space-around">
    <v-col
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <v-img
        src="/images/section/section-3.png"
        max-width="620"
      />
    </v-col>
    <v-col
      align-self="center"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <c-text
        font-size="40"
        font-weight="bold"
        v-text="'Penawaran Terbaik'"
      />
      <c-text
        color="neutral800"
        v-text="'Dapatkan artikel terbaru dan pembaruan bisnis yang perlu Anda ketahui, Anda bahkan akan mendapatkan rekomendasi khusus setiap minggunya'"
      />
      <v-container class="d-flex">
        <v-text-field
          placeholder="Masukkan Email"
          outlined
          color="neutral800"
          class="subscribe-email-field"
          background-color="white"
        />
        <v-btn
          color="primary"
          class="py-7 subscribe-btn"
          elevation="0"
          v-text="'Langganan'"
        />
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SubscribeSection',

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

<style scoped>
  .subscribe-email-field {
    border-radius: 20px 0px 0px 20px;
  }

  .subscribe-btn {
    border-radius: 0px 20px 20px 0px;
  }
</style>

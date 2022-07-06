<template>
  <v-row>
    <v-col
      sm="12"
      md="4"
      lg="4"
    >
      <v-container
        data-aos="fade-up"
        data-aos-delay="100"
        class="fill-height d-flex flex-column justify-space-between align-start"
      >
        <c-text
          font-size="40"
          font-weight="bold"
          color="white"
          v-text="'Kelola invoice lebih praktis dari satu dasbor lewat aplikasi invoice'"
        />
        <c-text
          color="white"
          v-text="'Tidak ada lagi invoice yang terlewat untuk ditagih. Setiap status terupdate secara real-time'"
        />
        <v-btn
          v-if="userToken === null"
          color="primary"
          x-large
          @click="() => $router.push('/register')"
          v-text="'Daftar'"
        />
      </v-container>
    </v-col>
    <v-col
      sm="12"
      md="8"
      lg="8"
    >
      <v-img
        ref="rightContent"
        data-aos="fade-up"
        data-aos-delay="200"
        class="fade-from-bottom"
        src="/images/section/section-1.jpg"
        :style="{ borderRadius: '20px' }"
        max-width="1000"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CallToActionSection',

  computed: {
    userToken () {
      return this.$store.state.user.token
    }
  }
}
</script>

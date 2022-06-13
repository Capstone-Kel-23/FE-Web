<template>
  <v-row justify="space-around">
    <v-col
      sm="12"
      md="4"
      lg="4"
    >
      <v-img
        data-aos="fade-up"
        data-aos-delay="300"
        src="/images/section/section-2.png"
        class="mx-auto"
        max-width="450"
      />
    </v-col>
    <v-col
      align-self="center"
      sm="12"
      md="8"
      lg="8"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <c-text
        font-size="22"
        font-weight="bold"
        class="text-center"
        v-text="'Aplikasi Mobile Invoice Gratis'"
      />
      <c-text
        font-size="20"
        font-weight="bold"
        class="text-center"
        v-text="'Dapatkan invoice sekarang di perangkat iOS atau Android Apapun!'"
      />
      <v-container>
        <v-row justify="center">
          <v-col cols="auto">
            <a href="https://play.google.com" target="_blank">
              <v-img
                data-aos="fade-up"
                data-aos-delay="500"
                src="/images/icon/section-devices/icon-playstore.png"
                max-width="200"
              />
            </a>
          </v-col>
          <v-col cols="auto">
            <a href="https://apps.apple.com" target="_blank">
              <v-img
                data-aos="fade-up"
                data-aos-delay="500"
                src="/images/icon/section-devices/icon-appstore.png"
                max-width="200"
              />
            </a>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DevicesSection'
}
</script>

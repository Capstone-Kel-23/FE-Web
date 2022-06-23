<template>
  <v-col
    sm="10"
    md="8"
    lg="6"
  >
    <v-container
      :class="`mb-5 ${mobile ? '' : 'bg-container pa-10'}`"
      style="border-radius: 10px"
    >
      <v-row justify="center">
        <v-col>
          <c-text
            v-if="!mobile"
            font-size="24"
            font-weight="bold"
            class="text-center mb-10"
            v-text="headerTitle"
          />
          <FormRegisterPage />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="!mobile">
      <v-row justify="center">
        <div>
          <c-text
            color="primary"
            font-size="14"
            v-text="'Sudah Punya akun ?'"
          />
          <v-btn
            color="primary"
            width="100%"
            elevation="0"
            @click="() => $router.push('/login')"
            v-text="'Masuk'"
          />
        </div>
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import CText from '~/components/CText.vue'
import FormRegisterPage from '@/components/component-pages/register/FormRegisterPage.vue'

export default {
  name: 'RegisterPage',

  components: {
    CText,
    FormRegisterPage
  },

  layout: 'auth',

  middleware: ['guest'],

  data () {
    return {
      headerTitle: 'Daftar Akun'
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    }
  }
}
</script>

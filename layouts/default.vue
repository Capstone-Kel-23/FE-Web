<template>
  <v-app>
    <nuxt v-if="!$slots.default" />
    <slot />
    <MessageDialog />
    <LoadingDialog />
    <SnackBar />
  </v-app>
</template>

<script>
import SnackBar from '@/components/dialogs/SnackBar'
import LoadingDialog from '@/components/dialogs/LoadingDialog'
import MessageDialog from '@/components/dialogs/MessageDialog'

export default {
  name: 'DefaultLayout',

  components: {
    SnackBar,
    LoadingDialog,
    MessageDialog
  },

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style>
  .page-enter-active, .page-leave-active {
    transition: 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .page-enter, .page-leave-active {
    opacity: 0;
  }

  .page-enter {
    transform: translateX(-100px);
  }

  .page-leave-active {
    transform: translateX(100px);
  }
</style>

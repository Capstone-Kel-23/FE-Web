<template>
  <default-layout>
    <v-dialog
      v-if="mobile"
      v-model="mobileMenuDialog"
      content-class="mobile-nav-dialog ma-0"
      transition="dialog-top-transition"
    >
      <AppBarMobileMainLayout
        :appbar-menus="appbarMenus"
        :mobile-menu-dialog="mobileMenuDialog"
        @close-mobile-menu-dialog="mobileMenuDialog = !mobileMenuDialog"
      />
    </v-dialog>
    <AppBarMainLayout
      :appbar-menus="appbarMenus"
      :mobile-menu-dialog="mobileMenuDialog"
      @open-mobile-menu-dialog="mobileMenuDialog = !mobileMenuDialog"
    />
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer
      color="primary900"
    >
      <FooterMainLayout />
    </v-footer>
  </default-layout>
</template>

<script>
import DefaultLayout from './default.vue'
import FooterMainLayout from '~/components/main-layout/FooterMainLayout.vue'
import AppBarMainLayout from '@/components/main-layout/AppBarMainLayout.vue'
import AppBarMobileMainLayout from '@/components/main-layout/AppBarMobileMainLayout.vue'

export default {
  name: 'MainLayout',

  components: {
    DefaultLayout,
    FooterMainLayout,
    AppBarMainLayout,
    AppBarMobileMainLayout
  },

  data () {
    return {
      appbarMenus: [
        {
          title: 'Produk',
          subMenus: [
            { title: 'Proposal', subTitle: 'Download template proposal', iconImage: '/images/icon/csv-icon.png' },
            { title: 'Invoice', subTitle: 'Download template invoice', iconImage: '/images/icon/csv-icon.png' }
          ]
        },
        {
          title: 'Template',
          subMenus: [
            { title: 'Invoice', subTitle: 'Download template invoice', iconImage: '/images/icon/csv-icon.png' },
            { title: 'Proposal', subTitle: 'Download template proposal', iconImage: '/images/icon/csv-icon.png' }
          ]
        },
        {
          title: 'Blog'
        },
        {
          title: 'Biaya'
        }
      ],
      mobileMenuDialog: false
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

<style lang="scss" scoped>
  ::v-deep .mobile-nav-dialog {
    align-self: flex-start;
  }
</style>

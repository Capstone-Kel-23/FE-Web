<template>
  <v-container
    v-if="mobile"
    fluid
    :class="`main-content-bg fill-height align-start ${mobile ? 'pa-5' : 'pa-10'}`"
  >
    <v-dialog
      v-model="moreActionDialog"
      content-class="mobile-nav-dialog ma-0"
      transition="dialog-bottom-transition"
    >
      <MoreActionDialogDetailMobileInvoicePage
        @open-delete-dialog="deleteInvoiceDialog"
        @close-dialog="moreActionDialog = !moreActionDialog"
      />
    </v-dialog>
    <v-dialog
      v-model="deleteDialog"
      content-class="mobile-nav-dialog ma-0"
      transition="dialog-bottom-transition"
    >
      <DeleteDialogDetailMobileInvoicePage
        @close-dialog="deleteDialog = !deleteDialog"
        @delete-invoice="deleteInvoiceAction"
      />
    </v-dialog>
    <v-row>
      <v-col>
        <v-container class="pa-0">
          <v-row>
            <!-- BEGIN HEADER TITLE -->
            <v-col cols="auto">
              <v-btn
                icon
                @click="() => $router.go(-1)"
              >
                <v-icon
                  size="40"
                  color="black"
                  v-text="'mdi-chevron-left'"
                />
              </v-btn>
            </v-col>
            <v-col>
              <c-text
                font-size="20"
                font-weight="bold"
                class="text-center ma-0"
                v-text="'Tagihan'"
              />
            </v-col>
            <v-col cols="auto">
              <v-btn
                icon
                @click="moreActionDialog = !moreActionDialog"
              >
                <v-icon
                  size="30"
                  color="black"
                  v-text="'mdi-dots-vertical'"
                />
              </v-btn>
            </v-col>
            <!-- END HEADER TITLE -->
          </v-row>
          <v-row>
            <v-col>
              <PreviewDetailMobileInvoicePage
                :invoice="detailInvoice"
                :is-loading="isLoadingDetailInvoice"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PreviewDetailMobileInvoicePage from '@/components/component-pages/invoices/PreviewDetailMobileInvoicePage.vue'
import MoreActionDialogDetailMobileInvoicePage from '~/components/component-pages/invoices/MoreActionDialogDetailMobileInvoicePage.vue'
import DeleteDialogDetailMobileInvoicePage from '~/components/component-pages/invoices/DeleteDialogDetailMobileInvoicePage.vue'
import * as Api from '@/values/api'
import * as Request from '@/utils/request'

export default {
  name: 'MobileDetailInvoicePage',

  components: {
    PreviewDetailMobileInvoicePage,
    MoreActionDialogDetailMobileInvoicePage,
    DeleteDialogDetailMobileInvoicePage
  },

  layout: 'dashboard',

  middleware: ['auth'],

  data () {
    return {
      moreActionDialog: false,
      isLoadingDetailInvoice: false,
      deleteDialog: false,
      detailInvoice: {}
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    },

    invoiceId () {
      return this.$route.params.invoiceId
    }
  },

  mounted () {
    this.fetchDetailInvoice()
  },

  beforeCreate () {
    if (!this.$vuetify.breakpoint.mobile) {
      this.$router.go(-1)
    }
  },

  updated () {
    if (!this.$vuetify.breakpoint.mobile) {
      this.$router.go(-1)
    }
  },

  methods: {
    async fetchDetailInvoice () {
      this.isLoadingDetailInvoice = true
      this.detailInvoice = {}
      await Request.get({
        url: `${Api.detailInvoiceById}/${this.invoiceId}`,
        token: this.$store.state.user.token
      })
        .then((response) => {
          const result = response.data
          this.detailInvoice = {
            id: result.data.invoice.id,
            invoiceNumber: result.data.invoice.invoice_number,
            firstName: result.data.invoice.client.first_name,
            lastName: result.data.invoice.client.last_name,
            email: result.data.invoice.client.email,
            phone: result.data.invoice.client.phone_number,
            province: result.data.invoice.client.state,
            city: result.data.invoice.client.city,
            postalCode: result.data.invoice.client.postal_code,
            businessName: 'PT Mitra Makmur Sejahtera',
            businessEmail: 'mitramakmur@gmail.com',
            date: result.data.invoice.date,
            dueDate: result.data.invoice.date_due,
            paymentType: result.data.invoice.type_payment === 'online' ? 'Online' : 'Cash',
            subTotal: result.data.invoice.sub_total,
            total: result.data.invoice.total,
            discount: 0,
            tax: 0,
            items: []
          }
          result.data.invoice.additional_costs.map((el) => {
            if (el.type.toLowerCase() === 'tax') {
              this.detailInvoice.tax = el.total
            } else if (el.type.toLowerCase() === 'disc') {
              this.detailInvoice.discount = el.total
            }
            return null
          })
          result.data.invoice.items.map((item) => {
            return this.detailInvoice.items.push({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              description: item.description,
              price: item.price,
              amount: item.price * item.quantity
            })
          })
        })
        .catch((err) => {
          const result = err.response
          this.$nuxt.$emit('open-snackbar', {
            message: result.data.message,
            status: result.status
          })
        })
        .finally(() => {
          this.isLoadingDetailInvoice = false
        })
    },

    deleteInvoiceDialog () {
      this.moreActionDialog = !this.moreActionDialog
      this.deleteDialog = !this.deleteDialog
      // this.$nuxt.$emit('open-message-dialog', {
      //   message: 'Hapus Tagihan',
      //   description: 'Apakah anda yakin ingin menghapus tagihan ini?',
      //   icon: 'mdi-help-circle-outline',
      //   iconColor: 'primary',
      //   actionButtons: [
      //     { color: 'primary', text: 'Ya', action: () => { this.deleteInvoiceAction(invoiceId) } },
      //     { color: 'red', text: 'Batal' }
      //   ]
      // })
    },

    async deleteInvoiceAction () {
      let result = null
      this.$nuxt.$emit('open-loading', true)
      await Request.del({
        url: `${Api.deleteInvoice}/${this.detailInvoice.id.toString()}`,
        token: this.$store.state.user.token
      })
        .then((response) => {
          result = response
          this.$router.go(-1)
        })
        .catch((err) => { result = err.response })
        .finally(() => {
          this.$nuxt.$emit('open-loading', false)
          this.$nuxt.$emit('open-snackbar', {
            message: result.data.message !== null ? result.data.message : 'Maaf terjadi kesalahan',
            status: result.status
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .mobile-nav-dialog {
    align-self: flex-end;
  }
</style>

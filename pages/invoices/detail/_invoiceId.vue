<template>
  <v-container
    v-if="mobile"
    fluid
    :class="`main-content-bg fill-height align-start ${mobile ? 'pa-5' : 'pa-10'}`"
  >
    <VueHtml2pdf
      v-show="false"
      ref="invoiceContainer"
      :show-layout="true"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      :filename="`${detailInvoice.invoiceNumber} - Export`"
      :pdf-quality="2"
      pdf-format="a6"
      pdf-orientation="portrait"
      pdf-content-width="400px"
    >
      <section slot="pdf-content">
        <ExportContainer
          :invoice="detailInvoice"
        />
      </section>
    </VueHtml2pdf>
    <v-dialog
      v-model="moreActionDialog"
      content-class="mobile-nav-dialog ma-0"
      transition="dialog-bottom-transition"
    >
      <MoreActionDialogDetailMobileInvoicePage
        @open-delete-dialog="deleteInvoiceDialog"
        @open-remind-dialog="remindInvoiceDialog"
        @close-dialog="moreActionDialog = !moreActionDialog"
        @export-invoice="generateExport"
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
    <v-dialog
      v-model="remindDialog"
      content-class="mobile-nav-dialog ma-0"
      transition="dialog-bottom-transition"
    >
      <RemindDialogDetailMobileInvoicePage
        @close-dialog="remindDialog = !remindDialog"
        @remind-invoice="remindInvoiceAction"
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
import ExportContainer from '@/components/ExportContainer.vue'
import MoreActionDialogDetailMobileInvoicePage from '~/components/component-pages/invoices/MoreActionDialogDetailMobileInvoicePage.vue'
import DeleteDialogDetailMobileInvoicePage from '~/components/component-pages/invoices/DeleteDialogDetailMobileInvoicePage.vue'
import RemindDialogDetailMobileInvoicePage from '~/components/component-pages/invoices/RemindDialogDetailMobileInvoicePage.vue'
import * as Api from '@/values/api'
import * as Request from '@/utils/request'

export default {
  name: 'MobileDetailInvoicePage',

  components: {
    PreviewDetailMobileInvoicePage,
    ExportContainer,
    MoreActionDialogDetailMobileInvoicePage,
    DeleteDialogDetailMobileInvoicePage,
    RemindDialogDetailMobileInvoicePage
  },

  layout: 'dashboard',

  middleware: ['auth'],

  data () {
    return {
      moreActionDialog: false,
      isLoadingDetailInvoice: false,
      deleteDialog: false,
      remindDialog: false,
      detailInvoice: {}
      // htmlToPdfOptions: {
      //   image: {
      //     type: 'jpg',
      //     quality: 1
      //   },
      //   html2canvas: {
      //     scale: 1,
      //     useCORS: true,
      //     dpi: 300,
      //     letterRendering: true
      //   }
      // }
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

    remindInvoiceDialog () {
      this.moreActionDialog = !this.moreActionDialog
      this.remindDialog = !this.remindDialog
    },

    async remindInvoiceAction () {
      let result = null
      this.$nuxt.$emit('open-loading', true)
      await Request.post({
        url: `${Api.sendInvoice}/${this.invoiceId}`,
        token: this.$store.state.user.token
      })
        .then((response) => {
          result = response
          this.fetchDetailInvoice()
        })
        .catch((err) => { result = err.response })
        .finally(() => {
          this.remindDialog = !this.remindDialog
          this.$nuxt.$emit('open-loading', false)
          this.$nuxt.$emit('open-snackbar', {
            message: result.data.message !== null ? result.data.message : 'Maaf terjadi kesalahan',
            status: result.status
          })
        })
    },

    deleteInvoiceDialog () {
      this.moreActionDialog = !this.moreActionDialog
      this.deleteDialog = !this.deleteDialog
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
    },

    generateExport () {
      this.$refs.invoiceContainer.generatePdf()
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .mobile-nav-dialog {
    align-self: flex-end;
  }
</style>

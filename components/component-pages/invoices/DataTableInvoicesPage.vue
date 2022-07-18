<template>
  <v-container class="pa-0 mt-3">
    <v-dialog
      v-model="detailInvoiceDialog"
      max-width="600"
    >
      <PreviewDetailInvoicePage
        :invoice="detailInvoice"
        :is-loading="isLoadingDetailInvoice"
        @close-dialog="detailInvoiceDialog = !detailInvoiceDialog"
      />
    </v-dialog>
    <!-- BEGIN SEARCH FIELD -->
    <v-container class="pa-0">
      <v-row justify="end">
        <v-col cols="5">
          <v-text-field
            v-model="searchKeyword"
            placeholder="Cari Tagihan"
            color="white"
            solo
            append-icon="mdi-magnify"
            @click:append="search"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- END SEARCH FIELD -->

    <!-- BEGIN CATEGORY -->
    <v-container class="btn-categories">
      <v-row justify="end">
        <v-btn
          elevation="0"
          dark
          :color="selectedCategory === 'All'.toLowerCase() ? 'primary900' : 'primary400'"
          @click="changeCategory('All')"
          v-text="'Semua'"
        />
        <v-btn
          elevation="0"
          dark
          :color="selectedCategory === 'Paid'.toLowerCase() ? 'primary900' : 'primary400'"
          @click="changeCategory('Paid')"
          v-text="'Dibayar'"
        />
        <v-btn
          elevation="0"
          dark
          :color="selectedCategory === 'Unpaid'.toLowerCase() ? 'primary900' : 'primary400'"
          @click="changeCategory('Unpaid')"
          v-text="'Belum Dibayar'"
        />
      </v-row>
    </v-container>
    <!-- END CATEGORY -->

    <!-- BEGIN TABLE -->
    <v-data-table
      v-model="selectedRow"
      :headers="headers"
      :items="invoices"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :search.sync="searchKeyword"
      hide-default-footer
      class="elevation-2 data-table-wrapper"
      show-select
      :custom-filter="filterByCategory"
      :loading="isLoading"
      loading-text="Memuat Data..."
      @page-count="pageCount = $event"
    >
      <template #[`item.invoiceNumber`]="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="item.invoiceNumber === '' || item.invoiceNumber === null ? '-' : item.invoiceNumber"
        />
      </template>
      <template #[`item.date`]="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="`${$moment(item.date).format('DD MMM, YYYY')}`"
        />
      </template>
      <template #[`item.to`]="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="item.to"
        />
      </template>
      <template #[`item.amount`]="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
          v-text="format.currency(item.amount)"
        />
      </template>
      <template #[`item.dueDate`]="{ item }">
        <v-tooltip
          top
          :color="$moment(item.dueDate).diff($moment(), 'days') > 0 ? 'orange' : ''"
        >
          <template #activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
            >
              <c-text
                font-size="12"
                :color="$moment(item.dueDate).diff($moment(), 'days') > 0 ? 'orange' : ''"
                class="ma-0"
                v-text="`${$moment(item.dueDate).diff($moment(), 'days') > 0 ? $moment(item.dueDate).endOf().fromNow() : 'Sudah Lewat'}`"
              />
            </div>
          </template>
          <span>
            {{ $moment(item.date).format('DD MMM, YYYY') }}
          </span>
        </v-tooltip>
      </template>
      <template #[`item.statusInvoice`]="{ item }">
        <v-chip
          style="font-size: 12px"
          :color="item.statusInvoice.toLowerCase() === 'unpaid' ? 'grey' : 'primary200'"
          v-text="item.statusInvoice.toLowerCase() === 'unpaid' ? 'Unpaid' : 'Paid'"
        />
      </template>
      <template #[`item.statusPayment`]="{ item }">
        <c-text
          font-size="12"
          class="ma-0"
        >
          <v-icon
            :color="statusPaymentColor(item.statusPayment).color"
            size="10"
            v-text="'mdi-circle'"
          />
          {{ statusPaymentColor(item.statusPayment).text }}
        </c-text>
      </template>
      <template #[`item.action`]="{ item }">
        <v-menu
          bottom
          left
          nudge-left="25"
          transition="slide-y-transition"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              small
              v-bind="attrs"
              v-on="on"
            >
              <v-icon
                size="20"
                v-text="'mdi-dots-vertical'"
              />
            </v-btn>
          </template>
          <v-list
            dense
            class="py-0"
          >
            <v-list-item
              dense
              @click="fetchDetailInvoice(item.id)"
            >
              <v-list-item-title class="text-center" v-text="'Detail'" />
            </v-list-item>
            <v-divider />
            <v-list-item
              dense
              @click="deleteInvoiceDialog(item.id)"
            >
              <v-list-item-title class="text-center" v-text="'Hapus'" />
            </v-list-item>
            <div
              v-if="item.paymentType.toLowerCase() === 'cash'"
            >
              <v-divider />
              <v-list-item
                dense
                @click="changeInvoiceStatusDialog(item)"
              >
                <v-list-item-title
                  class="text-center"
                  v-text="item.statusInvoice.toLowerCase() === 'unpaid' ? 'Tandai Dibayar' : 'Tandai Belum Dibayar'"
                />
              </v-list-item>
            </div>
            <v-tooltip
              v-if="item.paymentType.toLowerCase() === 'online'"
              bottom
              nudge-bottom="-10"
              color="orange"
              transition="slide-y-transition"
            >
              <template #activator="{ on, attrs }">
                <div
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-divider />
                  <v-list-item
                    dense
                    disabled
                  >
                    <v-list-item-title
                      class="text-center"
                      v-text="item.statusInvoice.toLowerCase() === 'unpaid' ? 'Tandai Dibayar' : 'Tandai Belum Dibayar'"
                    />
                  </v-list-item>
                </div>
              </template>
              <span>Hanya berlaku untuk pembayaran Cash</span>
            </v-tooltip>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <v-container>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-container class="px-0">
            <v-row>
              <v-col
                align-self="center"
                class="px-0"
              >
                <div
                  :class="`btn-pagination elevation-2 pa-1 px-0 ${page === 1 ? 'btn-pagination-disabled' : ''}`"
                  @click="page = 1"
                >
                  <v-icon
                    color="black"
                    v-text="'mdi-chevron-left'"
                  />
                  <v-icon
                    color="black"
                    v-text="'mdi-chevron-left'"
                  />
                </div>
              </v-col>
              <v-col
                class="px-0"
              >
                <v-pagination
                  v-model="page"
                  :length="pageCount"
                  :total-visible="totalVisiblePagination"
                  class="pagination-wrapper"
                />
              </v-col>
              <v-col
                align-self="center"
                class="px-0"
              >
                <div
                  :class="`btn-pagination elevation-2 pa-1 px-0 ${page === pageCount ? 'btn-pagination-disabled' : ''}`"
                  @click="page = pageCount"
                >
                  <v-icon
                    color="black"
                    v-text="'mdi-chevron-right'"
                  />
                  <v-icon
                    color="black"
                    v-text="'mdi-chevron-right'"
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col
          v-if="mobile"
          cols="6"
          align-self="center"
        >
          <v-container>
            <v-select
              v-model="itemsPerPage"
              :items="itemsPerPageSelect"
              item-text="text"
              item-value="value"
              dense
              solo
              @input="() => {page = 1; totalVisiblePagination = 5;}"
            />
          </v-container>
        </v-col>
        <v-col cols="6">
          <v-container class="pe-0">
            <v-row justify="end">
              <v-col
                v-if="!mobile"
                cols="2"
                class="px-0"
              >
                <v-select
                  v-model="itemsPerPage"
                  :items="itemsPerPageSelect"
                  item-text="text"
                  item-value="value"
                  dense
                  solo
                  @input="() => {page = 1; totalVisiblePagination = 5;}"
                />
              </v-col>
              <v-col cols="auto" :class="`pe-0 ${mobile ? 'ps-0' : ''}`">
                <v-btn
                  color="primary"
                  @click="remindInvoiceDialog"
                  v-text="'Ingatkan'"
                />
              </v-col>
              <v-col cols="auto" class="pe-0">
                <v-btn
                  color="primary"
                  v-text="'Ekspor'"
                />
              </v-col>
              <v-col cols="auto" class="pe-0">
                <v-btn
                  color="primary"
                  @click="importDialog = !importDialog"
                  v-text="'Impor'"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="importDialog"
      max-width="600"
    >
      <v-card
        rounded="lg"
      >
        <v-container
          fluid
          class="px-0"
        >
          <v-row
            justify="space-between"
            class="mx-3 my-1"
          >
            <v-col cols="auto">
              <c-text
                font-size="24"
                font-weight="bold"
                class="ma-0"
                v-text="'Impor Tagihan'"
              />
            </v-col>
            <v-col cols="auto">
              <v-btn
                color="primary"
                icon
                @click="importDialog = !importDialog"
              >
                <v-icon size="30">
                  mdi-window-close
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider />
          <div class="px-15 py-10">
            <input
              ref="fileBrowser"
              type="file"
              accept=".jpg, .png, .jpeg"
              style="display: none"
              @input.prevent="onDrop($event.target)"
            >
            <v-container
              :class="`import-file-dropzone rounded-xl ${dragover ? 'import-file-dropzone-active' : (showImportError ? 'import-file-dropzone-error' : '')}`"
              @drop.prevent="onDrop($event.dataTransfer)"
              @dragover.prevent="dragover = true"
              @dragenter.prevent="dragover = true"
              @dragleave.prevent="dragover = false"
              @click="$refs.fileBrowser.click()"
            >
              <v-img
                class="mx-auto mt-5"
                max-width="90"
                max-height="90"
                src="/images/icon/upload-cloud-icon.svg"
                lazy-src="/images/icon/upload-cloud-icon.svg"
              />
              <c-text
                font-size="16"
                class="text-center ma-0"
                v-text="'Seret dan jatuhkan file di sini untuk Unggah atau klik di sini untuk memilih file Anda'"
              />
              <c-text
                class="text-center mb-5"
                v-text="'MAKS. Ukuran file : 10MB'"
              />
            </v-container>
            <v-card
              v-show="showImportError"
              rounded="lg"
              color="red"
              dark
              flat
              class="pa-1 my-3 text-center"
            >
              <c-text
                font-size="12"
                class="ma-0"
              >
                File harus memiliki format excel (.xls, .xlsx) dan tidak lebih dari 10MB
              </c-text>
            </v-card>
            <v-list v-if="importedFiles !== null">
              <v-list-item
                dense
                class="elevation-2 mt-3 rounded-lg"
              >
                <v-list-item-action>
                  <v-icon
                    color="black"
                    size="35"
                    v-text="'mdi-microsoft-excel'"
                  />
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="pa-0">
                    <c-text
                      class="ma-0"
                      font-size="14"
                      font-weight="600"
                      v-text="importedFiles.name"
                    />
                    <c-text
                      class="ma-0"
                      font-size="12"
                      color="neutral700"
                      v-text="formatFileSize(importedFiles.size)"
                    />
                  </v-list-item-title>
                </v-list-item-content>
                <v-btn
                  color="red"
                  icon
                  @click="importedFiles = null"
                >
                  <v-icon
                    v-text="'mdi-window-close'"
                  />
                </v-btn>
              </v-list-item>
            </v-list>
            <v-container v-if="importedFiles !== null">
              <v-row justify="end">
                <v-btn
                  class="mt-5"
                  color="primary"
                  @click="submitImport"
                  v-text="'Unggah'"
                />
              </v-row>
            </v-container>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="successImportDialog"
      max-width="500"
    >
      <v-card class="pa-5">
        <v-container
          fluid
        >
          <v-row justify="end" class="mb-5">
            <v-btn
              icon
              color="primary"
              @click="successImportDialog = !successImportDialog"
            >
              <v-icon
                size="30"
                v-text="'mdi-window-close'"
              />
            </v-btn>
          </v-row>
          <v-row
            justify="center"
            class="flex-column align-center"
          >
            <v-img
              max-width="100"
              max-height="100"
              class="mb-5"
              src="/images/icon/success-icon.svg"
              lazy-src="/images/icon/success-icon.svg"
            />
            <c-text
              font-size="24"
              font-weight="bold"
              class="text-center"
              v-text="'File Uploaded Successfully!'"
            />
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- END TABLE -->
  </v-container>
</template>

<script>
import PreviewDetailInvoicePage from './PreviewDetailInvoicePage.vue'
import * as numberFormat from '@/utils/numberFormat'
import * as Api from '@/values/api'
import * as Request from '@/utils/request'

export default {
  name: 'DataTableInvoicesPage',

  components: {
    PreviewDetailInvoicePage
  },

  data () {
    return {
      invoices: [],
      isLoading: true,
      isLoadingDetailInvoice: true,
      detailInvoiceDialog: false,
      detailInvoice: {},
      importDialog: false,
      successImportDialog: false,
      showImportError: false,
      dragover: false,
      importedFiles: null,
      searchKeyword: '',
      selectedCategory: 'all',
      page: 1,
      pageCount: 0,
      totalVisiblePagination: 5,
      itemsPerPage: 10,
      itemsPerPageSelect: [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: '50', value: 50 }
      ],
      selectedRow: [],
      headers: [
        { text: 'ID Tagihan', value: 'invoiceNumber' },
        { text: 'Tanggal Tagihan', value: 'date', align: 'center' },
        { text: 'Tagihan Kepada', value: 'to', align: 'center' },
        { text: 'Jumlah', value: 'amount', align: 'center' },
        { text: 'Batas Waktu', value: 'dueDate', align: 'center' },
        {
          text: 'Status Tagihan',
          value: 'statusInvoice',
          align: 'center',
          filter: this.filterByCategory
        },
        { text: 'Status Pembayaran', value: 'statusPayment', align: 'center' },
        { text: 'Action', value: 'action', align: 'center', filter: false }
      ]
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    },

    checkedAll () {
      return false
    },

    format () {
      return numberFormat
    }
  },

  mounted () {
    this.fetchInvoices()
  },

  methods: {
    async fetchInvoices () {
      this.isLoading = true
      await Request.get({
        url: Api.invoicesByUser,
        data: {
          userid: this.$store.state.user.id.toString()
        },
        token: this.$store.state.user.token
      })
        .then((response) => {
          this.invoices = []
          response.data.data.map((el) => {
            return this.invoices.push({
              id: el.id,
              invoiceNumber: el.invoice_number,
              date: el.date,
              to: `${el.client.first_name} ${el.client.last_name}`,
              amount: el.total,
              dueDate: el.date_due,
              statusInvoice: el.status,
              statusPayment: el.status_payment,
              paymentType: el.type_payment
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
          this.isLoading = false
        })
    },

    statusPaymentColor (value) {
      let statusColor = 'neutral700'
      let statusText = 'Pending'
      if (value.toLowerCase() === 'pending') {
        statusColor = 'neutral700'
        statusText = 'Pending'
      } else if (value.toLowerCase() === 'success') {
        statusColor = 'green'
        statusText = 'Success'
      } else if (value.toLowerCase() === 'expired') {
        statusColor = 'orange'
        statusText = 'Expired'
      } else if (value.toLowerCase() === 'failed') {
        statusColor = 'red'
        statusText = 'Failed'
      }

      return {
        color: statusColor,
        text: statusText
      }
    },

    search () {},

    changeCategory (category) {
      this.selectedCategory = category.toLowerCase()
    },

    filterByCategory (value, search, item) {
      if (search === '') {
        const category = value.toLowerCase()
        if (this.selectedCategory.toLowerCase() === 'all') { return true }
        return this.selectedCategory.toLowerCase() === category
      } else {
        return Object.values(item).some((prop) => {
          return (String(prop).toLowerCase()).includes(search.toLowerCase())
        })
      }
    },

    checkToAll () {},

    deleteInvoiceDialog (invoiceId) {
      this.$nuxt.$emit('open-message-dialog', {
        message: 'Hapus Tagihan',
        description: 'Apakah anda yakin ingin menghapus tagihan ini?',
        icon: 'mdi-help-circle-outline',
        iconColor: 'primary',
        actionButtons: [
          { color: 'primary', text: 'Ya', action: () => { this.deleteInvoiceAction(invoiceId) } },
          { color: 'red', text: 'Batal' }
        ]
      })
    },

    async deleteInvoiceAction (invoiceId) {
      let result = null
      this.$nuxt.$emit('open-loading', true)
      await Request.del({
        url: `${Api.deleteInvoice}/${invoiceId.toString()}`,
        token: this.$store.state.user.token
      })
        .then((response) => { result = response })
        .catch((err) => { result = err.response })
        .finally(async () => {
          this.$nuxt.$emit('open-loading', false)
          await this.fetchInvoices()
          this.$nuxt.$emit('open-snackbar', {
            message: result.data.message !== null ? result.data.message : 'Maaf terjadi kesalahan',
            status: result.status
          })
        })
    },

    onDrop (e) {
      this.showImportError = false
      this.dragover = false
      const extension = (e.files[0].name).split('.')
      const extensionName = extension[extension.length - 1]
      const size = e.files[0].size
      if (
        (extensionName === 'xls' || extensionName === 'xlsx') &&
        size <= 10485760
      ) {
        this.importedFiles = e.files[0]
        this.importedFiles.extension = extensionName
      } else {
        this.showImportError = true
      }
    },

    async submitImport () {
      let result = null
      this.$nuxt.$emit('open-loading', true)
      await Request.post({
        url: Api.importInvoice,
        token: this.$store.state.user.token,
        data: {
          files: this.importedFiles
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(async (response) => {
          result = response
          this.importDialog = !this.importDialog
          this.successImportDialog = !this.successImportDialog
          await this.fetchInvoices()
        })
        .catch((err) => {
          result = err.response
          this.$nuxt.$emit('open-snackbar', {
            message: result.data.message !== null ? result.data.message : 'Maaf terjadi kesalahan',
            status: result.status
          })
        })
        .finally(() => {
          this.$nuxt.$emit('open-loading', false)
        })
    },

    formatFileSize (bytes, decimalPoint = null) {
      if (bytes === 0) { return '0 Bytes' }
      const k = 1000
      const dm = decimalPoint || 2
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },

    async fetchDetailInvoice (invoiceId) {
      this.isLoadingDetailInvoice = true
      this.detailInvoiceDialog = true
      this.detailInvoice = {}
      await Request.get({
        url: `${Api.detailInvoiceById}/${invoiceId}`,
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
          this.detailInvoiceDialog = false
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

    changeInvoiceStatusDialog (dataInvoice) {
      return this.$nuxt.$emit('open-message-dialog', {
        message: 'Ubah Status Tagihan?',
        description: `Apakah anda yakin ingin mengubah status tagihan ini menjadi ${dataInvoice.statusInvoice.toLowerCase() === 'unpaid' ? '"Dibayar"' : '"Belum Dibayar"'}?`,
        icon: 'mdi-help-circle-outline',
        iconColor: 'primary',
        actionButtons: [
          { color: 'primary', text: 'Ya', action: () => { this.changeInvoiceStatusAction(dataInvoice) } },
          { color: 'red', text: 'Batal' }
        ]
      })
    },

    async changeInvoiceStatusAction (dataInvoice) {
      if (dataInvoice.paymentType.toLowerCase() === 'cash') {
        let result = null
        const status = dataInvoice.statusInvoice.toLowerCase() === 'unpaid' ? 'paid' : 'unpaid'
        this.$nuxt.$emit('open-loading', true)
        await Request.put({
          url: `${Api.changeInvoiceStatus}/${dataInvoice.id}?status=${status}`,
          token: this.$store.state.user.token
        })
          .then(async (response) => {
            result = response
            await this.fetchInvoices()
          })
          .catch((err) => {
            result = err.response
          })
          .finally(() => {
            this.$nuxt.$emit('open-loading', false)
            this.$nuxt.$emit('open-snackbar', {
              message: result.data.message !== null ? result.data.message : 'Maaf terjadi kesalahan',
              status: result.status
            })
          })
      } else {
        this.$nuxt.$emit('open-snackbar', {
          message: 'Pilih salah satu tagihan yang akan dikirim',
          status: 400
        })
      }
    },

    remindInvoiceDialog () {
      return this.selectedRow.length > 0
        ? this.$nuxt.$emit('open-message-dialog', {
          message: 'Ingatkan Tagihan?',
          description: 'Ingatkan tagihan ini kepada klien yang bersangkutan?',
          icon: 'mdi-help-circle-outline',
          iconColor: 'primary',
          actionButtons: [
            { color: 'primary', text: 'Ya', action: () => { this.remindInvoiceAction() } },
            { color: 'red', text: 'Batal' }
          ]
        })
        : this.$nuxt.$emit('open-snackbar', {
          message: 'Pilih salah satu tagihan yang akan dikirim',
          status: 400
        })
    },

    async remindInvoiceAction () {
      const selectedInvoice = this.selectedRow[0]
      let result = null
      this.$nuxt.$emit('open-loading', true)
      await Request.post({
        url: `${Api.sendInvoice}/${selectedInvoice.id}`,
        token: this.$store.state.user.token
      })
        .then(async (response) => {
          result = response
          await this.fetchInvoices()
        })
        .catch((err) => {
          result = err.response
        })
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

<style scoped>
  .btn-categories button {
    border-radius: 0px 0px 0px 0px;
    margin-left: 0.8px;
    margin-right: 0.8px;
  }

  .btn-categories button:last-child {
    border-radius: 0px 7px 0px 0px;
    margin-left: 0px;
    margin-right: 0px;
  }

  .btn-categories button:first-child {
    border-radius: 7px 0px 0px 0px;
    margin-left: 0px;
    margin-right: 0px;
  }

  .data-table-wrapper >>> table thead {
    background-color: var(--v-grey-base);
  }

  .data-table-wrapper >>> table thead tr th,
  .data-table-wrapper >>> table tbody tr td {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }

  .data-table-wrapper >>> table tr .v-simple-checkbox i {
    color: var(--v-primary-base);
  }

  .pagination-wrapper >>> .v-pagination__navigation {
    background-color: var(--v-grey-base) !important;
  }

  .pagination-wrapper >>> .v-pagination__navigation i {
    color: var(--v-black-base) !important;
  }

  .btn-pagination-disabled {
    opacity: 0.6;
    cursor: default !important;
  }

  .btn-pagination {
    background-color: var(--v-grey-base);
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-pagination >>> i:last-child {
    transform: translateX(-7.5px);
  }

  .btn-pagination >>> i:first-child {
    transform: translateX(7.5px);
  }

  .import-file-dropzone {
    border: 1px dashed var(--v-primary-base);
    padding: 4px !important;
    cursor: pointer;
  }

  .import-file-dropzone-active {
    border: 5px dashed var(--v-primary-base);
    background-color: var(--v-primary100-base);
    padding: 0px !important;
  }

  .import-file-dropzone-error {
    border: 5px dashed red;
    background-color: rgba(255, 0, 0, 0.1);
    padding: 0px !important;
  }
</style>

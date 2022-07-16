<template>
  <v-container class="pa-0 mt-3">
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
                font-size="20"
                font-weight="bold"
                class="ma-0"
                v-text="'Import Invoices'"
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
          <div class="pa-5">
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
                font-size="14"
                class="text-center ma-0"
                v-text="'Drag and drop file here to Upload or click here to select your file'"
              />
              <c-text
                font-size="12"
                class="text-center mb-5"
                v-text="'MAX. File Size : 10MB'"
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
                font-size="10"
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
                  v-text="'Submit'"
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
    <!-- BEGIN SEARCH FIELD -->
    <v-container class="px-0 pt-0">
      <v-text-field
        v-model="searchKeyword"
        class="search-field-wrapper"
        placeholder="Search Invoice"
        color="primary"
        hide-details=""
        background-color="white"
        append-icon="mdi-magnify"
        outlined
        dense
      />
      <v-container class="mt-3">
        <v-row justify="space-around">
          <v-col
            :class="`tab-catagory-wrapper ${selectedCategory === 'all' ? 'tab-catagory-wrapper-active' : ''} pb-1`"
            cols="3"
            @click="changeCategory('all')"
          >
            <c-text
              font-size="14"
              :color="selectedCategory === 'all' ? 'black' : 'primary'"
              :class="`tab-list-category text-center ma-0 ${selectedCategory === 'all' ? '' : 'unselected-category'}`"
              v-text="'All'"
            />
          </v-col>
          <v-col
            :class="`tab-catagory-wrapper ${selectedCategory === 'paid' ? 'tab-catagory-wrapper-active' : ''} pb-1`"
            cols="3"
            @click="changeCategory('paid')"
          >
            <c-text
              font-size="14"
              :color="selectedCategory === 'paid' ? 'black' : 'primary'"
              :class="`tab-list-category text-center ma-0 ${selectedCategory === 'paid' ? '' : 'unselected-category'}`"
              v-text="'Paid'"
            />
          </v-col>
          <v-col
            :class="`tab-catagory-wrapper ${selectedCategory === 'unpaid' ? 'tab-catagory-wrapper-active' : ''} pb-1`"
            cols="3"
            @click="changeCategory('unpaid')"
          >
            <c-text
              font-size="14"
              :color="selectedCategory === 'unpaid' ? 'black' : 'primary'"
              :class="`tab-list-category text-center ma-0 ${selectedCategory === 'unpaid' ? '' : 'unselected-category'}`"
              v-text="'Unpaid'"
            />
          </v-col>
        </v-row>
      </v-container>
      <!-- END SEARCH FIELD -->

      <!-- BEGIN INVOICE LIST -->
      <v-container v-if="isLoading">
        <v-card
          v-for="skeleton in 3"
          :key="skeleton"
          class="mb-3"
          outlined
        >
          <v-container>
            <v-row>
              <v-col class="d-flex" align-self="center">
                <v-skeleton-loader
                  width="80"
                  height="55"
                  max-width="80"
                  max-height="55"
                  type="image"
                />
                <v-container class="py-0">
                  <v-skeleton-loader
                    type="text"
                  />
                  <v-skeleton-loader
                    type="text"
                  />
                  <v-skeleton-loader
                    type="text"
                  />
                </v-container>
              </v-col>
              <v-col
                cols="auto"
                align-self="center"
              >
                <v-skeleton-loader
                  width="75"
                  height="25"
                  tile
                  type="chip"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
      <v-container
        v-if="invoiceChecker.length > 0"
        class="pb-0"
      >
        <v-card
          v-for="index in (searchKeyword === '' ? currentPageItems - 1 : invoiceChecker.length - 1)"
          v-show="searchInvoice(invoiceChecker[index])"
          :key="index"
          class="mb-3"
          color="white"
          outlined
        >
          <v-checkbox
            v-model="invoiceChecker[index].selected"
            class="invoice-checkbox"
            @change="getStatusSelected"
          />
          <v-container
            v-if="invoiceChecker[index]"
            @click="() => $router.push(`/invoices/detail/${invoiceChecker[index].id}`)"
          >
            <v-row>
              <v-col class="d-flex">
                <v-img
                  max-width="55"
                  max-height="55"
                  :src="invoiceChecker[index].image"
                  :lazy-src="invoiceChecker[index].image"
                />
                <v-container class="py-0">
                  <c-text
                    font-size="14"
                    font-weight="bold"
                    color="primary"
                    class="ma-0"
                    v-text="invoiceChecker[index].name"
                  />
                  <c-text
                    font-size="12"
                    color="neutral700"
                    class="ma-0"
                    v-text="$moment(invoiceChecker[index].date).format('DD MMMM, YYYY')"
                  />
                  <c-text
                    font-size="12"
                    color="primary"
                    class="ma-0"
                    v-text="format.currency(invoiceChecker[index].amount)"
                  />
                </v-container>
              </v-col>
              <v-col
                cols="auto"
                align-self="center"
              >
                <v-chip
                  class="text--black status-invoice-chip"
                  small
                  :color="invoiceChecker[index].statusInvoice === 'unpaid' ? 'grey' : 'primary200'"
                  v-text="invoiceChecker[index].statusInvoice === 'unpaid' ? 'Unpaid' : 'Paid'"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-btn
          v-if="searchKeyword === ''"
          v-show="currentPageItems < invoiceChecker.length"
          width="100%"
          color="primary"
          class="mt-3"
          outlined
          @click="addMore"
        >
          Lihat Lebih Banyak
          <v-icon>mdi-chevron-double-down</v-icon>
        </v-btn>
      </v-container>
      <v-container
        v-if="invoiceChecker.length < 1 && !isLoading"
      >
        <v-img
          max-width="246"
          max-height="225"
          class="mx-auto mt-5"
          src="/images/illustrations/support-bw.png"
          lazy-src="/images/illustrations/support-bw.png"
        />
        <c-text
          font-size="12"
          color="primary"
          class="text-center mt-5"
          v-text="'Your invoices will show up here. Click the plus button below to Create your first invoice!'"
        />
      </v-container>
      <!-- END INVOICE LIST -->
    </v-container>
    <v-menu
      top
      left
      nudge-left="40"
      rounded="lg"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          class="floating-add-btn"
          dark
          small
          bottom
          right
          fixed
          fab
          v-bind="attrs"
          v-on="on"
        >
          <v-icon size="35">
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          @click="importDialog = !importDialog"
        >
          <v-list-item-title v-text="'Impor'" />
        </v-list-item>
        <v-list-item to="/invoices/create">
          <v-list-item-title v-text="'Buat Baru'" />
        </v-list-item>
      </v-list>
    </v-menu>
    <v-container
      v-show="isSelected"
      :class="`selected-invoice-btn-wrapper d-flex neutral400 ${isSelected ? 'selected-invoice-btn-wrapper-active' : ''}`"
    >
      <v-row>
        <v-col>
          <v-btn
            block
            outlined
            color="primary"
            @click="cancelAllSelection"
            v-text="'Cancel'"
          />
        </v-col>
        <v-col>
          <v-btn
            block
            color="primary"
            v-text="'Remind'"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import * as numberFormat from '@/utils/numberFormat'
import * as Api from '@/values/api'
import * as Request from '@/utils/request'

export default {
  name: 'DataTableMobileInvoicesPage',

  emits: [
    'get-status-selected'
  ],

  data () {
    return {
      isLoading: true,
      invoices: [],
      filteredInvoices: [],
      importDialog: false,
      successImportDialog: false,
      showImportError: false,
      dragover: false,
      importedFiles: null,
      searchKeyword: '',
      selectedCategory: 'all',
      isSelected: false,
      currentPageItems: 0,
      itemsPerPage: 5,
      headers: [
        {
          text: 'Invoice ID',
          value: 'id'
        },
        { text: 'Invoice Date', value: 'date', align: 'center' },
        { text: 'Invoice To', value: 'to', align: 'center' },
        { text: 'Amount', value: 'amount', align: 'center' },
        { text: 'Due Date', value: 'dueDate', align: 'center' },
        { text: 'Status Invoice', value: 'statusInvoice', align: 'center' },
        { text: 'Status Payment', value: 'statusPayment', align: 'center' },
        { text: 'Action', value: 'action', align: 'center' }
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
    },

    invoiceChecker () {
      if (this.selectedCategory.toLowerCase() === 'all') {
        return this.invoices
      } else {
        return this.filteredInvoices
      }
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
            this.invoices.push({
              id: el.id,
              invoiceNumber: el.invoice_number,
              date: el.date,
              name: `${el.client.first_name} ${el.client.last_name}`,
              image: `/images/profile/dashboard/top-clients/mobile/client-${this.randomInt(1, 3)}.png`,
              amount: el.total,
              dueDate: el.date_due,
              statusInvoice: el.status,
              statusPayment: el.status_payment,
              selected: false
            })
            if (this.currentPageItems <= this.itemsPerPage) {
              this.currentPageItems++
            }
            return el
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
      if (value === 0) {
        statusColor = 'neutral700'
        statusText = 'Pending'
      } else if (value === 1) {
        statusColor = 'green'
        statusText = 'Success'
      } else if (value === 2) {
        statusColor = 'orange'
        statusText = 'Expired'
      } else if (value === 3) {
        statusColor = 'red'
        statusText = 'Failed'
      }

      return {
        color: statusColor,
        text: statusText
      }
    },

    randomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },

    addMore () {
      const maxItem = (this.itemsPerPage + this.currentPageItems) - 1
      const currentCount = this.currentPageItems - 1
      this.invoiceChecker.map((element, index) => {
        if (index > currentCount && index <= maxItem) {
          this.currentPageItems++
        }
        return null
      })
    },

    searchInvoice (data) {
      return (data.name.toLowerCase()).includes(this.searchKeyword.toLowerCase()) ||
            (data.invoiceNumber.toString().toLowerCase()).includes(this.searchKeyword.toLowerCase()) ||
            (data.amount.toString()).includes(this.searchKeyword) ||
            (data.statusInvoice.toLowerCase()).includes(this.searchKeyword.toLowerCase())
    },

    changeCategory (category) {
      this.selectedCategory = category.toLowerCase()
      this.currentPageItems = 0
      this.filteredInvoices = []
      this.invoices.map((el) => {
        if (this.selectedCategory === 'all') {
          if (this.currentPageItems <= this.itemsPerPage) {
            this.currentPageItems++
          }
        }
        return el.statusInvoice === category.toLowerCase()
          ? this.filteredInvoices.push(el)
          : null
      })
      if (this.selectedCategory !== 'all') {
        this.filteredInvoices.map((el) => {
          return this.currentPageItems <= this.itemsPerPage
            ? this.currentPageItems++
            : null
        })
      }
    },

    selectedInvoices () {
      const selectedItem = []
      this.invoices.map((el) => {
        return el.selected
          ? selectedItem.push(el)
          : null
      })
      return selectedItem
    },

    getStatusSelected () {
      let tempSelected = false
      this.invoices.map((el) => {
        if (el.selected) {
          tempSelected = true
        }
        return null
      })
      this.isSelected = tempSelected
    },

    cancelAllSelection () {
      this.invoices.map((el) => {
        el.selected = false
        return null
      })
      return this.getStatusSelected()
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
    }
  }
}
</script>

<style scoped>
  .search-field-wrapper {
    font-size: 14px;
  }

  .search-field-wrapper >>> .v-text-field__slot input,
  .search-field-wrapper >>> .v-input__icon--append i {
    color: var(--v-primary-base)
  }

  .search-field-wrapper >>> .v-text-field__slot input::placeholder {
    color: var(--v-primary400-base)
  }

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

  .unselected-category {
    opacity: 0.6;
    transition: 0.2s all;
  }

  .tab-list-category {
    cursor: pointer;
  }

  .tab-catagory-wrapper {
    padding-bottom: 6px;
  }

  .tab-catagory-wrapper-active {
    border-bottom: 2px solid var(--v-primary-base);
    padding-bottom: 4px;
  }

  .tab-catagory-wrapper-active .tab-list-category {
    cursor: default !important;
  }

  .status-invoice-chip {
    font-size: 12px;
    border-radius: 0;
  }

  .floating-add-btn {
    transform: translate(0px, -50px);
  }

  .invoice-checkbox {
    position: absolute;
    left: -30px;
    top: 10px;
  }

  .selected-invoice-btn-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    transform: translateY(100px);
    transition: 0.3s all;
  }

  .selected-invoice-btn-wrapper-active {
    transform: translateY(0);
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

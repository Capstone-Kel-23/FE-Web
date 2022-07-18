<template>
  <v-container>
    <!-- BEGIN FORM HEADER -->
    <c-text
      font-size="24"
      v-text="'Penagihan'"
    />
    <c-text
      color="neutral700"
      v-text="'Detail penagihan muncul di faktur Anda. Tanggal Faktur digunakan di dasbor dan laporan. Pilih tanggal yang Anda harapkan untuk dibayar sebagai Tanggal Jatuh Tempo.'"
    />
    <v-divider class="mb-3" />
    <!-- END FORM HEADER -->
    <v-container>
      <v-row>
        <v-col
          :cols="mobile ? '12' : '4'"
          class="py-0"
        >
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Klien *'"
          />
          <input
            ref="fileBrowser"
            type="file"
            accept=".jpg, .png, .jpeg"
            style="display: none"
            @input.prevent="onDrop($event.target)"
          >
          <div
            :class="`profile-pic-dropzone ${profilePicFile === null ? 'pa-3' : ''} ${dragover ? 'profile-pic-dropzone-active' : ''} ${validProfilePicFile ? '' : 'company-logo-invalid'}`"
            @drop.prevent="onDrop($event.dataTransfer)"
            @dragover.prevent="dragover = true"
            @dragenter.prevent="dragover = true"
            @dragleave.prevent="dragover = false"
            @click="$refs.fileBrowser.click()"
          >
            <v-container
              v-if="profilePicFile === null"
              class="fill-height"
            >
              <v-icon
                size="40"
                class="mx-auto"
              >
                mdi-account-plus
              </v-icon>
              <c-text
                color="neutral700"
                class="ma-0 text-center mx-auto"
                v-text="'Ubah Foto Profil'"
              />
            </v-container>
            <div v-else>
              <v-img
                :height="dragover || !validProfilePicFile ? '131' : '135'"
                :src="previewLogo()"
                :lazy-src="previewLogo()"
                @drop.prevent="onDrop($event.dataTransfer)"
                @dragover.prevent="dragover = true"
                @dragenter.prevent="dragover = true"
                @dragleave.prevent="dragover = false"
              />
            </div>
          </div>
          <c-text
            v-if="!validProfilePicFile"
            font-size="12"
            class="ma-0 mt-1"
            style="white-space: nowrap"
            color="red"
            v-text="'Foto Profil tidak boleh kosong!'"
          />
          <v-btn
            v-if="profilePicFile !== null"
            x-small
            text
            elevation="0"
            outlined
            color="red"
            @click="inputValue('remove-profile-pic-file')"
          >
            Remove
            <v-icon
              size="15"
              class="ms-1"
            >
              mdi-close-box-outline
            </v-icon>
          </v-btn>
        </v-col>
        <v-col
          :cols="mobile ? '12' : '4'"
          class="pb-0"
        >
          <!-- BEGIN INVOICE DATE PICKER -->
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Tanggal Tagihan *'"
          />
          <v-menu
            v-model="invoiceDateMenu"
            transition="slide-y-transition"
            :close-on-click="false"
            :close-on-content-click="false"
            offset-y
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                :value="invoiceDateSelected"
                :rules="requiredRules('Tanggal Tagihan')"
                dense
                background-color="white"
                outlined
                readonly
                placeholder="Masukkan Tanggal Tagihan"
                append-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
                @click="setInvoiceDatePicker"
                @input="inputValue('input-invoice-date', $event)"
              />
            </template>
            <v-card
              class="pa-3"
            >
              <v-container>
                <v-row justify="center">
                  <v-col cols="auto" class="pa-0">
                    <v-date-picker
                      width="300"
                      :full-width="$vuetify.breakpoint.mobile"
                      :value="invoiceDatePicker"
                      no-title
                      color="primary"
                      event-color="primary"
                      @input="onChangedInvoiceDatePicker($event)"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="py-0">
                    <v-divider />
                  </v-col>
                </v-row>
                <v-row justify="space-between">
                  <v-col cols="6">
                    <v-btn
                      small
                      width="100%"
                      outlined
                      color="primary"
                      @click="invoiceDateMenu = !invoiceDateMenu"
                      v-text="'BATAL'"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      small
                      width="100%"
                      color="primary"
                      @click="saveSelectedInvoiceDate"
                      v-text="'SIMPAN'"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-menu>
          <!-- END INVOICE DATE PICKER -->

          <!-- BEGIN INVOICE DATE PICKER -->
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Batas Waktu *'"
          />
          <v-menu
            v-model="dueDateMenu"
            transition="slide-y-transition"
            :close-on-click="false"
            :close-on-content-click="false"
            offset-y
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                :value="dueDateSelected"
                :rules="requiredRules('Batas Waktu')"
                dense
                background-color="white"
                outlined
                readonly
                placeholder="Masukkan Batas Waktu"
                append-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
                @click="setDueDatePicker"
                @input="inputValue('input-due-date', $event)"
              />
            </template>
            <v-card
              class="pa-3"
            >
              <v-container>
                <v-row justify="center">
                  <v-col cols="auto" class="py-0">
                    <v-date-picker
                      width="300"
                      :full-width="$vuetify.breakpoint.mobile"
                      :value="dueDatePicker"
                      no-title
                      color="primary"
                      event-color="primary"
                      @input="onChangedDueDatePicker($event)"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="py-0">
                    <v-divider />
                  </v-col>
                </v-row>
                <v-row justify="space-between">
                  <v-col cols="6">
                    <v-btn
                      small
                      width="100%"
                      outlined
                      color="primary"
                      @click="dueDateMenu = !dueDateMenu"
                      v-text="'BATAL'"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      small
                      width="100%"
                      color="primary"
                      @click="saveSelectedDueDate"
                      v-text="'SIMPAN'"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-menu>
          <!-- END INVOICE DATE PICKER -->
        </v-col>
        <v-col
          :cols="mobile ? '12' : '4'"
          :class="mobile ? 'py-0' : ''"
        >
          <!-- BEGIN RIGHT SIDE FORM -->
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'ID Tagihan *'"
          />
          <v-text-field
            :value="invoiceId"
            :rules="requiredRules('ID Tagihan')"
            dense
            background-color="white"
            outlined
            placeholder="Masukkan Nomor Tagihan"
            @input="inputValue('input-invoice-id', $event)"
          />
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Jenis Pembayaran *'"
          />
          <v-select
            :value="paymentType"
            :rules="requiredRules('Jenis Pembayaran')"
            :items="LOV.paymentType"
            item-text="text"
            item-value="value"
            dense
            background-color="white"
            outlined
            placeholder="Masukkan Jenis Pembayaran"
            @input="inputValue('input-payment-type', $event)"
          />
          <!-- END RIGHT SIDE FORM -->
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'BillingFormInvoicesCreatePage',

  props: {
    invoiceDateSelected: {
      type: String,
      default: ''
    },
    invoiceDatePicker: {
      type: String,
      default: ''
    },
    dueDateSelected: {
      type: String,
      default: ''
    },
    dueDatePicker: {
      type: String,
      default: ''
    },
    subHeading: {
      type: String,
      default: ''
    },
    profilePicFile: {
      type: null,
      default: null
    },
    validProfilePicFile: {
      type: Boolean,
      default: false
    },
    invoiceId: {
      type: String,
      default: ''
    },
    paymentType: {
      type: String,
      default: 'cash'
    }
  },

  emits: [
    'input-profile-pic-file',
    'remove-profile-pic-file',
    'on-changed-invoice-date-picker',
    'set-invoice-date-picker',
    'save-selected-invoice-date',
    'on-changed-due-date-picker',
    'set-due-date-picker',
    'save-selected-due-date',
    'input-invoice-id',
    'input-payment-type'
  ],

  data () {
    return {
      dragover: false,
      invoiceDateMenu: false,
      dueDateMenu: false,
      LOV: {
        paymentType: [
          { text: 'Cash', value: 'cash' },
          { text: 'Online', value: 'online' }
        ]
      }
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    }
  },

  methods: {
    onDrop (e) {
      this.dragover = false
      this.inputValue('input-profile-pic-file', e.files[0])
    },

    previewLogo () {
      return URL.createObjectURL(this.profilePicFile)
    },

    inputValue (emitName, value = null) {
      return this.$emit(emitName, value)
    },

    onChangedInvoiceDatePicker (value) {
      return this.$emit('on-changed-invoice-date-picker', value)
    },

    setInvoiceDatePicker () {
      return this.$emit('set-invoice-date-picker')
    },

    saveSelectedInvoiceDate () {
      this.invoiceDateMenu = !this.invoiceDateMenu
      return this.$emit('save-selected-invoice-date')
    },

    onChangedDueDatePicker (value) {
      return this.$emit('on-changed-due-date-picker', value)
    },

    setDueDatePicker () {
      return this.$emit('set-due-date-picker')
    },

    saveSelectedDueDate () {
      this.dueDateMenu = !this.dueDateMenu
      return this.$emit('save-selected-due-date')
    },

    requiredRules (data) {
      return [
        v => !!v || `${data} tidak boleh kosong!`
      ]
    }
  }
}
</script>

<style scoped>
  .profile-pic-dropzone {
    width: 200px;
    height: 137px;
    background-color: white;
    border: 1px dashed var(--v-neutral700-base);
    cursor: pointer;
    user-select: none;
  }

  .profile-pic-dropzone-active {
    border: 3px dashed var(--v-primary400-base) !important;
  }

  .preview-logo-wrapper {
    border: 1px dashed var(--v-neutral800-base);
  }

  .company-logo-invalid {
    border: 3px dotted red;
  }
</style>

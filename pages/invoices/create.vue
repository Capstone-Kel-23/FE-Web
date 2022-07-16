<template>
  <v-container
    fluid
    :class="`main-content-bg fill-height align-start ${mobile ? 'pa-5' : 'pa-10'}`"
  >
    <v-row>
      <v-col>
        <!-- BEGIN HEADER TITLE -->
        <v-container
          v-if="mobile"
          class="px-0"
        >
          <v-row>
            <v-col
              cols="auto"
              align-self="center"
            >
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
            <v-col align-self="center">
              <c-text
                font-size="32"
                class="ma-0"
                v-text="'New Invoices'"
              />
            </v-col>
          </v-row>
        </v-container>
        <c-text
          v-else
          font-size="32"
          v-text="'New Invoices'"
        />
        <!-- END HEADER TITLE -->

        <!-- BEGIN COMPANY FORM -->
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <CompanyFormInvoicesCreatePage
            :title="dataForm.title"
            :sub-heading="dataForm.subHeading"
            :logo-file="dataForm.logoFile"
            :valid-logo-file="validLogoFile"
            @input-title="value => dataForm.title = value"
            @input-subheading="value => dataForm.subHeading = value"
            @input-logo-file="inputLogoFile"
            @remove-logo-file="dataForm.logoFile = null"
          />
          <ClientFormInvoicesCreatePage
            :first-name="dataForm.firstName"
            :last-name="dataForm.lastName"
            :email="dataForm.email"
            :phone="dataForm.phone"
            :address="dataForm.address"
            :postal-code="dataForm.postalCode"
            :location="location"
            :selected-location="selectedLocation"
            @input-first-name="value => dataForm.firstName = value"
            @input-last-name="value => dataForm.lastName = value"
            @input-email="value => dataForm.email = value"
            @input-phone="value => dataForm.phone = value"
            @input-province="value => setLocation(value, 'province')"
            @input-regency="value => setLocation(value, 'regency')"
            @input-district="value => setLocation(value, 'district')"
            @input-village="value => setLocation(value, 'village')"
            @input-address="value => dataForm.address = value"
            @input-postal-code="value => dataForm.postalCode = value"
          />
          <BillingFormInvoicesCreatePage
            :invoice-date-selected="dataForm.invoiceDateSelected"
            :invoice-date-picker="dataForm.invoiceDatePicker"
            :due-date-selected="dataForm.dueDateSelected"
            :due-date-picker="dataForm.dueDatePicker"
            :profile-pic-file="dataForm.profilePicFile"
            :valid-profile-pic-file="validProfilePicFile"
            :invoice-id="dataForm.invoiceId"
            :payment-type="dataForm.paymentType"
            @input-title="value => dataForm.title = value"
            @on-changed-invoice-date-picker="updateInvoiceDatePicker"
            @set-invoice-date-picker="setInvoiceDatePicker"
            @save-selected-invoice-date="saveSelectedInvoiceDate"
            @on-changed-due-date-picker="updateDueDatePicker"
            @set-due-date-picker="setDueDatePicker"
            @save-selected-due-date="saveSelectedDueDate"
            @input-profile-pic-file="inputProfilePicFile"
            @remove-profile-pic-file="dataForm.profilePicFile = null"
            @input-invoice-id="value => dataForm.invoiceId = value"
            @input-payment-type="value => dataForm.paymentType = value"
          />
          <ItemsFormInvoicesCreatePage
            :invoice-items="dataForm.invoiceItems"
            :sub-total="dataForm.subTotal"
            :total="dataForm.total"
            :discount="dataForm.discount"
            :tax="dataForm.tax"
            @input-invoice-item="value => inputInvoiceItems(value, 'item')"
            @input-invoice-description="value => inputInvoiceItems(value, 'description')"
            @input-invoice-quantity="value => inputInvoiceItems(value, 'quantity')"
            @input-invoice-price="value => inputInvoiceItems(value, 'price')"
            @input-invoice-amount="value => inputInvoiceItems(value, 'amount')"
            @add-invoice-item="addInvoiceItem"
            @remove-invoice-item="removeInvoiceItem"
            @input-discount="(value) => {dataForm.discount = value ; setTotal()}"
            @input-tax="(value) => {dataForm.tax = value ; setTotal()}"
          />
          <v-btn
            class="mt-15"
            width="100%"
            outlined
            color="primary"
            v-text="'Mark Paid'"
          />
          <v-btn
            class="mt-5"
            width="100%"
            color="primary"
            @click="submit"
            v-text="'Save'"
          />
        </v-form>
        <!-- END COMPANY FORM -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CompanyFormInvoicesCreatePage from '@/components/component-pages/invoices-create/CompanyFormInvoicesCreatePage.vue'
import ClientFormInvoicesCreatePage from '@/components/component-pages/invoices-create/ClientFormInvoicesCreatePage.vue'
import BillingFormInvoicesCreatePage from '@/components/component-pages/invoices-create/BillingFormInvoicesCreatePage.vue'
import ItemsFormInvoicesCreatePage from '@/components/component-pages/invoices-create/ItemsFormInvoicesCreatePage.vue'
import provinces from '@/values/locations/provinces.json'
import regencies from '@/values/locations/regencies.json'
import districts from '@/values/locations/districts.json'
import villages from '@/values/locations/villages.json'
import * as Api from '@/values/api'
import * as Request from '@/utils/request'

export default {
  name: 'InvoicesCreatePage',

  components: {
    CompanyFormInvoicesCreatePage,
    ClientFormInvoicesCreatePage,
    BillingFormInvoicesCreatePage,
    ItemsFormInvoicesCreatePage
  },

  layout: 'dashboard',

  middleware: ['auth'],

  data () {
    return {
      valid: false,
      validLogoFile: true,
      validProfilePicFile: true,
      dataForm: {
        title: '',
        subHeading: '',
        logoFile: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        profilePicFile: null,
        invoiceDateSelected: '',
        invoiceDatePicker: '',
        dueDateSelected: '',
        dueDatePicker: '',
        invoiceId: '',
        paymentType: 'cash',
        subTotal: 0,
        total: 0,
        discount: 0,
        tax: 0,
        invoiceItems: [
          { item: '', description: '', quantity: 1, price: 0, amount: 0 }
        ]
      },
      selectedLocation: {
        province: '',
        regency: '',
        district: '',
        village: ''
      },
      location: {
        provinces: [],
        regencies: [],
        districts: [],
        villages: []
      }
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    }
  },

  mounted () {
    this.fetchLocation('province')
    this.dataForm.invoiceDateSelected = this.$moment().format('DD/MM/YYYY')
    this.dataForm.dueDateSelected = this.$moment().add(3, 'days').format('DD/MM/YYYY')
  },

  methods: {
    inputLogoFile (value) {
      if (this.dataForm.logoFile !== null) {
        this.dataForm.logoFile = null
      }
      this.dataForm.logoFile = value
    },

    inputProfilePicFile (value) {
      if (this.dataForm.profilePicFile !== null) {
        this.dataForm.profilePicFile = null
      }
      this.dataForm.profilePicFile = value
    },

    inputInvoiceItems (data, field) {
      this.dataForm.invoiceItems[data.index][field] = data.value
      this.dataForm.invoiceItems[data.index].amount = this.dataForm.invoiceItems[data.index].price * this.dataForm.invoiceItems[data.index].quantity
      this.setTotal()
    },

    setTotal () {
      this.dataForm.subTotal = 0
      this.dataForm.invoiceItems.map((el) => {
        this.dataForm.subTotal += el.amount
        return null
      })
      this.dataForm.total = this.dataForm.subTotal - this.dataForm.discount + this.dataForm.tax
    },

    addInvoiceItem () {
      return this.dataForm.invoiceItems.push({
        item: '',
        description: '',
        quantity: 1,
        price: 0,
        amount: 0
      })
    },

    removeInvoiceItem (index) {
      if (this.dataForm.invoiceItems.length > 1) {
        this.dataForm.invoiceItems.splice(index, 1)
        this.setTotal()
      }
    },

    updateInvoiceDatePicker (value) {
      this.dataForm.invoiceDatePicker = value
    },

    setInvoiceDatePicker () {
      this.dataForm.invoiceDatePicker = this.$moment(this.dataForm.invoiceDateSelected, 'DD/MM/YYYY').format('YYYY-MM-DD')
    },

    saveSelectedInvoiceDate () {
      this.dataForm.invoiceDateSelected = this.$moment(this.dataForm.invoiceDatePicker, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },

    updateDueDatePicker (value) {
      this.dataForm.dueDatePicker = value
    },

    setDueDatePicker () {
      this.dataForm.dueDatePicker = this.$moment(this.dataForm.dueDateSelected, 'DD/MM/YYYY').format('YYYY-MM-DD')
    },

    saveSelectedDueDate () {
      this.dataForm.dueDateSelected = this.$moment(this.dataForm.dueDatePicker, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },

    fetchLocation (locationType) {
      if (locationType.toLowerCase() === 'province') {
        this.location.provinces = provinces
      } else if (locationType.toLowerCase() === 'regency') {
        this.location.regencies = []
        this.location.districts = []
        this.location.villages = []
        regencies.map((element) => {
          return this.selectedLocation.province === element.province_id
            ? this.location.regencies.push(element)
            : null
        })
      } else if (locationType.toLowerCase() === 'district') {
        this.location.districts = []
        this.location.villages = []
        districts.map((element) => {
          return this.selectedLocation.regency === element.regency_id
            ? this.location.districts.push(element)
            : null
        })
      } else if (locationType.toLowerCase() === 'village') {
        this.location.villages = []
        villages.map((element) => {
          return this.selectedLocation.district === element.district_id
            ? this.location.villages.push(element)
            : null
        })
      }
    },

    setLocation (value, locationType) {
      if (locationType.toLowerCase() === 'province') {
        this.selectedLocation.province = value
        this.selectedLocation.regency = ''
        this.selectedLocation.district = ''
        this.selectedLocation.village = ''
        this.fetchLocation('regency')
      } else if (locationType.toLowerCase() === 'regency') {
        this.selectedLocation.regency = value
        this.selectedLocation.district = ''
        this.selectedLocation.village = ''
        this.fetchLocation('district')
      } else if (locationType.toLowerCase() === 'district') {
        this.selectedLocation.district = value
        this.selectedLocation.village = ''
        this.fetchLocation('village')
      } else if (locationType.toLowerCase() === 'village') {
        this.selectedLocation.village = value
      }
    },

    async generateBodyForm () {
      const itemsForm = []
      await this.dataForm.invoiceItems.map((el) => {
        return itemsForm.push({
          description: el.description,
          name: el.item,
          price: parseInt(el.price),
          quantity: parseInt(el.quantity)
        })
      })
      return {
        additional_costs: [
          {
            name: 'pajak',
            total: this.dataForm.tax,
            type: 'tax'
          },
          {
            name: 'discount',
            total: this.dataForm.discount,
            type: 'disc'
          }
        ],
        client: {
          address: this.dataForm.address,
          city: this.getLocation('regency'),
          country: 'IND',
          email: this.dataForm.email,
          first_name: this.dataForm.firstName,
          last_name: this.dataForm.lastName,
          phone_number: this.dataForm.phone,
          postal_code: this.dataForm.postalCode,
          state: this.getLocation('province')
        },
        date: this.$moment(this.dataForm.invoiceDateSelected, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        date_due: this.$moment(this.dataForm.dueDateSelected, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        description: '',
        invoice_number: this.dataForm.invoiceId,
        items: itemsForm,
        logo_url: '',
        sub_total: this.dataForm.subTotal,
        total: this.dataForm.total,
        type_payment: this.dataForm.paymentType
      }
    },

    getLocation (type) {
      let locationName = ''
      if (type === 'province') {
        provinces.map((el) => {
          if (el.id === this.selectedLocation.province) {
            locationName = el.name
          }
          return null
        })
      } else if (type === 'regency') {
        regencies.map((el) => {
          if (el.id === this.selectedLocation.regency) {
            locationName = el.name
          }
          return null
        })
      } else if (type === 'district') {
        districts.map((el) => {
          if (el.id === this.selectedLocation.district) {
            locationName = el.name
          }
          return null
        })
      } else if (type === 'village') {
        villages.map((el) => {
          if (el.id === this.selectedLocation.village) {
            locationName = el.name
          }
          return null
        })
      }

      return locationName
    },

    async submit () {
      let result = null
      this.validLogoFile = this.dataForm.logoFile !== null
      this.validProfilePicFile = this.dataForm.profilePicFile !== null
      if (
        this.$refs.form.validate() &&
        this.validLogoFile &&
        this.validProfilePicFile
      ) {
        await this.$nuxt.$emit('open-loading', true)
        await Request.post({
          url: Api.createInvoice,
          token: this.$store.state.user.token,
          data: await this.generateBodyForm()
        })
          .then((response) => { result = response })
          .catch((err) => { result = err.response })
          .finally(() => this.$nuxt.$emit('open-loading', false))
      } else {
        result = {
          status: 400,
          data: { message: 'Form tidak valid, silakan cek kembali!' }
        }
      }
      await this.$nuxt.$emit('open-snackbar', {
        message: result.data.message !== null ? result.data.message : 'Maaf terjadi kesalahan',
        status: result.status
      })
      if (result.status >= 200 && result.status < 300) {
        this.$router.go(-1)
      }
    }
  }
}
</script>

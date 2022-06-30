<template>
  <v-container
    fluid
    :class="`main-content-bg fill-height align-start ${mobile ? 'pa-5' : 'pa-10'}`"
  >
    <v-row>
      <v-col>
        <!-- BEGIN HEADER TITLE -->
        <c-text
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
            @input-invoice-item="value => inputInvoiceItems(value, 'item')"
            @input-invoice-description="value => inputInvoiceItems(value, 'description')"
            @input-invoice-quantity="value => inputInvoiceItems(value, 'quantity')"
            @input-invoice-price="value => inputInvoiceItems(value, 'price')"
            @input-invoice-amount="value => inputInvoiceItems(value, 'amount')"
            @add-invoice-item="addInvoiceItem"
            @remove-invoice-item="removeInvoiceItem"
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

export default {
  name: 'InvoicesCreatePage',

  components: {
    CompanyFormInvoicesCreatePage,
    ClientFormInvoicesCreatePage,
    BillingFormInvoicesCreatePage,
    ItemsFormInvoicesCreatePage
  },

  layout: 'dashboard',

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
        profilePicFile: null,
        invoiceDateSelected: '',
        invoiceDatePicker: '',
        dueDateSelected: '',
        dueDatePicker: '',
        invoiceId: '',
        paymentType: 'cash',
        invoiceItems: [
          { item: '', description: '', quantity: 0, price: 0, amount: 0 }
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
      if (field === 'price' || field === 'quantity') {
        if (field === 'quantity' && data.value < 1) {
          this.dataForm.invoiceItems[data.index].quantity = 1
        } else if (data.value === null) {
          this.dataForm.invoiceItems[data.index].quantity = 1
        }
        this.dataForm.invoiceItems[data.index].amount = this.dataForm.invoiceItems[data.index].price * this.dataForm.invoiceItems[data.index].quantity
      } else {
        this.dataForm.invoiceItems[data.index][field] = data.value
      }
    },

    addInvoiceItem () {
      return this.dataForm.invoiceItems.push({
        item: '',
        description: '',
        quantity: 0,
        price: 0,
        amount: 0
      })
    },

    removeInvoiceItem (index) {
      return this.dataForm.invoiceItems.length > 1
        ? this.dataForm.invoiceItems.splice(index, 1)
        : null
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

    submit () {
      this.validLogoFile = this.dataForm.logoFile !== null
      this.validProfilePicFile = this.dataForm.profilePicFile !== null
      if (
        this.$refs.form.validate() &&
        this.validLogoFile &&
        this.validProfilePicFile
      ) {
        return null
      }
    }
  }
}
</script>

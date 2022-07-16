<template>
  <v-container>
    <!-- BEGIN FORM HEADER -->
    <c-text
      font-size="24"
      v-text="'Client'"
    />
    <c-text
      color="neutral700"
      v-text="'Client is used in the clients and reports.'"
    />
    <v-divider class="mb-3" />
    <!-- END FORM HEADER -->

    <!-- BEGIN GENERAL FORM GROUP -->
    <c-text
      font-size="24"
      v-text="'General'"
    />
    <v-container>
      <v-row justify="space-between">
        <v-col
          :cols="mobile ? '12' : '5'"
          class="py-0"
        >
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'First Name *'"
          />
          <v-text-field
            :value="firstName"
            :rules="requiredRules('First Name')"
            dense
            background-color="white"
            outlined
            placeholder="Enter First Name"
            @input="inputValue('input-first-name', $event)"
          />
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Last Name *'"
          />
          <v-text-field
            :value="lastName"
            :rules="requiredRules('Last Name')"
            dense
            background-color="white"
            outlined
            placeholder="Enter Last Name"
            @input="inputValue('input-last-name', $event)"
          />
        </v-col>
        <v-col
          :cols="mobile ? '12' : '5'"
          class="py-0"
        >
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Email *'"
          />
          <v-text-field
            :value="email"
            :rules="emailRules"
            dense
            background-color="white"
            outlined
            placeholder="Enter Email"
            @input="inputValue('input-email', $event)"
          />
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Phone *'"
          />
          <v-text-field
            :value="phone"
            :rules="requiredRules('Phone')"
            dense
            background-color="white"
            outlined
            placeholder="Enter Phone"
            @input="inputValue('input-phone', $event)"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- END GENERAL FORM GROUP -->

    <!-- BEGIN ADDRESS FORM GROUP -->
    <c-text
      font-size="24"
      v-text="'Address'"
    />
    <v-container>
      <v-row justify="space-between">
        <v-col
          :cols="mobile ? '12' : '5'"
          class="py-0"
        >
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Province *'"
          />
          <v-autocomplete
            :items="location.provinces"
            item-text="name"
            item-value="id"
            :value="selectedLocation.province"
            :rules="requiredRules('Provinsi')"
            dense
            background-color="white"
            outlined
            placeholder="Enter Province"
            @input="inputValue('input-province', $event)"
          />
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'City / Regency *'"
          />
          <v-autocomplete
            :items="location.regencies"
            item-text="name"
            item-value="id"
            :value="selectedLocation.regency"
            :rules="requiredRules('Kota/Kabupaten')"
            dense
            background-color="white"
            outlined
            placeholder="Enter City / Regency"
            @input="inputValue('input-regency', $event)"
          />
        </v-col>
        <v-col
          :cols="mobile ? '12' : '5'"
          class="py-0"
        >
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'District *'"
          />
          <v-autocomplete
            :items="location.districts"
            item-text="name"
            item-value="id"
            :value="selectedLocation.district"
            :rules="requiredRules('Kecamatan')"
            dense
            background-color="white"
            outlined
            placeholder="Enter Districts"
            @input="inputValue('input-district', $event)"
          />
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Sub Disctrict / Village *'"
          />
          <v-autocomplete
            :items="location.villages"
            item-text="name"
            item-value="id"
            :value="selectedLocation.village"
            :rules="requiredRules('Kelurahan')"
            dense
            background-color="white"
            outlined
            placeholder="Enter Sub Disctrict / Village"
            @input="inputValue('input-village', $event)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Postal / Zip Code *'"
          />
          <v-text-field
            :value="postalCode"
            :rules="requiredRules('Postal / Zip Code')"
            dense
            background-color="white"
            outlined
            placeholder="Enter Postal / Zip Code"
            @input="inputValue('input-postal-code', $event)"
          />
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Address *'"
          />
          <v-textarea
            :value="address"
            :rules="requiredRules('Address')"
            rows="3"
            dense
            background-color="white"
            outlined
            placeholder="Enter Address"
            @input="inputValue('input-address', $event)"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- END ADDRESS FORM GROUP -->
  </v-container>
</template>

<script>
export default {
  name: 'ClientFormInvoicesCreatePage',

  props: {
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    location: {
      type: null,
      default: {}
    },
    selectedLocation: {
      type: null,
      default: {
        province: '',
        regency: '',
        district: '',
        village: ''
      }
    },
    address: {
      type: String,
      default: ''
    },
    postalCode: {
      type: String,
      default: ''
    }
  },

  emits: [
    'input-first-name',
    'input-last-name',
    'input-email',
    'input-phone',
    'input-province',
    'input-regency',
    'input-district',
    'input-village',
    'input-address',
    'input-postal-code'
  ],

  data () {
    return {
      emailRules: [
        ...this.requiredRules('Email'),
        v => /.+@.+/.test(v) || 'Email tidak valid'
      ]
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    }
  },

  methods: {
    inputValue (emitName, value = null) {
      return this.$emit(emitName, value)
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
  .company-logo-dropzone {
    width: 200px;
    height: 137px;
    background-color: white;
    border: 1px dashed var(--v-neutral700-base);
    cursor: pointer;
    user-select: none;
  }

  .company-logo-dropzone-active {
    border: 3px dashed var(--v-primary400-base) !important;
  }

  .preview-logo-wrapper {
    border: 1px dashed var(--v-neutral800-base);
  }

  .company-logo-invalid {
    border-color: red !important;
  }
</style>

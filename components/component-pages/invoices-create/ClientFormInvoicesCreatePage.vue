<template>
  <v-container>
    <!-- BEGIN FORM HEADER -->
    <c-text
      font-size="24"
      v-text="'Klien'"
    />
    <c-text
      color="neutral700"
      v-text="'Klien digunakan dalam klien dan laporan.'"
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
            v-text="'Nama Depan *'"
          />
          <v-text-field
            :value="firstName"
            :rules="requiredRules('Nama Depan')"
            dense
            background-color="white"
            outlined
            placeholder="Masukkan Nama Depan"
            @input="inputValue('input-first-name', $event)"
          />
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Nama Belakang *'"
          />
          <v-text-field
            :value="lastName"
            :rules="requiredRules('Nama Belakang')"
            dense
            background-color="white"
            outlined
            placeholder="Masukkan Nama Belakang"
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
            placeholder="Masukkan Email"
            @input="inputValue('input-email', $event)"
          />
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Nomor Telepon *'"
          />
          <v-text-field
            :value="phone"
            :rules="requiredRules('Nomor Telepon')"
            dense
            background-color="white"
            outlined
            placeholder="Masukkan Nomor Telepon"
            @input="inputValue('input-phone', $event)"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- END GENERAL FORM GROUP -->

    <!-- BEGIN ADDRESS FORM GROUP -->
    <c-text
      font-size="24"
      v-text="'Alamat'"
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
            v-text="'Provinsi *'"
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
            placeholder="Masukkan Provinsi"
            @input="inputValue('input-province', $event)"
          />
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Kota / Kabupaten *'"
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
            placeholder="Masukkan Kota/Kabupaten"
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
            v-text="'Kecamatan *'"
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
            placeholder="Masukkan Kecamatan"
            @input="inputValue('input-district', $event)"
          />
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Kelurahan / Desa *'"
          />
          <v-autocomplete
            :items="location.villages"
            item-text="name"
            item-value="id"
            :value="selectedLocation.village"
            :rules="requiredRules('Kelurahan/Desa')"
            dense
            background-color="white"
            outlined
            placeholder="Masukkan Kelurahan/Desa"
            @input="inputValue('input-village', $event)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Kode Pos *'"
          />
          <v-text-field
            :value="postalCode"
            :rules="requiredRules('Kode Pos')"
            dense
            background-color="white"
            outlined
            placeholder="Masukkan Kode Pos"
            @input="inputValue('input-postal-code', $event)"
          />
          <c-text
            font-size="18"
            class="ma-0 mb-1"
            v-text="'Alamat *'"
          />
          <v-textarea
            :value="address"
            :rules="requiredRules('Alamat')"
            rows="3"
            dense
            background-color="white"
            outlined
            placeholder="Masukkan Alamat"
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

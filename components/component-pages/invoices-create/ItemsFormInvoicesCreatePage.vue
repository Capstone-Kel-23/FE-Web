<template>
  <v-container>
    <v-data-table
      hide-default-footer
      disable-filtering
      disable-pagination
      disable-sort
      class="form-repeater-wrapper"
      :mobile-breakpoint="1264"
      :headers="headers"
      :items="invoiceItems"
    >
      <template #[`item.item`]="{ item, index }">
        <v-text-field
          :value="item.item"
          :rules="requiredRules('Item')"
          dense
          :class="`${mobile ? 'item-form-mobile' : ''}`"
          background-color="white"
          :outlined="!mobile"
          placeholder="Masukkan Nama Item"
          @input="inputValueItems('input-invoice-item', index, $event)"
        />
      </template>
      <template #[`item.description`]="{ item, index }">
        <v-textarea
          :value="item.description"
          :rules="requiredRules('Deskripsi')"
          rows="1"
          dense
          :class="`${mobile ? 'item-form-mobile' : ''}`"
          background-color="white"
          :outlined="!mobile"
          placeholder="Masukkan Deskripsi"
          @input="inputValueItems('input-invoice-description', index, $event)"
        />
      </template>
      <template #[`item.quantity`]="{ item, index }">
        <div :class="`${mobile ? '' : 'item-form-quantity'}`">
          <v-text-field
            :value="item.quantity"
            :rules="quantityItemRules"
            type="number"
            dense
            :class="`${mobile ? 'item-form-mobile' : ''}`"
            background-color="white"
            :outlined="!mobile"
            placeholder="Masukkan Kuantitas"
            @input="inputValueItems('input-invoice-quantity', index, $event)"
          />
        </div>
      </template>
      <template #[`item.price`]="{ item, index }">
        <v-currency-field
          :value="item.price"
          :rules="requiredRules('Harga')"
          prefix="Rp"
          dense
          :class="`${mobile ? 'item-form-mobile' : ''}`"
          background-color="white"
          :outlined="!mobile"
          placeholder="Masukkan Harga"
          @input="inputValueItems('input-invoice-price', index, $event)"
        />
      </template>
      <template #[`item.amount`]="{ item }">
        <c-text
          :font-size="mobile ? '14' : '16'"
          :class="mobile ? 'ma-0' : ''"
          v-text="format.currency(item.amount)"
        />
      </template>
      <template #[`item.remove`]="{ item, index }">
        <v-btn
          icon
          color="red"
          :disabled="invoiceItems.length <= 1"
          @click="removeItem(index, item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <div class="add-item-wrapper">
      <v-btn
        width="100%"
        text
        large
        @click="addItem"
      >
        <v-icon>mdi-plus</v-icon>
        Tambahkan item
      </v-btn>
    </div>
    <v-row
      justify="end"
      :class="`mt-${mobile ? '10' : '5'} ${mobile ? 'total-form-mobile-wrapper' : ''}`"
    >
      <v-col
        sm="12"
        md="6"
        lg="6"
      >
        <v-container class="py-0">
          <v-row justify="space-between">
            <v-col cols="6" class="px-0">
              <c-text
                class="ma-0 text-right"
                v-text="'Sub Total'"
              />
            </v-col>
            <v-col cols="6">
              <c-text
                class="ma-0 text-right"
                v-text="format.currency(subTotal)"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container class="py-0">
          <v-row justify="space-between">
            <v-col cols="6" class="px-0">
              <div
                class="d-flex cursor-pointer fit-width ms-auto"
                @click="showForm('discount')"
              >
                <c-text
                  class="ma-0 me-1 text-right"
                  v-text="'Tambah Diskon'"
                />
                <v-icon
                  v-text="showDiscountForm ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                />
              </div>
              <v-currency-field
                v-show="showDiscountForm"
                :value="discount"
                hide-details=""
                prefix="Rp"
                dense
                background-color="white"
                outlined
                placeholder="Enter Discount"
                @input="inputValue('input-discount', $event)"
              />
            </v-col>
            <v-col cols="6">
              <c-text
                class="ma-0 text-right"
                v-text="format.currency(discount)"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container class="py-0">
          <v-row justify="space-between">
            <v-col cols="6" class="px-0">
              <div
                class="d-flex cursor-pointer fit-width ms-auto"
                @click="showForm('tax')"
              >
                <c-text
                  class="ma-0 me-1 text-right"
                  v-text="'Tambah Pajak'"
                />
                <v-icon
                  v-text="showTaxForm ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                />
              </div>
              <v-currency-field
                v-show="showTaxForm"
                :value="tax"
                hide-details=""
                prefix="Rp"
                dense
                background-color="white"
                outlined
                placeholder="Enter Tax"
                @input="inputValue('input-tax', $event)"
              />
            </v-col>
            <v-col cols="6">
              <c-text
                class="ma-0 text-right"
                v-text="format.currency(tax)"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container class="py-0">
          <v-row justify="space-between">
            <v-col cols="6" class="px-0">
              <c-text
                class="ma-0 text-right"
                v-text="'Total'"
              />
            </v-col>
            <v-col cols="6">
              <c-text
                class="ma-0 text-right"
                v-text="format.currency(total)"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as numberFormat from '@/utils/numberFormat'

export default {
  name: 'ItemsFormInvoicesCreatePage',

  layout: 'dashboard',

  props: {
    invoiceItems: {
      type: null,
      default: [{ item: '', description: '', quantity: 0, price: 0, amount: 0 }]
    },
    subTotal: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    }
  },

  emits: [
    'input-invoice-item',
    'input-invoice-description',
    'input-invoice-quantity',
    'input-invoice-price',
    'input-invoice-amount',
    'add-invoice-item',
    'remove-invoice-item',
    'input-discount',
    'input-tax'
  ],

  data () {
    return {
      showDiscountForm: false,
      showTaxForm: false,
      quantityItemRules: [
        ...this.requiredRules('Kuantitas'),
        v => v >= 1 || 'Kuantitas minimal 1'
      ],
      headers: [
        { text: 'Item', value: 'item' },
        { text: 'Deskripsi', value: 'description' },
        { text: 'Kuantitas', value: 'quantity' },
        { text: 'Harga', value: 'price' },
        { text: 'Jumlah', value: 'amount' },
        { text: '', value: 'remove' }
      ]
    }
  },

  computed: {
    format () {
      return numberFormat
    },

    mobile () {
      return this.$vuetify.breakpoint.mobile
    }
  },

  methods: {
    inputValueItems (emitName, itemIndex = 0, itemValue = null) {
      return this.$emit(emitName, {
        index: itemIndex,
        value: itemValue
      })
    },

    inputValue (emitName, value = null) {
      return this.$emit(emitName, value)
    },

    showForm (type) {
      if (type === 'discount') {
        this.showDiscountForm = !this.showDiscountForm
        if (!this.showDiscountForm) {
          this.inputValue('input-discount', 0)
        }
      } else {
        this.showTaxForm = !this.showTaxForm
        if (!this.showTaxForm) {
          this.inputValue('input-tax', 0)
        }
      }
    },

    addItem () {
      return this.$emit('add-invoice-item')
    },

    removeItem (index, avoider = null) {
      return this.$emit('remove-invoice-item', index)
    },

    requiredRules (data) {
      return [
        v => !!v || `${data} harus diisi!`
      ]
    }
  }
}
</script>

<style scoped>
  .form-repeater-wrapper {
    background-color: transparent !important;
  }

  .form-repeater-wrapper >>> table tbody tr td:not(:last-child) {
    padding-top: 10px;
    font-size: 14px !important;
    vertical-align: middle;
  }

  .form-repeater-wrapper >>> .item-form-quantity {
    max-width: 75px;
  }

  .form-repeater-wrapper >>> .item-form-mobile .v-input__slot {
    padding-left: 10px;
    padding-right: 10px;
  }

  .form-repeater-wrapper >>> .item-form-mobile .v-text-field__prefix,
  .form-repeater-wrapper >>> .item-form-mobile input,
  .form-repeater-wrapper >>> .item-form-mobile textarea {
    font-size: 14px !important;
  }

  .form-repeater-wrapper >>> .v-data-table__mobile-row__header {
    width: fit-content !important;
  }

  .form-repeater-wrapper >>> .v-data-table__mobile-row__cell {
    width: 75% !important;
  }

  .add-item-wrapper {
    border-top: 1px solid var(--v-neutral600-base);
    border-bottom: 1px solid var(--v-neutral600-base);
    padding: 0 !important;
  }

  .total-form-mobile-wrapper >>> p {
    font-size: 14px !important;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .fit-width {
    width: fit-content;
  }
</style>

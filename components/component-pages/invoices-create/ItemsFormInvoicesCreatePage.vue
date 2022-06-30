<template>
  <v-container>
    <v-simple-table
      class="form-repeater-wrapper"
    >
      <template #default>
        <thead>
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
            >
              <c-text
                class="ma-0"
                v-text="header"
              />
            </th>
            <th class="col-auto pa-0" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in invoiceItems"
            :key="index"
          >
            <td>
              <v-text-field
                :value="item.item"
                :rules="requiredRules('Item')"
                dense
                background-color="white"
                outlined
                placeholder="Enter Item Name"
                @input="inputValue('input-invoice-item', index, $event)"
              />
            </td>
            <td>
              <v-textarea
                :value="item.description"
                :rules="requiredRules('Description')"
                rows="1"
                dense
                background-color="white"
                outlined
                placeholder="Enter Description"
                @input="inputValue('input-invoice-description', index, $event)"
              />
            </td>
            <td class="col-1">
              <v-text-field
                :value="item.quantity"
                :rules="requiredRules('Quantity')"
                type="number"
                dense
                background-color="white"
                outlined
                placeholder="Enter Quantity"
                @input="inputValue('input-invoice-quantity', index, $event)"
              />
            </td>
            <td class="col-2">
              <v-currency-field
                :value="item.price"
                :rules="requiredRules('Price')"
                prefix="Rp"
                dense
                background-color="white"
                outlined
                placeholder="Enter Price"
                @input="inputValue('input-invoice-price', index, $event)"
              />
            </td>
            <td>
              <c-text
                v-text="format.currency(item.amount)"
              />
            </td>
            <td class="pa-0">
              <v-btn
                icon
                color="red"
                :disabled="invoiceItems.length <= 1"
                @click="removeItem(index)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
          <tr class="add-item-button-wrapper">
            <td colspan="6">
              <v-btn
                width="100%"
                text
                large
                @click="addItem"
              >
                <v-icon>mdi-plus</v-icon>
                Add an item
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
    }
  },

  emits: [
    'input-invoice-item',
    'input-invoice-description',
    'input-invoice-quantity',
    'input-invoice-price',
    'input-invoice-amount',
    'add-invoice-item',
    'remove-invoice-item'
  ],

  data () {
    return {
      headers: [
        'Item',
        'Description',
        'Quantity',
        'Price',
        'Amount'
      ]
    }
  },

  computed: {
    format () {
      return numberFormat
    }
  },

  methods: {
    inputValue (emitName, itemIndex, itemValue = null) {
      return this.$emit(emitName, {
        index: itemIndex,
        value: itemValue
      })
    },

    addItem () {
      return this.$emit('add-invoice-item')
    },

    removeItem (index) {
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

  .form-repeater-wrapper table tbody tr td {
    padding-top: 10px;
  }

  .add-item-button-wrapper td {
    border-bottom: 1px solid var(--v-neutral600-base);
    padding: 0 !important;
  }
</style>

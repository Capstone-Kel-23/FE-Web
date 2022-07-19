<template>
  <v-card
    v-if="invoice !== {}"
    class="pa-0 px-3"
  >
    <v-container>
      <v-row dense>
        <v-col>
          <c-text
            font-size="28"
            font-weight="bold"
            style="color: #263D35"
            class="ma-0 text-right"
            v-text="'Invoice'"
          />
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
        >
          <v-btn
            icon
            @click="closeDialog"
          >
            <v-icon
              size="30"
              v-text="'mdi-window-close'"
            />
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <v-img
            v-if="!isLoading"
            max-width="85"
            max-height="65"
            src="/images/logo/example-company-logo.png"
            lazy-src="/images/logo/example-company-logo.png"
          />
          <v-skeleton-loader
            v-else
            width="85"
            height="65"
            type="image"
          />
        </v-col>
        <v-col v-if="!isLoading">
          <c-text
            font-size="18"
            class="ma-0"
            v-text="invoice.businessName"
          />
          <c-text
            font-size="12"
            color="neutral700"
            class="ma-0"
            v-text="invoice.phone"
          />
          <c-text
            font-size="12"
            color="neutral700"
            class="ma-0"
            v-text="invoice.businessEmail"
          />
        </v-col>
        <v-col v-else>
          <v-skeleton-loader
            class="mb-1"
            type="heading"
          />
          <v-skeleton-loader
            width="100"
            type="text"
          />
          <v-skeleton-loader
            width="100"
            type="text"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <c-text
            font-size="12"
            class="ma-0"
            v-text="'Tagihan ke'"
          />
          <div v-if="!isLoading">
            <c-text
              font-size="19"
              font-weight="600"
              class="ma-0"
              v-text="`${invoice.firstName} ${invoice.lastName}`"
            />
            <c-text
              font-size="12"
              color="neutral700"
              class="ma-0"
              v-text="invoice.email"
            />
          </div>
          <div v-else>
            <v-skeleton-loader
              class="mb-1"
              type="heading"
            />
            <v-skeleton-loader
              width="100"
              type="text"
            />
          </div>
        </v-col>
      </v-row>
      <v-row
        justify="end"
        dense
      >
        <v-spacer />
        <v-col cols="auto">
          <table class="total-invoice-wrapper">
            <tr>
              <td>
                <c-text
                  font-size="11"
                  font-weight="bold"
                  class="ma-0"
                  v-text="'ID Tagihan'"
                />
              </td>
              <td>
                <c-text
                  v-if="!isLoading"
                  font-size="11"
                  class="ma-0"
                  v-text="invoice.invoiceNumber"
                />
                <v-skeleton-loader
                  v-else
                  width="100"
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td>
                <c-text
                  font-size="11"
                  font-weight="bold"
                  class="ma-0"
                  v-text="'Tanggal'"
                />
              </td>
              <td>
                <c-text
                  v-if="!isLoading"
                  font-size="11"
                  class="ma-0"
                  v-text="$moment(invoice.date).format('DD/MM/YYYY')"
                />
                <v-skeleton-loader
                  v-else
                  width="100"
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td>
                <c-text
                  font-size="11"
                  font-weight="bold"
                  class="ma-0"
                  v-text="'Batas waktu'"
                />
              </td>
              <td>
                <c-text
                  v-if="!isLoading"
                  font-size="11"
                  class="ma-0"
                  v-text="$moment(invoice.dueDate).format('DD/MM/YYYY')"
                />
                <v-skeleton-loader
                  v-else
                  width="100"
                  type="text"
                />
              </td>
            </tr>
          </table>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th
                    class="black--text"
                    v-text="'Item Description'"
                  />
                  <th
                    class="black--text"
                    v-text="'Quantity'"
                  />
                  <th
                    class="black--text"
                    v-text="'Unit Price'"
                  />
                  <th
                    class="black--text"
                    v-text="'Amount'"
                  />
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in invoice.items"
                  :key="index"
                >
                  <td>
                    <c-text
                      font-size="14"
                      class="ma-0"
                      v-text="item.name"
                    />
                    <c-text
                      font-size="10"
                      class="ma-0"
                      v-text="item.description"
                    />
                  </td>
                  <td>
                    <c-text
                      font-size="12"
                      class="ma-0"
                      v-text="item.quantity"
                    />
                  </td>
                  <td>
                    <c-text
                      font-size="12"
                      class="ma-0"
                      v-text="format.currency(item.price)"
                    />
                  </td>
                  <td>
                    <c-text
                      font-size="12"
                      class="ma-0"
                      v-text="format.currency(item.amount)"
                    />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-divider />
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col cols="auto">
          <c-text
            v-if="!isLoading"
            font-size="12"
            font-weight="bold"
            v-text="`Metode Pembayaran: ${invoice.paymentType}`"
          />
          <v-skeleton-loader
            v-else
            width="200"
            type="text"
          />
        </v-col>
        <v-col cols="auto">
          <table class="total-invoice-wrapper">
            <tr>
              <td>
                <c-text
                  class="ma-0"
                  font-size="12"
                  font-weight="600"
                  v-text="'Subtotal'"
                />
              </td>
              <td>
                <c-text
                  v-if="!isLoading"
                  class="ma-0"
                  font-size="12"
                  v-text="format.currency(invoice.subTotal)"
                />
                <v-skeleton-loader
                  v-else
                  width="100"
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td>
                <c-text
                  class="ma-0"
                  font-size="12"
                  font-weight="600"
                  v-text="'Diskon'"
                />
              </td>
              <td>
                <c-text
                  v-if="!isLoading"
                  class="ma-0"
                  font-size="12"
                  v-text="format.currency(invoice.discount)"
                />
                <v-skeleton-loader
                  v-else
                  width="100"
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td>
                <c-text
                  class="ma-0"
                  font-size="12"
                  font-weight="600"
                  v-text="'Pajak'"
                />
              </td>
              <td>
                <c-text
                  v-if="!isLoading"
                  class="ma-0"
                  font-size="12"
                  v-text="format.currency(invoice.tax)"
                />
                <v-skeleton-loader
                  v-else
                  width="100"
                  type="text"
                />
              </td>
            </tr>
            <tr class="px-3 grey">
              <td class="rounded-l">
                <c-text
                  class="ma-0"
                  font-size="14"
                  font-weight="600"
                  v-text="'Total :'"
                />
              </td>
              <td class="rounded-r">
                <c-text
                  v-if="!isLoading"
                  class="ma-0"
                  font-size="14"
                  v-text="format.currency(invoice.total)"
                />
                <v-skeleton-loader
                  v-else
                  width="100"
                  type="text"
                />
              </td>
            </tr>
          </table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import * as numberFormat from '@/utils/numberFormat'

export default {
  name: 'PreviewDetailInvoicePage',

  props: {
    invoice: {
      type: null,
      default: {}
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    'close-dialog'
  ],

  computed: {
    format () {
      return numberFormat
    }
  },

  methods: {
    closeDialog () {
      return this.$emit('close-dialog')
    }
  }
}
</script>

<style scoped>
  .total-invoice-wrapper tr td:first-child {
    padding-right: 10px;
  }

  .total-invoice-wrapper {
    border-spacing: 0px;
  }

  .total-invoice-wrapper tr td {
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 1.5px;
    padding-top: 1.5px;
  }

  .total-invoice-wrapper tr:first-child td {
    padding-top: 0;
  }
</style>

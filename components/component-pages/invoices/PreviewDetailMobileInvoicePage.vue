<template>
  <v-card
    v-if="invoice !== {}"
    class="pa-0"
    width="100%"
    flat
  >
    <v-container>
      <v-row dense>
        <v-col>
          <c-text
            font-size="12"
            font-weight="600"
            v-text="'TAGIHAN'"
          />
          <div>
            <c-text
              v-if="!isLoading"
              font-size="12"
              v-text="invoice.invoiceNumber"
            />
            <v-skeleton-loader
              v-else
              width="100"
              type="text"
            />
          </div>
        </v-col>
        <v-col cols="auto">
          <c-text
            font-size="12"
            font-weight="600"
            class="text-right"
            v-text="'SALDO JATUH TEMPO'"
          />
          <div>
            <c-text
              v-if="!isLoading"
              font-size="12"
              class="text-right"
              v-text="`IDR ${format.currency(invoice.total)}`"
            />
            <v-skeleton-loader
              v-else
              width="100"
              class="ms-auto"
              type="text"
            />
          </div>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <c-text
            font-size="12"
            font-weight="600"
            v-text="'TANGGAL'"
          />
          <div>
            <c-text
              v-if="!isLoading"
              font-size="12"
              v-text="$moment(invoice.date).format('DD MMM, YYYY')"
            />
            <v-skeleton-loader
              v-else
              width="100"
              type="text"
            />
          </div>
        </v-col>
        <v-col cols="auto">
          <c-text
            font-size="12"
            font-weight="600"
            class="text-right"
            v-text="'BATAS WAKTU'"
          />
          <div>
            <c-text
              v-if="!isLoading"
              font-size="12"
              class="text-right"
              v-text="$moment(invoice.date).format('DD MMM, YYYY')"
            />
            <v-skeleton-loader
              v-else
              width="100"
              class="ms-auto"
              type="text"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-divider />
    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-img
            v-if="!isLoading"
            max-width="80"
            max-height="65"
            src="/images/logo/example-company-logo.png"
          />
          <v-skeleton-loader
            v-else
            width="80"
            height="65"
            type="image"
          />
        </v-col>
        <v-col>
          <div v-if="!isLoading">
            <c-text
              font-size="14"
              font-weight="bold"
              v-text="invoice.businessName"
            />
            <c-text
              font-size="12"
              color="neutral700"
              v-text="invoice.phone"
            />
            <c-text
              font-size="12"
              color="neutral700"
              v-text="invoice.email"
            />
          </div>
          <div v-else>
            <v-skeleton-loader
              width="150"
              style="transform: scaleY(1.3)"
              class="mt-2"
              type="text"
            />
            <v-skeleton-loader
              width="100"
              type="text"
            />
            <v-skeleton-loader
              width="100"
              type="text"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-divider />
    <v-container class="py-2">
      <v-row>
        <v-col>
          <c-text
            font-size="12"
            font-weight="600"
            v-text="'PEMBAYARAN KEPADA'"
          />
          <div>
            <c-text
              v-if="!isLoading"
              font-size="14"
              font-weight="bold"
              v-text="`${invoice.firstName} ${invoice.lastName}`"
            />
            <v-skeleton-loader
              v-else
              width="150"
              style="transform: scaleY(1.3)"
              class="mt-1"
              type="text"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-divider />
    <v-container class="py-2">
      <v-row>
        <v-col>
          <c-text
            font-size="12"
            font-weight="600"
            v-text="'DESKRIPSI'"
          />
        </v-col>
        <v-col cols="auto">
          <c-text
            font-size="12"
            font-weight="600"
            v-text="'JUMLAH'"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-divider />
    <v-container
      v-for="(item, index) in invoice.items"
      :key="index"
    >
      <v-row dense>
        <v-col class="pb-0 px-3">
          <c-text
            font-size="12"
            font-weight="600"
            v-text="item.name"
          />
          <c-text
            font-size="12"
            v-text="item.description"
          />
        </v-col>
      </v-row>
      <v-row dense justify="end">
        <v-col cols="auto" class="px-3">
          <c-text
            font-size="12"
            class="text-right"
            v-text="format.currency(item.price)"
          />
          <c-text
            font-size="12"
            class="text-right"
            v-text="`x${item.quantity}`"
          />
          <v-divider />
          <c-text
            font-size="12"
            font-weight="600"
            class="text-right"
            v-text="format.currency(item.amount)"
          />
        </v-col>
      </v-row>
      <v-row v-if="!(invoice.items.length - 1 === index)">
        <v-col class="py-0">
          <v-divider />
        </v-col>
      </v-row>
    </v-container>
    <v-divider />
    <v-container class="py-1">
      <v-row>
        <v-col>
          <table class="w-100">
            <tr>
              <td>
                <c-text
                  font-size="12"
                  font-weight="600"
                  v-text="'SUBTOTAL'"
                />
              </td>
              <td>
                <c-text
                  v-if="!isLoading"
                  font-size="12"
                  class="text-right"
                  v-text="format.currency(invoice.subTotal)"
                />
                <v-skeleton-loader
                  v-else
                  width="150"
                  class="ms-auto"
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td>
                <c-text
                  font-size="12"
                  font-weight="600"
                  v-text="'DISKON'"
                />
              </td>
              <td>
                <c-text
                  v-if="!isLoading"
                  font-size="12"
                  class="text-right"
                  v-text="`-${format.currency(invoice.discount)}`"
                />
                <v-skeleton-loader
                  v-else
                  width="150"
                  class="ms-auto"
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td>
                <c-text
                  font-size="12"
                  font-weight="600"
                  v-text="'TAX'"
                />
              </td>
              <td>
                <c-text
                  v-if="!isLoading"
                  font-size="12"
                  class="text-right"
                  v-text="format.currency(invoice.tax)"
                />
                <v-skeleton-loader
                  v-else
                  width="150"
                  class="ms-auto"
                  type="text"
                />
              </td>
            </tr>
          </table>
        </v-col>
      </v-row>
    </v-container>
    <v-divider />
    <v-container class="py-1">
      <v-row>
        <v-col>
          <c-text
            font-size="12"
            font-weight="600"
            v-text="'TOTAL'"
          />
        </v-col>
        <v-col cols="auto">
          <c-text
            v-if="!isLoading"
            font-size="14"
            font-weight="bold"
            class="text-right"
            v-text="format.currency(invoice.total)"
          />
          <v-skeleton-loader
            v-else
            width="150"
            class="ms-auto"
            type="text"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import * as numberFormat from '@/utils/numberFormat'

export default {
  name: 'PreviewDetailMobileInvoicePage',

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
    'close-dialog',
    'open-delete-dialog'
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
  p {
    margin: 0;
  }

  .v-divider {
    border-color: var(--v-neutral600-base);
  }

  .total-invoice-wrapper tr td:first-child {
    padding-right: 10px;
  }

  .w-100 {
    width: 100%;
  }
</style>

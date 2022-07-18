<template>
  <v-container>
    <!-- BEGIN FORM HEADER -->
    <c-text
      font-size="24"
      v-text="'Perusahaan'"
    />
    <c-text
      color="neutral700"
      v-text="'Ubah alamat, logo, dan informasi lainnya untuk perusahaan Anda.'"
    />
    <v-divider class="mb-3" />
    <!-- END FORM HEADER -->
    <v-container>
      <v-row>
        <v-col
          sm="12"
          md="8"
          lg="8"
        >
          <!-- BEGIN FORM FIELD -->
          <v-container class="pa-0">
            <v-row>
              <v-col>
                <c-text
                  font-size="18"
                  class="ma-0 mb-1"
                  v-text="'Judul'"
                />
                <v-text-field
                  :value="title"
                  dense
                  background-color="white"
                  outlined
                  placeholder="Masukkan judul"
                  @input="inputValue('input-title', $event)"
                />
                <c-text
                  font-size="18"
                  class="ma-0 mb-1"
                  v-text="'Subheading'"
                />
                <v-text-field
                  :value="subHeading"
                  dense
                  background-color="white"
                  outlined
                  placeholder="Masukkan Subheading"
                  @input="inputValue('input-subheading', $event)"
                />
              </v-col>
              <v-col>
                <!-- BEGIN LOGO FIELD CONTAINER -->
                <c-text
                  font-size="18"
                  class="ma-0 mb-1"
                  v-text="'Logo *'"
                />
                <input
                  ref="fileBrowser"
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  style="display: none"
                  @input.prevent="onDrop($event.target)"
                >
                <div
                  :class="`company-logo-dropzone ${logoFile === null ? 'pa-3' : ''} ${dragover ? 'company-logo-dropzone-active' : ''} ${validLogoFile ? '' : 'company-logo-invalid'}`"
                  @drop.prevent="onDrop($event.dataTransfer)"
                  @dragover.prevent="dragover = true"
                  @dragenter.prevent="dragover = true"
                  @dragleave.prevent="dragover = false"
                  @click="$refs.fileBrowser.click()"
                >
                  <v-container
                    v-if="logoFile === null"
                    class="fill-height"
                  >
                    <c-text
                      color="neutral700"
                      class="ma-0 text-center"
                      v-text="'Tarik gambar kesini untuk mengunggah'"
                    />
                    <c-text
                      v-if="!validLogoFile"
                      font-size="12"
                      class="ma-0 text-center"
                      style="white-space: nowrap"
                      color="red"
                      v-text="'Logo tidak boleh kosong!'"
                    />
                  </v-container>
                  <div v-else>
                    <v-img
                      :height="dragover || !validLogoFile ? '131' : '135'"
                      :src="previewLogo()"
                      :lazy-src="previewLogo()"
                      @drop.prevent="onDrop($event.dataTransfer)"
                      @dragover.prevent="dragover = true"
                      @dragenter.prevent="dragover = true"
                      @dragleave.prevent="dragover = false"
                    />
                  </div>
                </div>
                <v-btn
                  v-if="logoFile !== null"
                  x-small
                  text
                  elevation="0"
                  outlined
                  color="red"
                  @click="inputValue('remove-logo-file')"
                >
                  Remove
                  <v-icon
                    size="15"
                    class="ms-1"
                  >
                    mdi-close-box-outline
                  </v-icon>
                </v-btn>
                <!-- END LOGO FIELD CONTAINER -->
              </v-col>
            </v-row>
          </v-container>
          <!-- END FORM FIELD -->
        </v-col>
        <v-col class="d-flex">
          <div>
            <c-text
              font-size="18"
              class="ma-0"
              v-text="'PT Mitra Makmur Sejahtera'"
            />
            <c-text
              class="ma-0"
              v-text="'081287976333'"
            />
            <c-text
              class="ma-0"
              v-text="'mitramakmur@gmail.com'"
            />
          </div>
          <v-btn
            icon
            color="black"
            class="ms-3"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'CompanyFormInvoicesCreatePage',

  props: {
    title: {
      type: String,
      default: ''
    },
    subHeading: {
      type: String,
      default: ''
    },
    logoFile: {
      type: null,
      default: null
    },
    validLogoFile: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    'input-title',
    'input-subheading',
    'input-logo-file',
    'remove-logo-file'
  ],

  data () {
    return {
      dragover: false
    }
  },

  methods: {
    onDrop (e) {
      this.dragover = false
      this.inputValue('input-logo-file', e.files[0])
    },

    previewLogo () {
      return URL.createObjectURL(this.logoFile)
    },

    inputValue (emitName, value = null) {
      return this.$emit(emitName, value)
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
    border: 3px dotted red;
  }
</style>

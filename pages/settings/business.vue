<template>
  <v-container
    v-if="mobile"
    class="pa-0 mt-3 px-5"
  >
    <!-- BEGIN SEARCH FIELD -->
    <v-row
      no-gutters
    >
      <v-col
        cols="auto"
        align-self="center"
      >
        <v-btn
          icon
          color="black"
          @click="() => $router.go(-1)"
        >
          <v-icon
            size="40"
            v-text="'mdi-chevron-left'"
          />
        </v-btn>
      </v-col>
      <v-col
        align-self="center"
      >
        <c-text
          font-size="20"
          font-weight="bold"
          class="ma-0 text-center"
          v-text="'Detail Bisnis'"
        />
      </v-col>
    </v-row>
    <v-card
      rounded="lg"
      class="rounded-b-0 mt-5"
    >
      <v-container>
        <v-row
          class="align-center grey rounded-t-lg px-3 py-2"
        >
          <c-text
            font-size="14"
            font-weight="600"
            class="ma-0"
            v-text="'Logo Bisnis'"
          />
        </v-row>
        <v-row>
          <input
            ref="fileBrowser"
            type="file"
            accept=".jpg, .png, .jpeg"
            style="display: none"
            @input.prevent="onDrop($event.target)"
          >
          <div
            :class="`business-logo-dropzone ${logoFile === null ? 'pa-3' : ''} ${dragover ? 'business-logo-dropzone-active' : ''}`"
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
              <!-- <c-text
                color="neutral700"
                class="ma-0 text-center"
                v-text="'Drop files here to upload'"
              /> -->
              <v-icon
                size="75"
                class="mx-auto"
                v-text="'mdi-camera'"
              />
            </v-container>
            <div v-else>
              <v-img
                max-width="100"
                class="mx-auto my-3"
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
            small
            block
            text
            elevation="0"
            outlined
            color="red"
            @click="logoFile = null"
          >
            Remove
            <v-icon
              size="15"
              class="ms-1"
            >
              mdi-close-box-outline
            </v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-card>
    <v-container class="mt-5">
      <v-row>
        <v-text-field
          v-model="title"
          hide-details=""
          class="rounded-0 business-form rounded-t-lg"
          solo
          dense
          placeholder="Judul"
        />
        <v-text-field
          v-model="subheading"
          hide-details=""
          class="rounded-0 business-form"
          solo
          dense
          placeholder="Subheading"
        />
        <v-text-field
          v-model="businessName"
          hide-details=""
          class="rounded-0 business-form"
          solo
          dense
          placeholder="Nama Bisnis"
        />
        <v-text-field
          v-model="phone"
          hide-details=""
          class="rounded-0 business-form"
          solo
          dense
          placeholder="Telepon"
        />
        <v-text-field
          v-model="email"
          hide-details=""
          class="rounded-0 business-form"
          solo
          dense
          placeholder="Email"
        />
      </v-row>
      <v-row class="mt-10">
        <v-btn
          color="primary"
          block
          v-text="'Simpan'"
        />
      </v-row>
    </v-container>
    <!-- END SEARCH FIELD -->
  </v-container>
</template>

<script>
export default {
  name: 'BusinessMobileSettingsPage',

  layout: 'dashboard',

  middleware: ['auth'],

  data () {
    return {
      dragover: false,
      logoFile: null,
      title: '',
      subheading: '',
      businessName: '',
      phone: '',
      email: ''
    }
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    }
  },

  beforeCreate () {
    if (!this.$vuetify.breakpoint.mobile) {
      this.$router.go(-1)
    }
  },

  updated () {
    if (!this.$vuetify.breakpoint.mobile) {
      this.$router.go(-1)
    }
  },

  methods: {
    onDrop (e) {
      this.dragover = false
      const extension = (e.files[0].name).split('.')
      const extensionName = extension[extension.length - 1]
      if (
        extensionName.toLowerCase() === 'jpg' ||
        extensionName.toLowerCase() === 'png' ||
        extensionName.toLowerCase() === 'jpeg'
      ) {
        this.logoFile = e.files[0]
      }
    },

    previewLogo () {
      return URL.createObjectURL(this.logoFile)
    }
  }
}
</script>

<style scoped>
  .business-logo-dropzone {
    background-color: white;
    width: 100%;
    cursor: pointer;
    user-select: none;
  }

  .business-logo-dropzone-active {
    border: 3px dashed var(--v-primary400-base) !important;
  }

  .preview-logo-wrapper {
    border: 1px dashed var(--v-neutral800-base);
  }

  .business-form {
    font-size: 12px;
  }
</style>

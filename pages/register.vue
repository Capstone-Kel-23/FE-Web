<template>
  <v-container
    fluid
    class="fill-height"
  >
    <v-row justify="center">
      <v-col cols="auto">
        <v-container class="main-container-wrapper">
          <v-row justify="center">
            <v-col align-self="center">
              <!-- BEGIN HEADER -->
              <v-row>
                <v-col cols="auto">
                  <v-btn
                    icon
                    link
                    color="black"
                    @click="() => $router.go(-1)"
                  >
                    <v-icon size="50">
                      mdi-chevron-left
                    </v-icon>
                  </v-btn>
                </v-col>
                <v-col>
                  <c-text
                    font-size="24"
                    font-weight="bold"
                    color="black"
                    class="text-center"
                    v-text="'Daftar'"
                  />
                </v-col>
              </v-row>
              <!-- END HEADER -->
              <!-- BEGIN FORM -->
              <v-row>
                <v-col cols="auto">
                  <v-btn
                    icon
                    link
                    color="black"
                    @click="() => $router.go(-1)"
                  >
                    <v-icon size="50">
                      mdi-chevron-left
                    </v-icon>
                  </v-btn>
                </v-col>
                <v-col>
                  <c-text
                    font-size="24"
                    font-weight="bold"
                    color="black"
                    class="text-center"
                    v-text="'Daftar'"
                  />
                </v-col>
              </v-row>
              <!-- END FORM -->
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RegisterPage',

  layout: 'auth'
}
</script>

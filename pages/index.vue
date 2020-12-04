<template>
  <div class="screen">
    <v-row class="loginCardContainer">
      <v-col cols="12">
        <v-banner
          v-model="showBanner"
          :sticky="true"
          single-line
          icon="error"
          color="white"
          icon-color="error"
          elevation="2"
        >
          {{ error && error.message }}
        </v-banner>
      </v-col>
      <v-col>
        <v-card class="customCard loginCard">
          <form @submit.prevent="onLogin">
            <v-row>
              <v-col cols="12">
                <h2>Login to platform</h2>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  name="Username"
                  outlined
                  required
                  type="text"
                  hide-details
                  label="Username"
                  v-model="username"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  name="Password"
                  outlined
                  hide-details
                  required
                  type="password"
                  label="Password"
                  v-model="password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="text-right">
                <v-btn :loading="buttonLoading" type="submit" depressed class="px-8 black white--text">Login</v-btn>
              </v-col>
            </v-row>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: `Login`
    }
  },
  // MIDDLEWATE CHECKING IF THERE IS A LOGGED IN USER REDIRECTS TO /PROFILE PAGE
  middleware: 'loginCheck',
  data () {
    return {
      username: '',
      password: '',
      buttonLoading: false,
      showBanner: false,
      error: null
    }
  },
  // BEFOREMOUNT WORKS BEFORE THE PAGE IS MOUNTED
  beforeMount () {
    // SETTING PAGE TITLE
    this.$store.dispatch('setPageTitle', 'Login Page')
  },
  methods: {
    onLogin () {
      this.buttonLoading = true
      this.showBanner = false
      this.error = null
      const formData = new FormData()
      formData.append('username', this.username)
      formData.append('password', this.password)
      this.$store.dispatch('onLogin', formData)
        .then(() => {
          this.buttonLoading = false
          this.$router.push('/profile')
        })
        .catch(error => {
          this.showBanner = true
          this.error = error
          this.buttonLoading = false
        })
    }
  }
}
</script>

<style scoped>
.screen {
  height: 100%;
  padding-top: 100px;
}
.loginCardContainer {
  max-width: 500px;
  margin: auto;
  width: 100%;
}
.loginCard {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 6px !important;
}
</style>

<template>
  <v-row class="screen" align="center">
    <v-col class="loginCardContainer">
      <v-card class="customCard loginCard">
        <form @submit.prevent="onLogin">
          <v-row>
            <v-col cols="12">
              <h2>Login to platform</h2>
            </v-col>
            <v-col cols="12">
              <v-text-field
              name="Email"
              outlined
              required
              type="email"
              hide-details
              label="Email Address"
              v-model="email"
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
              <v-btn type="submit" depressed class="px-8 black white--text">Login</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onLogin () {
      const userData = {
        email: this.email,
        password: this.password
      }
      console.log(userData)
    }
  }
}
</script>

<style scoped>
.screen {
  height: 90%;
  width: 100%;
}
.loginCardContainer {
  max-width: 500px;
  margin: auto;
}
.loginCard {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 6px !important;
}
</style>

<template>
  <v-row>
    <v-col col="4" class="text-center">
      <v-card class="customCard">
        <v-container>
          <v-row>
            <v-col>
              <v-avatar
                size="200"
                class="grey"
              >
                <img style="height: 100%; width: 100%;" :src="user.photoUrl" alt="Profile Picture">
              </v-avatar>
              <h1>{{ user.firstName }} {{ user.lastName }}</h1>
              <h2>{{ user.email }}</h2>
              <p>{{ user.position }}</p>
              <p>{{ user.department }}</p>
              <p>{{ user.location }}</p>
              <p>{{ user.phone }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col col="6">
      <v-card>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  head () {
    return {
      title: `${this.user && this.user.firstName} | Profile`
    }
  },
  middleware: 'userExists',
  data () {
    return {
      message: 'Login Page'
    }
  },
  beforeMount () {
    // SETTING PAGE TITLE
    this.$store.dispatch('setPageTitle', `<b>${this.user.firstName}</b> Profile`)
  },
  computed: {
    user () {
      return this.$store.state.general.user
    }
  }
}
</script>

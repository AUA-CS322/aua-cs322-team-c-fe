<template>
  <v-row>
    <v-col>
      <v-card>
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
  </v-row>
</template>

<script>
export default {
  middleware: 'userExists',
  data () {
    return {
      message: 'Login Page'
    }
  },
  computed: {
    user () {
      return this.$store.state.general.user
    }
  }
}
</script>

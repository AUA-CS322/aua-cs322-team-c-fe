<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title v-text="`Sign In Page`" />
      <v-spacer />
      <v-btn @click="$store.dispatch('logout')" v-if="user" text>Log Out</v-btn>
    </v-app-bar>
    <v-main class="mainContainer">
      <v-container class="contentContainer">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.state.general.user
    }
  }
}
</script>

<style>
.contentContainer {
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: auto;
}
.mainContainer {
  background: #F7F9FA;
}
.customCard {
  box-shadow: 0px 4px 24px #E5E5E5 !important;
  border-radius: 4px !important;
}
</style>

<template>
  <div class="screen">
    <v-row class="loginCardContainer">
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
  data () {
    return {
    }
  },
  beforeMount () {
  },
  methods: {
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

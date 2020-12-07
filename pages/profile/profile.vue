<template>
  <div>
    <v-row>
    </v-row>
  </div>
</template>

<script>
export default {
  head () {
  },
  data () {
    return {
    }
  },
  beforeMount () {
  },
  methods: {
    openPersonCard (person) {
      this.$router.push(`/profile/${person.username}`)
    },
    onSearchInput (value) {
      this.searchValue = value
      this.$store.dispatch('search', value)
    }
  },
  watch: {
  },
  computed: {
  }
}
</script>

<style scoped>
</style>

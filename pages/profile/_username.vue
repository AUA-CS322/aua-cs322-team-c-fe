<template>
  <div>
    <v-row>
      <v-col cols="4" class="text-center">
        <v-btn text to="/profile"> <- Back yo My Profile</v-btn>
        <v-card class="customCard" v-if="profile">
          <v-container>
            <v-row>
              <v-col>
                <v-avatar
                size="200"
                class="grey"
                >
                <img style="height: 100%; width: 100%;" :src="profile.photoUrl" alt="Profile Picture">
              </v-avatar>
              <h1>{{ profile.firstName }} {{ profile.lastName }}</h1>
              <h2>{{ profile.email }}</h2>
              <p>{{ profile.position }}</p>
              <p>{{ profile.department }}</p>
              <p>{{ profile.location }}</p>
              <p>{{ profile.phone }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>

    <v-col cols="8" v-if="chart">
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            v-model="searchModel"
            :items="$store.state.general.searchItems"
            @update:search-input="onSearchInput"
            hide-details
            outlined
            dense
            item-text="firstName"
            :return-object="true"
            :loading="$store.state.general.searchLoading"
            label="Search"
            >
            </v-autocomplete>
          </v-col>


        <v-col cols="12" v-if="chart && chart.parent && chart.parent.length">
          <h3>Level Upper</h3>
        </v-col>
        <v-col cols="12" v-if="chart && chart.parent && chart.parent.length"  class="text-center">
          <v-card @click="openPersonCard(i)" class="personCard" hover v-for="(i, index) in chart.parent" :key="`parent${index}`">
            <v-avatar
              size="70"
              class="grey"
              >
              <img style="height: 100%; width: 100%;" :src="i.photoUrl" alt="Profile Picture">
            </v-avatar>
            <h2>{{ i.firstName }} {{ i.lastName }}</h2>
            <p>{{ i.position }}</p>
          </v-card>
        </v-col>

        <v-col cols="12">
          <h3>{{ profile.username }}</h3>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-card class="personCard">
            <v-avatar
              size="70"
              class="grey"
              >
              <img style="height: 100%; width: 100%;" :src="profile.photoUrl" alt="Profile Picture">
            </v-avatar>
            <h2>{{ profile.firstName }} {{ profile.lastName }}</h2>
            <p>{{ profile.position }}</p>
          </v-card>
        </v-col>

        <v-col cols="12" v-if="chart && chart.children && chart.children.length">
          <h3>Level Lower</h3>
        </v-col>
        <v-col cols="12" v-if="chart && chart.children && chart.children.length"  class="text-center">
          <v-card @click="openPersonCard(i)" class="personCard" hover v-for="(i, index) in chart.children" :key="`child${index}`">
            <v-avatar
              size="70"
              class="grey"
              >
              <img style="height: 100%; width: 100%;" :src="i.photoUrl" alt="Profile Picture">
            </v-avatar>
            <h2>{{ i.firstName }} {{ i.lastName }}</h2>
            <p>{{ i.position }}</p>
          </v-card>
        </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: `${this.profile && this.profile.firstName} | Profile`
    }
  },
  middleware: 'userExists',
  async fetch ({store, route, params}) {
    await store.dispatch('getProfile', { username: params.username })
  },
  data () {
    return {
      message: 'Login Page',
      selectedPerson: null,
      searchValue: '',
      searchModel: ''
    }
  },
  beforeMount () {
    // SETTING PAGE TITLE
    this.$store.dispatch('setPageTitle', `<b>${this.profile.firstName}</b> Profile`)
    this.$store.dispatch('getChart', { username: this.$route.params.username })
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
    searchModel (val) {
      if (val) {
        this.$router.push(`/profile/${val.username}`)
      }
    }
  },
  computed: {
    profile () {
      return this.$store.state.general.profile
    },
    chart () {
      return this.$store.state.general.chart
    }
  }
}
</script>

<style scoped>
.personCard {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  height: 200px;
  width: 230px;
}
</style>

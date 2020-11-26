<template>
  <div>
    <v-row>
      <v-col cols="4" class="text-center">
        <v-card class="customCard" v-if="user">
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
    <v-col cols="8">
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
          <v-card @click="openPersonCard(i)" class="personCard" hover v-for="(i, index) in chart.parent" :key="`child${index}`">
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
          <h3>Me</h3>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-card class="personCard">
            <v-avatar
              size="70"
              class="grey"
              >
              <img style="height: 100%; width: 100%;" :src="user.photoUrl" alt="Profile Picture">
            </v-avatar>
            <h2>{{ user.firstName }} {{ user.lastName }}</h2>
            <p>{{ user.position }}</p>
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

    <v-dialog
      v-model="personDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="customCard" v-if="selectedPerson">
        <v-container class="pa-5">
          <v-row>
            <v-col class="text-center">
              <v-avatar
                size="200"
                class="grey"
                >
                <img style="height: 100%; width: 100%;" :src="selectedPerson.photoUrl" alt="Profile Picture">
              </v-avatar>
              <h1 class="pt-4">{{ selectedPerson.firstName }} {{ selectedPerson.lastName }}</h1>
              <h2>{{ selectedPerson.email }}</h2>
              <p>{{ selectedPerson.position }}</p>
              <p>{{ selectedPerson.department }}</p>
              <p>{{ selectedPerson.location }}</p>
              <p>{{ selectedPerson.phone }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
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
      message: 'Login Page',
      personDialog: false,
      selectedPerson: null,
      searchValue: '',
      searchModel: ''
    }
  },
  beforeMount () {
    // SETTING PAGE TITLE
    this.$store.dispatch('getChart', { username: this.user && this.user.username || 'member14' })
    this.$store.dispatch('setPageTitle', `<b>${this.user.firstName}</b> Profile`)
  },
  methods: {
    openPersonCard (person) {
      this.selectedPerson = person
      setTimeout(() => {
        this.personDialog = true
      }, 100)
    },
    onSearchInput (value) {
      this.searchValue = value
      this.$store.dispatch('search', value)
    }
  },
  watch: {
    searchModel (val) {
      if (val) {
        this.selectedPerson = val
        this.personDialog = true
      }
    },
    personDialog (val) {
      if (!val) {
        this.selectedPerson = null
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.general.user
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

<template>
  <div id="clients" class="main" v-if="pageBlock">
    <div class="centralContent">
      <button @click="fetchClients">Обновить</button><br><br>
      <label for="filter">Поиск</label><br>
      <input type="search" id="filter" v-model="filter"/><br><br>
      <table class="table clientsTable">
        <thead>
        <tr>
          <th>ID</th><th>ФИО</th><th>Дата рождения</th><th>Номер телефона</th><th>VK</th><th>Insta</th>
        </tr>
        </thead>
        </table>
          <v-client-row
            v-for="client in filteredClients"
            :key="client.id"
            v-bind:client_data="client"
          />
    </div>
  </div>
  <div class="main" v-else>
    Данные загружаются!
  </div>
  <sidebar/>

</template>

<script>
import sidebar from '../components/sidebar.vue';
import vMainWrapper from '../components/v-main-wrapper';
import vClientRow from '../components/v-client-row';

export default {
  name: "Clients",
  components: {
    sidebar,
    vMainWrapper,
    vClientRow,
  },
  data () {
    return {
      clients: {},
      filteredClients: [],
      filter: '',
      pageBlock: false,
    }
  },
  methods: {
    async fetchClients() {
      try {
        this.pageBlock = false;
        const response = await fetch('/api/v1/clients');
        this.clients = await response.json();
        this.filteredClients = this.clients.items.filter((item) => true);
        this.pageBlock = true;
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    filter: function () {
      this.filteredClients = this.clients.items.filter((item) => {
        let nameFound = false;
        let surnameFound = false;
        if (item.name) {
          nameFound = item.name.toLowerCase().includes(this.filter.toLowerCase());
        }
        if (item.surname) {
          surnameFound = item.surname.toLowerCase().includes(this.filter.toLowerCase());
        }
        return nameFound || surnameFound;
      });
    }
  },
  created() {
    this.$watch(
        () => this.$route.params,
        () => this.fetchClients(),
        { immediate: true }
    )
  }
}
</script>

<style scoped>

</style>
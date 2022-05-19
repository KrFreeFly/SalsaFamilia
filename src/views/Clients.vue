<template>
  <div id="clients" class="main" v-if="pageBlock">

    <popup
        v-if="popupIsVisible"
        @closePopup="closeClientInfo"
    >
      <p>Hello Content</p>
    </popup>

    <div class="centralContent">
      <button @click="fetchClients">Обновить</button><br><br>
      <label for="filter">Поиск</label><br>
      <input id="filter" v-model="filter"/><br><br>
      <table class="table">
        <thead>
        <tr>
          <th>ID</th><th>ФИО</th><th>Дата рождения</th><th>Номер телефона</th><th>VK</th><th>Insta</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(client) in filteredClients">
          <td>{{client.id}}</td>
          <td @click="showClientInfo">{{client.surname}} {{client.name}}</td>
          <td>{{client.birthday}}</td>
          <td>{{client.cellphone}}</td>
          <td><a href="{{client.vk}}">{{client.vk}}</a></td>
          <td>{{client.insta}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="main" v-else>
    Данные загружаются!
  </div>
  <Sidebar/>

</template>

<script>
import Sidebar from '../components/sidebar.vue';
import popup from '../components/popup';

export default {
  name: "Clients",
  components: {
    Sidebar,
    popup,
  },
  data () {
    return {
      clients: {},
      filteredClients: [],
      filter: '',
      pageBlock: false,
      popupIsVisible: false,
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
    showClientInfo () {
      this.popupIsVisible = true;
    },
    closeClientInfo () {
      this.popupIsVisible = false;
    }
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
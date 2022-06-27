<template>

  <v_header>
    <button class="greyButton" @click="fetchClients">Обновить</button> <button class="greenButton" @click="showPopup">Создать</button>
    <label for="filter">Поиск</label>
    <input type="search" id="filter" class="searchBar" v-model="filter"/>
  </v_header>

  <popup
    v-if="popupIsVisible"
    @closePopup="closePopup"
    @saveEntity="sendData"
  >
    <label for="surname">Фамилия</label><br>
    <input id="surname" v-model="newClientData.surname" /><br><br>
    <label for="name">Имя</label><br>
    <input id="name" v-model="newClientData.name" /><br><br>
    <label for="date">Дата рождения</label><br>
    <input id="date" type="date" v-model="newClientData.birthday" /><br><br>
    <label for="cellphone">Номер телефона</label><br>
    <input id="cellphone" v-model="newClientData.cellphone" /><br><br>
    <label for="vk">Вконтакте</label><br>
    <input id="vk" v-model="newClientData.vk" /><br><br>
    <label for="insta">Инстаграм</label><br>
    <input id="insta" v-model="newClientData.insta" />

  </popup>

  <div id="clients" class="main" v-if="pageBlock">
    <div class="centralContent">
      <table class="table clientsTable">
        <thead>
        <tr>
          <th>ID</th><th>ФИО</th><th>Дата рождения</th><th>Номер телефона</th><th>VK</th><th>Insta</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="client in this.filteredClients">
          <td>{{client.id}}</td>
          <td class="clickable" @click="openClientCard(client.id)">{{client.surname}} {{client.name}}</td>
          <td>{{client.birthday}}</td>
          <td>{{client.cellphone}}</td>
          <td><a target="_blank" :href="client.vk">{{client.vk}}</a></td>
          <td>{{client.insta}}</td>
        </tr>
        </tbody>
        </table>
    </div>
  </div>
  <div class="main" v-else>
    <h1>Данные загружаются!</h1>
  </div>
  <sidebar/>

</template>

<script>
import sidebar from '../components/v-sidebar.vue';
import { instance } from '../utils/axios';
import router from '../router';
import v_header from '../components/v-header'
import popup from "../components/v-popup";
import { getAllClients} from "@/site/utils/requests/clients";

export default {
  name: "Clients",
  components: {
    sidebar,
    v_header,
    popup,
  },
  data () {
    return {
      clients: [],
      filteredClients: [],
      filter: '',
      pageBlock: false,
      popupIsVisible: false,
      newClientData: {},
    }
  },
  methods: {
    async fetchClients() {
      try {
        this.pageBlock = false;
        this.clients = await getAllClients();
        this.filteredClients = this.clients.items.filter(() => true);
        this.pageBlock = true;
      } catch (e) {
        if (e.response.data.message) {
          alert(e.response.data.message);
        } else {
          alert(e.message);
        }
      }
    },
    async sendData() {
      try {
        const { data } = await instance.post('/clients', this.newClientData);
        this.closePopup();
        if (confirm('Перейти в карту нового клиента?')) {
          await router.push({ name: 'ClientCard', params: { id: data.id }})
        } else {
          await this.fetchClients();
        }
      } catch (e) {
        alert(e);
        this.pageBlock = true;
      }
    },
    openClientCard(id) {
      router.push({ name: 'ClientCard', params: { id }})
    },
    showPopup() {
      this.popupIsVisible = true;
    },
    closePopup() {
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
  mounted() {
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
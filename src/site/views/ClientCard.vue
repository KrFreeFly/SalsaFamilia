<template>
  <v_header>
    <button class="greyButton" @click="changeEditBtn">{{editBtn}}</button>
    <button class="redButton" @click="returnToClientsList">Выход</button>
    <button class="greenButton" v-if="showSaveButton" @click="saveEntity">Сохранить</button>
    <button class="redButton" v-if="!showSaveButton" @click="deleteEntity">Удалить</button>
  </v_header>
  <div id="clientCard" class="main" v-if="pageBlock">
    <div id="inputs" class="inputs">
      <label for="surname">Фамилия</label><br>
      <input id="surname" :disabled="inputsDisabled" v-model="client.surname" /><br><br>
      <label for="name">Имя</label><br>
      <input id="name" :disabled="inputsDisabled" v-model="client.name" /><br><br>
      <label for="date">Дата рождения</label><br>
      <input id="date" type="date" :disabled="inputsDisabled" v-model="client.birthday" /><br><br>
      <label for="cellphone">Номер телефона</label><br>
      <input id="cellphone" :disabled="inputsDisabled" v-model="client.cellphone" /><br><br>
      <label for="vk">Вконтакте</label><br>
      <input id="vk" :disabled="inputsDisabled" v-model="client.vk" /><br><br>
      <label for="insta">Инстаграм</label><br>
      <input id="insta" :disabled="inputsDisabled" v-model="client.insta" /><br><br>
    </div>
  </div>
  <div class="main" v-else>
    Данные загружаются!
  </div>
  <sidebar/>

</template>

<script>
import sidebar from '../components/v-sidebar.vue';
import v_header from '../components/v-header.vue'
import { instance } from '../utils/axios';
import router from '@/site/router';

export default {
  name: "ClientCard",
  components: {
    sidebar,
    v_header,
  },
  data() {
    return {
      pageBlock: false,
      client: {},
      clientInitial: {},
      editBtn: 'Редактировать',
      inputsDisabled: true,
      showSaveButton: false,
    };
  },
  methods: {
    async fetchClient() {
      try {
        this.pageBlock = false;
        this.client = (await instance.get(`${this.$route.fullPath}`)).data;
        Object.assign(this.clientInitial, this.client);
        this.pageBlock = true;
      } catch (e) {
        alert(e);
        this.pageBlock = true;
      }
    },
    changeEditBtn() {
      this.inputsDisabled = !this.inputsDisabled;
      if (this.inputsDisabled) {
        Object.assign(this.client, this.clientInitial);
        this.editBtn = 'Редактировать';
        this.showSaveButton = false;
      } else {
        this.editBtn = 'Отменить';
        this.showSaveButton = true;
      }
    },
    returnToClientsList() {
      router.push('/clients');
    },
    async saveEntity() {
      try {
        await instance.put(`${this.$route.fullPath}`, this.client);
        await this.fetchClient();
      } catch (e) {
        alert(e);
      }
    },
    async deleteEntity() {
      try {
        if (confirm('Вы уверены, что хотите удалить клиента?')) {
          await instance.delete(`${this.$route.fullPath}`);
          await router.push({ name: 'Clients' });
        }
      } catch (e) {
        alert(e);
      }
    }
  },
  mounted() {
    this.$watch(
      () => this.$route.params,
      () => this.fetchClient(),
      {immediate: true},
    )
  }
};
</script>

<style scoped>

</style>
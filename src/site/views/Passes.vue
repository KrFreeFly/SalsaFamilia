<template>

  <v_header>
    <button class="greyButton" @click="getPasses">Обновить</button>
    <button class="greenButton" @click="showNewPass">Создать</button>
    <button class="greyButton" @click="showPassTypes">Типы абон.</button>
  </v_header>

  <v_popup
    v-if="passTypesPopupIsVisible"
    @closePopup="closePassTypes"
    @saveEntity="createNewPassType"
    title="Типы абонементов"
    :greenBtnName="greenBtnName"
    :redBtnName="redBtnName"
  >
  <table class="table">
    <thead>
    <tr>
      <th>Type</th><th>Amount</th><th>Week</th><th>Month</th><th>Cost</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="passType in passTypes">
      <td>{{ passType.type }}</td>
      <td>{{ passType.amount }}</td>
      <td>{{ passType.week }}</td>
      <td>{{ passType.month }}</td>
      <td>{{ passType.cost }}</td>
    </tr>
    <tr v-if="newPassTypeInputIsVisible">
      <td><input v-model="newPassType.type"></td>
      <td><input v-model="newPassType.amount"></td>
      <td><input v-model="newPassType.week"></td>
      <td><input v-model="newPassType.month"></td>
      <td><input v-model="newPassType.cost"></td>
    </tr>
    </tbody>
  </table>
  </v_popup>

  <v_popup
    v-if="newPassPopupIsVisible"
    @closePopup="closeNewPass"
    @saveEntity="sendNewPassData"
  >
    <label for="surname">Фамилия</label><br>
    <input id="surname" v-model="newPass.surname" /><br><br>
    <label for="name">Имя</label><br>
    <input id="name" v-model="newPass.name" /><br><br>
    <label for="date">Дата рождения</label><br>
    <input id="date" type="date" v-model="newPass.birthday" /><br><br>
    <label for="cellphone">Номер телефона</label><br>
    <input id="cellphone" v-model="newPass.cellphone" /><br><br>
    <label for="vk">Вконтакте</label><br>
    <input id="vk" v-model="newPass.vk" /><br><br>
    <label for="insta">Инстаграм</label><br>
    <input id="insta" v-model="newPass.insta" />

  </v_popup>

  <v_sidebar/>

  <div id="clients" class="main" v-if="pageUnBlock">
    <div class="centralContent">
      <table class="table passesTable">
        <thead>
        <tr>
          <th>ID</th><th>ФИО</th><th>Дата рождения</th><th>Номер телефона</th><th>VK</th><th>Insta</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="client in this.filteredClients">
          <td>{{passes.id}}</td>
          <td class="clickable" @click="openClientCard(passes.id)">{{client.surname}} {{client.name}}</td>
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

</template>

<script>
import v_header from '../components/v-header';
import v_popup from '../components/v-popup';
import v_sidebar from '../components/v-sidebar';
import { instance } from '@/site/utils/axios';

export default {
  name: "Passes",
  components: {
    v_header,
    v_popup,
    v_sidebar,
  },
  data () {
    return {
      passTypes: [],
      passes: [],
      passTypesPopupIsVisible: false,
      newPassPopupIsVisible: false,
      newPassType: {},
      newPassTypeInputIsVisible: false,
      greenBtnName: 'Новый тип',
      redBtnName: 'Закрыть',
      pageUnBlock: false,
      newPass: {},
    }
  },
  methods: {
    async showPassTypes () {
      this.passTypesPopupIsVisible = true;
      try {
        await this.getPassTypes();
      } catch (e) {
        if (e.response.data.message) {
          alert(e.response.data.message);
        } else {
          alert(e.message);
        }
      }
    },
    async createNewPassType () {
      try {
        if (this.newPassTypeInputIsVisible) {
          await instance.post('/passTypes', this.newPassType);
          this.greenBtnName = 'Новый тип';
          this.redBtnName = 'Закрыть';
          await this.getPassTypes();
          this.newPassTypeInputIsVisible = false;
        } else {
          this.newPassTypeInputIsVisible = true;
          this.greenBtnName = 'Сохранить';
          this.redBtnName = 'Отмена'
        }
      } catch (e) {
        if (e.response.data.message) {
          alert(e.response.data.message);
        } else {
          alert(e.message);
        }
      }
    },
    closePassTypes () {
      if (this.newPassTypeInputIsVisible) {
        this.newPassTypeInputIsVisible = false;
        this.greenBtnName = 'Новый тип';
        this.redBtnName = 'Закрыть';
      } else {
        this.passTypesPopupIsVisible = false;
        this.newPassTypeInputIsVisible = false;
      }
    },
    async getPasses () {
      try {
        this.pageUnBlock = false;
        const response = await instance.get('/passes');
        this.passes = response.json();
        this.pageUnBlock = true;
      } catch (e) {
        if (e.response.data.message) {
          alert(e.response.data.message);
        } else {
          alert(e.message);
        }
      }
    },
    async getPassTypes () {
        const { data } = await instance.get('/passTypes');
        this.passTypes = data;
    },
    showNewPass () {
      this.newPassPopupIsVisible = true;
    },
    closeNewPass () {
      this.newPassPopupIsVisible = false;
    }
  },
  mounted() {
    this.$watch(
      () => this.$route.params,
      () => this.getPasses(),
      { immediate: true }
    )
  }
}
</script>

<style scoped>

</style>
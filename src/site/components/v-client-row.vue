<template>

  <popup
    v-if="popupIsVisible"
    @closePopup="closeClientInfo"
    @editEntity="editPopup"
  >
    <label for="surname">Фамилия</label><br>
    <input id="surname" v-model="client_data.surname" /><br><br>
    <label for="name">Имя</label><br>
    <input id="name" v-model="client_data.name" /><br><br>
    <label for="date">Дата рождения</label><br>
    <input id="date" type="date" v-model="client_data.birthday" /><br><br>
    <label for="cellphone">Номер телефона</label><br>
    <input id="cellphone" v-model="client_data.cellphone" /><br><br>
    <label for="vk">Вконтакте</label><br>
    <input id="vk" v-model="client_data.vk" /><br><br>
    <label for="insta">Инстаграм</label><br>
    <input id="insta" v-model="client_data.insta" />

  </popup>

    <table class="table clientsTable">

    </table>
</template>

<script>
import popup from './v-popup';

export default {
  name: 'v-client-row',
  data() {
    return {
      popupIsVisible: false,
    }
  },
  props: {
    client_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    popup
  },
  methods: {
    showClientInfo () {
      this.popupIsVisible = true;
      this.$emit('popupOpened');
    },
    closeClientInfo () {
      this.popupIsVisible = false;
      this.$emit('popupClosed');
    },
  }
};
</script>

<style>

</style>
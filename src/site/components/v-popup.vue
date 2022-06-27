<template>
  <div class="popup_wrapper" ref="popup_wrapper">
    <div class="popup">
      <div class="popup_header">
        <h1>{{ title }}</h1>
      </div>
      <div class="popup_content">
        <slot></slot>
      </div><br><br>
      <div class="popup_footer">
        <button class="greenButton" @click="saveEntity">{{ greenBtnName }}</button>
        <button class="redButton" @click="closePopup">{{ redBtnName }}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "v-popup",
    props: {
      title: '',
      greenBtnName: '',
      redBtnName: '',
    },
    methods: {
      saveEntity() {
        this.$emit('saveEntity')
      },
      closePopup() {
        this.$emit('closePopup')
      },
    },
    mounted() {
      const vm = this;
      document.addEventListener('click', (item) => {
        if (item.target === vm.$refs['popup_wrapper']) {
          vm.closePopup();
        }
      });
    },
  }

</script>

<style>
 .popup_wrapper {
   background: rgba(40,40,40,0.56);
   position: fixed;
   right: 0;
   left: 0;
   top: 0;
   bottom: 0;
 }

  .popup {
    padding: 16px;
    position: fixed;
    top: 100px;
    margin-left: 300px;
    width: 800px;
    background: white;
    box-shadow: 0 0 17px 0 #e7e7e7;
    border-radius: 5px;
  }

  .popup_header {
    display: flex;
    justify-content: center;
  }

  .popup_footer {
      display: flex;
      justify-content: right;
  }

  .popup_content {
    display: flex;
    justify-content: center;
  }

</style>
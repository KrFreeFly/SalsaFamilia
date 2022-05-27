<template>
  <div class="popup_wrapper" ref="popup_wrapper">
    <div class="popup">
      <div class="popup_header">
        Popup name
      </div>
      <div class="popup_content">
        <slot></slot>
      </div>
      <div class="popup_footer">
        <button class="edit_btn" @click="editEntity">Изменить</button>
        <button class="close_btn" @click="closePopup">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "popup",
    methods: {
      editEntity() {
        this.$emit('editEntity')
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
  }

  .edit_btn {
    padding: 8px;
    color: white;
    background: green;
  }
  .close_btn {
    padding: 8px;
    color: white;
    background: red;
  }
</style>
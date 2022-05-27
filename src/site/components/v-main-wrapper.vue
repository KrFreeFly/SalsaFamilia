<template>
 <div class="v-main-wrapper">
    <p>{{title}}</p>
 </div>
</template>

<script>
  export default {
    name: 'v-main-wrapper',
    components: {},
    props: {},
    data() {
      return {
        title: 'Main wrapper'
      }
    },
}
</script>

<style>
  .v-main-wrapper {
    display: flex;
  }
</style>
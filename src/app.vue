<template>
  <div id="sidebar" class="sidebar">
    <router-link to="/">На главную</router-link><br>
    <router-link to="/clients">Клиенты</router-link><br>
    <router-link to="/passes">Абонементы</router-link><br>
    <router-link to="/classes">Занятия</router-link><br>
    <router-link to="/expenses">Расходы</router-link><br>
    <router-link to="/analytics">Аналитика</router-link><br>
    <router-link to="/projects">Проекты</router-link><br>
  </div>
  <router-view/>
</template>

<style>

</style>
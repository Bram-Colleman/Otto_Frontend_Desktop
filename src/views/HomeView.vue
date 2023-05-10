<script setup>
import Navigation from '../components/Navigation.vue';



let name = localStorage.getItem('name').split(" ")[0];
</script>

<template>
  <Navigation v-bind:active="'home'" style="z-index: 1000;"></Navigation>
</template>

<style scoped>

</style>

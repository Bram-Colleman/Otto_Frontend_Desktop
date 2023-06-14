<script setup>
import Navigation from "../components/Navigation.vue";

// let name = localStorage.getItem('name').split(" ")[0];
</script>

<template>
  <Navigation v-bind:active="'home'" style="z-index: 1000"></Navigation>
  <div class="page">
    <h1>Overzicht</h1>
    <div class="flex wrapper">
      <div class="card">
        <h1>Actieve ritten</h1>
        <div v-for="r in rides" class="container_items">
          <div class="container_elements">
            <div class="container_element_picture">
              <img src="../assets/icons/profile.svg" alt="people" />
            </div>
            <div class="container_element_content">
              <h3>{{ r.name }}</h3>
              <div class="flex flex_destination">
                <img src="../assets/icons/route.svg" alt="" />
                <span>In de Tuinwijk aan het rijden</span>
              </div>
            </div>
            <div class="icons">
              <img
                class="target"
                src="../assets/icons/target.svg"
                alt="target"
              />
              <img
                class="target"
                src="../assets/icons/chatblue.svg"
                alt="chat"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: left;
}

.page {
  height: 93vh;
  background-color: #fafafa;
}
</style>

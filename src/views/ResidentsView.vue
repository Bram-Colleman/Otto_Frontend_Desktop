<script setup>
import { onMounted, ref } from "vue";
import Navigation from "../components/Navigation.vue";
import ResidentTable from "../components/ResidentTable.vue";
import AddResident from "../components/AddResident.vue";

let name = localStorage.getItem("name");
let showAddResident = ref(false);


// function setActive(id) {
//   document.querySelector("#bewoners").classList.remove('active');
//   document.querySelector("#archief").classList.remove('active');
//   document.querySelector(id).classList.add('active');
// }

function toggleAddResident() {
  showAddResident.value = !showAddResident.value;
}

onMounted(() => {
  document.querySelector("#bewoners").classList.add('active');
});

</script>

<template>
  <div class="flex">
    <Navigation v-bind:active="'residents'" style="z-index: 1000" />
    <div class="page">
      <div class="head">
        <h1>{{ name }}</h1>
        <hr />
        <AddResident v-if="showAddResident" @close="toggleAddResident"/>
        <div class="flex">
          <div class="flex actionbuttons">
            <div class="action flex grow">
              <p class="center tab" id="bewoners" @click="setActive('#bewoners')">Bewoners</p>
              <!-- <p class="center tab" id="archief" @click="setActive('#archief')">Archief</p> -->
            </div>
            <div class="action right">
              <input type="text" name="" id="" placeholder="filter"/>
              <img src="../assets/search.svg" class="search">
            </div>
            <div class="action right">
              <button class="flex" @click="toggleAddResident"><img src="../assets/plus.svg" class="plus"><span>Nieuwe bewoner</span></button>
            </div>
          </div>
        </div>
      </div>
      <ResidentTable/>
    </div>
  </div>
</template>


<style scoped>
.tab {
  padding: 1rem;
  margin-bottom: 0;
  /* user-select: none; */
}
.tab:hover {
  cursor: pointer;
}
.center {
  text-align: center;
}
.active {
  font-weight: bold;
  color: #3289f3;
  border-bottom: #3289f3 3px solid;
}
.search {
  position: relative;
  top: 0.35rem;
  left: -2.5rem;
  filter: grayscale(1);
  opacity: 0.25;
}
.plus {
  filter: brightness(100);
  height: 100%;
  margin-right: 1rem;
}
.head {
  background-color: #fafafa;
  padding: 2rem;
  padding-bottom: 0;
  margin: -2rem;
  margin-bottom: 0;
}
.actionbuttons {
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.action {
  flex-grow: 1;
}
.grow {
  flex-grow: 9;
}
.right {
  text-align: right;
}
button {
  cursor: pointer;
  margin: 0;
  height: 3rem;
  padding: 1rem;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
}
input {
  padding: calc(1rem - 3px);
  box-sizing: border-box;
  width: 90%;
}
h1 {
  color: #00131d;
  text-align: left;
  font-size: 1.5rem;
}
hr {
  width: calc(100% + 4rem);
  margin-left: -2rem;
  border: none;
  height: 1px;
  background-color: #e4e4e4;
}
</style>

<script setup>
import { ref } from "vue";
import Navigation from "../components/Navigation.vue";
import AddRide from "../components/AddRide.vue";

let showAddRide = ref(false);

function toggleAddRide() {
  showAddRide.value = !showAddRide.value;
}
</script>

<template>
  <div class="flex">
    <Navigation v-bind:active="'routes'" style="z-index: 1000" />
    <div class="page">
      <div class="flex">
        <h1>Routes</h1>
        <div class="action right">
          <button class="flex" @click="toggleAddRide">
            <img src="../assets/plus.svg" class="plus" /><span
              >Nieuwe route</span
            >
          </button>
          <AddRide v-if="showAddRide" @close="toggleAddRide" />
        </div>
      </div>
      <div class="flex wrapper">
        <div class="card">
          <h1>Actieve ritten</h1>
          <div class="container_items">
            <div class="container_elements">
              <div class="container_element_picture">
                <img src="../assets/icons/profile.svg" alt="people" />
              </div>
              <div class="container_element_content">
                <h3>Bram Colleman</h3>
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

          <div class="container_items">
            <div class="container_elements">
              <div class="container_element_picture">
                <img src="../assets/icons/profile.svg" alt="people" />
              </div>
              <div class="container_element_content">
                <h3>Bram Colleman</h3>
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

          <div class="container_items">
            <div class="container_elements">
              <div class="container_element_picture">
                <img src="../assets/icons/profile.svg" alt="people" />
              </div>
              <div class="container_element_content">
                <h3>Bram Colleman</h3>
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
        <div class="card">
          <h1>Aankomende ritten</h1>
          <div class="container_items">
            <div class="container_elements">
              <div class="container_element_picture">
                <img src="../assets/icons/profile.svg" alt="people" />
              </div>
              <div class="container_element_content">
                <h3>Bram Colleman</h3>
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
      <div class="card">
        <h1>Oude ritten</h1>
        <div class="container_items">
          <div class="container_elements">
            <div class="container_element_picture">
              <img src="../assets/icons/profile.svg" alt="people" />
            </div>
            <div class="container_element_content">
              <h3>Bram Colleman</h3>
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
        <div class="container_items">
          <div class="container_elements">
            <div class="container_element_picture">
              <img src="../assets/icons/profile.svg" alt="people" />
            </div>
            <div class="container_element_content">
              <h3>Bram Colleman</h3>
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
.plus {
  filter: brightness(100);
  height: 100%;
  margin-right: 1rem;
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
.action {
  flex-grow: 1;
}
.wrapper {
  flex-grow: 0;
}
h3 {
  margin: 0;
}
.card h1 {
  font-size: 1.5rem;
}
.icons {
  padding-left: 1rem;
  padding-right: 0.3rem;
}
.target {
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.75rem;
  cursor: pointer;
}
h1 {
  text-align: left;
}
.flex_destination {
  align-items: center;
}

.flex_destination img {
  padding-right: 0.5rem;
}
.container_element_picture img {
  padding-right: 1rem;
  width: 4rem;
  border-radius: 50%;
}
.page {
  background-color: #fafafa;
}

.container_elements {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
  padding: 1rem;
}
.container {
  display: inline-block;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 15px;
  margin-top: 2rem;
}

.container h1 {
  padding-left: 1rem;
  text-align: left;
  margin-top: 1rem;
}

.container_items {
  box-shadow: 0px 3px 10px 4px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
}
</style>

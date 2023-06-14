<script setup>
import { ref, onMounted } from "vue";
import Navigation from "../components/Navigation.vue";
import AddRide from "../components/AddRide.vue";
import moment from "moment";


let rides = ref([]);

function getRides() {
  const apiUrl = "https://otto-backend.onrender.com/api/ride/getbyeldercare";
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      rides.value = data.rides;
      console.log(data);
    });
}

onMounted(() => {
  getRides();
});

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
        </div>
        <AddRide v-if="showAddRide" @close="toggleAddRide" />
      </div>
      <div class="flex wrapper">
        <div class="card">
          <h1>Ritten met chauffeur</h1>
          <div v-for="r in rides.slice().reverse()" class="container_items">
            <div class="container_elements" v-if="r.driver && (Date.parse(r.timeStamp)-7200000 > Date.now())">
              <div class="container_element_picture">
                <img :src="r.driver.profilePicture" alt="people"/>
              </div>
              <div class="container_element_content">
                <h3>{{ r.name }}</h3>
                <div class="flex flex_destination">
                  <div class="flex col">
                    <div class="flex info">
                      <img src="../assets/icons/route.svg" alt="" />
                      <span>{{r.destinationAddress}}</span>
                    </div>
                    <div class="flex info">
                      <img src="../assets/icons/people.svg" alt="" />
                      <span>{{ r.residents[0].name }}</span>
                    </div>
                    <div class="flex info">
                      <img src="../assets/icons/clock.svg" alt="" />
                      <span>{{ moment(Date.parse(r.timeStamp) -7200000).format("DD MMM YYYY - HH:mm")}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="icons flex">
                <img
                  class="target"
                  src="../assets/icons/target.svg"
                  alt="target"
                />
                <RouterLink class="target" to="/chat" id="chat"><img src="../assets/icons/chat.svg"/></RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h1>Ritten zonder chauffeur</h1>
          <div v-for="r in rides" class="container_items">
            <div class="container_elements" v-if="r.driver == null">
              <div class="container_element_picture">
                <img src="../assets/icons/profile.svg" alt="people" />
              </div>
              <div class="container_element_content">
                <h3>{{ r.name }}</h3>
                <div class="flex flex_destination">
                  <div class="flex col">
                    <div class="flex info">
                      <img src="../assets/icons/route.svg" alt="" />
                      <span>{{r.destinationAddress}}</span>
                    </div>
                    <div class="flex info">
                      <img src="../assets/icons/people.svg" alt="" />
                      <span>{{ r.residents[0].name }}</span>
                    </div>
                    <div class="flex info">
                      <img src="../assets/icons/clock.svg" alt="" />
                      <span>{{ moment(Date.parse(r.timeStamp) -7200000).format("DD MMM YYYY - HH:mm")}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="icons flex">
                <img
                  class="target"
                  src="../assets/icons/target.svg"
                  alt="target"
                />
                <RouterLink class="target" to="/chat" id="chat"><img src="../assets/icons/chat.svg"/></RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h1>Oude ritten</h1>
          <div v-for="r in rides" class="container_items">
            <div class="container_elements" v-if="(Date.parse(r.timeStamp)-7200000 < Date.now()) && (Date.parse(r.timeStamp)-7200000 + (1000*60*30) < Date.now())">
              <div class="container_element_picture">
                <img :src="r.driver.profilePicture" alt="people" v-if="r.driver"/>
                <img src="../assets/icons/profile.svg" alt="people" v-else/>
              </div>
              <div class="container_element_content">
                <h3>{{ r.name }}</h3>
                <div class="flex flex_destination">
                  <div class="flex col">
                    <div class="flex info">
                      <img src="../assets/icons/route.svg" alt="" />
                      <span>{{r.destinationAddress}}</span>
                    </div>
                    <div class="flex info">
                      <img src="../assets/icons/people.svg" alt="" />
                      <span>{{ r.residents[0].name }}</span>
                    </div>
                    <div class="flex info">
                      <img src="../assets/icons/clock.svg" alt="" />
                      <span>{{ moment(Date.parse(r.timeStamp) -7200000).format("DD MMM YYYY - HH:mm")}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="icons flex">
                <img
                  class="target"
                  src="../assets/icons/target.svg"
                  alt="target"
                />
                <RouterLink class="target" to="/chat" id="chat"><img src="../assets/icons/chat.svg"/></RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info {
  margin: .5rem 0;
}
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
  margin-right: 1rem;
  width: 4rem;
  border-radius: 50%;
}
.page {
  height: 93vh;
  background-color: #fafafa;
}

.container_elements {
  box-shadow: 0px 3px 10px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  border-radius: 5px;
}
</style>

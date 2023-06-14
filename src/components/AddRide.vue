<script setup>
import { onMounted, ref, watch } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import Map from "./Map.vue";

const GOOGLE_MAPS_API_KEY = "AIzaSyBKhixrksRyCcnWxY2koJMH2GfDx6ywZgA";
const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });

let origin = ref("");
let destination = ref("");
let destinationaddress = ref("");
let originaddress = ref("");
let destinationcoords = ref("");
let origincoords = ref("");

let residents = ref([""]);
let resident = ref("");
let timestamp = ref("");

const emits = defineEmits(["close"]);

onMounted(() => {
  loader.load();
  getResidents();

});

const multiSelectWithoutCtrl = ( elemSelector ) => {
  let options = [].slice.call(document.querySelectorAll(`${elemSelector} option`));
  options.forEach(function (element) {
      element.addEventListener("mousedown", 
          function (e) {
              e.preventDefault();
              element.parentElement.focus();
              this.selected = !this.selected;
              return false;
          }, false );
  });
}


function getResidents() {
  fetch("https://otto-backend.onrender.com/api/eldercare/getresidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      residents.value = data.residents;
      multiSelectWithoutCtrl('#resident');
    });
}

function addRide() {
  fetch("https://otto-backend.onrender.com/api/ride/create", {
    // fetch("http://localhost:3000/api/ride/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      origin: origincoords.value,
      originaddress: originaddress.value,
      destination: destinationcoords.value,
      destinationaddress: destinationaddress.value,
      residents: [resident.value],
      timeStamp: timestamp.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        window.location.href = "/routes";
      } else {
        console.error("Something went wrong!");
      }
    });
}
const geocode = (adres, type) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode(
    {
      address: adres,
    },
    (results, status) => {
      if (status === "OK") {
        if (type === "origin") {
          originaddress.value = results[0].formatted_address;
          origincoords.value = [
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng(),
          ];
        } else if (type === "destination") {
          destinationaddress.value = results[0].formatted_address;
          destinationcoords.value = [
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng(),
          ];
        }
      }
    }
  );
};

let typingTimer;
watch(origin, (o) => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(geocode(o, "origin"), 1500);
});
watch(destination, (d) => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(geocode(d, "destination"), 1500);
});
</script>

<template>
  <div class="overlay"></div>
  <div class="container">
    <div class="form-container">
      <div class="close" @click="$emit('close')">
        <img src="../assets/plus.svg" class="plus" />
      </div>
      <h1>Rit plannen</h1>
      <form @submit.prevent="addRide">
        <label for="origin">Vertrekpunt:</label>
        <input type="text" id="origin" v-model="origin" required />

        <label for="destination">Bestemming:</label>
        <input type="text" id="destination" v-model="destination" required />

        <label for="residents">Bewoners:</label>
        <select name="residents" id="residents" v-model="resident" required>
          <option :value="r._id" v-for="r in residents">{{ r.name }}</option>
        </select>

        <label for="timestamp">Datum & Tijd:</label>
        <input
          type="datetime-local"
          id="timestamp"
          v-model="timestamp"
          required
        />

        <button type="submit">Rit aanmaken</button>
      </form>
    </div>
    <div class="map">
      <Map :origin="origin" :destination="destination"></Map>
    </div>
  </div>
</template>

<style scoped>
select {
  border-radius: 10px;
  border: rgba(223,223,223,1) solid;
  padding: 18px 19px 15px 19px;
  margin: 6px 0;
}
select:focus, input:focus {
  outline: none;
}

button {
  width: 100% !important;
}
.container {
  position: fixed;
  z-index: 1002;
  display: flex;
  align-items: stretch;
  margin-left: -19rem;
  justify-content: center;
  width: 100vw;
}
.map {
  max-width: 50vw;
  flex-grow: 1;
  border-radius: 0 1rem 1rem 0;
  overflow: hidden;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.form-container {
  position: relative;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem 0 0 1rem;
  width: 25%;
}

form {
  display: flex;
  flex-direction: column;
}

button {
  margin-left: auto;
  width: 15rem;
  cursor: pointer;
}

button:hover {
  background-color: #1e88e5;
}
.close {
  position: absolute;
  top: -1rem;
  left: calc(100% - 1rem + 50vw);
  width: 2rem;
  height: 2rem;
  background-color: #1e88e5;
  border-radius: 50%;
  padding: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1003;
}

.close img {
  filter: brightness(10);
  transform: rotate(45deg);
  width: 1.5rem;
}
</style>

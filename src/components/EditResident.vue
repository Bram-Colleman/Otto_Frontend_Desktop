<script setup>
import { ref, onMounted } from "vue";

let name = ref("");
let dateOfBirth = ref("");
let roomNumber = ref("");
let emergencyContact = ref("");
let needs = ref("");
const emits = defineEmits(["close"]);
const props = defineProps(["residentid"]);

let id = window.location.pathname.split("/")[2];

//function to get residents by id
function GetById(id) {
  fetch(`https://otto-backend.onrender.com/api/resident/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const r = data.resident[0];
      name.value = r.name;
      dateOfBirth.value = r.dateOfBirth;
      roomNumber.value = r.roomNumber;
      emergencyContact.value = r.emergencyContact;
      needs.value = r.needs;
    });

}


//function to edit resident by id
function editResident(id) {
  fetch(`https://otto-backend.onrender.com/api/resident/edit/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      name: name.value,
      dateOfBirth: dateOfBirth.value,
      roomNumber: roomNumber.value,
      emergencyContact: emergencyContact.value,
      needs: needs.value,
      eldercare: localStorage.getItem("id"),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        window.location.href = "/residents";
      } else {
        console.error("Something went wrong!");
      }
    });
}

onMounted(() => {
  GetById(props.residentid);
  console.log(props.residentid);
});
</script>

<template>
  <div class="overlay">
    <div class="close" @click="$emit('close')">
      <img src="../assets/plus.svg" class="plus">
    </div>
    <div class="form-container">
      <h1>Bewoner wijzigen</h1>
      <form @submit.prevent="editResident">
        <label for="name">Naam:</label>
        <input  id="name" v-model="name" required />

        <label for="dob">Geboortedatum:</label>
        <input type="date" id="dob" v-model="dateOfBirth" required />

        <label for="room">Kamernummer:</label>
        <input type="text" id="room" v-model="roomNumber"  required />

        <label for="emergency">Noodcontact:</label>
        <input type="tel" id="emergency" v-model="emergencyContact"  required />

        <label for="needs">Speciale noden:</label>
        <input id="needs" v-model="needs" />

        <button type="submit">Bewoner Wijzigen</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
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
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 50%;
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
  width: 2rem;
  height: 2rem;
  background-color: #1e88e5;
  border-radius: 50%;
  padding: .25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -39%;
  right: -54.25%;
  cursor: pointer;

}

.close img {
  filter: brightness(10);
  transform: rotate(45deg);
  width: 1.5rem;

}
</style>

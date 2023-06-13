<script setup>
import { onMounted, ref } from "vue";
import EditResident from "./EditResident.vue";

let residents = ref();
let residentid = ref();
let showEdit = ref(false);

const props = defineProps(["search"]);

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
    });
}

function calculateAge(dateOfBirth) {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  // Check if the birthday hasn't occurred yet this year
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age--; // Subtract 1 from age if the birthday hasn't passed yet
  }
  return age;
}

onMounted(() => {
  getResidents();
});

function toggleEdit(id) {
  if(id) {
    residentid.value = id;
  }
  showEdit.value = !showEdit.value;
}

function filter(text) {
  if(props.search == ""){
    return true;
  } else {
    return text.toLowerCase().includes(props.search.toLowerCase());
  }
}
</script>

<template>
  <div>
    <EditResident v-if="showEdit" :residentid="residentid" @close="toggleEdit" />
    <table>
      <thead>
        <tr>
          <th>Naam</th>
          <th>Leeftijd</th>
          <th>Kamernummer</th>
          <th>Noodcontact</th>
          <th>Speciale noden</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in residents">
            <td v-if="filter(r.name)">{{ r.name }}</td>
            <td v-if="filter(r.name)">{{ calculateAge(r.dateOfBirth) }}</td>
            <td v-if="filter(r.name)">{{ r.roomNumber }}</td>
            <td v-if="filter(r.name)">{{ r.emergencyContact }}</td>
            <td v-if="filter(r.name)">
              <ul>
                <li v-for="need in r.needs">{{ need }}</li>
                <li v-if="r.needs[0] == ''"> - </li>
              </ul>
            </td>
            <td @click="toggleEdit(r._id)" class="options" v-if="filter(r.name)">•••</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
ul {
  padding: 0;
}

li {
  list-style: none;
}
table {
  width: 100%;
}
tbody {
  text-align: center;
}

tbody td {
  padding: 0;
  line-height: 1rem;
}
th {
  padding: 0.75rem 0;
}
td {
  padding: 0.5rem 0;
}
.options {
  cursor: pointer;
  opacity: 0.25;
}
</style>

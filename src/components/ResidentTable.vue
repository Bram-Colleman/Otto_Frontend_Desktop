<script setup>
import { onMounted, ref } from "vue";

let residents = ref();

function login() {
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
      console.log(residents);
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
  login();
});
</script>

<template>
  <div>
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
          <td>{{ r.name }}</td>
          <td>{{ calculateAge(r.dateOfBirth) }}</td>
          <td>{{ r.roomNumber }}</td>
          <td>{{ r.emergencyContact }}</td>
          <td>
            <ul>
              <li v-for="need in r.needs">{{ need }}</li>
            </ul>
          </td>
          <td class="options">•••</td>
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
th {
  padding: 0.75rem 0;
}
td {
  padding: 0.5rem 0;
}
.options {
  opacity: 0.25;
}
</style>

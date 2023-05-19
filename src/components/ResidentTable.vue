<script setup>
import { onMounted, ref } from "vue";

let residents = ref();

function login() {
  fetch("https://otto-backend.onrender.com/api/eldercare/getresidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: 'bearer '+ localStorage.getItem("token"),
    }
  })
    .then((response) => response.json())
    .then((data) => {
      residents.value = data.residents;
      console.log(residents);
    });
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
          <td>Bram Colleman</td>
          <td>75</td>
          <td>183</td>
          <td>0487305561</td>
          <td>Rolstoel</td>
          <td class="options">•••</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
table {
    width: 100%;
}
tbody {
    text-align: center;
}
th {
 padding: .75rem 0;   
}
td {
    padding: .5rem 0;
}
.options {
    opacity: .25;
}
</style>

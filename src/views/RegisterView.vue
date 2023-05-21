<script setup>
import { ref } from "vue";

let name = ref("");
let email = ref("");
let password = ref("");
let adress = ref("");
let phone = ref("");
let riziv = ref("");
let error = ref(false);

function create() {
  fetch("https://otto-backend.onrender.com/api/eldercare/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
      adress: adress.value,
      phone: phone.value,
      riziv: riziv.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("id", data.id);
        window.location.href = "/login";
      } else {
        console.error("Something went wrong!");
        error.value = !error.value;
      }
    });
}
</script>

<template>
  <div class="container">
    <div class="loginform">
      <h1>Registreren</h1>
      <form @submit.prevent="create">
        <span v-if="error" class="error center"
          >E-mail of wachtwoord is incorrect!</span>

        <label for="name">Naam</label>
        <input type="text" name="name" v-model="name" placeholder="Naam rusthuis" required />

        <label for="adress">Adres</label>
        <input type="text" name="adress" v-model="adress" placeholder="Adres" required />

        <label for="phone">Telefoonnummer</label>
        <input type="tel" name="phone" v-model="phone" placeholder="Telefoonnummer" required />

        <label for="riziv">RIZIV-nummer</label>
        <input type="text" name="riziv" v-model="riziv" placeholder="RIZIV-nummer" required />

        <label for="email">E-mail</label>
        <input type="email" name="email" v-model="email" placeholder="voorbeeld@otto.be" required/>

        <label for="password">Wachtwoord</label>
        <input type="password" name="password" v-model="password" placeholder="Wachtwoord" required />

        <button type="submit">Registreren</button>

        <span class="center"
          >Reeds een account?
          <RouterLink to="/login">Inloggen</RouterLink></span
        >
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.loginform {
  width: 30rem;
  margin: auto;
  box-shadow: 0px 0px 20px rgba(62, 62, 62, 0.23);
  border-radius: 43px;
  padding: 3rem;
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: rgba(223, 223, 223, 1);
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid rgba(223, 223, 223, 1);
}

.separator:not(:empty)::before {
  margin-right: 16px;
}

.separator:not(:empty)::after {
  margin-left: 16px;
}

.itsme {
  background-color: white;
  border: #e4e8e1 solid 1px;
  color: #2d3131;
  font-family: "Roboto Slab", serif;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  width: 100%;
  padding: 0.5rem 0;
}
.itsme img {
  width: 40px;
  margin-right: 16px;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}

.center {
  text-align: center;
  width: 100%;
}
</style>

<script setup></script>

<template>
  <div class="container">
    <h1>Welkom</h1>
    <RouterLink to="/login"><button>Log in</button></RouterLink>
    <RouterLink to="/register"><button>Registreer</button></RouterLink>
  </div>
</template>

<style scoped>
.container {
  padding: 5rem;
  margin: 10% 40rem 10% 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fdfefd;
  box-shadow: 0px 0px 20px rgba(62, 62, 62, 0.23);
  border-radius: 43px;
}
</style>

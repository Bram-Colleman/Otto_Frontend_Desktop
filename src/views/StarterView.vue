<script setup></script>

<template>
  <div class="container">
    <div class="starter">
      <h1>Welkom</h1>
      <div class="flex col links">
        <RouterLink to="/login"><button>Log in</button></RouterLink>
        <RouterLink to="/register"><button>Registreer</button></RouterLink>
      </div>
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
.starter {
  width: 30rem;
  margin: auto;
  box-shadow: 0px 0px 20px rgba(62, 62, 62, 0.23);
  border-radius: 43px;
  padding: 3rem;
}
.links {
  width: 100%;
  justify-content: center;
}
.links a {
  text-align: center;
}
.links a button {
  width: 25rem
}
</style>

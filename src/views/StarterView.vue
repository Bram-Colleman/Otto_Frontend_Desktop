<script setup>

</script>

<template>
    <div class="logo">
    </div>
    <div class="card">
        <h1>Welkom bij Otto</h1>
        <div class="flex col">
            <RouterLink to="/register"><button>Registreer</button></RouterLink>
            <div class="separator">of</div>
            <RouterLink to="/login"><button>Log in</button></RouterLink>
        </div>
    </div>
</template>

<style scoped>
 h1 {
    margin: 10rem 0 5rem 0;
 }


 .separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: rgba(223, 223, 223, 1);
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid rgba(223, 223, 223, 1);
}

.separator:not(:empty)::before {
  margin-right: 16px;
}

.separator:not(:empty)::after {
  margin-left: 16px;
}

.card {
    z-index: 2;
}
.logo {
    display: flex;
    justify-content: center;
}
</style>

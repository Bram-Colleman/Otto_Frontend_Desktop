<script setup>
import { onMounted } from 'vue';

const props = defineProps(['active']);

function clearstorage() {
  localStorage.clear();
}

onMounted(() => {
    switch (props.active) {
    case "home": { document.querySelector("#home").classList.add("active"); break;} 
    case "residents": {document.querySelector("#residents").classList.add("active"); break;} 
    case "routes": {document.querySelector("#routes").classList.add("active"); break;} 
    case "chat": {document.querySelector("#chat").classList.add("active"); break;} 
    case "settings": {document.querySelector("#settings").classList.add("active"); break;} 
    case "logout": {document.querySelector("#logout").classList.add("active"); break;} 
    }
});


</script>

<template>
    <div class="nav">
        <RouterLink to="/"><img src="../assets/icons/home.svg" id="home"/>Start</RouterLink>
        <RouterLink to="/residents"><img src="../assets/icons/people.svg" id="residents">Bewoners</RouterLink>
        <RouterLink to="/routes"><img src="../assets/icons/route.svg" id="routes">Routes</RouterLink>
        <RouterLink to="/chat"><img src="../assets/icons/chat.svg" id="chat"> Chat</RouterLink>
        <RouterLink to="/settings"><img src="../assets/icons/settings.svg" id="settings">Instellingen</RouterLink>
        <hr>
        <RouterLink to="/login" @click="clearstorage"><img src="../assets/icons/logout.svg" id="logout">Uitloggen</RouterLink>
    </div>
    
</template>

<style scoped>
.nav {
    height: 100vh;
    width: 15rem;
    background-color: #ffffff;
    box-shadow: 0px 0px 3px rgba(149, 149, 149, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
}

hr {
    width: 75%;
    border: none;
    height: 0.8px;
    background-color: #e4e4e4;
}

.nav_item {
    margin: 1rem;
}

.nav a {
    font-size: 1.25rem;
    margin: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.nav img {
    margin-right: 1rem;
}


img {
    filter: saturate(.0) brightness(0.5);
}
.active {
    filter: none;
}

</style>
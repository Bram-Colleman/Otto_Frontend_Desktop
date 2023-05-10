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
        <RouterLink to="/" id="home"><img src="../assets/icons/home.svg"/>Start</RouterLink>
        <RouterLink to="/residents" id="residents"><img src="../assets/icons/people.svg">Bewoners</RouterLink>
        <RouterLink to="/routes" id="routes"><img src="../assets/icons/route.svg">Routes</RouterLink>
        <RouterLink to="/chat" id="chat"><img src="../assets/icons/chat.svg"> Chat</RouterLink>
        <RouterLink to="/settings" id="settings"><img src="../assets/icons/settings.svg">Instellingen</RouterLink>
        <hr>
        <RouterLink to="/login" @click="clearstorage"><img src="../assets/icons/logout.svg" id="logout">Uitloggen</RouterLink>
    </div>
    
</template>

<style scoped>
.active img {
    filter: none;
}
.active {
    font-weight: bold;
    color: #3289F3;
    border-right: #3289F3 3px solid;    
}
.nav {
    height: 100vh;
    width: 17rem;
    background-color: #ffffff;
    box-shadow: 0px 0px 3px rgba(149, 149, 149, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    position: fixed;
}

hr {
    width: 75%;
    border: none;
    height: 0.8px;
    background-color: #e4e4e4;
}


.nav a {
    font-size: 1.25rem;
    margin: 2rem 0 2rem 2rem;
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


</style>
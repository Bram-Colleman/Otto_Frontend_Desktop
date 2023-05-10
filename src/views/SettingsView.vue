<script setup>
import Navigation from "../components/Navigation.vue";
</script>

<template>
  <div class="flex">
    <Navigation v-bind:active="'settings'" style="z-index: 1000" />
    <div class="page">
        <h1>Instellingen</h1>
        <div class="card">
            <div class="flex group">
                <img src="../assets/icons/profile.svg" alt="">
                <div class="flex col setting">
                    <span>Mijn profiel</span>
                    <span class="subtitle">Pas mijn profiel aan</span>
                </div>
                <img src="../assets/icons/arrow.svg" alt="">
            </div>
            <div class="flex group">
                <img src="../assets/icons/profile.svg" alt="">
                <div class="flex col setting">
                    <span>Voorkeuren</span>
                    <span class="subtitle">Wijzig mijn voorkeuren</span>
                </div>
                <img src="../assets/icons/arrow.svg" alt="">
            </div>
            <div class="flex group">
                <img src="../assets/icons/privacy.svg" alt="">
                <div class="flex col setting">
                    <span>Privacy</span>
                </div>
                <img src="../assets/icons/arrow.svg" alt="">
            </div>
            <div class="flex group">
                <img src="../assets/icons/notification.svg" alt="">
                <div class="flex col setting">
                    <span>Meldingen</span>
                </div>
                <img src="../assets/icons/arrow.svg" alt="">
            </div>
        </div>
        <div class="card">
            <div class="flex group">
                <img src="../assets/icons/heart.svg" alt="">
                <div class="flex col setting">
                    <span>Mijn profiel</span>
                    <span class="subtitle">Pas mijn profiel aan</span>
                </div>
                <img src="../assets/icons/arrow.svg" alt="">
            </div>
            <div class="flex group">
                <img src="../assets/icons/heart.svg" alt="">
                <div class="flex col setting">
                    <span>Voorkeuren</span>
                    <span class="subtitle">Wijzig mijn voorkeuren</span>
                </div>
                <img src="../assets/icons/arrow.svg" alt="">
            </div>
            <div class="flex group">
                <img src="../assets/icons/heart.svg" alt="">
                <div class="flex col setting">
                    <span>Privacy</span>
                </div>
                <img src="../assets/icons/arrow.svg" alt="">
            </div>
            <div class="flex group">
                <img src="../assets/icons/heart.svg" alt="">
                <div class="flex col setting">
                    <span>Meldingen</span>
                </div>
                <img src="../assets/icons/arrow.svg" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
    text-align: left;
}
.setting {
    margin: 0 5rem 0 1rem;
    justify-content: center;
    flex-grow: 1;
}
.subtitle {
    opacity: .5;
    font-size: 0.9rem;
}
.group {
    margin: 1rem 0;
}
</style>

<script setup>
import Navigation from "../components/Navigation.vue";
</script>

<template>
  <Navigation v-bind:active="'chat'" style="z-index: 1000" />
  <div class="page">
    <div class="flex">
      <div>
        <div class="recentchats">
          <div class="recentchat">
            <div class="profilepic">
              <img class="profilepic" src="https://avatars.githubusercontent.com/u/72497203?v=4" alt="" />
            </div>
            <div>
              <h3 class="name">Bram Colleman</h3>
              <p class="message">Ik wil een penisvergroting &middot; 2m</p>
            </div>
          </div>
        </div>
      </div>
      <div class="chatbox">
        <div class="activechat">
          <img src="https://avatars.githubusercontent.com/u/72497203?v=4" alt="" />
          <h2>Bram Colleman</h2>
        </div>
        <input type="text" placeholder="begin met typen..." />
      </div>
    </div>
  </div>
</template>

<style scoped>

.profilepic {
  margin: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
}

img {
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
}

.activechat {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
}

.activechat img {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
}

input {
  position: absolute;
  bottom: 1.5rem;

  width: 63.5vw;
  padding: 1rem;
  font-size: 1rem;
  outline: none;
}

.chatbox {
  padding: 1rem;
  padding-top: 0;
  border-left: 1px solid #e0e0e0;
  margin-left: 1rem;
}
.message,
.name {
  margin: 0;
}
.recentchat div:last-child {
  margin-left: 1rem;
}
.recentchat {
  margin: 1rem;
  margin-top: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 100%;
}

h1 {
  text-align: left;
}
.page {
  height: 93vh;
  background-color: #fafafa;
}

.flex {
  height: 100%;
}
</style>

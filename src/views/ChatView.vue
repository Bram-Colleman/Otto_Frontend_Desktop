<script setup>
import Navigation from "../components/Navigation.vue";
import { ref, onMounted } from "vue";


const chats = ref([]);
const c = ref("");
const newMessage = ref("");

let primus = Primus.connect("https://otto-backend.onrender.com", {
  reconnect: {
    max: Infinity, // Number: The max delay before we try to reconnect.
    min: 500, // Number: The minimum delay before we try reconnect.
    retries: 10, // Number: How many times we should try to reconnect.
  },
});

primus.on("data", (data) => {
  if (data.action == "message") {
    getChats();
  }
});

onMounted(() => {
  getChats();
});


function getChats() {
  fetch(
    `https://otto-backend.onrender.com/api/chat/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        chats.value = data.chats;
        if (c.value == ""){
          c.value = chats.value[0];
          // c.value.messages = c.value.messages.reverse();
        } else {
          chats.value.forEach((chat) => {
            if (chat._id == c.value._id) {
              c.value = chat;
              // c.value.messages = c.value.messages.reverse();
            }
          });
        }
      } else {
        console.error("Something went wrong!");
      }
    });
}

function openChat(chat) {
  c.value = chat;
}

async function sendMessage(id) {
  if (newMessage.value != "") {

  let apiUrl = "https://otto-backend.onrender.com/api/message/create";
  await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      text: newMessage.value,
    }),
  })
    .then((response) => response.json())
    .then(async (data) => {
      await fetch(`https://otto-backend.onrender.com/api/chat/addmessage/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          message: data.data.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //TODO: Live update
          newMessage.value = "";

          delay(1000)
          .then(() => {
            primus.write({
            "action": "message",
            "data": c.value
          });
          })

          getChats();
        });
    });
  }
}
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
function atSent() {
  delay(1000)
  .then(() => {
    primus.write({
    "action": "message",
    "data": c.value
  });
  })

  getChats();
}
</script>

<template>
  <Navigation v-bind:active="'chat'" style="z-index: 1000" />
  <div class="page">
    <div class="flex">
      <div>
        <div class="recentchats">
          <div class="recentchat" v-for="c in chats" @click="openChat(c)" v-if="chats">
            <div class="profilepic">
              <img class="profilepic" src="https://avatars.githubusercontent.com/u/72497203?v=4" alt="" />
            </div>
            <div>
              <h3 class="name">{{c.driver.givenName}} {{ c.driver.familyName }}</h3>
              <div class="flex preview">
                <span class="message" v-if="c.messages[0]">{{c.messages[c.messages.length-1].text.substring(0,15)}}</span> 
                <span class="message" v-if="c.messages[0] && c.messages[c.messages.length-1].text.length > 15">... </span> 
                <span class="middot"> &middot; </span>
                <div v-if="c.messages[0]">
                  <span class="msg" v-if="Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000) < 60" >
                    {{ Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000) + 's' }}
                  </span>
                  <span class="msg" v-if="Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) <  3600 && Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) >=  60 ">
                    {{ Math.floor((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 /60) + 'm' }}
                  </span>
                  <span class="msg" v-if="Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) <  216000 && Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) >=  3600 ">
                    {{ Math.floor((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 /60 /60) + 'u' }}
                  </span>
                  <span class="msg" v-if="Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) <  5184000 && Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) >=  216000 ">
                    {{ Math.floor((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 /60 /60 /24) + 'd' }}
                  </span>
                  <span class="msg" v-if="Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) <  36288000 && Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) >=  5184000 ">
                    {{ Math.floor((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 /60 /60 /24) + 'w' }}
                  </span>
                  <span class="msg" v-if="Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) <  1886976000 && Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) >=  36288000 ">
                    {{ Math.floor((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 /60 /60 /24) + 'j' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chatbox" v-if="c" :key="c">
        <div class="activechat">
          <img src="https://avatars.githubusercontent.com/u/72497203?v=4" alt="" />
          <h2>{{c.driver.givenName}} {{ c.driver.familyName }}</h2>
        </div>
        <div class="messages">
          <div v-for="m in c.messages.slice().reverse()" class="cm">
            <span v-if="m.sender == c.driver._id" class="received">{{m.text}}</span>
            <span v-if="m.sender == c.eldercare._id" class="sent">{{m.text}}</span>
          </div>
        </div>
        <input type="text" placeholder="begin met typen..." v-model="newMessage" @keyup.enter="sendMessage(c._id)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.middot {
  margin: 0 0.25rem;
}
.preview {
  margin-left: 0!important;
}
.preview div {
  margin: 0 !important;
}
.cm {
  flex-direction: column;
  display: flex;
  flex-direction: column;
}
.sent {
  background: #3289f3;
  color: #ffffff;
  border-radius: 1.5rem;
  padding: 0.75rem 1rem;
  margin: .25rem;
  max-width: 50%;
  align-self: flex-end;
  justify-self: center;
}
.received {
  background: #f3f3f3;
  margin: .25rem;

  border-radius: 1.5rem;
  padding: 0.75rem 1rem;
  max-width: 55%;
  align-self: flex-start;
}
.messages {
  height: 100%;
  width: 100%;
  flex-grow: 1;
  padding: 1rem 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
}
.messages::-webkit-scrollbar {
  display: none;
}


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
  padding: 1rem;
  font-size: 1rem;
  outline: none;
}

.chatbox {
  padding: 1rem;
  padding-top: 0;
  border-left: 1px solid #e0e0e0;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  flex-grow: 1;
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
  width: unset;
}

.flex {
  height: 100%;
}
</style>

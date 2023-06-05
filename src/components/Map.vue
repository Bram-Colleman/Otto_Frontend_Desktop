<script setup>
/* eslint-disable no-undef */
import { computed, onMounted, ref } from "vue";
import { useGeolocation } from "../scripts/useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
const GOOGLE_MAPS_API_KEY = "AIzaSyBKhixrksRyCcnWxY2koJMH2GfDx6ywZgA";

const props = defineProps(["destination", "o"]);
const { coords } = useGeolocation();

const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
}));

const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
const mapDiv = ref(null);
let map;

onMounted(async () => {
  await loader.load();
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  if(!localStorage.getItem("pos") && currPos.value.lat != 0) {
    localStorage.setItem("pos", JSON.stringify(currPos.value));
  }

  map = new google.maps.Map(mapDiv.value, {
    center: JSON.parse(localStorage.getItem("pos")),
    zoom: 16,
    streetViewControl: false,
    zoomControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    region: JSON.parse(localStorage.getItem("pos"))
  });
  let marker = new google.maps.Marker({
    position: JSON.parse(localStorage.getItem("pos")),
    map: map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 7,
      fillOpacity: 1,
      strokeWeight: 2,
      fillColor: "#3289F3",
      strokeColor: "#ffffff",
    },
  });

  if(props.destination && props.o) {
    const destination = computed(() => ({
      lat: props.destination[0],
      lng: props.destination[1]
    }));
    const or = computed(() => ({
      lat: props.o[0],
      lng: props.o[1]
    }));
    console.log("dest", destination.value);
    console.log("orig", or.value);
     getDirections(map, directionsRenderer, directionsService, destination.value, or.value);
  }
});


const getDirections = (map, directionsRenderer, directionsService, dest, orig) => {
  directionsRenderer.setMap(map);
  let destlat = dest.lat;
  let destlng = dest.lng;
  
  const request = {
    origin: orig,
    destination: dest,
    optimizeWaypoints: true, //laat google snelste weg berekenen
    travelMode: "DRIVING",
  };

  directionsService.route(request, (result, status) => {
    if (status === "OK") {
      console.log(result);
      console.log(result.routes[0].legs[0].start_address);
      console.log(result.routes[0].legs[0].end_address);
      directionsRenderer.setDirections(result);
    }
  });
};
</script>

<template>
  <div ref="mapDiv" style="width: 100%; height: 100%;"></div>
</template>

<style scoped>
.gm-style-cc {
  display: none !important;
}

.gm-style a[href^="https://maps.google.com/maps"] {
  display: none !important;
}
</style>

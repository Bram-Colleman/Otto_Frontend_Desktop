<script setup>
/* eslint-disable no-undef */
import { computed, onMounted, ref, watch } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
const GOOGLE_MAPS_API_KEY = "AIzaSyBKhixrksRyCcnWxY2koJMH2GfDx6ywZgA";

const props = defineProps(["destination", "origin"]);
let markers = [];
const destcoords = ref([]);
const origincoords = ref([]);
let directionsService;
let directionsRenderer;

// const { coords } = useGeolocation();

let currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
}));

const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
const mapDiv = ref(null);
let map;

onMounted(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
            localStorage.setItem("pos", JSON.stringify(pos));
            currPos.value = pos;
        },
        () => {
          handleLocationError(true);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false);
    }
  await loader.load();
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  map = new google.maps.Map(mapDiv.value, {
    center: JSON.parse(localStorage.getItem("pos")) || currPos.value,
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



  if(props.destination && props.origin) {
    const destination = computed(() => ({
      lat: props.destination[0],
      lng: props.destination[1]
    }));
    const or = computed(() => ({
      lat: props.o[0],
      lng: props.o[1]
    }));
    //  getDirections(map, directionsRenderer, directionsService, destination.value, or.value);
  }
//   if(props.origin){
//       geocode(props.origin);
//   }

});


const getDirections = (map, directionsRenderer, directionsService, dest, orig) => {
  directionsRenderer.setMap(map);
  
  const request = {
    origin: orig,
    destination: dest,
    optimizeWaypoints: true, //laat google snelste weg berekenen
    travelMode: "DRIVING",
  };

  directionsService.route(request, (result, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(result);
    }
  });
};

const geocode = (adres, type) => {
    const geocoder = new google.maps.Geocoder();
    map.marker = null;
    geocoder.geocode(
        {
        address: adres,
        },
        (results, status) => {
            if (status === "OK") {
                map.setCenter(results[0].geometry.location);
                if(type === "origin") {
                    if(markers[0]) {
                        markers[0].setMap(null);
                    }
                    addMarker(results[0].geometry.location, 'A');
                } else if(type === "destination") {
                    if(markers[1]) {
                        markers[1].setMap(null);
                    }
                    addMarker(results[0].geometry.location, 'B');
                }
            }
        }
    );
};
function addMarker(position, label) {
  const marker = new google.maps.Marker({
    position,
    map,
    label: {text: label, color: "white"},
  });
  if(label === 'A') {
    markers[0] = marker ;
  } else if(label === 'B') {
    markers[1] = marker ;
  }
}

// timer for geocode
let typingTimer;
watch(() => props.origin, () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping(props.origin, "origin"), 1500);
    });
watch(() => props.destination, () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping(props.destination, "destination"), 1500);
    });



function doneTyping (adres, type) {

    geocode(adres, type);
    if(props.origin && props.destination) {

        directionsRenderer.set('directions', null);
        getDirections(map, directionsRenderer, directionsService, props.destination, props.origin);
        markers.forEach((marker) => {
            marker.setMap(null);
        });
    }
    // let instance = getCurrentInstance();
}

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

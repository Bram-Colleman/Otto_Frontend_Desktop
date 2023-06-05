import { onUnmounted, onMounted, ref } from 'vue'

export function useGeolocation() {
    const coords = ref({ latitude: 0, longitude: 0 });
    const isSupported = 'navigator' in window && 'geolocation' in navigator;

    let watcher = null;
    onMounted(() => {
        watcher = navigator.geolocation.getCurrentPosition(position => (
            coords.value = position.coords
            ), function(error) {
                console.log("Error retrieving geolocation: " + error.message);
            });
        console.log("coords: ", coords.value);
    })
    onUnmounted(() => {
        if (watcher) {
            navigator.geolocation.clearWatch(watcher);
        }
    })

    return {coords}
}
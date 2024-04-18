<template>
  <fieldset class="grid">
    <input v-model="zipCode" placeholder="Enter Zip Code" />
    <input type="submit" @click="fetchLocations" value="Search" />
  </fieldset>
  <select v-if="locationOptions.length > 0" v-model="selectedLocation" :aria-busy="loading">
    <option v-for="location in locationOptions" :key="location.id" :value="location">
      {{ location.name }}
    </option>
  </select>
</template>

<script setup>
import { ref, watch } from 'vue'
import _client from '@/api/client'
import { useCfaLocation } from '@/stores/cfaLocation'

const zipCode = ref('')
const locationOptions = ref([])
const selectedLocation = ref({})
const locationStore = useCfaLocation()
const loading = ref(false)

const fetchLocations = async () => {
  loading.value = true
  try {
    locationOptions.value = (await _client.getLocations(zipCode.value)).data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

watch(selectedLocation, () => {
  locationStore.setLocation(selectedLocation.value.storeNumber)
})
</script>

<template>
  <h2 v-if="errorMessage">{{ errorMessage }}</h2>
  <table
    v-if="locationStore.selectedStoreNumber && redeemableMenuItems.length > 0"
    class="striped"
    :aria-busy="loading"
  >
    <thead>
      <th style="cursor: pointer" @click="sort('name')">Item</th>
      <th style="cursor: pointer" @click="sort('price')">Price</th>
      <th style="cursor: pointer" @click="sort('points')" data-tooltip="Points may be out of date">
        Points
      </th>
      <th style="cursor: pointer" @click="sort('pointsPerDollar')">Points/$</th>
    </thead>
    <tbody>
      <tr v-for="item in redeemableMenuItems" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.points }}</td>
        <td>{{ (item.points / item.price).toFixed(2) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, watch } from 'vue'
import _client from '@/api/client'
import { useCfaLocation } from '@/stores/cfaLocation'

const redeemableMenuItems = ref([])
const loading = ref(false)
const locationStore = useCfaLocation()
const errorMessage = ref('')

watch(
  () => locationStore.selectedStoreNumber,
  async (newStoreNumber, oldStoreNumber) => {
    if (newStoreNumber !== oldStoreNumber && newStoreNumber !== '') {
      loading.value = true
      redeemableMenuItems.value = []
      try {
        const response = await _client.getRedeemableMenuItems(newStoreNumber)
        if (response.data) {
          errorMessage.value = ''
          redeemableMenuItems.value = response.data
          sort('pointsPerDollar')
        }
      } catch (error) {
        errorMessage.value = "This store's prices are protected"
      } finally {
        loading.value = false
      }
    }
  }
)

const sort = (column) => {
  redeemableMenuItems.value.sort((a, b) => {
    let aValue = column === 'pointsPerDollar' ? a.points / a.price : a[column]
    let bValue = column === 'pointsPerDollar' ? b.points / b.price : b[column]

    if (aValue < bValue) return -1
    if (aValue > bValue) return 1
    return 0
  })
}
</script>

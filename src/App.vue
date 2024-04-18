<script setup>
import TableComponent from './components/TableComponent.vue'
import LocationSelector from './components/LocationSelector.vue'
</script>

<template>
  <header>
    <h1>Chick-Fil-A Rewards Calculator</h1>
  </header>

  <main>
    <LocationSelector />
    <TableComponent />
  </main>
</template>

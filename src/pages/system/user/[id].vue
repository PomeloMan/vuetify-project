<template>
  <div>{{ id }}</div>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const id = (route.params as Record<string, string>).id
</script>

<route lang="yaml">
meta:
  layout: layout
  requireAuth: true
</route>

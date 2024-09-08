<template>
  <v-locale-provider :locale="locale">
    <v-theme-provider class="fill-height" with-background>
      <v-app>
        <router-view />
      </v-app>
    </v-theme-provider>
  </v-locale-provider>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { useAppStore } from '@/stores/app'

  const appStore = useAppStore()
  const { locale } = storeToRefs(appStore)
</script>

<template>
  <router-link to="/system/user">{{ t('system.user.profile') }}</router-link>
</template>

<script lang="ts" setup>
  import { useLocale } from 'vuetify'

  //
  const { t } = useLocale()
</script>

<route lang="yaml">
meta:
  layout: default
</route>

<template>
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-avatar class="me-4" color="grey-darken-1" size="40" />

      <v-menu v-for="menu in menus" :key="menu.id" open-on-hover transition="scale-transition">
        <template #activator="{ props }">
          <v-btn color="primary" v-bind="props"> {{ $t(menu.title) }} </v-btn>
        </template>
        <template v-if="menu.layout === 'default'">
          <v-card class="dropdown-menu" elevation="2">
            <v-list v-if="menu.children && menu.children.length > 0" density="compact" lines="two">
              <template v-for="submenu in menu.children" :key="submenu.id">
                <v-list-item
                  color="primary"
                  :value="submenu.id"
                  @click="submenu.href ? $router.push(submenu.href) : void 0"
                >
                  <template #prepend>
                    <v-avatar>
                      <v-icon :icon="submenu.icon" />
                    </v-avatar>
                  </template>
                  <v-list-item-title>{{ $t(submenu.title) }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ submenu.subtitle ? $t(submenu.subtitle) : submenu.subtitle }}
                  </v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </template>
      </v-menu>

      <v-spacer />

      <v-responsive max-width="160">
        <v-text-field
          density="compact"
          flat
          hide-details
          label="Search"
          rounded="lg"
          single-line
          variant="solo-filled"
        />
      </v-responsive>
    </v-container>
  </v-app-bar>

  <v-main>
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script lang="ts" setup>
  import { IMenu } from '@/apis/types'
  import menusMock from '@/apis/mock/menus'

  // const menus = ref<IMenu[]>()
  const menus: ComputedRef<IMenu[]> = computed(() => menusMock)

  onMounted(() => {
    console.log(menus)
  })
</script>

<style lang="scss" scoped>
  .dropdown-menu {
    min-width: 320px;
  }
</style>

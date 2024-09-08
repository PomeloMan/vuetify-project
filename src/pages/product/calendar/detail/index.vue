<template>
  <v-card prepend-icon="mdi-calendar-edit" :title="$t('product.calendar.title')">
    <v-card-text>
      <v-row dense>
        <v-col cols="12" md="4" sm="6">
          <v-text-field v-model="formData.title" label="First name*" required />
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field
            v-model="formData.title"
            hint="example of helper text only on focus"
            label="Middle name"
          />
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field
            hint="example of persistent helper text"
            label="Last name*"
            persistent-hint
            required
          />
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field label="Email*" required />
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field label="Password*" required type="password" />
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field label="Confirm Password*" required type="password" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required />
        </v-col>

        <v-col cols="12" sm="6">
          <v-autocomplete
            auto-select-first
            :items="[
              'Skiing',
              'Ice hockey',
              'Soccer',
              'Basketball',
              'Hockey',
              'Reading',
              'Writing',
              'Coding',
              'Basejump',
            ]"
            label="Interests"
            multiple
          />
        </v-col>
      </v-row>

      <small class="text-caption text-medium-emphasis">*indicates required field</small>
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-spacer />
      <v-btn text="Close" variant="plain" @click="cancel" />
      <v-btn color="primary" text="Save" variant="tonal" @click="save" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
  import { EventApi } from '@fullcalendar/core'

  const props = withDefaults(
    defineProps<{
      event: EventApi
    }>(),
    {
      event: () => ({}) as EventApi,
    }
  )

  console.log('props', props)
  const formData = reactive<EventApi>(props.event)

  const emits = defineEmits<{
    save: [event: EventApi]
    cancel: []
  }>()

  function save() {
    console.log(formData)
    emits('save', formData)
  }

  function cancel() {
    emits('cancel')
  }
</script>

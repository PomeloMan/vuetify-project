<template>
  <v-responsive :aspect-ratio="16 / 9" class="border pa-4">
    <FullCalendar ref="fullCalendarRef" :options="calendarOptions" />

    <v-dialog v-model="isDetailDialogVisible" width="auto">
      <CalendarDetail
        :event="currentEvent"
        @cancel="isDetailDialogVisible = false"
        @save="saveEvent"
      />
    </v-dialog>
  </v-responsive>
</template>

<script lang="ts" setup>
  import { useLocale } from 'vuetify'
  import { storeToRefs } from 'pinia'
  import { useAppStore } from '@/stores/app'
  import FullCalendar from '@fullcalendar/vue3'
  import multiMonthPlugin from '@fullcalendar/multimonth'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import listPlugin from '@fullcalendar/list'
  import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
  import {
    Calendar,
    CalendarOptions,
    DateSelectArg,
    EventApi,
    EventClickArg,
    EventInput,
    EventSourceFuncArg,
  } from '@fullcalendar/core'
  import { EventImpl } from '@fullcalendar/core/internal'
  import CalendarDetail from './detail/index.vue'
  import eventsMock from '@/apis/mock/product/calendar/events'

  const { t } = useLocale()
  const appStore = useAppStore()
  const { locale } = storeToRefs(appStore)

  const isDetailDialogVisible = ref<boolean>(false)
  const currentEvent = reactive<EventImpl>({} as EventImpl)

  const fullCalendarRef = ref<{
    getApi(): Calendar
    buildOptions(suppliedOptions: CalendarOptions | undefined): CalendarOptions
  }>()
  const events = ref<EventApi[]>([] as EventApi[])
  const calendarOptions = reactive<CalendarOptions>({
    plugins: [multiMonthPlugin, dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    /**
     * Toolbar
     */
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    buttonText: {
      today: computed(() => t('product.calendar.today')) as any,
      year: computed(() => t('product.calendar.year')) as any,
      month: computed(() => t('product.calendar.month')) as any,
      week: computed(() => t('product.calendar.week')) as any,
      day: computed(() => t('product.calendar.day')) as any,
      list: computed(() => t('product.calendar.agenda')) as any,
    },
    /**
     * Sizing
     */
    height: '100%',
    aspectRatio: 16 / 9,
    /**
     * Views
     */
    initialView: 'timeGridWeek',
    lazyFetching: true, // 只渲染当前视图下的数据，其他数据在切换视图时触发，默认true
    /**
     * Date & Time Display
     */
    weekends: true, // 是否显示周六、周日
    dayHeaders: true,
    slotDuration: '00:30:00', // 一格时间槽代表多长时间，默认00:30:00（30分钟）
    slotLabelInterval: '01:00:00', // 时间坐标轴显示时间间隔
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      omitZeroMinute: false,
      meridiem: false, // AM, PM
    },
    /**
     * Date Navigation
     */
    initialDate: new Date(),
    /**
     * Week Numbers
     */
    weekNumbers: true, // 是否显示周数，默认false
    /*
     * Date Clicking & Selecting
     */
    selectable: true, // 允许用户可以长按鼠标选择多个区域，默认false
    selectMirror: true, // 拖拽时是否保留原事件位置
    selectOverlap: true, // 是否被允许选择被事件占用的时间段，默认true
    selectConstraint: 'businessHours', // 可选择时间段限制
    // selectAllow: (span: DateSpanApi, movingEvent: EventImpl | null) => true,
    dateClick: (info: DateClickArg) => {
      console.log('Clicked on: ' + info.dateStr)
      console.log('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY)
      console.log('Current view: ' + info.view.type)
    },
    select: (selectInfo: DateSelectArg) => {
      isDetailDialogVisible.value = true
      Object.assign(currentEvent, selectInfo)
    },
    /**
     * Now Indicator
     */
    nowIndicator: true, // 周视图，日视图显示当前时间点（以红线标记），默认false
    /**
     * Business Hours
     */
    businessHours: [
      {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [1, 2, 3], // Monday, Tuesday, Wednesday
        startTime: '08:00', // a start time
        endTime: '18:00', // an end time
      },
      {
        daysOfWeek: [4, 5],
        startTime: '10:00',
        endTime: '16:00',
      },
    ],
    /**
     * Event Model
     */
    eventsSet: (data: EventApi[]) => {
      events.value = data
    },
    /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
    */
    /**
     * Event Sources
     */
    events: (
      arg: EventSourceFuncArg,
      successCallback: (eventInputs: EventInput[]) => void,
      failureCallback: (error: Error) => void
    ) => {
      successCallback(eventsMock)
    },
    /**
     * Event Display
     */
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      omitZeroMinute: false,
      meridiem: false,
    },
    displayEventTime: true,
    /**
     * Event Clicking & Hovering
     */
    eventClick: (arg: EventClickArg) => {
      if (confirm(`Are you sure you want to delete the event '${arg.event.title}'`)) {
        arg.event.remove()
      }
    },
    /**
     * Event Dragging & Resizing
     */
    editable: true, // 支持事件的拖动修改，默认false
    eventOverlap: true, // 拖拽时是否重叠
    eventConstraint: 'businessHours', // 限制拖拽拖放的位置
    // eventAllow: (span: DateSpanApi, movingEvent: EventImpl | null) => true,
    /**
     * Event Popover
     */
    dayMaxEventRows: true,
    dayMaxEvents: true,
    eventMaxStack: 3, // 视图显示最大重叠事件数量，超出的事件会以popup的方式显示
    dayPopoverFormat: { month: 'long', day: 'numeric', year: 'numeric' },
    /**
     * International
     */
    locale: locale as any,
    firstDay: 0, // 视图从每周几开始，默认0为周日
    timeZone: 'UTC+8',
    /**
     * TimeGrid View
     */
    allDaySlot: false, // 周视图，日视图显示"全天"信息，默认true
    slotEventOverlap: true, // 相同时间段的多个日程视觉上是否允许重叠，默认true
    /**
     * Month View
     */
    fixedWeekCount: true, // 月视图下，显示6周（不够的显示下个月的），默认true
  })

  function saveEvent(event: EventApi) {
    // const title = prompt('Please enter a new title for your event')
    isDetailDialogVisible.value = false

    const calendarApi = fullCalendarRef.value?.getApi()
    if (calendarApi) {
      calendarApi.unselect() // clear date selection
      calendarApi.addEvent(event as EventInput)
    }

    // if (title) {
    //   calendarApi.addEvent({
    //     id: String(new Date().getTime()),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   })
    // }
  }
</script>

<style lang="scss" scoped>
  :deep(.fc .fc-button .fc-icon) {
    &::before,
    &::after {
      vertical-align: unset;
    }
  }
</style>

<route lang="yaml">
meta:
  layout: container
</route>

import { IMenu } from '../types'

export default [
  {
    layout: 'default',
    id: String(Math.random()),
    title: 'product.title',
    children: [
      {
        id: String(Math.random()),
        title: 'product.calendar.title',
        subtitle: 'product.calendar.subtitle',
        icon: 'mdi-calendar',
        href: '/product/calendar',
      },
    ] as IMenu[],
  },
] as IMenu[]

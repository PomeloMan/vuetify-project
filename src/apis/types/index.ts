export interface IMenu {
  layout: 'default'
  id: string
  title: string
  subtitle?: string
  icon?: string
  href?: string
  children: IMenu[]
}

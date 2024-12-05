import {
  BookOpenIcon,
  Home,
  Check,
  CheckCircle2,
  User2,
  UsersIcon,
} from 'lucide-react'

export const SIDEBAR_ITEMS = {
  sidebarItems: [
    {
      name: 'Inicio',
      url: '/',
      icon: Home,
    },
    {
      name: 'Crear usuario',
      url: '/dashboard/create-user',
      icon: User2,
    },
    {
      name: 'Alumnos',
      url: '/dashboard/students',
      icon: UsersIcon,
    },
    {
      name: 'Talleres',
      url: '/dashboard/workshops',
      icon: BookOpenIcon,
    },
    {
      name: 'Lista inicial',
      url: '/dashboard/list-initial',
      icon: Check,
    },
    {
      name: 'Asistencias',
      url: '/dashboard/assistences',
      icon: CheckCircle2,
    },
  ],
}

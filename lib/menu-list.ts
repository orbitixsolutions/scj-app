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
      url: '/create-user',
      icon: User2,
    },
    {
      name: 'Alumnos',
      url: '/students',
      icon: UsersIcon,
    },
    {
      name: 'Talleres',
      url: '/workshops',
      icon: BookOpenIcon,
    },
    {
      name: 'Lista inicial',
      url: '/list-initial',
      icon: Check,
    },
    {
      name: 'Asistencias',
      url: '/assistences',
      icon: CheckCircle2,
    },
  ],
}

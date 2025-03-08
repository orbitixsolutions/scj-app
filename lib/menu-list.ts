import {
  BookOpenIcon,
  Home,
  Check,
  CheckCircle2,
  User2,
  UsersIcon,
  AlertCircle,
} from 'lucide-react'

export const SIDEBAR_DIRECTIVE_ITEMS = {
  sidebarItems: [
    {
      name: 'Inicio',
      url: '/dashboard',
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
      name: 'Asistencias',
      url: '/dashboard/assistences',
      icon: CheckCircle2,
    },
    {
      name: 'Lista inicial',
      url: '/dashboard/initial-list',
      icon: Check,
    },
    {
      name: 'Ausencias',
      url: '/dashboard/absents',
      icon: AlertCircle,
    },
  ],
}

export const SIDEBAR_ADMIN_ITEMS = {
  sidebarItems: [
    {
      name: 'Inicio',
      url: '/dashboard',
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
      name: 'Lista inicial',
      url: '/dashboard/initial-list',
      icon: Check,
    },
  ],
}

export const SIDEBAR_TEACHER_ITEMS = {
  sidebarItems: [
    {
      name: 'Inicio',
      url: '/dashboard',
      icon: Home,
    },
    {
      name: 'Alumnos',
      url: '/dashboard/students',
      icon: UsersIcon,
    },
    {
      name: 'Asistencias',
      url: '/dashboard/assistences',
      icon: CheckCircle2,
    },
  ],
}

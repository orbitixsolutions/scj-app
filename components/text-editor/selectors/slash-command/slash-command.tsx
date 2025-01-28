import { Heading1, Heading2, Heading3, ListOrdered, Text } from 'lucide-react'
import { createSuggestionItems } from 'novel/extensions'
import { Command, renderItems } from 'novel/extensions'

export const suggestionItems = createSuggestionItems([
  {
    title: 'Texto',
    description: 'Escribe texto.',
    searchTerms: ['p', 'parrafo'],
    icon: <Text size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode('paragraph', 'paragraph')
        .run()
    },
  },
  {
    title: 'Encabezado 1',
    description: 'Encabezamiento de sección grande.',
    searchTerms: ['titulo', 'grande', 'largo'],
    icon: <Heading1 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 1 })
        .run()
    },
  },
  {
    title: 'Encabezado 2',
    description: 'Encabezamiento de sección media.',
    searchTerms: ['subtitulo', 'mediano'],
    icon: <Heading2 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 2 })
        .run()
    },
  },
  {
    title: 'Encabezado 3',
    description: 'Pequeño encabezamiento de sección.',
    searchTerms: ['subtitulo', 'pequeño'],
    icon: <Heading3 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 3 })
        .run()
    },
  },
  {
    title: 'Lista ordenada',
    description: 'Crear una lista con numeración.',
    searchTerms: ['ordered'],
    icon: <ListOrdered size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    },
  },
])

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
})

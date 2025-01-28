/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from '@/components/ui/popover'
import { Check, ChevronDown } from 'lucide-react'
import { EditorBubbleItem, useEditor } from 'novel'
import { Button } from '@/components/ui/button'
import {
  BubbleColorMenuItem,
  ColorSelectorProps,
} from '@/components/text-editor/selectors/color-selector/color-selector.type'

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--novel-black)',
  },
  {
    name: 'Purpura',
    color: '#A48DFF',
  },
  {
    name: 'Rojo',
    color: '#FF6B6B',
  },
  {
    name: 'Dorado',
    color: '#FFAC4D',
  },
  {
    name: 'Azul',
    color: '#42A9FF',
  },
  {
    name: 'Verde',
    color: '#A3FF63',
  },
  {
    name: 'Verde claro',
    color: '#80FFD7',
  },
  {
    name: 'Azul claro',
    color: '#B7F5FF',
  },
  {
    name: 'Gris',
    color: '#A8A29E',
  },
]

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--novel-highlight-default)',
  },
  {
    name: 'Purpura',
    color: '#A48DFF70',
  },
  {
    name: 'Rojo',
    color: '#FF6B6B70',
  },
  {
    name: 'Dorado',
    color: '#FFAC4D70',
  },
  {
    name: 'Azul',
    color: '#42A9FF70',
  },
  {
    name: 'Verde',
    color: '#A3FF6370',
  },
  {
    name: 'Verde claro',
    color: '#80FFD770',
  },
  {
    name: 'Azul claro',
    color: '#B7F5FF70',
  },
  {
    name: 'Gris',
    color: '#A8A29E70',
  },
]

export const ColorSelector = ({ open, onOpenChange }: ColorSelectorProps) => {
  const { editor } = useEditor()

  if (!editor) return null
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive('textStyle', { color })
  )

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive('highlight', { color })
  )

  return (
    <Popover
      modal={true}
      open={open}
      onOpenChange={onOpenChange}
    >
      <PopoverTrigger asChild>
        <Button
          className='gap-2 rounded-none'
          variant='ghost'
        >
          <span
            className='rounded-sm px-1'
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            A
          </span>
          <ChevronDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className='my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl '
        align='start'
      >
        <div className='flex flex-col'>
          <div className='my-1 px-2 text-sm font-semibold text-muted-foreground'>
            Colores
          </div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <EditorBubbleItem
              key={index}
              onSelect={() => {
                editor.commands.unsetColor()
                name !== 'Default' &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || '')
                    .run()
              }}
              className='flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent'
            >
              <div className='flex items-center gap-2'>
                <div
                  className='rounded-sm border px-2 py-px font-medium'
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
            </EditorBubbleItem>
          ))}
        </div>
        <div>
          <div className='my-1 px-2 text-sm font-semibold text-muted-foreground'>
            Color de fondo
          </div>
          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <EditorBubbleItem
              key={index}
              onSelect={() => {
                editor.commands.unsetHighlight()
                name !== 'Default' && editor.commands.setHighlight({ color })
              }}
              className='flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent'
            >
              <div className='flex items-center gap-2'>
                <div
                  className='rounded-sm border px-2 py-px font-medium'
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('highlight', { color }) && (
                <Check className='h-4 w-4' />
              )}
            </EditorBubbleItem>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

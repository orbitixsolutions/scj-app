import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { EditorBubbleItem, useEditor } from 'novel'
import { Button } from '@/components/ui/button'
import { SelectorItem } from '@/components/text-editor/selectors/node-selector/node-selector'


export const TextButtons = () => {
  const { editor } = useEditor()

  if (!editor) return null

  const items: SelectorItem[] = [
    {
      name: 'bold',
      isActive: (editor) => editor?.isActive('bold') || false,
      command: (editor) => editor?.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: (editor) => editor?.isActive('italic') || false,
      command: (editor) => editor?.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'underline',
      isActive: (editor) => editor?.isActive('underline') || false,
      command: (editor) => editor?.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'strike',
      isActive: (editor) => editor?.isActive('strike') || false,
      command: (editor) => editor?.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
  ]
  return (
    <div className='flex'>
      {items.map((item, index) => (
        <EditorBubbleItem
          key={index}
          onSelect={(editor) => {
            item.command(editor)
          }}
        >
          <Button
            size='icon'
            className='rounded-none'
            variant='ghost'
            type='button'
          >
            <item.icon
              className={cn('h-4 w-4', {
                'text-blue-500': item.isActive(editor),
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  )
}

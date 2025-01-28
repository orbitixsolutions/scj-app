'use client'

import './text-editor.style.css'
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
} from 'novel'
import { useState } from 'react'
import { handleCommandNavigation } from 'novel/extensions'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TextEditorProps } from '@/components/text-editor/text-editor.type'
import { defaultExtensions } from '@/components/text-editor/extensions'
import { slashCommand } from '@/components/text-editor/selectors/slash-command'
import { suggestionItems } from '@/components/text-editor/selectors/slash-command/slash-command'
import { ColorSelector } from '@/components/text-editor/selectors/color-selector'
import { TextButtons } from '@/components/text-editor/selectors/text-buttons'
import { NodeSelector } from '@/components/text-editor/selectors/node-selector'

export function TextEditor(props: TextEditorProps) {
  const { initialValue, onChange, isLoading, disabled } = props

  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)

  const extensions = [...defaultExtensions, slashCommand]

  return (
    <Card
      className={cn(
        'p-4',
        isLoading && 'opacity-50 cursor-not-allowed',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <EditorRoot>
        <EditorContent
          immediatelyRender={true}
          extensions={extensions}
          {...(initialValue && {
            initialContent: initialValue,
          })}
          onUpdate={({ editor }) => {
            onChange(editor.getHTML())
          }}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            attributes: {
              class: `prose editor prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full min-h-[100px] leading-[2rem]`,
            },
          }}
        >
          <EditorCommand className='z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'>
            <EditorCommandEmpty className='px-2 text-muted-foreground'>
              No hay resultados
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command && item.command(val)}
                  className='flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent'
                  key={item.title}
                >
                  <div className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>
                    {item.icon}
                  </div>
                  <div>
                    <p className='font-medium'>{item.title}</p>
                    <p className='text-xs text-muted-foreground'>
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorBubble className='flex items-center w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl'>
            <ColorSelector
              open={openColor}
              onOpenChange={setOpenColor}
            />
            <Separator
              orientation='vertical'
              className='h-4'
            />
            <TextButtons />
            <Separator
              orientation='vertical'
              className='h-4'
            />
            <NodeSelector
              open={openNode}
              onOpenChange={setOpenNode}
            />
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </Card>
  )
}

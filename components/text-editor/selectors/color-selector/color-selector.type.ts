export interface BubbleColorMenuItem {
  name: string
  color: string
}

export interface ColorSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

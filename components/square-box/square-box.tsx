import { SquareBoxProps } from '@/components/square-box/square-box.type'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import React from 'react'

const squareBoxVariants = cva(
  'bg-accent rounded-lg p-0.5 relative overflow-hidden',
  {
    variants: {
      size: {
        default: 'size-20',
        sm: 'size-16',
        lg: 'size-24',
        xl: 'size-32',
        full: 'size-full',
      },
      defaultVariants: {
        size: 'default',
      },
    },
  }
)

export const SquareBox = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    SquareBoxProps &
    VariantProps<typeof squareBoxVariants>
>(({ className, size = 'default', ...props }, ref) => {
  return (  
    <div
      ref={ref}
      className={cn(squareBoxVariants({ size }), className)}
      {...props}
    />
  )
})

SquareBox.displayName = 'SquareBox'

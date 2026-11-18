import AnimatedContent from '@/components/AnimatedContent'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'start' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'start',
  className,
}: SectionHeadingProps) {
  return (
    <AnimatedContent
      distance={28}
      duration={0.7}
      ease="power2.out"
      blur={4}
      className={cn(align === 'center' && 'text-center', className)}
    >
      {eyebrow ? <div className="eyebrow mb-3">{eyebrow}</div> : null}
      <h2 className="display-title text-balance text-3xl md:text-4xl">{title}</h2>
      {description ? (
        <p className="muted mt-3 max-w-2xl text-base leading-8 md:text-lg">{description}</p>
      ) : null}
    </AnimatedContent>
  )
}

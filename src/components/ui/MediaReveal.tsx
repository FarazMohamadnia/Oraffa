import AnimatedContent from '@/components/AnimatedContent'
import GlareHover from '@/components/GlareHover'
import { cn } from '@/lib/utils'

interface MediaRevealProps {
  src: string
  alt: string
  caption?: string
  className?: string
  imgClassName?: string
  delay?: number
}

export function MediaReveal({
  src,
  alt,
  caption,
  className,
  imgClassName,
  delay = 0,
}: MediaRevealProps) {
  return (
    <AnimatedContent distance={28} duration={0.7} ease="power2.out" delay={delay} className={className}>
      <figure className="overflow-hidden rounded-[1.75rem]">
        <GlareHover
          width="100%"
          height="auto"
          background="transparent"
          borderRadius="1.75rem"
          glareColor="#ffffff"
          glareOpacity={0.35}
          className="w-full"
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={cn('block h-full w-full object-cover', imgClassName)}
          />
        </GlareHover>
        {caption ? (
          <figcaption className="mt-3 text-sm font-semibold text-ink-muted">{caption}</figcaption>
        ) : null}
      </figure>
    </AnimatedContent>
  )
}

import { Link } from 'react-router-dom'
import { ArrowUpLeft, Clock3 } from 'lucide-react'
import GlareHover from '@/components/GlareHover'
import { formatPrice, getDepartmentTitle } from '@/data/site'
import type { Course } from '@/data/types'
import { cn } from '@/lib/utils'

interface CourseCardProps {
  course: Course
  className?: string
}

export function CourseCard({ course, className }: CourseCardProps) {
  return (
    <GlareHover
      width="100%"
      height="auto"
      background="transparent"
      borderRadius="1.5rem"
      glareColor="#ffffff"
      glareOpacity={0.28}
      className={cn('h-full', className)}
    >
      <article className="surface-panel flex h-full flex-col overflow-hidden rounded-3xl p-5 transition duration-200 hover:-translate-y-1">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-teal-soft px-3 py-1 text-xs font-bold text-teal-deep">
            {getDepartmentTitle(course.department)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-muted">
            <Clock3 className="h-3.5 w-3.5" />
            {course.mode}
          </span>
        </div>

        <h3 className="text-xl font-extrabold leading-8 text-ink">{course.title}</h3>
        <p className="muted mt-3 flex-1 text-sm leading-7">{course.summary}</p>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-line/70 pt-4">
          <div>
            {course.free ? (
              <div className="text-lg font-extrabold text-teal-deep">رایگان</div>
            ) : (
              <>
                <div className="text-lg font-extrabold text-brand-deep">{formatPrice(course.price)}</div>
                {course.originalPrice ? (
                  <div className="text-xs text-ink-muted line-through">
                    {formatPrice(course.originalPrice)}
                  </div>
                ) : null}
              </>
            )}
            {course.comingSoon ? (
              <div className="mt-1 text-xs font-bold text-accent">به‌زودی</div>
            ) : null}
          </div>
          <Link
            to={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-2 text-sm font-bold text-white transition hover:bg-brand-deep"
          >
            جزئیات
            <ArrowUpLeft className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </GlareHover>
  )
}

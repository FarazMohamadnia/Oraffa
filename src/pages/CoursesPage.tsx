import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Iridescence from '@/components/Iridescence'
import { CourseCard } from '@/components/ui/CourseCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { courses, departments } from '@/data/site'
import type { DepartmentId } from '@/data/types'
import { cn } from '@/lib/utils'

export function CoursesPage() {
  const [params, setParams] = useSearchParams()
  const dept = params.get('dept') as DepartmentId | null

  const filtered = useMemo(() => {
    if (!dept) return courses
    return courses.filter((course) => course.department === dept)
  }, [dept])

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 opacity-40">
          <Iridescence color={[0.08, 0.4, 0.55]} speed={0.6} amplitude={0.08} className="h-full w-full" />
        </div>
        <div className="container-oraffa relative section-pad">
          <SectionHeading
            eyebrow="دوره‌های آموزشی"
            title="کاتالوگ کامل دوره‌های عرفا"
            description="دوره‌ها را بر اساس دپارتمان فیلتر کنید و مسیر مناسب خود را انتخاب نمایید."
          />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-oraffa">
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setParams({})}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-bold transition',
                !dept ? 'bg-brand text-white' : 'border border-line bg-white/80 text-ink-muted hover:text-ink',
              )}
            >
              همه دوره‌ها
            </button>
            {departments.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setParams({ dept: item.id })}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-bold transition',
                  dept === item.id
                    ? 'bg-brand text-white'
                    : 'border border-line bg-white/80 text-ink-muted hover:text-ink',
                )}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

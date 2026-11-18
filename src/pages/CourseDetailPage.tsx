import { Link, useParams } from 'react-router-dom'
import AnimatedContent from '@/components/AnimatedContent'
import Magnet from '@/components/Magnet'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { formatPrice, getCourseBySlug, getDepartmentTitle } from '@/data/site'

export function CourseDetailPage() {
  const { slug = '' } = useParams()
  const course = getCourseBySlug(slug)

  if (!course) {
    return (
      <div className="container-oraffa section-pad text-center">
        <h1 className="display-title text-3xl">دوره یافت نشد</h1>
        <Link to="/courses" className="btn-primary mt-6">
          بازگشت به دوره‌ها
        </Link>
      </div>
    )
  }

  return (
    <section className="section-pad">
      <div className="container-oraffa grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="eyebrow mb-3">{getDepartmentTitle(course.department)}</div>
          <h1 className="display-title text-4xl md:text-5xl">{course.title}</h1>
          <p className="muted mt-5 max-w-2xl text-base leading-8 md:text-lg">{course.description}</p>

          <AnimatedContent distance={20} duration={0.55} className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white/80 p-4">
              <div className="text-xs font-bold text-ink-muted">نوع برگزاری</div>
              <div className="mt-1 font-extrabold text-ink">{course.mode}</div>
            </div>
            <div className="rounded-2xl border border-line bg-white/80 p-4">
              <div className="text-xs font-bold text-ink-muted">وضعیت</div>
              <div className="mt-1 font-extrabold text-ink">
                {course.comingSoon ? 'به‌زودی' : course.free ? 'رایگان' : 'قابل ثبت‌نام'}
              </div>
            </div>
          </AnimatedContent>
        </div>

        <aside className="h-fit rounded-[1.75rem] border border-line bg-white/90 p-6 shadow-[0_20px_40px_rgba(13,93,144,0.08)]">
          <SectionHeading title="ثبت‌نام و مشاوره" />
          <div className="mt-4">
            {course.free ? (
              <div className="text-3xl font-black text-teal-deep">رایگان</div>
            ) : (
              <>
                <div className="text-3xl font-black text-brand-deep">{formatPrice(course.price)}</div>
                {course.originalPrice ? (
                  <div className="text-sm text-ink-muted line-through">
                    {formatPrice(course.originalPrice)}
                  </div>
                ) : null}
              </>
            )}
          </div>
          <p className="muted mt-4 text-sm leading-7">
            برای ثبت‌نام یا دریافت جزئیات بیشتر، با مشاوران عرفا در ارتباط باشید.
          </p>
          <Magnet padding={28} magnetStrength={2} wrapperClassName="mt-6 block">
            <Link to="/contact" className="btn-primary w-full">
              درخواست مشاوره / ثبت‌نام
            </Link>
          </Magnet>
          <Link to="/courses" className="btn-ghost mt-3 w-full">
            بازگشت به کاتالوگ
          </Link>
        </aside>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface SimpleCtaPageProps {
  title: string
  description: string
}

export function SimpleCtaPage({ title, description }: SimpleCtaPageProps) {
  return (
    <section className="section-pad">
      <div className="container-oraffa max-w-2xl text-center">
        <SectionHeading title={title} description={description} align="center" className="mx-auto" />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-primary">
            دریافت مشاوره ثبت‌نام
          </Link>
          <Link to="/courses" className="btn-ghost">
            مشاهده دوره‌ها
          </Link>
        </div>
      </div>
    </section>
  )
}

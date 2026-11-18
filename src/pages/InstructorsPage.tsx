import AnimatedContent from '@/components/AnimatedContent'
import RippleGrid from '@/components/RippleGrid'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { instructors } from '@/data/site'
import { Link } from 'react-router-dom'

export function InstructorsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 opacity-35">
          <RippleGrid
            color="#139895"
            rippleStrength={0.04}
            cellSize={28}
            lightMode
            className="h-full w-full"
          />
        </div>
        <div className="container-oraffa relative section-pad">
          <SectionHeading
            eyebrow="مدرس‌ها"
            title="اساتید مجرب عرفا"
            description="تیمی از مدرسین متخصص که مسیر یادگیری را کاربردی، دقیق و انگیزه‌بخش می‌سازند."
          />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-oraffa grid gap-5 md:grid-cols-3">
          {instructors.map((person, index) => (
            <AnimatedContent key={person.id} delay={index * 0.08} distance={28} duration={0.6}>
              <article className="group relative overflow-hidden rounded-[1.75rem] border border-line bg-white/85 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(13,93,144,0.1)]">
                <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand to-teal text-2xl font-black text-white">
                  {person.name.trim().charAt(0)}
                </div>
                <h3 className="text-xl font-extrabold text-ink">{person.name}</h3>
                <div className="mt-1 text-sm font-bold text-teal-deep">{person.title}</div>
                <p className="muted mt-4 text-sm leading-7">{person.bio}</p>
                <Link
                  to="/courses"
                  className="mt-6 inline-flex text-sm font-bold text-brand group-hover:underline"
                >
                  مشاهده دوره‌ها
                </Link>
              </article>
            </AnimatedContent>
          ))}
        </div>
      </section>
    </>
  )
}

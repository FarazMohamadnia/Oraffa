import AnimatedContent from '@/components/AnimatedContent'
import RippleGrid from '@/components/RippleGrid'
import TiltedCard from '@/components/TiltedCard'
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
        <div className="container-oraffa grid gap-6 md:grid-cols-3">
          {instructors.map((person, index) => (
            <AnimatedContent key={person.id} delay={index * 0.08} distance={28} duration={0.6}>
              <article className="overflow-hidden rounded-[1.75rem] border border-line bg-white/85 transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(13,93,144,0.1)]">
                <div className="flex justify-center bg-gradient-to-b from-brand-soft to-white p-6">
                  <TiltedCard
                    imageSrc={person.image}
                    altText={person.name}
                    captionText={person.title}
                    containerHeight="280px"
                    containerWidth="100%"
                    imageHeight="260px"
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showTooltip
                    className="w-full max-w-[280px]"
                  />
                </div>
                <div className="p-6 pt-2">
                  <h3 className="text-xl font-extrabold text-ink">{person.name}</h3>
                  <div className="mt-1 text-sm font-bold text-teal-deep">{person.title}</div>
                  <p className="muted mt-4 text-sm leading-7">{person.bio}</p>
                  <Link to="/courses" className="mt-6 inline-flex text-sm font-bold text-brand hover:underline">
                    مشاهده دوره‌ها
                  </Link>
                </div>
              </article>
            </AnimatedContent>
          ))}
        </div>
      </section>
    </>
  )
}

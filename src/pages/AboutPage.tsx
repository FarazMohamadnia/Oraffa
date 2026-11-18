import { Link } from 'react-router-dom'
import { ArrowUpLeft, BadgeCheck, Headphones, Sparkles, Target } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'
import Carousel from '@/components/Carousel'
import CountUp from '@/components/CountUp'
import Magnet from '@/components/Magnet'
import StarBorder from '@/components/StarBorder'
import Threads from '@/components/Threads'
import { SectionHeading } from '@/components/ui/SectionHeading'
import {
  aboutCta,
  aboutGoals,
  aboutGoalsLead,
  aboutIntro,
  aboutServicePoints,
  aboutServicesLead,
  aboutServiceSlides,
  aboutStats,
  aboutTestimonials,
} from '@/data/about'

export function AboutPage() {
  const serviceCarouselItems = aboutServiceSlides.map((slide) => (
    <article key={slide.id} className="flex h-full w-full flex-col overflow-hidden bg-[#0b334d]">
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 pt-4">
        <img
          src={slide.image}
          alt={slide.title}
          className="max-h-full max-w-full object-contain object-center"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="shrink-0 px-5 pb-5 pt-4 text-right">
        <div className="text-lg font-extrabold text-white md:text-xl">{slide.title}</div>
        <p className="mt-1 text-sm leading-7 text-white/80">{slide.description}</p>
      </div>
    </article>
  ))

  const testimonialCarouselItems = aboutTestimonials.map((item) => (
    <article
      key={item.id}
      className="flex h-full flex-col items-center justify-center gap-4 bg-[linear-gradient(165deg,#ffffff_0%,#f3fafb_100%)] px-5 py-6 text-center md:gap-5 md:px-7"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-teal-soft ring-4 ring-[#139895]/25">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="max-w-[30ch] text-[0.95rem] leading-8 text-ink-muted md:text-base">«{item.quote}»</p>
      <div>
        <div className="font-extrabold text-ink">{item.name}</div>
        <div className="mt-1 text-sm font-semibold text-teal-deep">{item.role}</div>
      </div>
    </article>
  ))

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 opacity-45">
          <Threads color={[0.05, 0.36, 0.56]} amplitude={0.8} distance={0.32} className="h-full w-full" />
        </div>
        <div className="container-oraffa relative section-pad">
          <AnimatedContent distance={24} duration={0.65}>
            <div className="eyebrow mb-3">درباره ما</div>
            <h1 className="display-title max-w-3xl text-4xl md:text-5xl">{aboutIntro.title}</h1>
            <p className="muted mt-5 max-w-2xl text-base leading-8 md:text-lg">{aboutIntro.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                {aboutCta.button}
                <ArrowUpLeft className="h-4 w-4" />
              </Link>
              <Link to="/courses" className="btn-ghost">
                مشاهده دوره‌ها
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-oraffa grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5 text-base leading-8 text-ink-muted">
            {aboutIntro.paragraphs.map((paragraph, index) => (
              <AnimatedContent key={paragraph} delay={index * 0.06} distance={22} duration={0.55}>
                <p>{paragraph}</p>
              </AnimatedContent>
            ))}
          </div>
          <AnimatedContent distance={28} duration={0.65}>
            <div className="grid gap-4 sm:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.5rem] border border-line bg-white/85 px-4 py-6 text-center shadow-[0_12px_28px_rgba(16,36,51,0.05)]"
                >
                  <div className="text-3xl font-black text-brand-deep">
                    <CountUp to={stat.value} duration={1.3} className="tabular-nums" />
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-ink-muted">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 overflow-hidden rounded-[1.75rem] border border-line">
              <img
                src="/images/gallery/campus-1.jpg"
                alt="فضای آموزشی عرفا"
                className="aspect-[16/10] w-full object-cover"
                loading="lazy"
              />
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden bg-[linear-gradient(180deg,rgba(232,243,247,0.55),rgba(243,247,250,0.2))]">
        <div className="container-oraffa relative">
          <SectionHeading
            eyebrow="خدمات ما"
            title="مسیر یادگیری آسان، حرفه‌ای و ماندگار"
            description={aboutServicesLead}
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <AnimatedContent distance={24} duration={0.65}>
              <Carousel
                items={serviceCarouselItems}
                baseWidth="100%"
                aspectRatio={16 / 11}
                radius={22}
                gap={18}
                peek={28}
                effect="scale"
                indicator="bars"
                arrows
                autoplay
                autoplayDelay={4200}
                pauseOnHover
                loop
                theme="light"
                className="w-full"
              />
            </AnimatedContent>

            <div className="space-y-4">
              {aboutServicePoints.map((point, index) => (
                <AnimatedContent key={point} delay={index * 0.05} distance={18} duration={0.5}>
                  <div className="flex gap-3 rounded-2xl border border-line bg-white/85 p-4">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-soft text-teal-deep">
                      {index === 0 ? (
                        <Sparkles className="h-4 w-4" />
                      ) : index === 1 ? (
                        <Target className="h-4 w-4" />
                      ) : index === 2 ? (
                        <BadgeCheck className="h-4 w-4" />
                      ) : (
                        <Headphones className="h-4 w-4" />
                      )}
                    </span>
                    <p className="text-sm font-semibold leading-7 text-ink">{point}</p>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-oraffa">
          <SectionHeading eyebrow="اهداف ما" title="آنچه مسیر عرفا را شکل می‌دهد" description={aboutGoalsLead} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {aboutGoals.map((goal, index) => (
              <AnimatedContent key={goal.title} delay={index * 0.05} distance={22} duration={0.55}>
                <article className="h-full rounded-[1.5rem] border border-line bg-[#0b334d] p-6 text-white">
                  <div className="text-xs font-bold text-teal-soft">هدف {index + 1}</div>
                  <h3 className="mt-3 text-xl font-extrabold">{goal.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/80">{goal.text}</p>
                </article>
              </AnimatedContent>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/courses" className="btn-ghost">
              مشاهده دوره‌ها
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-oraffa">
          <SectionHeading
            eyebrow="نظرات برخی از دانش‌آموزان"
            title="برای انتخابی آگاهانه به عرفا بپیوندید"
            description="تجربه واقعی فراگیرانی که مسیر یادگیری‌شان را با عرفا ساختند."
          />
          <AnimatedContent distance={24} duration={0.65} className="mt-10 flex justify-center">
            <Carousel
              items={testimonialCarouselItems}
              baseWidth={420}
              aspectRatio={1.02}
              radius={28}
              gap={16}
              peek={20}
              effect="slide"
              indicator="dots"
              arrows
              autoplay
              autoplayDelay={5000}
              pauseOnHover
              loop
              theme="light"
            />
          </AnimatedContent>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-oraffa">
          <AnimatedContent distance={26} duration={0.65}>
            <div className="overflow-hidden rounded-[2rem] border border-line bg-gradient-to-l from-brand to-teal p-8 text-white md:p-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold md:text-4xl">{aboutCta.title}</h2>
                <p className="mt-4 text-base leading-8 text-white/85">{aboutCta.description}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Magnet padding={28} magnetStrength={2}>
                    <StarBorder
                      as={Link}
                      to="/contact"
                      color="#E8F7F6"
                      trailColor="#ffffff"
                      backgroundColor="transparent"
                      className="!p-0"
                    >
                      <span className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-extrabold text-brand-deep">
                        {aboutCta.button}
                      </span>
                    </StarBorder>
                  </Magnet>
                  <Link
                    to="/courses"
                    className="inline-flex rounded-full border border-white/40 px-5 py-3 text-sm font-bold text-white"
                  >
                    مشاهده دوره‌ها
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </>
  )
}

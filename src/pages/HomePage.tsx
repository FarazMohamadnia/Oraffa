import { Link } from 'react-router-dom'
import { ArrowUpLeft, Sparkles } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'
import BounceCards from '@/components/BounceCards'
import CountUp from '@/components/CountUp'
import LaserFlow from '@/components/LaserFlow'
import Magnet from '@/components/Magnet'
import StarBorder from '@/components/StarBorder'
import TiltedCard from '@/components/TiltedCard'
import TrueFocus from '@/components/TrueFocus'
import { CourseCard } from '@/components/ui/CourseCard'
import { MediaReveal } from '@/components/ui/MediaReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import {
  blogPosts,
  brand,
  courses,
  departments,
  gallery,
  stats,
  testimonials,
} from '@/data/site'

export function HomePage() {
  const featured = courses.filter((c) => c.featured).slice(0, 4)

  return (
    <>
      <section className="relative min-h-[min(92svh,920px)] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={brand.heroImage}
            alt="فضای آموزشی مؤسسه عرفا"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 opacity-70">
            <LaserFlow
              color="#0D5D90"
              theme="dark"
              intensity={0.9}
              fog={0.25}
              dust={0.4}
              speed={0.7}
              className="h-full w-full"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,28,42,0.78)_0%,rgba(7,28,42,0.55)_42%,rgba(7,28,42,0.28)_100%)]" />
        </div>

        <div className="container-oraffa relative flex min-h-[min(92svh,920px)] flex-col justify-center py-16">
          <div className="max-w-3xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
              <Sparkles className="h-4 w-4 text-teal-soft" />
              مؤسسه علمی آموزشی
            </div>

            <div className="mb-5 flex justify-start text-white [&_*]:!text-[clamp(2.8rem,8vw,4.8rem)] [&_*]:!text-white">
              <TrueFocus
                sentence={brand.name}
                blurAmount={6}
                borderColor="#7fdad7"
                glowColor="rgba(127,218,215,0.45)"
                animationDuration={0.45}
                pauseBetweenAnimations={1.2}
              />
            </div>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.15] sm:text-5xl md:text-6xl">
              {brand.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/85 md:text-lg">
              {brand.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnet padding={40} magnetStrength={2.2} maxOffset={18}>
                <StarBorder
                  as={Link}
                  to="/courses"
                  color="#E8F7F6"
                  trailColor="#139895"
                  backgroundColor="transparent"
                  className="!p-0"
                >
                  <span className="btn-primary">
                    مشاهده دوره‌ها
                    <ArrowUpLeft className="h-4 w-4" />
                  </span>
                </StarBorder>
              </Magnet>
              <Link
                to="/contact"
                className="inline-flex rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                درخواست مشاوره رایگان
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-oraffa">
          <SectionHeading
            eyebrow="دپارتمان‌های آموزشی"
            title="سه مسیر تخصصی برای رشد حرفه‌ای"
            description="حقوق، مدیریت و زبان — هر کدام با دوره‌های کاربردی و اساتید مجرب."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {departments.map((dept, index) => (
              <AnimatedContent
                key={dept.id}
                delay={0.08 * index}
                distance={36}
                duration={0.65}
                ease="power2.out"
              >
                <Link
                  to={dept.href}
                  className="group block overflow-hidden rounded-[1.75rem] border border-line bg-white/80 transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(13,93,144,0.12)]"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img
                      src={dept.image}
                      alt={dept.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b334d]/75 via-transparent to-transparent" />
                    <div className="absolute bottom-4 right-4 text-5xl font-black text-white/25">
                      0{index + 1}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-extrabold text-ink">{dept.title}</h3>
                    <p className="muted mt-3 text-sm leading-7">{dept.description}</p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-brand">
                      ورود به دپارتمان
                      <ArrowUpLeft className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(19,152,149,0.08),transparent_35%)]" />
        <div className="container-oraffa relative">
          <SectionHeading
            eyebrow="دوره‌های ویژه"
            title="با همراهی اساتید متخصص مسیر موفقیت را حرفه‌ای‌تر طی کنید"
            description="منتخب دوره‌های پرمخاطب عرفا برای شروع یا ارتقای مسیر شغلی."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/courses" className="btn-ghost">
              مشاهده همه دوره‌ها
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-oraffa grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="فضای عرفا"
              title="یادگیری در بستری زنده و الهام‌بخش"
              description="تصاویر واقعی از فضای آموزشی، کارگاه‌ها و تجربه فراگیران عرفا."
            />
            <div className="mt-8 hidden justify-center lg:flex">
              <BounceCards
                images={gallery.slice(0, 5).map((item) => ({ src: item.src, alt: item.alt }))}
                containerWidth={420}
                containerHeight={320}
                animationDelay={0.8}
                animationStagger={0.08}
                enableHover
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.slice(0, 4).map((item, index) => (
              <MediaReveal
                key={item.id}
                src={item.src}
                alt={item.alt}
                caption={item.caption}
                delay={index * 0.06}
                imgClassName={index === 0 ? 'aspect-[4/3]' : 'aspect-[5/4]'}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-oraffa">
          <SectionHeading
            eyebrow="عرفا در یک نگاه"
            title="اعدادی که مسیر رشد را نشان می‌دهند"
            align="center"
            className="mx-auto"
          />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-line bg-white/75 px-4 py-8 text-center shadow-[0_10px_30px_rgba(16,36,51,0.04)]"
              >
                <div className="text-3xl font-black text-brand-deep md:text-4xl">
                  <CountUp to={stat.value} duration={1.4} className="tabular-nums" />
                  <span>{stat.suffix}</span>
                </div>
                <div className="mt-2 text-sm font-semibold text-ink-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-oraffa">
          <SectionHeading
            eyebrow="نظرات دانشجویان"
            title="برای انتخابی آگاهانه به عرفا بپیوندید"
            description="تجربه واقعی فراگیرانی که مسیر یادگیری‌شان را با عرفا ساختند."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <AnimatedContent key={item.id} delay={index * 0.1} distance={24} duration={0.6}>
                <blockquote className="h-full overflow-hidden rounded-[1.75rem] border border-line bg-[#0b334d] text-white shadow-[0_20px_40px_rgba(11,51,77,0.18)]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="aspect-[16/10] w-full object-cover opacity-90"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="p-6">
                    <p className="text-base leading-8 text-white/90">«{item.quote}»</p>
                    <footer className="mt-6 border-t border-white/15 pt-4">
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm text-teal-soft/90">{item.role}</div>
                    </footer>
                  </div>
                </blockquote>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-oraffa">
          <SectionHeading eyebrow="اخبار روز عرفا" title="تازه‌ها و راهنماهای یادگیری" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {blogPosts.map((post, index) => (
              <AnimatedContent key={post.id} delay={index * 0.08} distance={24}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-[1.75rem] border border-line bg-white/80 transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(13,93,144,0.1)]"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <div className="text-xs font-bold text-teal-deep">{post.category}</div>
                    <h3 className="mt-3 text-xl font-extrabold leading-8 text-ink group-hover:text-brand">
                      {post.title}
                    </h3>
                    <p className="muted mt-3 text-sm leading-7">{post.excerpt}</p>
                    <div className="mt-5 text-xs font-medium text-ink-muted">{post.date}</div>
                  </div>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-oraffa">
          <AnimatedContent distance={30} duration={0.7} ease="power2.out">
            <div className="grid overflow-hidden rounded-[2rem] border border-line lg:grid-cols-[1.1fr_0.9fr]">
              <div className="bg-gradient-to-l from-brand to-teal p-8 text-white md:p-12">
                <h2 className="text-3xl font-extrabold md:text-4xl">آماده‌اید مسیر یادگیری را شروع کنید؟</h2>
                <p className="mt-4 text-base leading-8 text-white/85">
                  با مشاوره رایگان، دپارتمان مناسب خود را پیدا کنید و اولین قدم حرفه‌ای‌تان را محکم بردارید.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-extrabold text-brand-deep"
                  >
                    دریافت مشاوره
                  </Link>
                  <Link
                    to="/courses"
                    className="inline-flex rounded-full border border-white/40 px-5 py-3 text-sm font-bold text-white"
                  >
                    مرور دوره‌ها
                  </Link>
                </div>
              </div>
              <div className="relative hidden min-h-[280px] lg:block">
                <TiltedCard
                  imageSrc="/images/gallery/campus-5.jpg"
                  altText="شروع یادگیری در عرفا"
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={10}
                  scaleOnHover={1.04}
                  showTooltip={false}
                  displayOverlayContent
                  overlayContent={
                    <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-brand-deep">
                      فضای واقعی یادگیری
                    </div>
                  }
                  className="h-full w-full"
                />
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </>
  )
}

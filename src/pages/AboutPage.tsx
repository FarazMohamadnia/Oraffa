import Threads from '@/components/Threads'
import AnimatedContent from '@/components/AnimatedContent'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Link } from 'react-router-dom'

const services = [
  'دوره‌های حضوری و آنلاین با انعطاف زمانی',
  'آمادگی آزمون‌های بین‌المللی مانند تافل',
  'اساتید مجرب و منابع آموزشی به‌روز',
  'مسیر آموزشی شخصی‌سازی‌شده برای هر فراگیر',
  'مدرک معتبر پس از پایان دوره',
  'پشتیبانی آموزشی در مسیر یادگیری',
]

const goals = [
  'ارتقای دانش و مهارت‌های کاربردی برای بازار کار',
  'تبدیل آموزش سنتی به تجربه‌ای پویا و اثربخش',
  'آماده‌سازی فراگیران برای موفقیت تحصیلی و شغلی',
]

export function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 opacity-50">
          <Threads color={[0.05, 0.36, 0.56]} amplitude={0.85} distance={0.35} className="h-full w-full" />
        </div>
        <div className="container-oraffa relative section-pad">
          <SectionHeading
            eyebrow="درباره ما"
            title="مؤسسه علمی، آموزشی و فرهنگی عرفا"
            description="عرفا با هدف ایجاد بستری نوین برای یادگیری و رشد فردی و حرفه‌ای فعالیت می‌کند؛ جایی برای یادگیری، رشد و ساختن آینده‌ای بهتر."
          />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-oraffa grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="space-y-5 text-base leading-8 text-ink-muted">
              <p>
                ما در عرفا تلاش می‌کنیم آموزش را از شکل سنتی فراتر ببریم و تجربه‌ای کاربردی و اثربخش برای دانشجویان فراهم کنیم.
                دوره‌های آموزشی ما در حوزه‌های زبان، حقوق و مدیریت با توجه به نیازهای روز طراحی و ارائه می‌شوند.
              </p>
              <p>
                بهره‌گیری از اساتید متخصص و باتجربه، یکی از مهم‌ترین نقاط قوت مجموعه عرفاست. محتوای آموزشی به‌روز و روش‌های نوین
                یادگیری، مسیر آموزش را برای دانشجویان ساده‌تر و هدفمندتر می‌کند.
              </p>
              <p>
                ما باور داریم که آموزش باکیفیت می‌تواند زمینه‌ساز پیشرفت علمی و موفقیت شغلی باشد. در عرفا، همراه دانشجویان هستیم
                تا مسیر یادگیری را با اطمینان و انگیزه بیشتری طی کنند.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={28} delay={0.1} duration={0.65}>
            <div className="rounded-[1.75rem] border border-line bg-white/80 p-6 md:p-8">
              <h3 className="text-xl font-extrabold text-ink">خدمات ما</h3>
              <ul className="mt-5 space-y-3">
                {services.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-ink-muted">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-oraffa">
          <SectionHeading eyebrow="اهداف ما" title="آنچه مسیر عرفا را شکل می‌دهد" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {goals.map((goal, index) => (
              <div key={goal} className="rounded-3xl border border-line bg-[#0b334d] p-6 text-white">
                <div className="text-sm font-bold text-teal-soft">هدف {index + 1}</div>
                <p className="mt-3 text-base leading-8">{goal}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/contact" className="btn-primary">
              جهت کسب اطلاعات بیشتر با ما تماس بگیرید
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

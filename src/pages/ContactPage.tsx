import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { contact } from '@/data/site'

export function ContactPage() {
  const [sent, setSent] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="section-pad">
      <div className="container-oraffa grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="تماس با ما"
            title="با عرفا در ارتباط باشید"
            description="برای مشاوره رایگان، پرسش درباره دوره‌ها یا هماهنگی ثبت‌نام پیام بگذارید."
          />
          <div className="mt-8 space-y-4 text-sm leading-7 text-ink-muted">
            <a href={`tel:${contact.phones[0]}`} className="flex items-center gap-3 hover:text-brand">
              <Phone className="h-4 w-4 text-teal" /> {contact.phones[0]}
            </a>
            <a href={`tel:${contact.phones[1]}`} className="flex items-center gap-3 hover:text-brand">
              <Phone className="h-4 w-4 text-teal" /> {contact.phones[1]}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-brand">
              <Mail className="h-4 w-4 text-teal" /> {contact.email}
            </a>
            <p className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-teal" />
              {contact.address}
            </p>
          </div>
        </div>

        <AnimatedContent distance={24} duration={0.6}>
          <form
            onSubmit={onSubmit}
            className="rounded-[1.75rem] border border-line bg-white/90 p-6 shadow-[0_20px_40px_rgba(13,93,144,0.08)] md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-bold text-ink">
                نام و نام خانوادگی
                <input
                  required
                  name="name"
                  className="mt-2 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm font-medium outline-none transition focus:border-teal"
                />
              </label>
              <label className="block text-sm font-bold text-ink">
                شماره تماس
                <input
                  required
                  name="phone"
                  className="mt-2 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm font-medium outline-none transition focus:border-teal"
                />
              </label>
            </div>
            <label className="mt-4 block text-sm font-bold text-ink">
              ایمیل
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm font-medium outline-none transition focus:border-teal"
              />
            </label>
            <label className="mt-4 block text-sm font-bold text-ink">
              پیام
              <textarea
                required
                name="message"
                rows={5}
                className="mt-2 w-full resize-y rounded-2xl border border-line bg-paper px-4 py-3 text-sm font-medium outline-none transition focus:border-teal"
              />
            </label>
            <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
              ارسال پیام
            </button>
            {sent ? (
              <p className="mt-4 text-sm font-semibold text-teal-deep" role="status">
                پیام شما ثبت شد. به‌زودی با شما تماس می‌گیریم.
              </p>
            ) : null}
          </form>
        </AnimatedContent>
      </div>
    </section>
  )
}

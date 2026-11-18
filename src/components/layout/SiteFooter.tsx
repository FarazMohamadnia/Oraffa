import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { brand, contact, departments } from '@/data/site'

export function SiteFooter() {
  return (
    <footer className="relative mt-8 overflow-hidden border-t border-line bg-[#0b334d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(19,152,149,0.25),transparent_40%),radial-gradient(circle_at_90%_30%,rgba(13,93,144,0.35),transparent_35%)]" />
      <div className="container-oraffa relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-1">
          <div className="text-2xl font-extrabold">{brand.name}</div>
          <p className="max-w-sm text-sm leading-7 text-white/75">{brand.description}</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-teal-soft">دسترسی سریع</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/" className="hover:text-white">صفحه اصلی</Link></li>
            <li><Link to="/about" className="hover:text-white">درباره ما</Link></li>
            <li><Link to="/instructors" className="hover:text-white">مدرس‌ها</Link></li>
            <li><Link to="/blog" className="hover:text-white">وبلاگ</Link></li>
            <li><Link to="/contact" className="hover:text-white">تماس با ما</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-teal-soft">دپارتمان‌ها</h3>
          <ul className="space-y-2 text-sm text-white/80">
            {departments.map((dept) => (
              <li key={dept.id}>
                <Link to={dept.href} className="hover:text-white">{dept.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-sm text-white/80">
          <h3 className="mb-4 text-sm font-bold text-teal-soft">راه‌های ارتباطی</h3>
          <a href={`tel:${contact.phones[0]}`} className="flex items-center gap-2 hover:text-white">
            <Phone className="h-4 w-4" /> {contact.phones[0]}
          </a>
          <a href={`tel:${contact.phones[1]}`} className="flex items-center gap-2 hover:text-white">
            <Phone className="h-4 w-4" /> {contact.phones[1]}
          </a>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white">
            <Mail className="h-4 w-4" /> {contact.email}
          </a>
          <p className="flex items-start gap-2 leading-7">
            <MapPin className="mt-1 h-4 w-4 shrink-0" />
            {contact.address}
          </p>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5 text-center text-xs text-white/55">
        © {new Date().getFullYear()} {brand.name} — همه حقوق محفوظ است.
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Phone, ShoppingBag, User, X } from 'lucide-react'
import { brand, contact } from '@/data/site'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'خانه' },
  { to: '/about', label: 'درباره ما' },
  { to: '/courses', label: 'دوره‌ها' },
  { to: '/instructors', label: 'مدرس‌ها' },
  { to: '/blog', label: 'وبلاگ' },
  { to: '/contact', label: 'تماس با ما' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background,box-shadow,border-color] duration-200',
        scrolled
          ? 'border-b border-line/80 bg-paper-elevated/90 shadow-[0_10px_30px_rgba(16,36,51,0.06)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-oraffa flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-3" aria-label={brand.name}>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand to-teal text-lg font-extrabold text-white shadow-[0_10px_24px_rgba(13,93,144,0.28)] transition-transform duration-200 group-hover:-translate-y-0.5">
            ع
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-extrabold tracking-tight text-ink">{brand.name}</span>
            <span className="block text-xs font-medium text-ink-muted">{brand.englishName}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="منوی اصلی">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-200',
                  isActive ? 'bg-brand-soft text-brand-deep' : 'text-ink-muted hover:bg-white/70 hover:text-ink',
                )
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${contact.phones[0]}`}
            className="hidden items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-2 text-sm font-semibold text-brand-deep md:inline-flex"
          >
            <Phone className="h-4 w-4" />
            مشاوره
          </a>
          <Link
            to="/cart"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/70 text-ink-muted transition hover:text-brand"
            aria-label="سبد خرید"
          >
            <ShoppingBag className="h-4 w-4" />
          </Link>
          <Link
            to="/account"
            className="hidden h-10 place-items-center rounded-full border border-line bg-white/70 px-3 text-sm font-semibold text-ink-muted transition hover:text-brand sm:grid"
          >
            <span className="inline-flex items-center gap-2">
              <User className="h-4 w-4" />
              شروع کنید
            </span>
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/80 lg:hidden"
            aria-label={open ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-x-0 top-[72px] z-40 border-b border-line bg-paper-elevated/95 backdrop-blur-xl transition-all duration-300 lg:hidden',
          open ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0',
        )}
      >
        <nav className="container-oraffa flex flex-col gap-1 py-4" aria-label="منوی موبایل">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-2xl px-4 py-3 text-base font-semibold',
                  isActive ? 'bg-brand-soft text-brand-deep' : 'text-ink hover:bg-white',
                )
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/account" onClick={() => setOpen(false)} className="btn-primary mt-2">
            شروع یادگیری
          </Link>
        </nav>
      </div>
    </header>
  )
}

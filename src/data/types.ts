export type DepartmentId = 'law' | 'management' | 'language'

export interface Department {
  id: DepartmentId
  title: string
  description: string
  href: string
}

export interface Course {
  id: string
  slug: string
  title: string
  department: DepartmentId
  mode: 'حضوری' | 'غیرحضوری' | 'حضوری و غیرحضوری'
  price: number | null
  originalPrice: number | null
  discountPercent: number | null
  rating: number
  reviews: number
  featured: boolean
  comingSoon?: boolean
  free?: boolean
  summary: string
  description: string
}

export interface Instructor {
  id: string
  name: string
  title: string
  bio: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
}

export interface SiteContact {
  phones: string[]
  email: string
  address: string
}

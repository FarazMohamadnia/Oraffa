import type {
  BlogPost,
  Course,
  Department,
  Instructor,
  SiteContact,
  Testimonial,
} from './types'

export const brand = {
  name: 'عرفا',
  englishName: 'Orrafa',
  tagline: 'مسیر یادگیری را حرفه‌ای‌تر طی کنید',
  description:
    'مؤسسه عرفا با تکیه بر اساتید مجرب، آموزش‌های کاربردی و محیطی پویا، مسیر یادگیری را برای علاقه‌مندان هموار کرده است.',
  primary: '#0D5D90',
  secondary: '#139895',
}

export const contact: SiteContact = {
  phones: ['021-44811637', '09197327322'],
  email: 'info@oraffa.com',
  address:
    'تهران، اشرفی اصفهانی، بالاتر از بزرگراه نیایش، کوچه دوم، پلاک ۱۰، واحد چهار، طبقه سوم',
}

export const departments: Department[] = [
  {
    id: 'law',
    title: 'دپارتمان حقوق',
    description:
      'مهارت‌های حقوقی کاربردی از لایحه‌نویسی تا تنظیم موافقت‌نامه داوری برای حل اختلافات.',
    href: '/courses?dept=law',
  },
  {
    id: 'management',
    title: 'دپارتمان مدیریت',
    description:
      'دوره‌های مدیرعامل، فروش و مدیریت کارخانه برای رهبران و مدیران حرفه‌ای.',
    href: '/courses?dept=management',
  },
  {
    id: 'language',
    title: 'دپارتمان زبان',
    description:
      'آموزش زبان‌های فرانسه و چینی با مسیر یادگیری هدفمند و پشتیبانی آموزشی.',
    href: '/courses?dept=language',
  },
]

export const courses: Course[] = [
  {
    id: '1',
    slug: 'layehe-nevisi',
    title: 'لایحه نویسی',
    department: 'law',
    mode: 'حضوری',
    price: 4_000_000,
    originalPrice: 5_000_000,
    discountPercent: 20,
    rating: 0,
    reviews: 0,
    featured: true,
    summary: 'مهارت نگارش لایحه حقوقی حرفه‌ای برای پرونده‌های واقعی.',
    description:
      'در این دوره با اصول ساختار لایحه، استدلال حقوقی، استناد به قوانین و نگارش حرفه‌ای آشنا می‌شوید تا بتوانید اسناد حقوقی دقیق و قابل دفاع بنویسید.',
  },
  {
    id: '2',
    slug: 'davari-agreement',
    title: 'اصول تنظیم موافقت‌نامه داوری برای حل و فصل اختلافات',
    department: 'law',
    mode: 'حضوری',
    price: 4_000_000,
    originalPrice: 5_000_000,
    discountPercent: 20,
    rating: 0,
    reviews: 0,
    featured: true,
    comingSoon: true,
    summary: 'تنظیم حرفه‌ای موافقت‌نامه داوری برای حل اختلافات تجاری و حقوقی.',
    description:
      'این دوره به شما کمک می‌کند موافقت‌نامه‌های داوری استاندارد، شفاف و قابل اجرا تنظیم کنید و اختلافات را با رویکردی حرفه‌ای مدیریت نمایید.',
  },
  {
    id: '3',
    slug: 'ceo-pro',
    title: 'دوره مدیرعامل حرفه‌ای',
    department: 'management',
    mode: 'غیرحضوری',
    price: 1_700_000,
    originalPrice: 1_890_000,
    discountPercent: 10,
    rating: 3,
    reviews: 1,
    featured: true,
    summary: 'مهارت‌های رهبری، تصمیم‌گیری و مدیریت استراتژیک برای مدیرعاملان.',
    description:
      'مسیر تبدیل‌شدن به یک مدیرعامل حرفه‌ای با تمرکز بر رهبری تیم، استراتژی کسب‌وکار، تصمیم‌گیری داده محور و مدیریت عملکرد سازمان.',
  },
  {
    id: '4',
    slug: 'sales-manager',
    title: 'مدیر حرفه‌ای فروش',
    department: 'management',
    mode: 'غیرحضوری',
    price: null,
    originalPrice: 1_700_000,
    discountPercent: 100,
    rating: 0,
    reviews: 0,
    featured: false,
    free: true,
    summary: 'ساخت سیستم فروش، مدیریت تیم و افزایش نرخ تبدیل.',
    description:
      'یاد بگیرید چگونه قیف فروش را طراحی کنید، تیم فروش را هدایت کنید و فرآیندهای فروش را به نتایج پایدار تبدیل کنید.',
  },
  {
    id: '5',
    slug: 'factory-manager',
    title: 'مدیر کارخانه حرفه‌ای',
    department: 'management',
    mode: 'حضوری و غیرحضوری',
    price: 2_850_000,
    originalPrice: 3_250_000,
    discountPercent: 12,
    rating: 0,
    reviews: 0,
    featured: false,
    summary: 'مدیریت عملیات، کیفیت و بهره‌وری در فضای تولید.',
    description:
      'این دوره مهارت‌های مدیریت کارخانه، کنترل کیفیت، بهینه‌سازی فرآیند و رهبری تیم‌های عملیاتی را پوشش می‌دهد.',
  },
  {
    id: '6',
    slug: 'chinese-beginner',
    title: 'آموزش مقدماتی زبان چینی',
    department: 'language',
    mode: 'حضوری',
    price: null,
    originalPrice: null,
    discountPercent: null,
    rating: 5,
    reviews: 1,
    featured: true,
    free: true,
    summary: 'شروع حرفه‌ای زبان چینی از پایه با تمرکز بر مکالمه و نوشتار.',
    description:
      'دوره مقدماتی زبان چینی برای علاقه‌مندان به یادگیری کاربردی؛ از تلفظ و واژگان پایه تا ساخت جملات روزمره.',
  },
  {
    id: '7',
    slug: 'french',
    title: 'آموزش زبان فرانسه',
    department: 'language',
    mode: 'حضوری',
    price: 2_950_000,
    originalPrice: 3_200_000,
    discountPercent: 8,
    rating: 5,
    reviews: 1,
    featured: true,
    summary: 'یادگیری فرانسه برای تحصیل، مهاجرت و ارتباطات بین‌المللی.',
    description:
      'مسیر یادگیری زبان فرانسه با رویکرد کاربردی، تمرین مهارت‌های چهارگانه و آمادگی برای سطوح بالاتر.',
  },
]

export const instructors: Instructor[] = [
  {
    id: '1',
    name: 'دکتر بهزاد نزاکت‌گو',
    title: 'دکترای آموزش زبان انگلیسی',
    bio: 'استاد باتجربه در حوزه آموزش زبان با تمرکز بر یادگیری کاربردی و آمادگی آزمون‌های بین‌المللی.',
  },
  {
    id: '2',
    name: 'سما اسدی',
    title: 'مدرس حرفه‌ای',
    bio: 'مدرس دوره‌های مهارتی با رویکرد عملی و همراهی مستمر فراگیران در مسیر یادگیری.',
  },
  {
    id: '3',
    name: 'پانیذ رحیمی',
    title: 'مدرس حرفه‌ای',
    bio: 'تدریس تخصصی با تاکید بر تجربه واقعی، تعامل کلاسی و پیشرفت مرحله‌به‌مرحله دانشجویان.',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'سارا محمدی',
    role: 'دانشجوی دپارتمان مدیریت',
    quote:
      'دوره‌های عرفا دقیقاً همان چیزی بود که برای ارتقای مسیر شغلی‌ام نیاز داشتم؛ کاربردی، منظم و با پشتیبانی واقعی.',
  },
  {
    id: '2',
    name: 'علی رضایی',
    role: 'دانشجوی دپارتمان حقوق',
    quote:
      'کیفیت تدریس و محتوای به‌روز باعث شد لایحه‌نویسی را خیلی سریع‌تر و حرفه‌ای‌تر یاد بگیرم.',
  },
  {
    id: '3',
    name: 'مریم کریمی',
    role: 'دانشجوی دپارتمان زبان',
    quote:
      'فضای آموزشی پویا و اساتید مجرب عرفا مسیر یادگیری زبان را برای من لذت‌بخش و هدفمند کرد.',
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'why-oraffa',
    title: 'چرا مؤسسه عرفا؟',
    excerpt:
      'اساتید مجرب، آموزش کاربردی و محیطی پویا؛ سه ستون مسیر یادگیری در عرفا.',
    date: '۱۴۰۴/۰۶/۳۰',
    category: 'معرفی',
    content:
      'مؤسسه عرفا با هدف ایجاد بستری نوین برای یادگیری و رشد فردی و حرفه‌ای فعالیت می‌کند. ما تلاش می‌کنیم آموزش را از شکل سنتی فراتر ببریم و تجربه‌ای کاربردی و اثربخش برای دانشجویان فراهم کنیم. دوره‌های آموزشی در حوزه‌های زبان، حقوق و مدیریت با توجه به نیازهای روز طراحی شده‌اند.',
  },
  {
    id: '2',
    slug: 'learning-path',
    title: 'چگونه مسیر یادگیری خود را حرفه‌ای طراحی کنیم؟',
    excerpt:
      'از انتخاب دپارتمان تا تمرین مستمر؛ راهنمای کوتاه برای شروع هوشمندانه.',
    date: '۱۴۰۴/۰۷/۱۲',
    category: 'راهنما',
    content:
      'انتخاب مسیر یادگیری باید بر اساس هدف شغلی، سطح فعلی و زمان در دسترس باشد. در عرفا با مشاوره تخصصی می‌توانید دپارتمان مناسب را انتخاب کنید، برنامه شخصی‌سازی‌شده بگیرید و با پشتیبانی مستمر پیشرفت خود را بسنجید.',
  },
  {
    id: '3',
    slug: 'hybrid-learning',
    title: 'یادگیری حضوری و غیرحضوری؛ انعطاف برای زندگی واقعی',
    excerpt:
      'ترکیب کلاس‌های حضوری و آنلاین چگونه کیفیت یادگیری را حفظ می‌کند؟',
    date: '۱۴۰۴/۰۸/۰۱',
    category: 'آموزش',
    content:
      'مدل ترکیبی به فراگیران اجازه می‌دهد بدون افت کیفیت، مسیر یادگیری را با سبک زندگی خود هماهنگ کنند. کلاس‌های غیرحضوری انعطاف زمانی می‌دهند و جلسات حضوری عمق تمرین و تعامل را افزایش می‌دهند.',
  },
]

export const stats = [
  { label: 'دانشجویان', value: 1200, suffix: '+' },
  { label: 'دوره‌های آموزشی', value: 7, suffix: '+' },
  { label: 'اساتید برتر', value: 12, suffix: '+' },
  { label: 'رضایت دانشجویان', value: 96, suffix: '%' },
]

export function formatPrice(amount: number | null | undefined): string {
  if (amount == null) return 'رایگان'
  return `${amount.toLocaleString('fa-IR')} تومان`
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getDepartmentTitle(id: Course['department']): string {
  return departments.find((d) => d.id === id)?.title ?? id
}

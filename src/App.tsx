import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { AboutPage } from '@/pages/AboutPage'
import { BlogPage } from '@/pages/BlogPage'
import { BlogPostPage } from '@/pages/BlogPostPage'
import { ContactPage } from '@/pages/ContactPage'
import { CourseDetailPage } from '@/pages/CourseDetailPage'
import { CoursesPage } from '@/pages/CoursesPage'
import { HomePage } from '@/pages/HomePage'
import { InstructorsPage } from '@/pages/InstructorsPage'
import { SimpleCtaPage } from '@/pages/SimpleCtaPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:slug" element={<CourseDetailPage />} />
        <Route path="instructors" element={<InstructorsPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route
          path="cart"
          element={
            <SimpleCtaPage
              title="سبد خرید"
              description="در نسخه نمایشی، ثبت‌نام دوره‌ها از طریق مشاوره انجام می‌شود. برای ادامه با تیم عرفا در ارتباط باشید."
            />
          }
        />
        <Route
          path="account"
          element={
            <SimpleCtaPage
              title="شروع یادگیری"
              description="حساب کاربری ووکامرس در این بازطراحی به مسیر مشاوره و ثبت‌نام هدایت می‌شود."
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

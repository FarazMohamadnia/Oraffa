import { Link } from 'react-router-dom'
import AnimatedContent from '@/components/AnimatedContent'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { blogPosts } from '@/data/site'

export function BlogPage() {
  return (
    <section className="section-pad">
      <div className="container-oraffa">
        <SectionHeading
          eyebrow="وبلاگ"
          title="اخبار و راهنماهای روز عرفا"
          description="مقالات کوتاه برای انتخاب بهتر مسیر یادگیری و آشنایی بیشتر با رویکرد آموزشی عرفا."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <AnimatedContent key={post.id} delay={index * 0.08} distance={24}>
              <Link
                to={`/blog/${post.slug}`}
                className="block h-full rounded-[1.75rem] border border-line bg-white/85 p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(13,93,144,0.1)]"
              >
                <div className="text-xs font-bold text-teal-deep">{post.category}</div>
                <h2 className="mt-3 text-xl font-extrabold leading-8 text-ink">{post.title}</h2>
                <p className="muted mt-3 text-sm leading-7">{post.excerpt}</p>
                <div className="mt-5 text-xs font-medium text-ink-muted">{post.date}</div>
              </Link>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}

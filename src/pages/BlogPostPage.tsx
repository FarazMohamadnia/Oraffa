import { Link, useParams } from 'react-router-dom'
import AnimatedContent from '@/components/AnimatedContent'
import { getPostBySlug } from '@/data/site'

export function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="container-oraffa section-pad text-center">
        <h1 className="display-title text-3xl">مطلب یافت نشد</h1>
        <Link to="/blog" className="btn-primary mt-6">
          بازگشت به وبلاگ
        </Link>
      </div>
    )
  }

  return (
    <article className="section-pad">
      <div className="container-oraffa max-w-3xl">
        <div className="text-xs font-bold text-teal-deep">{post.category}</div>
        <h1 className="display-title mt-3 text-4xl md:text-5xl">{post.title}</h1>
        <div className="mt-3 text-sm text-ink-muted">{post.date}</div>
        <AnimatedContent distance={24} duration={0.65} className="mt-8 overflow-hidden rounded-[1.75rem]">
          <img src={post.image} alt={post.title} className="aspect-[16/9] w-full object-cover" />
        </AnimatedContent>
        <p className="mt-8 text-base leading-9 text-ink-muted md:text-lg">{post.content}</p>
        <Link to="/blog" className="btn-ghost mt-10">
          بازگشت به وبلاگ
        </Link>
      </div>
    </article>
  )
}

import { Outlet } from 'react-router-dom'
import ClickSpark from '@/components/ClickSpark'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function AppShell() {
  return (
    <ClickSpark
      sparkColor={['#139895', '#0D5D90', '#F7F1E8']}
      sparkCount={10}
      sparkRadius={28}
      duration={480}
      shape="streak"
      className="min-h-svh"
    >
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </ClickSpark>
  )
}

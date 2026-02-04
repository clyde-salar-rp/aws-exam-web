import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Home, BookOpen, BarChart2, FileText, GraduationCap, Menu } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/exam', label: 'Exam', icon: GraduationCap },
  { href: '/progress', label: 'Progress', icon: BarChart2 },
  { href: '/review', label: 'Review', icon: BookOpen },
  { href: '/study-notes', label: 'Study Notes', icon: FileText },
]

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen border-r bg-background flex flex-col transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && (
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 shrink-0" />
              <span className="font-bold">AWS Exam Prep</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'p-2 rounded-md hover:bg-muted transition-colors',
              collapsed && 'mx-auto'
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/60 hover:text-foreground hover:bg-muted',
                  collapsed && 'justify-center px-2'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </aside>
      <main
        className={cn(
          'flex-1 p-6 transition-all duration-300',
          collapsed ? 'ml-16' : 'ml-64'
        )}
      >
        {children}
      </main>
    </div>
  )
}

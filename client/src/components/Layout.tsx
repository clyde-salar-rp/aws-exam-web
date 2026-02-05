import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Home, BookOpen, BarChart2, FileText, GraduationCap, Menu, X, LogOut, User } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useAuth } from '@/contexts/AuthContext'

interface LayoutProps {
  children: React.ReactNode
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/exam', label: 'Exam', icon: GraduationCap },
  { href: '/progress', label: 'Progress', icon: BarChart2 },
  { href: '/review', label: 'Review', icon: BookOpen },
  { href: '/study-notes', label: 'Study Notes', icon: FileText },
]

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b bg-background flex items-center justify-between px-4 md:hidden">
        <div className="flex items-center">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center space-x-2 ml-2">
            <GraduationCap className="h-6 w-6 shrink-0" />
            <span className="font-bold">AWS Exam Prep</span>
          </Link>
        </div>
        <ThemeToggle />
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen border-r bg-background flex flex-col transition-all duration-300',
          // Desktop: show based on collapsed state
          'hidden md:flex',
          collapsed ? 'md:w-16' : 'md:w-64',
          // Mobile: slide-out drawer
          mobileOpen && 'flex w-64 translate-x-0',
          !mobileOpen && 'md:translate-x-0'
        )}
      >
        <div className="h-14 px-4 border-b flex items-center justify-between">
          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-md hover:bg-muted transition-colors md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
          {!collapsed && (
            <Link to="/" className="hidden md:flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 shrink-0" />
              <span className="font-bold">AWS Exam Prep</span>
            </Link>
          )}
          {/* Desktop collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'p-2 rounded-md hover:bg-muted transition-colors hidden md:block',
              collapsed && 'mx-auto'
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
          {/* Mobile title */}
          <Link to="/" className="flex md:hidden items-center space-x-2">
            <GraduationCap className="h-6 w-6 shrink-0" />
            <span className="font-bold">AWS Exam Prep</span>
          </Link>
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
                  collapsed && 'md:justify-center md:px-2'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className={cn(collapsed && 'md:hidden')}>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Profile - Bottom of Sidebar */}
        {user && (
          <div className="border-t p-2">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors',
                  collapsed && 'md:justify-center md:px-2'
                )}
                title={collapsed ? user.name : undefined}
              >
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-8 w-8 rounded-full shrink-0"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                {!collapsed && (
                  <div className="flex-1 text-left text-sm overflow-hidden">
                    <p className="font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className={cn(
                    "absolute bottom-full mb-2 w-56 bg-background border rounded-md shadow-lg z-50",
                    collapsed ? "left-0" : "left-2"
                  )}>
                    {collapsed && (
                      <div className="p-3 border-b">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    )}
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* Main content wrapper */}
      <div
        className={cn(
          'flex-1 flex flex-col transition-all duration-300',
          // Mobile: full width with top padding for header
          'pt-14',
          // Desktop: margin for sidebar and top padding for header
          collapsed ? 'md:ml-16' : 'md:ml-64'
        )}
      >
        {/* Desktop header bar with border - matches sidebar header height */}
        <div className="hidden md:flex items-center justify-end h-14 px-6 border-b bg-background fixed top-0 right-0 left-0 z-30 transition-all duration-300"
          style={{
            left: collapsed ? '4rem' : '16rem'
          }}
        >
          <ThemeToggle />
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

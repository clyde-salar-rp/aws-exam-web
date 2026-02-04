import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface MasteryBadgeProps {
  mastery: string
  className?: string
}

const masteryConfig: Record<string, { label: string; className: string }> = {
  mastered: { label: 'Mastered', className: 'bg-green-500 hover:bg-green-600' },
  proficient: { label: 'Proficient', className: 'bg-blue-500 hover:bg-blue-600' },
  learning: { label: 'Learning', className: 'bg-yellow-500 hover:bg-yellow-600' },
  needs_work: { label: 'Needs Work', className: 'bg-orange-500 hover:bg-orange-600' },
  not_started: { label: 'Not Started', className: 'bg-gray-400 hover:bg-gray-500' },
}

export function MasteryBadge({ mastery, className }: MasteryBadgeProps) {
  const config = masteryConfig[mastery] || masteryConfig.not_started

  return (
    <Badge className={cn(config.className, 'text-white', className)}>
      {config.label}
    </Badge>
  )
}

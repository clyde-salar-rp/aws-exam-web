import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMasteryColor(mastery: string): string {
  switch (mastery) {
    case 'mastered':
      return 'bg-green-500'
    case 'proficient':
      return 'bg-blue-500'
    case 'learning':
      return 'bg-yellow-500'
    case 'needs_work':
      return 'bg-orange-500'
    case 'not_started':
    default:
      return 'bg-gray-400'
  }
}

export function getMasteryLabel(mastery: string): string {
  switch (mastery) {
    case 'mastered':
      return 'Mastered'
    case 'proficient':
      return 'Proficient'
    case 'learning':
      return 'Learning'
    case 'needs_work':
      return 'Needs Work'
    case 'not_started':
    default:
      return 'Not Started'
  }
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

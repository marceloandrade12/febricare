import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'
import { pt } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function formatDateTime(isoString: string): string {
  try {
    return format(parseISO(isoString), "dd/MM/yyyy 'às' HH:mm", { locale: pt })
  } catch {
    return isoString
  }
}

export function formatDate(isoString: string): string {
  try {
    return format(parseISO(isoString), 'dd/MM/yyyy', { locale: pt })
  } catch {
    return isoString
  }
}

export function formatTime(isoString: string): string {
  try {
    return format(parseISO(isoString), 'HH:mm')
  } catch {
    return isoString
  }
}

export function formatShortDateTime(isoString: string): string {
  try {
    return format(parseISO(isoString), 'dd/MM HH:mm')
  } catch {
    return isoString
  }
}

export function nowLocalISO(): string {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  const local = new Date(now.getTime() - offset * 60 * 1000)
  return local.toISOString().slice(0, 16)
}

export function temperatureColor(temp: number): string {
  if (temp < 37.5) return 'text-emerald-600'
  if (temp < 38.0) return 'text-yellow-500'
  if (temp < 38.5) return 'text-orange-500'
  if (temp < 39.5) return 'text-red-500'
  return 'text-red-700'
}

export function temperatureBgColor(temp: number): string {
  if (temp < 37.5) return 'bg-emerald-50 border-emerald-200'
  if (temp < 38.0) return 'bg-yellow-50 border-yellow-200'
  if (temp < 38.5) return 'bg-orange-50 border-orange-200'
  if (temp < 39.5) return 'bg-red-50 border-red-200'
  return 'bg-red-100 border-red-300'
}

export function temperatureLabel(temp: number): string {
  if (temp < 37.5) return 'Normal'
  if (temp < 38.0) return 'Subfebril'
  if (temp < 38.5) return 'Febre leve'
  if (temp < 39.5) return 'Febre'
  return 'Febre alta'
}

export function temperatureChartColor(temp: number): string {
  if (temp < 37.5) return '#10b981'
  if (temp < 38.0) return '#eab308'
  if (temp < 38.5) return '#f97316'
  if (temp < 39.5) return '#ef4444'
  return '#b91c1c'
}

export const AVATAR_COLORS = [
  '#ff3370', '#6366f1', '#0ea5e9', '#10b981',
  '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6',
]

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0].toUpperCase())
    .join('')
}

export function calculateAge(birthDate: string): string {
  try {
    const birth = parseISO(birthDate)
    const now = new Date()
    const months =
      (now.getFullYear() - birth.getFullYear()) * 12 +
      (now.getMonth() - birth.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years === 0) return `${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`
    if (remainingMonths === 0) return `${years} ${years === 1 ? 'ano' : 'anos'}`
    return `${years}a ${remainingMonths}m`
  } catch {
    return ''
  }
}

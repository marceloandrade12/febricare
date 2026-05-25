import { useAppStore } from '@/store/useAppStore'
import { Dashboard } from '@/components/layout/Dashboard'
import { EmptyState } from '@/components/layout/EmptyState'

export default function App() {
  const { children } = useAppStore()

  return (
    <div className="min-h-dvh bg-[#fdf6f8]">
      {children.length === 0 ? <EmptyState /> : <Dashboard />}
    </div>
  )
}

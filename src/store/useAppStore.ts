import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { AppState, Child, Record, TemperatureRecord, MedicationRecord } from '@/types'
import { generateId } from '@/lib/utils'

const STORAGE_KEY = 'febricare-data-v1'

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      children: [],
      records: [],
      activeChildId: null,

      // ── Child actions ──────────────────────────────────────────────────────

      addChild: (childData) => {
        const child: Child = { ...childData, id: generateId() }
        set((state) => ({
          children: [...state.children, child],
          activeChildId: state.activeChildId ?? child.id,
        }))
      },

      updateChild: (id, data) => {
        set((state) => ({
          children: state.children.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        }))
      },

      removeChild: (id) => {
        set((state) => {
          const remaining = state.children.filter((c) => c.id !== id)
          const newActiveId =
            state.activeChildId === id
              ? (remaining[0]?.id ?? null)
              : state.activeChildId
          return {
            children: remaining,
            records: state.records.filter((r) => r.childId !== id),
            activeChildId: newActiveId,
          }
        })
      },

      setActiveChild: (id) => {
        set({ activeChildId: id })
      },

      // ── Record actions ─────────────────────────────────────────────────────

      addTemperatureRecord: (data) => {
        const record: TemperatureRecord = {
          ...data,
          id: generateId(),
          type: 'temperature',
        }
        set((state) => ({
          records: [...state.records, record].sort(
            (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
          ),
        }))
      },

      addMedicationRecord: (data) => {
        const record: MedicationRecord = {
          ...data,
          id: generateId(),
          type: 'medication',
        }
        set((state) => ({
          records: [...state.records, record].sort(
            (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
          ),
        }))
      },

      removeRecord: (id) => {
        set((state) => ({
          records: state.records.filter((r) => r.id !== id),
        }))
      },

      // ── Selectors ──────────────────────────────────────────────────────────

      getChildRecords: (childId) => {
        return get()
          .records.filter((r) => r.childId === childId)
          .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // NOTE: When migrating to a real DB in the future, replace this persist
      // middleware with an API-backed store and keep the same interface.
    }
  )
)

// ── Derived selectors ────────────────────────────────────────────────────────

export const useActiveChild = () => {
  const { children, activeChildId } = useAppStore()
  return children.find((c) => c.id === activeChildId) ?? null
}

export const useActiveChildRecords = (): Record[] => {
  const { records, activeChildId } = useAppStore()
  if (!activeChildId) return []
  return records
    .filter((r) => r.childId === activeChildId)
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
}

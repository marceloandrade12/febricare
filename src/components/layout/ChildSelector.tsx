import { useState } from 'react'
import { Plus, ChevronDown, Settings } from 'lucide-react'
import { useAppStore, useActiveChild } from '@/store/useAppStore'
import { getInitials, calculateAge } from '@/lib/utils'
import { AddChildModal } from '@/components/forms/AddChildModal'
import { ManageChildModal } from '@/components/forms/ManageChildModal'

export function ChildSelector() {
  const { children, setActiveChild } = useAppStore()
  const activeChild = useActiveChild()
  const [addOpen, setAddOpen] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Child pills */}
      <div className="flex gap-2 flex-wrap flex-1">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => {
              setActiveChild(child.id)
              setDropdownOpen(false)
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold font-body transition-all duration-200 ${
              activeChild?.id === child.id
                ? 'text-white border-transparent shadow-md'
                : 'bg-white border-brand-200 text-brand-700 hover:bg-brand-50'
            }`}
            style={
              activeChild?.id === child.id
                ? { backgroundColor: child.avatarColor, borderColor: child.avatarColor }
                : {}
            }
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{
                backgroundColor:
                  activeChild?.id === child.id ? 'rgba(255,255,255,0.25)' : child.avatarColor + '33',
                color:
                  activeChild?.id === child.id ? 'white' : child.avatarColor,
              }}
            >
              {getInitials(child.name)}
            </span>
            {child.name}
            {child.birthDate && (
              <span className="opacity-70 font-normal text-xs">
                {calculateAge(child.birthDate)}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Add child */}
      <button
        className="btn-secondary py-1.5 px-3 text-xs"
        onClick={() => setAddOpen(true)}
        title="Adicionar criança"
      >
        <Plus className="w-3.5 h-3.5" />
        Adicionar
      </button>

      {/* Manage active child */}
      {activeChild && (
        <button
          className="btn-ghost py-1.5 px-3 text-xs"
          onClick={() => setManageOpen(true)}
          title="Gerir criança"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      )}

      <AddChildModal open={addOpen} onClose={() => setAddOpen(false)} />
      {activeChild && (
        <ManageChildModal
          open={manageOpen}
          onClose={() => setManageOpen(false)}
          child={activeChild}
        />
      )}
    </div>
  )
}

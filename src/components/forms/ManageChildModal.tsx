import { useState } from 'react'
import { X, Settings, Trash2, Save } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { AVATAR_COLORS } from '@/lib/utils'
import { Modal } from '@/components/ui/Modal'
import type { Child } from '@/types'

interface Props {
  open: boolean
  onClose: () => void
  child: Child
}

export function ManageChildModal({ open, onClose, child }: Props) {
  const { updateChild, removeChild } = useAppStore()
  const [name, setName] = useState(child.name)
  const [birthDate, setBirthDate] = useState(child.birthDate)
  const [selectedColor, setSelectedColor] = useState(child.avatarColor)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState('')

  const handleSave = () => {
    if (!name.trim()) { setError('O nome é obrigatório.'); return }
    updateChild(child.id, { name: name.trim(), birthDate, avatarColor: selectedColor })
    onClose()
  }

  const handleDelete = () => {
    if (!confirmDelete) { setConfirmDelete(true); return }
    removeChild(child.id)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
              <Settings className="w-5 h-5 text-brand-500" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-gray-800">Gerir perfil</h2>
              <p className="text-xs text-gray-400 font-body">{child.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost p-2 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">Nome *</label>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError('') }}
            />
            {error && <p className="mt-1 text-xs text-red-500 font-body">{error}</p>}
          </div>

          <div>
            <label className="label">Data de nascimento</label>
            <input
              className="input"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="label">Cor do perfil</label>
            <div className="flex gap-2 flex-wrap">
              {AVATAR_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="w-8 h-8 rounded-full transition-transform duration-150 hover:scale-110 focus:outline-none"
                  style={{
                    backgroundColor: color,
                    boxShadow: selectedColor === color ? `0 0 0 2px white, 0 0 0 4px ${color}` : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            className={`btn-danger flex-1 ${confirmDelete ? 'bg-red-100 border-red-400 text-red-700' : ''}`}
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
            {confirmDelete ? 'Confirmar remoção' : 'Remover'}
          </button>
          <button className="btn-primary flex-1" onClick={handleSave}>
            <Save className="w-4 h-4" />
            Guardar
          </button>
        </div>

        {confirmDelete && (
          <p className="mt-2 text-xs text-red-500 text-center font-body">
            Todos os registos desta criança serão eliminados. Esta ação é irreversível.
          </p>
        )}
      </div>
    </Modal>
  )
}

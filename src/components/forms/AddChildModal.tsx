import { useState } from 'react'
import { X, Baby } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { AVATAR_COLORS } from '@/lib/utils'
import { Modal } from '@/components/ui/Modal'

interface Props {
  open: boolean
  onClose: () => void
}

export function AddChildModal({ open, onClose }: Props) {
  const { addChild } = useAppStore()
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [selectedColor, setSelectedColor] = useState(AVATAR_COLORS[0])
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('O nome é obrigatório.')
      return
    }
    addChild({ name: name.trim(), birthDate, avatarColor: selectedColor })
    setName('')
    setBirthDate('')
    setSelectedColor(AVATAR_COLORS[0])
    setError('')
    onClose()
  }

  const handleClose = () => {
    setName('')
    setBirthDate('')
    setSelectedColor(AVATAR_COLORS[0])
    setError('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
              <Baby className="w-5 h-5 text-brand-500" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-gray-800">Nova criança</h2>
              <p className="text-xs text-gray-400 font-body">Cria um perfil para registar a febre</p>
            </div>
          </div>
          <button onClick={handleClose} className="btn-ghost p-2 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">Nome *</label>
            <input
              className="input"
              type="text"
              placeholder="ex: Maria João"
              value={name}
              onChange={(e) => { setName(e.target.value); setError('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              autoFocus
            />
            {error && <p className="mt-1 text-xs text-red-500 font-body">{error}</p>}
          </div>

          {/* Birth date */}
          <div>
            <label className="label">Data de nascimento (opcional)</label>
            <input
              className="input"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Color */}
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
                    ring: selectedColor === color ? `3px solid ${color}` : undefined,
                    outline: selectedColor === color ? `2px solid white` : undefined,
                    boxShadow: selectedColor === color ? `0 0 0 2px white, 0 0 0 4px ${color}` : undefined,
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button className="btn-secondary flex-1" onClick={handleClose}>Cancelar</button>
          <button className="btn-primary flex-1" onClick={handleSubmit}>
            <Baby className="w-4 h-4" />
            Criar perfil
          </button>
        </div>
      </div>
    </Modal>
  )
}

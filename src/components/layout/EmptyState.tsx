import { useState } from 'react'
import { Thermometer, Plus } from 'lucide-react'
import { AddChildModal } from '@/components/forms/AddChildModal'

export function EmptyState() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-16 animate-fade-in">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-14 h-14 rounded-2xl header-gradient flex items-center justify-center shadow-lg shadow-brand-300/40">
          <Thermometer className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-600">FebriCare</h1>
          <p className="text-xs text-brand-400 font-body">Registo de febre infantil</p>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-sm text-center mb-10">
        <div className="text-6xl mb-4">🌡️</div>
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-3 leading-tight">
          Monitoriza a febre<br />com tranquilidade
        </h2>
        <p className="text-gray-500 font-body text-base leading-relaxed">
          Regista temperaturas e medicação administrada. Visualiza a evolução e partilha com o pediatra.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-3 w-full max-w-sm mb-10">
        {[
          { icon: '📊', title: 'Gráfico de evolução', desc: 'Visualiza a temperatura ao longo do tempo' },
          { icon: '💊', title: 'Registo de medicação', desc: 'Brufen e Benuron com horário' },
          { icon: '👶', title: 'Múltiplas crianças', desc: 'Gere vários perfis em simultâneo' },
        ].map((f) => (
          <div key={f.title} className="card px-4 py-3 flex items-center gap-3">
            <span className="text-2xl">{f.icon}</span>
            <div>
              <p className="text-sm font-semibold font-display text-gray-800">{f.title}</p>
              <p className="text-xs text-gray-500 font-body">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="btn-primary text-base px-8 py-3 shadow-lg shadow-brand-300/40" onClick={() => setOpen(true)}>
        <Plus className="w-5 h-5" />
        Adicionar criança
      </button>

      <AddChildModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

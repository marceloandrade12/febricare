import { Thermometer } from 'lucide-react'

export function Header() {
  return (
    <header className="header-gradient text-white shadow-lg shadow-brand-400/20">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
          <Thermometer className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-display font-bold leading-tight">FebriCare</h1>
          <p className="text-[11px] text-white/70 font-body leading-none">Registo de febre infantil</p>
        </div>
      </div>
    </header>
  )
}

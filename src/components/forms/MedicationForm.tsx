import { useState } from 'react'
import { Pill, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { nowLocalISO } from '@/lib/utils'
import type { MedicationType } from '@/types'

interface Props {
  childId: string
}

const MEDICATIONS: { value: MedicationType; label: string; desc: string; color: string }[] = [
  {
    value: 'Benuron',
    label: 'Benuron',
    desc: 'Paracetamol',
    color: 'bg-sky-50 border-sky-300 text-sky-700',
  },
  {
    value: 'Brufen',
    label: 'Brufen',
    desc: 'Ibuprofeno',
    color: 'bg-amber-50 border-amber-300 text-amber-700',
  },
]

const DOSAGES = ['2.5 ml', '5 ml', '7.5 ml', '10 ml', '125 mg', '250 mg', '500 mg']

export function MedicationForm({ childId }: Props) {
  const { addMedicationRecord } = useAppStore()
  const [datetime, setDatetime] = useState(nowLocalISO())
  const [medication, setMedication] = useState<MedicationType>('Benuron')
  const [dosage, setDosage] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = () => {
    if (!datetime) { setError('Seleciona a data e hora.'); return }

    addMedicationRecord({
      childId,
      datetime: new Date(datetime).toISOString(),
      medication,
      dosage: dosage.trim() || undefined,
      notes: notes.trim() || undefined,
    })

    setDatetime(nowLocalISO())
    setDosage('')
    setNotes('')
    setError('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2500)
  }

  return (
    <div className="space-y-4">
      {/* Medication selector */}
      <div>
        <label className="label">💊 Medicamento</label>
        <div className="grid grid-cols-2 gap-3">
          {MEDICATIONS.map((med) => (
            <button
              key={med.value}
              onClick={() => setMedication(med.value)}
              className={`flex flex-col items-center justify-center py-4 px-3 rounded-xl border-2 transition-all duration-200 ${
                medication === med.value
                  ? `${med.color} shadow-sm scale-[1.02]`
                  : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl mb-1">{med.value === 'Benuron' ? '🔵' : '🟡'}</span>
              <span className="font-display font-bold text-sm">{med.label}</span>
              <span className="font-body text-xs opacity-70">{med.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Date/Time */}
        <div>
          <label className="label">📅 Data e hora</label>
          <input
            className="input"
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            max={nowLocalISO()}
          />
        </div>

        {/* Dosage */}
        <div>
          <label className="label">⚖️ Dosagem (opcional)</label>
          <div className="relative">
            <input
              className="input pr-2"
              type="text"
              list="dosage-options"
              placeholder="ex: 5 ml"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
            <datalist id="dosage-options">
              {DOSAGES.map((d) => <option key={d} value={d} />)}
            </datalist>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="label">📝 Notas (opcional)</label>
        <input
          className="input"
          type="text"
          placeholder="ex: antes das refeições..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-3 py-2 font-body">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="flex items-center gap-2 text-emerald-700 text-sm bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 font-body animate-fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          Medicação registada com sucesso!
        </div>
      )}

      <button
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold font-body text-sm transition-all duration-150 shadow-sm"
        style={{ background: 'linear-gradient(135deg, #e27e2c, #c15e1a)' }}
        onClick={handleSubmit}
      >
        <Pill className="w-4 h-4" />
        Registar medicação
      </button>
    </div>
  )
}

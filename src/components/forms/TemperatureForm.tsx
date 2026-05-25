import { useState } from 'react'
import { Thermometer, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { nowLocalISO, temperatureColor, temperatureLabel } from '@/lib/utils'

interface Props {
  childId: string
}

export function TemperatureForm({ childId }: Props) {
  const { addTemperatureRecord } = useAppStore()
  const [datetime, setDatetime] = useState(nowLocalISO())
  const [temperature, setTemperature] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const tempNum = parseFloat(temperature.replace(',', '.'))
  const isValidTemp = !isNaN(tempNum) && tempNum >= 34 && tempNum <= 42

  const handleSubmit = () => {
    if (!temperature.trim()) { setError('Introduz a temperatura.'); return }
    if (!isValidTemp) { setError('Temperatura inválida. Deve estar entre 34°C e 42°C.'); return }
    if (!datetime) { setError('Seleciona a data e hora.'); return }

    addTemperatureRecord({
      childId,
      datetime: new Date(datetime).toISOString(),
      temperature: tempNum,
      notes: notes.trim() || undefined,
    })

    setTemperature('')
    setNotes('')
    setDatetime(nowLocalISO())
    setError('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2500)
  }

  return (
    <div className="space-y-4">
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

        {/* Temperature */}
        <div>
          <label className="label">🌡️ Temperatura (°C)</label>
          <div className="relative">
            <input
              className={`input pr-20 font-mono text-base ${
                temperature && isValidTemp ? temperatureColor(tempNum) : ''
              }`}
              type="text"
              inputMode="decimal"
              placeholder="ex: 38.5"
              value={temperature}
              onChange={(e) => { setTemperature(e.target.value); setError('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            {temperature && isValidTemp && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span className={`text-xs font-semibold font-body ${temperatureColor(tempNum)}`}>
                  {temperatureLabel(tempNum)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="label">📝 Notas (opcional)</label>
        <input
          className="input"
          type="text"
          placeholder="ex: a criança estava agitada..."
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
          Temperatura registada com sucesso!
        </div>
      )}

      <button className="btn-primary w-full" onClick={handleSubmit}>
        <Thermometer className="w-4 h-4" />
        Registar temperatura
      </button>
    </div>
  )
}

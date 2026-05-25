import { useState } from 'react'
import { Trash2, Thermometer, Pill, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import {
  formatDateTime,
  temperatureColor,
  temperatureBgColor,
  temperatureLabel,
} from '@/lib/utils'
import type { Record, TemperatureRecord, MedicationRecord } from '@/types'

interface Props {
  records: Record[]
}

export function RecordsTable({ records }: Props) {
  const { removeRecord } = useAppStore()
  const [sortDesc, setSortDesc] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const sorted = [...records].sort((a, b) => {
    const diff = new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    return sortDesc ? -diff : diff
  })

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      removeRecord(id)
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(id)
      setTimeout(() => setDeleteConfirm(null), 3000)
    }
  }

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-brand-100">
        <h3 className="font-display font-bold text-gray-800">
          Todos os registos
          <span className="ml-2 badge bg-brand-50 text-brand-600 border border-brand-200">
            {records.length}
          </span>
        </h3>
        <button
          onClick={() => setSortDesc((v) => !v)}
          className="btn-ghost py-1.5 px-3 text-xs gap-1"
        >
          {sortDesc ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          {sortDesc ? 'Mais recentes' : 'Mais antigos'}
        </button>
      </div>

      {/* Records list */}
      <div className="divide-y divide-brand-50">
        {sorted.map((record) => (
          <RecordRow
            key={record.id}
            record={record}
            onDelete={() => handleDelete(record.id)}
            isConfirming={deleteConfirm === record.id}
          />
        ))}
      </div>

      {records.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-gray-400 text-sm font-body">Sem registos</p>
        </div>
      )}
    </div>
  )
}

function RecordRow({
  record,
  onDelete,
  isConfirming,
}: {
  record: Record
  onDelete: () => void
  isConfirming: boolean
}) {
  const isTemp = record.type === 'temperature'
  const tempRecord = isTemp ? (record as TemperatureRecord) : null
  const medRecord = !isTemp ? (record as MedicationRecord) : null

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-brand-50/40 ${
        isConfirming ? 'bg-red-50' : ''
      }`}
    >
      {/* Icon */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isTemp ? 'bg-brand-50' : 'bg-amber-50'
        }`}
      >
        {isTemp ? (
          <Thermometer className="w-4 h-4 text-brand-500" />
        ) : (
          <Pill className="w-4 h-4 text-amber-600" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {tempRecord && (
            <>
              <span
                className={`font-mono font-bold text-base leading-none ${temperatureColor(
                  tempRecord.temperature
                )}`}
              >
                {tempRecord.temperature.toFixed(1)}°C
              </span>
              <span
                className={`badge text-[10px] border ${temperatureBgColor(tempRecord.temperature)}`}
              >
                {temperatureLabel(tempRecord.temperature)}
              </span>
            </>
          )}
          {medRecord && (
            <>
              <span
                className={`badge border font-semibold ${
                  medRecord.medication === 'Benuron'
                    ? 'bg-sky-50 text-sky-700 border-sky-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                {medRecord.medication === 'Benuron' ? '🔵' : '🟡'} {medRecord.medication}
              </span>
              {medRecord.dosage && (
                <span className="text-xs text-gray-500 font-body">{medRecord.dosage}</span>
              )}
            </>
          )}
        </div>
        <p className="text-xs text-gray-400 font-body mt-0.5">{formatDateTime(record.datetime)}</p>
        {record.notes && (
          <p className="text-xs text-gray-500 font-body mt-0.5 italic truncate">{record.notes}</p>
        )}
      </div>

      {/* Delete */}
      <button
        onClick={onDelete}
        className={`flex-shrink-0 p-2 rounded-xl transition-all duration-150 ${
          isConfirming
            ? 'bg-red-500 text-white'
            : 'text-gray-300 hover:text-red-400 hover:bg-red-50'
        }`}
        title={isConfirming ? 'Clica novamente para confirmar' : 'Eliminar registo'}
      >
        {isConfirming ? (
          <AlertCircle className="w-4 h-4" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}

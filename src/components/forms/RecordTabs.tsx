import { useState } from 'react'
import { Thermometer, Pill } from 'lucide-react'
import { TemperatureForm } from './TemperatureForm'
import { MedicationForm } from './MedicationForm'

interface Props {
  childId: string
}

type Tab = 'temperature' | 'medication'

export function RecordTabs({ childId }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('temperature')

  return (
    <div className="card overflow-hidden">
      {/* Tab header */}
      <div className="flex border-b border-brand-100">
        <button
          onClick={() => setActiveTab('temperature')}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold font-body transition-all duration-200 border-b-2 ${
            activeTab === 'temperature'
              ? 'border-brand-500 text-brand-600 bg-brand-50/50'
              : 'border-transparent text-gray-400 hover:text-brand-400 hover:bg-brand-50/30'
          }`}
        >
          <Thermometer className="w-4 h-4" />
          Temperatura
        </button>
        <button
          onClick={() => setActiveTab('medication')}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold font-body transition-all duration-200 border-b-2 ${
            activeTab === 'medication'
              ? 'border-warm-500 text-warm-600 bg-warm-50/50'
              : 'border-transparent text-gray-400 hover:text-warm-400 hover:bg-warm-50/30'
          }`}
          style={activeTab === 'medication' ? { borderColor: '#e27e2c', color: '#c15e1a' } : {}}
        >
          <Pill className="w-4 h-4" />
          Medicação
        </button>
      </div>

      {/* Form body */}
      <div className="p-4 sm:p-5">
        {activeTab === 'temperature' && <TemperatureForm childId={childId} />}
        {activeTab === 'medication' && <MedicationForm childId={childId} />}
      </div>
    </div>
  )
}

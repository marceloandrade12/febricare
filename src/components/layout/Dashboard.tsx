import { useState } from 'react'
import { Header } from './Header'
import { ChildSelector } from './ChildSelector'
import { RecordTabs } from '../forms/RecordTabs'
import { RecordsTable } from '../table/RecordsTable'
import { TemperatureChart } from '../charts/TemperatureChart'
import { useActiveChild, useActiveChildRecords } from '@/store/useAppStore'

export function Dashboard() {
  const activeChild = useActiveChild()
  const records = useActiveChildRecords()
  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart')

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pb-10 pt-4 space-y-4 animate-slide-up">
        {/* Child selector */}
        <ChildSelector />

        {activeChild && (
          <>
            {/* Input forms */}
            <RecordTabs childId={activeChild.id} />

            {/* Records count */}
            {records.length > 0 && (
              <>
                {/* Tab switcher */}
                <div className="card p-1 flex gap-1">
                  <button
                    onClick={() => setActiveTab('chart')}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold font-body transition-all duration-200 ${
                      activeTab === 'chart'
                        ? 'bg-brand-500 text-white shadow-sm'
                        : 'text-brand-500 hover:bg-brand-50'
                    }`}
                  >
                    📊 Gráfico
                  </button>
                  <button
                    onClick={() => setActiveTab('table')}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold font-body transition-all duration-200 ${
                      activeTab === 'table'
                        ? 'bg-brand-500 text-white shadow-sm'
                        : 'text-brand-500 hover:bg-brand-50'
                    }`}
                  >
                    📋 Registos
                  </button>
                </div>

                {activeTab === 'chart' && <TemperatureChart records={records} />}
                {activeTab === 'table' && <RecordsTable records={records} />}
              </>
            )}

            {records.length === 0 && (
              <div className="card p-10 text-center">
                <div className="text-5xl mb-3">🌡️</div>
                <p className="font-display font-semibold text-gray-700 mb-1">Sem registos ainda</p>
                <p className="text-sm text-gray-400 font-body">
                  Adiciona o primeiro registo de temperatura ou medicação acima.
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

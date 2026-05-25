import {
  ComposedChart,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  Cell,
} from 'recharts'
import { formatShortDateTime, formatDateTime, temperatureChartColor } from '@/lib/utils'
import type { Record, TemperatureRecord, MedicationRecord } from '@/types'

interface Props {
  records: Record[]
}

interface ChartPoint {
  time: string
  displayTime: string
  temperature?: number
  color?: string
  isMedication: boolean
  medicationLabel?: string
  fullDatetime: string
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChartPoint }> }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload

  return (
    <div className="bg-white border border-brand-100 rounded-2xl px-4 py-3 shadow-xl text-sm">
      <p className="font-display font-semibold text-gray-700 mb-1">{formatDateTime(d.fullDatetime)}</p>
      {d.isMedication ? (
        <p className="font-body text-warm-600 font-semibold">
          💊 {d.medicationLabel}
        </p>
      ) : (
        <p className="font-mono font-bold text-lg" style={{ color: d.color }}>
          {d.temperature?.toFixed(1)}°C
        </p>
      )}
    </div>
  )
}

export function TemperatureChart({ records }: Props) {
  const tempRecords = records.filter((r): r is TemperatureRecord => r.type === 'temperature')
  const medRecords = records.filter((r): r is MedicationRecord => r.type === 'medication')

  if (tempRecords.length === 0) {
    return (
      <div className="card p-8 text-center">
        <div className="text-4xl mb-2">📊</div>
        <p className="font-display font-semibold text-gray-600">Sem temperaturas registadas</p>
        <p className="text-sm text-gray-400 font-body mt-1">Adiciona pelo menos um registo de temperatura para ver o gráfico.</p>
      </div>
    )
  }

  // Build temperature line data
  const tempData: ChartPoint[] = tempRecords.map((r) => ({
    time: r.datetime,
    displayTime: formatShortDateTime(r.datetime),
    temperature: r.temperature,
    color: temperatureChartColor(r.temperature),
    isMedication: false,
    fullDatetime: r.datetime,
  }))

  // Min/max for Y axis
  const temps = tempRecords.map((r) => r.temperature)
  const minTemp = Math.max(35, Math.floor(Math.min(...temps)) - 0.5)
  const maxTemp = Math.min(42, Math.ceil(Math.max(...temps)) + 0.5)

  return (
    <div className="card p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-gray-800">Evolução da temperatura</h3>
        <div className="flex items-center gap-3 text-xs font-body">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-400 inline-block" />
            Temperatura
          </span>
          {medRecords.length > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-warm-400 inline-block" />
              Medicação
            </span>
          )}
        </div>
      </div>

      {/* Temperature legend */}
      <div className="flex gap-2 flex-wrap text-xs font-body">
        {[
          { color: '#10b981', label: 'Normal (<37.5°)' },
          { color: '#eab308', label: 'Subfebril (37.5–38°)' },
          { color: '#f97316', label: 'Febre leve (38–38.5°)' },
          { color: '#ef4444', label: 'Febre (38.5–39.5°)' },
          { color: '#b91c1c', label: 'Febre alta (>39.5°)' },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="text-gray-500">{label}</span>
          </span>
        ))}
      </div>

      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={tempData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffe4ea" vertical={false} />

            <XAxis
              dataKey="displayTime"
              tick={{ fontSize: 11, fontFamily: 'DM Sans', fill: '#b07090' }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[minTemp, maxTemp]}
              tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#b07090' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v.toFixed(1)}°`}
              tickCount={6}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Fever reference lines */}
            <ReferenceLine y={38} stroke="#f97316" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: '38°', position: 'insideRight', fontSize: 10, fill: '#f97316', fontFamily: 'JetBrains Mono' }} />
            <ReferenceLine y={39} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: '39°', position: 'insideRight', fontSize: 10, fill: '#ef4444', fontFamily: 'JetBrains Mono' }} />

            {/* Medication markers as vertical reference lines */}
            {medRecords.map((med) => (
              <ReferenceLine
                key={med.id}
                x={formatShortDateTime(med.datetime)}
                stroke="#e27e2c"
                strokeWidth={2}
                strokeDasharray="6 3"
                label={{
                  value: med.medication === 'Benuron' ? '🔵' : '🟡',
                  position: 'top',
                  fontSize: 14,
                }}
              />
            ))}

            {/* Temperature line */}
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#ff3370"
              strokeWidth={2.5}
              dot={({ cx, cy, payload }: { cx: number; cy: number; payload: ChartPoint }) => (
                <circle
                  key={`dot-${payload.time}`}
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={payload.color ?? '#ff3370'}
                  stroke="white"
                  strokeWidth={2}
                />
              )}
              activeDot={{ r: 7, stroke: 'white', strokeWidth: 2 }}
              connectNulls
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Medication timeline */}
      {medRecords.length > 0 && (
        <div>
          <p className="text-xs font-semibold font-body text-gray-500 mb-2">Medicação administrada</p>
          <div className="flex gap-2 flex-wrap">
            {medRecords.map((med) => (
              <span
                key={med.id}
                className={`badge ${
                  med.medication === 'Benuron'
                    ? 'bg-sky-50 text-sky-700 border border-sky-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {med.medication === 'Benuron' ? '🔵' : '🟡'} {med.medication}
                {med.dosage && ` ${med.dosage}`}
                <span className="opacity-60">· {formatShortDateTime(med.datetime)}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

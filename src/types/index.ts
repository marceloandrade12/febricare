// ─── Core Domain Types ───────────────────────────────────────────────────────

export type MedicationType = 'Brufen' | 'Benuron'

export interface TemperatureRecord {
  id: string
  type: 'temperature'
  datetime: string   // ISO 8601
  temperature: number  // °C
  notes?: string
  childId: string
}

export interface MedicationRecord {
  id: string
  type: 'medication'
  datetime: string   // ISO 8601
  medication: MedicationType
  dosage?: string
  notes?: string
  childId: string
}

export type Record = TemperatureRecord | MedicationRecord

// ─── Child Profile ─────────────────────────────────────────────────────────

export interface Child {
  id: string
  name: string
  birthDate: string  // ISO 8601
  avatarColor: string
}

// ─── Store Types ───────────────────────────────────────────────────────────

export interface AppState {
  children: Child[]
  records: Record[]
  activeChildId: string | null

  // Child actions
  addChild: (child: Omit<Child, 'id'>) => void
  updateChild: (id: string, child: Partial<Omit<Child, 'id'>>) => void
  removeChild: (id: string) => void
  setActiveChild: (id: string | null) => void

  // Record actions
  addTemperatureRecord: (record: Omit<TemperatureRecord, 'id' | 'type'>) => void
  addMedicationRecord: (record: Omit<MedicationRecord, 'id' | 'type'>) => void
  removeRecord: (id: string) => void

  // Selectors
  getChildRecords: (childId: string) => Record[]
}

// ─── UI / Form Types ───────────────────────────────────────────────────────

export interface TemperatureFormData {
  datetime: string
  temperature: string
  notes: string
}

export interface MedicationFormData {
  datetime: string
  medication: MedicationType
  dosage: string
  notes: string
}

// ─── Chart Types ───────────────────────────────────────────────────────────

export interface ChartDataPoint {
  datetime: string
  displayTime: string
  temperature?: number
  medication?: MedicationType
  isMedication: boolean
}

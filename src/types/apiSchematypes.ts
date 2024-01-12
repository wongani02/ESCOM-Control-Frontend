

export interface Feeder {
    pk: string
    feeder: string
    number_of_transformers: number
    installed_capacity: number
    domestic: boolean
    commercial: boolean
    industrial: boolean
    area: string
    url: string
}


export interface BaseReport {
    pk: number
    name: string
    date: string
    created: string
}


export interface Defect {
    date_reported: string
    description: string
    responsible_office: string
    action_taken: string
    days_outstanding: string
    remarks: string
}


export interface HVReport {
    feeder: Feeder
    report: number
    cause: string
    remarks: string
    outage_description: string
    date_time_out: string
    date_time_restored: string
    pk: number
}


export interface ForcedOutage {
    feeder: Feeder
    report: number
    cause: string
    remarks: string
    installed_capacity: number
    number_of_tx: number
    affected_areas: string
    outage_description: string
    date_time_out: string
    date_time_restored: string
    load: number
    pk: number
}


export interface PlannedOutage {
    feeder: Feeder
    report: number
    cause: string
    remarks: string
    installed_capacity: number
    number_of_tx: number
    affected_areas: string
    outage_description: string
    planned_date_time_out: string
    planned_date_time_restored: string
    actual_date_time_out: string
    actual_date_time_restored: string
    load: number
    pk: number
}


export interface BaseReportList {
    pk: number
    name: string
    date: string
    hv_report: [HVReport]
    defect_records: [Defect]
    forced_outage_records: [ForcedOutage]
    planned_outage_records: [PlannedOutage]
}

export interface MimicNumber {
    pk: number
    mimic_number: number
    date: string
    description: string
    feeder: Feeder
    size: number
    location: string
}

export interface TXReplacementRecord {
    pk: number
    date: string
    location: string
    feeder: Feeder
    substation_number: number
    capacity: number
    year: number
    serial_number: string
    manufacturer: string
    remarks: string
}


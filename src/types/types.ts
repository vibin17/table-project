export type Filter = {
    status: string
    type: string
} 

export type Column = {
    name: string
    sortable?: boolean
    filterable?: boolean
}

export type DataItem = {
    id: number
    name: string
    status: string,
    type: string
    conditions: string
    volume: string | number
    roi: string | number
    free: number
    hedge: string | number
}
export enum FieldStatuses {
    GREEN = 'green',
    YELLOW = 'yellow',
    RED = 'red'
}

export type Filter = {
    status: FieldStatuses
    type: string
} 

export type Column = {
    name: string
    sortable?: boolean
    filterable?: boolean
}

export const getColumns = () => [
    {
        name: 'Project',
        sortable: true,
        filterable: true
    },
    {
        name: 'Token type',
        filterable: true
    },
    {
        name: 'Conditions',
    },
    {
        name: 'Volume',
        sortable: true
    },
    {
        name: 'ROI'
    },
    {
        name: 'Free float'
    },
    {
        name: 'Insurance hedge'
    }
]


export type DataItem = {
    id: number
    name: string
    status: FieldStatuses,
    type: string
    conditions: string
    volume: string | number
    roi: string | number
    free: number
    hedge: string | number
}

export type FormatedData = {
    id: number
    name: string
    status: FieldStatuses,
    type: string
    conditions: string
    volume: string
    roi: string
    free: number
    hedge: string
}
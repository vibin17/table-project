export enum FieldStatuses {
    GREEN = 'green',
    YELLOW = 'yellow',
    RED = 'red'
}

export type TableItemData = {
    id: number
    name: string
    status: FieldStatuses,
    type: string,
    conditions: string,
    volume: number,
    roi: number,
    free: number,
    hedge: number
}
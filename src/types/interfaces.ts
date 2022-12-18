export interface IProducts {
    id: string
    status: 'active' | 'archive'
    sum: number
    qty: number
    volume: number,
    name: string,
    delivery_date: string,
    currency: string
    checked?: boolean
    total?: number
}
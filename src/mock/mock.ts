import {IProducts} from "../types/interfaces";

function getID(): string {
    const BASE = 36
    const START =2
    const FIN =9
    return Math.random().toString(BASE).substring(START, FIN);
}

export const products1: IProducts[] = [
    {id: getID(), status: 'active', sum: 55, qty: 23, volume: 45, name: 'radio', delivery_date: '05.15.2027', currency: 'rub'},
    {id: getID(), status: 'archive', sum: 45, qty: 27, volume: 37, name: 'video', delivery_date: '05.23.2024', currency: 'rub'},
    {id: getID(), status: 'archive', sum: 4557, qty: 274, volume: 374, name: 'videola', delivery_date: '04.24.2025', currency: 'rub'},
]

export const products2: IProducts[] = [
    {id: getID(), status: 'active', sum: 155, qty: 233, volume: 425, name: 'phone', delivery_date: '05.14.2026', currency: 'usd'},
    {id: getID(), status: 'archive', sum: 125, qty: 237, volume: 373, name: 'laptop', delivery_date: '05.08.2023', currency: 'usd'},
]
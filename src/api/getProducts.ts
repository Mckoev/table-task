import {products1, products2} from "../mock/mock";
import URL_PRODUCTS from "./apiData";
import {IProducts} from "../types/interfaces";

// imitation of receiving responses from the server
async function getProducts() {
    try {
        const responce1 = fetch(`${URL_PRODUCTS}/documents1`)
            .then(response => new Promise(resolve => {
                setTimeout(() => resolve(products1), 3000)
            }))
            .catch(error => []);   // Handle the error

        const responce2 = fetch(`${URL_PRODUCTS}/documents2`)
            .then(response => new Promise(resolve => {
                setTimeout(() => resolve(products2), 1000)
            }))
            .catch(error => []);   // Handle the error

        const result: Array<{ [key: string]: any }> = await Promise.all([responce1 as Promise<Array<{ [key: string]: any }>>, responce2 as Promise<Array<{ [key: string]: any }>>])
            .then(res => res)
            .catch(error => []);   // Handle the error

        return result.flat()
    } catch (error) {
        return []
    }
}

export default getProducts
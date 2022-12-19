import {useCallback, useEffect, useRef, useState} from "react";
import getProducts from "../api/getProducts";
import sortByField from "../helpers/sortByField";
import {IProducts} from "../types/interfaces";


function UseTableProductLogic ()  {

    const [products, setProducts] = useState<IProducts[]>([])
    const [initialProduct, setInitialProduct] = useState<IProducts[]>([])
    const searchTextRef = useRef('');
    const [checkboxSelectAll, setCheckboxSelectAll] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [productDownloaded, setProductDownloaded] = useState(false)

    useEffect(() => {
        (async () => {
            const receivedProducts: Array<{ [key: string]: any }> = await getProducts()
            const addedFieldsProducts: Array<{ [key: string]: any }> = receivedProducts.map((el) => ({
                ...el,
                checked: false,
                total: el.sum * el.qty
            }))
            const sortedProducts = sortByField(addedFieldsProducts, 'delivery_date')
            setProducts(sortedProducts)
            setInitialProduct(sortedProducts)
            setProductDownloaded(true)
        })();
    }, []);

    const qty = products.reduce((acc, current) => acc + current.qty, 0);
    const volume = products.reduce((acc, current) => acc + current.volume, 0);

    function changeCheckbox(id) {
        const newRows = products.map((el) => {
            if (el.id === id) {
                return {
                    ...el,
                    checked: !el.checked
                }
            }
            return el
        })
        setProducts(newRows)
        const checked: IProducts[] = newRows.filter(item => item.checked);
        if (checked.length === products.length) {
            setCheckboxSelectAll(true)
        } else {
            setCheckboxSelectAll(false)
        }
    }

    function setSelectAll() {
        setCheckboxSelectAll(!checkboxSelectAll)
        const newList = products.map((el) => ({...el, checked: !checkboxSelectAll})); // check all campaigns
        setProducts(newList)
    }

    const handleSearch = useCallback((event) => {
        event.preventDefault()
        searchTextRef.current = event.target.value;

        // Filter the data based on the search text
        const filteredItems = initialProduct.filter(item =>
            Object.values(item)
                .join(' ')
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
        );
        if (JSON.stringify(filteredItems) !== JSON.stringify(products)) {
            setProducts(filteredItems);
        }
    }, [initialProduct, searchTextRef.current]);

    return {
        handleSearch,
        checkboxSelectAll,
        setSelectAll,
        products,
        setProducts,
        changeCheckbox,
        qty,
        volume,
        openModal,
        setOpenModal,
        productDownloaded,
        setInitialProduct
    }
};

export default UseTableProductLogic;
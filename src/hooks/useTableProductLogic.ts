import {useCallback, useEffect, useState} from "react";
import getProducts from "../api/getProducts";
import sortByField from "../helpers/sortByField";
import {IProducts} from "../types/interfaces";


function UseTableProductLogic ()  {

    const [products, setProducts] = useState<IProducts[]>([])
    const [initialProduct, setInitialProduct] = useState<IProducts[]>([])
    const [searchText, setSearchText] = useState('');
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
         setSearchText(event.target.value);
        // Check if the search text is empty and set the filtered data to the original data if it is
        if (event.target.value === '') {
            setProducts(initialProduct);
            return;
        }

        // Filter the data based on the search text
        const filteredItems = initialProduct.filter(item =>
            Object.values(item)
                .join(' ')
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
        );
         setProducts(filteredItems);
    }, [initialProduct, setProducts, setSearchText]);

    return {
        searchText,
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
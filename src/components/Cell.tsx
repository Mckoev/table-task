import React from 'react'
import TableCell from "@mui/material/TableCell";
import {Checkbox} from "@mui/material";
import {IProducts} from "../types/interfaces";

interface IPropsCell {
    product: IProducts
    changeCheckbox: (id) => void
}

function Cell({product, changeCheckbox}: IPropsCell) {

    const handleChange = () => {
        changeCheckbox(product.id)
    };

    return (
        <>
            <TableCell component="th" scope="row" align="center">
                <Checkbox checked={product.checked} onChange={() => handleChange()}/>
            </TableCell>
            <TableCell align="right">{product.name}</TableCell>
            <TableCell align="right">{product.sum}</TableCell>
            <TableCell align="right">{product.qty}</TableCell>
            <TableCell align="right">{product.volume}</TableCell>
            <TableCell align="right">{product.status}</TableCell>
            <TableCell align="right">{product.delivery_date}</TableCell>
            <TableCell align="right">{product.currency}</TableCell>
            <TableCell align="right">{product.total} {product.currency}</TableCell>
        </>
    );
}

export default React.memo(Cell)

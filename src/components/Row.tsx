import TableRow from "@mui/material/TableRow";
import * as React from "react";
import Cell from "./Cell";
import {IProducts} from "../types/interfaces";

interface IPropsDocuments {
    products: IProducts[];
    changeCheckbox: (id) => void
}
function Row({products, changeCheckbox}: IPropsDocuments) {

    return (
        <>
            {products.map((product) => (
                <TableRow
                    key={product.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <Cell product={product} changeCheckbox={changeCheckbox}/>
                </TableRow>
            ))}
        </>
    );
};

export default React.memo(Row)
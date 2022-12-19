import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Button, Checkbox, CircularProgress, Container, TableFooter, TextField} from "@mui/material";
import Row from "./Row";
import Popup from "./Popup";
import useTableProductLogic from "../hooks/useTableProductLogic";
import LoadingIndicator from "./LoadingIndicator";



function TableProducts() {

    const {
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
    } = useTableProductLogic()

    return (
        <Container>
            {productDownloaded ?
                (<>
                    <TextField fullWidth label="Search" onChange={handleSearch}
                               focused
                               sx={{
                                   marginTop: "20px",
                                   marginBottom: "20px",
                                   borderColor: "primary"
                               }}/>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><Checkbox checked={checkboxSelectAll}
                                                                        onChange={() => setSelectAll()}/></TableCell>
                                    <TableCell align="right">NAME</TableCell>
                                    <TableCell align="right">Sum</TableCell>
                                    <TableCell align="right">QTY</TableCell>
                                    <TableCell align="right">VOLUME</TableCell>
                                    <TableCell align="right">STATUS</TableCell>
                                    <TableCell align="right">DELIVERY DATE</TableCell>
                                    <TableCell align="right">CURRENCY</TableCell>
                                    <TableCell align="right">ВСЕГО</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <Row products={products} changeCheckbox={(id) => changeCheckbox(id)}/>
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
                                        <Typography variant="h6">Общий объем (QTY): {qty}</Typography>
                                        <Typography variant="h6">Общее количество (VOLUME): {volume}</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                    <Container sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 100
                    }}>
                        <Button variant="contained" onClick={() => setOpenModal(true)}>Аннулировать</Button>
                    </Container>
                    <Popup openModal={openModal} setOpenModal={setOpenModal} products={products}
                           setProducts={setProducts} setInitialProduct={setInitialProduct}/>
                </>)
                :
                (<LoadingIndicator/>)}
        </Container>
    );
}


export default React.memo(TableProducts)
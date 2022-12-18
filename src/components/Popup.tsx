import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {IProducts} from "../types/interfaces";
import sendRemovedProducts from "../api/sendRemovedProducts";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IPopupProps {
    openModal: boolean;
    setOpenModal: (newValue: boolean) => void;
    products: IProducts[];
    setProducts: (newValue: IProducts[]) => void;
    setInitialProduct: (newValue: IProducts[]) => void;
}

function Popup({openModal, setOpenModal, products, setProducts, setInitialProduct}: IPopupProps) {

    const checkedProducts = products.filter(el => el.checked)
    const removeNamesProducts = checkedProducts.map((el) => el.name).join(', ')
    const removeIdProducts = checkedProducts.map((el) => el.id)

    function removeProducts() {
        sendRemovedProducts(removeIdProducts)
        setOpenModal(false)
        const unCheckedProducts = products.filter(el => !el.checked)
        setProducts(unCheckedProducts)
        setInitialProduct(unCheckedProducts)
    }

    return (
        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    {removeNamesProducts ? (
                        `Вы уверены что хотите аннулировать товар(ы): ${removeNamesProducts}?`
                    ) : (
                        'Не выбрано ни одного товара для аннулирования!'
                    )}
                </Typography>
                <Box sx={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    {removeNamesProducts ? (
                        <Button variant="contained" color="success" onClick={() => removeProducts()}>
                            Применить
                        </Button>
                    ) : (
                        <Button variant="contained" disabled >
                            Применить
                        </Button>
                    )}
                    <Button variant="outlined" color="error" onClick={() => setOpenModal(false)}>
                        Отклонить
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default Popup
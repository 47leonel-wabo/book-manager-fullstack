import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";

const AddItem = ({ addItem }) => {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({
        product: "",
        amount: "",
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleAddItem = () => {
        addItem(item);
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setItem({
            ...item,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleOpen}
                    style={{ marginTop: "16px" }}
                >
                    Add Item
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">New Item</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="product"
                            value={item.product}
                            onChange={handleChange}
                            label="Product"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="amount"
                            value={item.amount}
                            onChange={handleChange}
                            label="Amount"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddItem} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default AddItem;

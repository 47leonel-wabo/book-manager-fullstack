import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";

const AddBook = ({ handleSave }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [book, setBook] = useState({
        title: "",
        publisher: "",
        topic: "",
        isbn: "",
        publicationDate: "",
        price: "",
    });

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleChange = (event) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    };

    const handleSaveBook = () => {
        handleSave(book);
        handleClose();
    };

    return (
        <>
            <div>
                <button onClick={handleOpen}>Add book</button>
                <Dialog open={isOpen} onClose={handleClose}>
                    <DialogTitle>
                        <Typography variant="h6" color="inherit">
                            New Book
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="outline-basic"
                            variant="outlined"
                            size="small"
                            label="Book title"
                            fullWidth
                            margin="normal"
                            defaultValue={book.title}
                            name="title"
                            onChange={handleChange}
                        />
                        <TextField
                            id="outline-basic"
                            variant="outlined"
                            label="Publisher"
                            size="small"
                            fullWidth
                            margin="normal"
                            defaultValue={book.publisher}
                            name="publisher"
                            onChange={handleChange}
                        />
                        <TextField
                            id="outline-basic"
                            variant="outlined"
                            label="Book topic"
                            defaultValue={book.topic}
                            size="small"
                            fullWidth
                            margin="normal"
                            name="topic"
                            onChange={handleChange}
                        />
                        <TextField
                            id="outline-basic"
                            variant="outlined"
                            label="Book ISBN"
                            defaultValue={book.isbn}
                            fullWidth
                            margin="normal"
                            size="small"
                            name="isbn"
                            onChange={handleChange}
                        />
                        <TextField
                            id="outline-basic"
                            variant="outlined"
                            label="Publication Date"
                            size="small"
                            fullWidth
                            margin="normal"
                            defaultValue={book.publicationDate}
                            name="publicationDate"
                            onChange={handleChange}
                        />
                        <TextField
                            id="outline-basic"
                            variant="outlined"
                            label="Book Price"
                            size="small"
                            defaultValue={book.price}
                            name="price"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveBook}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default AddBook;

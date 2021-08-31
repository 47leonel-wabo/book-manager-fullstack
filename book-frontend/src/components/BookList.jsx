import React from "react";
import { useMemo, useState } from "react";
import { useTable } from "react-table";
import * as CONSTANT from "../constant";
import { Box, Button } from "@material-ui/core";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBook from "./AddBook";
import EditBook from "./EditBoot";
import { CSVLink } from "react-csv";
import Grid from "@material-ui/core/Grid";

const BookList = (props) => {
    const [books, setBooks] = useState([]);

    const notify = () =>
        toast.success("Book deleted successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    // GET
    const fetchBookData = () => {
        // First, get jwt token from user session
        const token = sessionStorage.getItem("jwt");
        // Then, this token to the header
        fetch(CONSTANT.SERVER_URL.concat("/api/books"), {
            headers: {
                Authorization: token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setBooks(data._embedded.books);
            })
            .catch((error) => console.error(error));
    };

    // POST
    const addBook = (book) => {
        // First, get jwt token from user session
        const token = sessionStorage.getItem("jwt");
        fetch(CONSTANT.SERVER_URL.concat("/api/books"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(book),
        })
            .then((response) => fetchBookData())
            .catch((error) => console.error(error));
    };

    // PUT
    const updateBook = (book, link) => {
        // First, get jwt token from user session
        const token = sessionStorage.getItem("jwt");
        fetch(link, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(book),
        })
            .then((response) => {
                toast.success("Change saved", {
                    position: toast.POSITION.TOP_CENTER,
                });
                fetchBookData();
            })
            .catch((error) => {
                toast.error("An error occurred", {
                    position: toast.POSITION.TOP_LEFT,
                });
                console.error(error);
            });
    };

    useMemo(() => {
        fetchBookData();
    }, []);

    // DELETE
    const handleDeletion = (link) => {
        if (window.confirm("Do you really want to delete?")) {
            // First, get jwt token from user session
            const token = sessionStorage.getItem("jwt");
            fetch(link, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            })
                .then((response) => {
                    fetchBookData();
                    notify();
                })
                .catch((error) => {
                    toast.error("Error when deleting", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    console.error(error);
                });
        }
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Publisher",
                accessor: "publisher",
            },
            {
                Header: "Topic",
                accessor: "topic",
            },
            {
                Header: "ISBN",
                accessor: "isbn",
            },
            {
                Header: "Publication Date",
                accessor: "publicationDate",
            },
            {
                Header: "Price $",
                accessor: "price",
            },
            {
                id: "delbutton",
                sortable: false,
                filterable: false,
                accessor: "_links.self.href",
                Cell: ({ value }) => (
                    <Button
                        color="secondary"
                        variant="contained"
                        size="small"
                        onClick={() => handleDeletion(value)}
                    >
                        Delete
                    </Button>
                ),
            },
            {
                sortable: false,
                filterable: false,
                accessor: "_links.self.href",
                Cell: ({ value, row }) => (
                    <EditBook
                        selectedBook={row}
                        link={value}
                        updateBook={updateBook}
                        fetchBooks={fetchBookData}
                    />
                ),
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data: books });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    return (
        <>
            <div
                style={{
                    backgroundColor: "transparent",
                }}
            >
                <Grid
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "16px",
                        padding: "8px",
                    }}
                    container
                    spacing={3}
                >
                    <Grid container item>
                        <Grid item xs={6}>
                            <AddBook handleSave={addBook} />
                        </Grid>
                        <Grid item xs={6}>
                            <CSVLink data={books} separator=",">
                                Export CSV
                            </CSVLink>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={10} xl={8}>
                        <Box
                            sx={{
                                border: "1px dashed grey",
                                "&:hover": {
                                    border: "2px dashed grey",
                                },
                            }}
                        >
                            <table
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                }}
                                {...getTableProps}
                            >
                                <thead>
                                    {headerGroups.map((hg) => (
                                        <tr {...hg.getHeaderGroupProps()}>
                                            {hg.headers.map((column) => (
                                                <th
                                                    {...column.getHeaderProps()}
                                                >
                                                    {column.render("Header")}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                        >
                                                            {cell.render(
                                                                "Cell"
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </Box>
                    </Grid>
                    <ToastContainer />
                </Grid>
            </div>
        </>
    );
    // }
};

export default BookList;

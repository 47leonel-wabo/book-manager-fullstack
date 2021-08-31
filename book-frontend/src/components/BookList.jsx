import React from "react";
import { useMemo, useState } from "react";
import { useTable } from "react-table";
import * as CONSTANT from "../constant";
import { Button } from "@material-ui/core";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBook from "./AddBook";
import EditBook from "./EditBoot";
import { CSVLink } from "react-csv";

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
        fetch(CONSTANT.SERVER_URL.concat("/api/books"))
            .then((response) => response.json())
            .then((data) => {
                setBooks(data._embedded.books);
            })
            .catch((error) => console.error(error));
    };

    // POST
    const addBook = (book) => {
        fetch(CONSTANT.SERVER_URL.concat("/api/books"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        })
            .then((response) => fetchBookData())
            .catch((error) => console.error(error));
    };

    // PUT
    const updateBook = (book, link) => {
        fetch(link, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
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

    const handleDeletion = (link) => {
        if (window.confirm("Do you really want to delete?")) {
            // DELETE
            fetch(link, { method: "DELETE" })
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
            <AddBook handleSave={addBook} />
            <CSVLink data={books} separator=",">
                Export CSV
            </CSVLink>
            <table {...getTableProps}>
                <thead>
                    {headerGroups.map((hg) => (
                        <tr {...hg.getHeaderGroupProps()}>
                            {hg.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
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
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <ToastContainer />
        </>
    );
    // }
};

export default BookList;

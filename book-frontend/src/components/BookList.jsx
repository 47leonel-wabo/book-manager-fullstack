import React from "react";
import { useMemo, useState } from "react";
import { useTable } from "react-table";
import * as CONSTANT from "../constant";

const BookList = (props) => {
    const [books, setBooks] = useState([]);

    const fetchBookData = () => {
        fetch(CONSTANT.SERVER_URL.concat("/api/books"))
            .then((response) => response.json())
            .then((data) => {
                setBooks(data._embedded.books);
            })
            .catch((error) => console.error(error));
    };

    useMemo(() => {
        fetchBookData();
    }, []);

    const handleDeletion = (link) => {
        fetch(link, { method: "DELETE" })
            .then((response) => fetchBookData())
            .catch((error) => console.error(error));
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
                    <button onClick={() => handleDeletion(value)}>
                        Delete
                    </button>
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
        </>
    );
    // }
};

export default BookList;

import React from "react";

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        });
        fetch("http://localhost:8080/api/books")
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    books: data._embedded.books,
                    isLoading: false,
                });
            })
            .catch((error) => console.error(error));
    }

    render() {
        const { isLoading, books } = this.state;

        if (isLoading) {
            return <h4>Loading data...</h4>;
        } else {
            const tableRows = books.map((book, index) => (
                <tr key={index}>
                    <td>{book.title}</td>
                    <td>{book.publisher}</td>
                    <td>{book.topic}</td>
                    <td>{book.isbn}</td>
                    <td>{book.publicationDate}</td>
                    <td>{book.price}</td>
                </tr>
            ));
            return (
                <>
                    <table>
                        <tbody>{tableRows}</tbody>
                    </table>
                </>
            );
        }
    }
}

export default BookList;

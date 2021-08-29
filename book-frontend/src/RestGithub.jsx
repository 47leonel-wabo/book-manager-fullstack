import React, { useState } from "react";

const RestGithub = () => {
    const [keyword, setKeyword] = useState("");
    const [data, setData] = useState([]);

    const fetchData = () => {
        const apiUrl = `https://api.github.com/search/repositories?q=${keyword}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((responseData) => {
                setData(responseData.items);
            })
            .catch((error) => console.error(error));
    };

    const handleInputChange = (event) => {
        setKeyword(event.target.value);
    };

    const tableRows = data.map((item, index) => (
        <tr key={index}>
            <td>{item.full_name}</td>
            <td>
                <a href={item.html_url}>{item.html_url}</a>
            </td>
        </tr>
    ));

    return (
        <div
            style={{
                width: "80%",
                margin: "0 auto",
                backgroundColor: "#f5f5f5",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <section>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleInputChange}
                    placeholder="Type keyword"
                />
                <button onClick={fetchData}>Fetch data</button>
            </section>
            <section>
                <table>
                    <tbody>{tableRows}</tbody>
                </table>
            </section>
        </div>
    );
};

export default RestGithub;

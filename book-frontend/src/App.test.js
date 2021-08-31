import { render, screen } from "@testing-library/react";
import App from "./App";
import TestRenderer from "react-test-renderer";
import AddBook from "./components/AddBook";

test("renders book manager", () => {
    render(<App />);
    const bookManagerTitle = screen.getByText(/Book Manager/i);
    expect(bookManagerTitle).toBeInTheDocument();
});

test("renders export in csv link", () => {
    render(<App />);
    const exportCsvLink = screen.getByText(/Export CSV/i);
    expect(exportCsvLink).toBeInTheDocument();
});

it("render a snapshot", () => {
    const tree = TestRenderer.create(<AddBook />).toJSON();
    expect(tree).toMatchSnapshot();
});

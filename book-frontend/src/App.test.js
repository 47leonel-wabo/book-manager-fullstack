import { render, screen } from "@testing-library/react";
import App from "./App";

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

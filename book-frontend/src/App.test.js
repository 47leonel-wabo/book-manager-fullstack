import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Book Manager", () => {
    render(<App />);
    const linkElement = screen.getByText(/Book Manager/i);
    expect(linkElement).toBeInTheDocument();
});

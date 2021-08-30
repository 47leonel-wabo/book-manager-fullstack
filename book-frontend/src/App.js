import { Toolbar, AppBar, Typography } from "@material-ui/core";
import "./App.css";
import BookList from "./components/BookList";

function App() {
    return (
        <div className="App">
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Book Manager
                    </Typography>
                </Toolbar>
            </AppBar>
            <BookList />
        </div>
    );
}

export default App;

import { Toolbar, AppBar, Typography } from "@material-ui/core";
import "./App.css";
import Login from "./components/Login";

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
            <Login />
        </div>
    );
}

export default App;

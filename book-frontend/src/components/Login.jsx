import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import * as CONSTANT from "../constant";
import BookList from "./BookList";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleInputChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleLogout = () => {
        sessionStorage.removeItem("jwt");
        setIsAuthenticated(false);
    };

    const handleLogin = () => {
        fetch(CONSTANT.SERVER_URL.concat("/login"), {
            method: "POST",
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (response.status) {
                    toast.warn("Bad Credentials, Authentication Failed!", {
                        position: toast.POSITION.TOP_LEFT,
                        hideProgressBar: true,
                    });
                }
                const jwtToken = response.headers.get("Authorization");
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    setIsAuthenticated(true);
                }
            })
            .catch((error) => {
                toast.warn("Please check you Password and/or Username", {
                    position: toast.POSITION.BOTTOM_LEFT,
                    hideProgressBar: true,
                });
                console.error(error);
            });
    };

    if (isAuthenticated === true) {
        return (
            <>
                <Button
                    style={{
                        margin: "16px",
                    }}
                    variant="outlined"
                    size="small"
                    color="default"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
                <BookList />
            </>
        );
    } else {
        return (
            <>
                <div
                    style={{
                        width: "400px",
                        margin: "0 auto",
                        padding: "16px",
                    }}
                >
                    <Grid
                        container
                        spacing={4}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography variant="h5">Login 🔅</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                name="username"
                                label="Username"
                                fullWidth
                                size="small"
                                autoFocus
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                name="password"
                                size="small"
                                label="Password"
                                type="password"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="outlined"
                                size="normal"
                                color="primary"
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                    <ToastContainer autoClose={5000} />
                </div>
            </>
        );
    }
};

export default Login;

import {
    AppBar,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import AddItem from "./AddItem";

const SmallShop = () => {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        setItems([item, ...items]);
    };

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h5" color="inherit">
                        Shopping List
                    </Typography>
                </Toolbar>
            </AppBar>
            <AddItem addItem={addItem} />
            <List>
                <ListItem>
                    {items.map((item, index) => (
                        <ListItemText
                            key={index}
                            primary={item.product}
                            secondary={item.amount}
                        />
                    ))}
                </ListItem>
            </List>
        </>
    );
};

export default SmallShop;

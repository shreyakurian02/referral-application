import React, { useState } from "react";
import { Email, AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import axios from "axios";
import { authentication } from "../../../apis/authentication";

const NavigationBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      // await axios.delete("/users/sign_out");
      await authentication.signOut();
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
          <Email />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Referrals
        </Typography>
        <div>
          <IconButton
            size="large"
            onClick={() => setShowMenu(true)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            sx={{ mt: "40px" }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={showMenu}
            onClose={() => setShowMenu(false)}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem>Settings</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

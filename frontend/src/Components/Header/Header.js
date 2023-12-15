import { AppBar, Avatar, CssBaseline, Drawer } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./Header.css";
import SideDrawer from "./SideDrawer";
import PropTypes from "prop-types";
import { isAuthenticated } from "../../auth";

const drawerWidth = 240;

const Header = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      setName(isAuthenticated().admin.name);
    }
  }, []);

  const drawer = (
    <div>
      <SideDrawer />
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        className="appbar"
        sx={{
          backgroundColor: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <div className="sub-container">
          <div className="menu-button-container">
            <div>
              {mobileOpen ? (
                <button className="menu-button" onClick={handleDrawerToggle}>
                  <i class="fas fa-times"></i>
                </button>
              ) : (
                <button className="menu-button" onClick={handleDrawerToggle}>
                  <i class="fas fa-bars"></i>
                </button>
              )}
            </div>
          </div>
          <div className="title-container">
          <img class="hously-img" src="../img/hously.png" />
          </div>
          {name && (
            <div className="avatar-container">
              <Avatar
                alt="admin"
                sx={{ bgcolor: "#1f7a1f", width: "35px", height: "35px" }}
              />
              <span
                style={{
                  color: "black",
                  fontSize: "17px",
                  padding: "5px",
                  cursor: "default",
                }}
              >
                {name}
              </span>
            </div>
          )}
        </div>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#fafafa",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ width: "100%" }}>
        {props.children}
      </Box>
    </Box>
  );
};

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./SideDrawer.css";
import { ListItemIcon } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import GridViewIcon from "@mui/icons-material/GridView";
import LogoutIcon from "@mui/icons-material/Logout";
import WorkIcon from "@mui/icons-material/Work";
import SendIcon from "@mui/icons-material/Send";
import ArticleIcon from "@mui/icons-material/Article";
import BusinessIcon from "@mui/icons-material/Business";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LoginIcon from "@mui/icons-material/Login";
import { isAuthenticated, signoutApi } from "../../auth";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AbcOutlined, ContactPage } from "@mui/icons-material";
import { BiUser, BiUserCircle } from "react-icons/bi";

const useStyles = makeStyles({
  listItem: {
    color: "#00027B",
    borderRadius: "0 25px 25px 0",
    "&:hover": {
      color: "black",
      backgroundColor: "#61dafb",
      borderRadius: "0 25px 25px 0",
    },
  },
  active: {
    backgroundColor: "#61dafb",
    color: "black",
    borderRadius: "0 25px 25px 0",
    "&:hover": {
      backgroundColor: "#61dafb",
      color: "black",
      cursor: "default",
    },
  },
  link: {
    textDecoration: "none",
  },
});

const SideDrawer = ({ history }) => {
  const classes = useStyles();
  const location = useLocation();

  const isAdmin = isAuthenticated() && isAuthenticated().admin.role === "Admin";

  return (
    <div>
      <List sx={{ marginTop: "90px" }}>
        {isAdmin && (
          <>
            <Link to="/" className={classes.link}>
              <ListItem
                button
                className={
                  location.pathname === "/" ? classes.active : classes.listItem
                }
                disableTouchRipple
              >
                <ListItemIcon>
                  <GridViewIcon
                    className={
                      location.pathname === "/"
                        ? classes.active
                        : classes.listItem
                    }
                  />
                </ListItemIcon>
                <ListItemText>
                  <span className="nav-link">Dashboard</span>
                </ListItemText>
              </ListItem>
            </Link>

            <Link to="/view/applications" className={classes.link}>
              <ListItem
                button
                className={
                  location.pathname === "/view/applications"
                    ? classes.active
                    : classes.listItem
                }
                disableTouchRipple
              >
                <ListItemIcon>
                  <ArticleIcon
                    className={
                      location.pathname === "/view/applications"
                        ? classes.active
                        : classes.listItem
                    }
                  />
                </ListItemIcon>
                <ListItemText>
                  <span className="nav-link">Applications</span>
                </ListItemText>
              </ListItem>
            </Link>

            <Link to="/addservice" className={classes.link}>
              <ListItem
                button
                className={
                  location.pathname === "/addservice"
                    ? classes.active
                    : classes.listItem
                }
                disableTouchRipple
              >
                <ListItemIcon>
                  <DomainAddIcon
                    className={
                      location.pathname === "/addservice"
                        ? classes.active
                        : classes.listItem
                    }
                  />
                </ListItemIcon>
                <ListItemText>
                  <span className="nav-link">Add Service</span>
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/list/users" className={classes.link}>
              <ListItem
                button
                className={
                  location.pathname === "/list/users"
                    ? classes.active
                    : classes.listItem
                }
                disableTouchRipple
              >
                <ListItemIcon>
                  <BiUser
                    className={
                      location.pathname === "/list/users"
                        ? classes.active
                        : classes.listItem
                    }
                  />
                </ListItemIcon>
                <ListItemText>
                  <span className="nav-link">Users</span>
                </ListItemText>
              </ListItem>
            </Link>
          </>
        )}

        <Link to="/user/jobs" className={classes.link}>
          <ListItem
            button
            className={
              location.pathname === "/user/jobs"
                ? classes.active
                : classes.listItem
            }
            disableTouchRipple
          >
            <ListItemIcon>
              <BusinessIcon
                className={
                  location.pathname === "/user/jobs"
                    ? classes.active
                    : classes.listItem
                }
              />
            </ListItemIcon>
            <ListItemText>
              <span className="nav-link">Find Jobs</span>
            </ListItemText>
          </ListItem>
        </Link>

        <Link to="/home" className={classes.link}>
          <ListItem
            button
            className={
              location.pathname === "/home" ? classes.active : classes.listItem
            }
            disableTouchRipple
          >
            <ListItemIcon>
              <WorkIcon
                className={
                  location.pathname === "/home"
                    ? classes.active
                    : classes.listItem
                }
              />
            </ListItemIcon>
            <ListItemText>
              <span className="nav-link">Home</span>
            </ListItemText>
          </ListItem>
        </Link>
        <Link to="/about" className={classes.link}>
          <ListItem
            button
            className={
              location.pathname === "/about" ? classes.active : classes.listItem
            }
            disableTouchRipple
          >
            <ListItemIcon>
              <AbcOutlined
                className={
                  location.pathname === "/about"
                    ? classes.active
                    : classes.listItem
                }
              />
            </ListItemIcon>
            <ListItemText>
              <span className="nav-link">About Us</span>
            </ListItemText>
          </ListItem>
        </Link>
        <Link to="/contact" className={classes.link}>
          <ListItem
            button
            className={
              location.pathname === "/contact" ? classes.active : classes.listItem
            }
            disableTouchRipple
          >
            <ListItemIcon>
              <ContactPage
                className={
                  location.pathname === "/contact"
                    ? classes.active
                    : classes.listItem
                }
              />
            </ListItemIcon>
            <ListItemText>
              <span className="nav-link">Contact Us</span>
            </ListItemText>
          </ListItem>
        </Link>

        {!isAuthenticated() && (
          <>
          <Link to="/login" className={classes.link}>
            <ListItem
              button
              className={
                location.pathname === "/login"
                  ? classes.active
                  : classes.listItem
              }
              disableTouchRipple
            >
              <ListItemIcon>
                <LoginIcon
                  className={
                    location.pathname === "/login"
                      ? classes.active
                      : classes.listItem
                  }
                />
              </ListItemIcon>
              <ListItemText>
                <span className="nav-link">Login</span>
              </ListItemText>
            </ListItem>
          </Link>
          <Link to="/register" className={classes.link}>
            <ListItem
              button
              className={
                location.pathname === "/register"
                  ? classes.active
                  : classes.listItem
              }
              disableTouchRipple
            >
              <ListItemIcon>
                <SendIcon
                  className={
                    location.pathname === "/register"
                      ? classes.active
                      : classes.listItem
                  }
                />
              </ListItemIcon>
              <ListItemText>
                <span className="nav-link">Register</span>
              </ListItemText>
            </ListItem>
          </Link>
          </>
        )}

        {isAuthenticated() && (
          <>
            <Link to="/general" className={classes.link}>
              <ListItem
                button
                className={
                  location.pathname === "/general"
                    ? classes.active
                    : classes.listItem
                }
                disableTouchRipple
              >
                <ListItemIcon>
                  <PersonIcon
                    className={
                      location.pathname === "/general"
                        ? classes.active
                        : classes.listItem
                    }
                  />
                </ListItemIcon>
                <ListItemText>
                  <span className="nav-link">General</span>
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/user/postjob" className={classes.link}>
              <ListItem
                button
                className={
                  location.pathname === "/user/postjob"
                    ? classes.active
                    : classes.listItem
                }
                disableTouchRipple
              >
                <ListItemIcon>
                  <ArticleIcon
                    className={
                      location.pathname === "/user/postjob"
                        ? classes.active
                        : classes.listItem
                    }
                  />
                </ListItemIcon>
                <ListItemText>
                  <span className="nav-link">Post a Job</span>
                </ListItemText>
              </ListItem>
            </Link>
          </>
        )}

        {isAuthenticated() && (
          <ListItem
            button
            className={classes.listItem}
            disableTouchRipple
            onClick={() => {
              signoutApi(() => {
                history.push("/login");
              });
            }}
          >
            <ListItemIcon>
              <LogoutIcon className={classes.listItem} />
            </ListItemIcon>
            <ListItemText>
              <span className="nav-link">Logout</span>
            </ListItemText>
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default withRouter(SideDrawer);

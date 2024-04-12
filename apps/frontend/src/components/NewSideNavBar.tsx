import "./NewSideNavBar.css";
import MapIcon from "@mui/icons-material/Map";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Box } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

function NewSideNavBar() {
  const [activeIcon, setActiveIcon] = useState("map");
  const handleIconClick = (icon: string) => {
    setActiveIcon(icon); // Toggle active icon
  };

  return (
    <div className="newNavBar">
      <div className="iconsContainer">
        <div className="navBarIcons">
          <Box
            sx={{
              display: "inline-block",
              position: "relative",
              width: 60,
              height: 60,
              backgroundColor: activeIcon === "map" ? "#CDE1F5" : "transparent",
              borderRadius: "10%",
              transition: "width 0.7s ease-in-out",
              "&:hover": {
                backgroundColor:
                  activeIcon === "map" ? "#CDE1F5" : "rgba(205, 225, 245, 0.4)",
                cursor: "pointer",
                width: 200,
                "& .textNextToIcons": {
                  position: "absolute",
                  color: activeIcon === "map" ? "#012d5a" : "#FFFFFF",
                  top: "50%",
                  left: "35%",
                  transform: "translateY(-50%)",
                  fontSize: 27,
                  visibility: "visible",
                  opacity: 1,
                  transition: "visibility 0s, opacity 0.7s linear",
                },
                "& .icon": {
                  position: "absolute",
                  top: "50%",
                  left: "15%",
                  transform: "translate(-50%, -50%)",
                  transition: "left 0.7s ease-in-out",
                },
              },
              "& .icon": {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: activeIcon === "map" ? "#012d5a" : "#FFFFFF",
                zIndex: 1,
                opacity: 1,
              },
              "& .textNextToIcons": {
                position: "absolute",
                color: "transparent",
                visibility: "hidden",
                opacity: 0,
                transition: "visibility 0s 0.3s, opacity 0.3s linear",
              },
            }}
            onClick={() => handleIconClick("map")}
          >
            <Link to="/">
              <MapIcon className="icon" sx={{ fontSize: 55 }} />
              <p className="textNextToIcons">Map</p>
            </Link>
          </Box>
        </div>
        <div className="navBarIcons">
          <Box
            sx={{
              display: "inline-block",
              position: "relative",
              width: 60,
              height: 60,
              backgroundColor:
                activeIcon === "dashboard" ? "#CDE1F5" : "transparent",
              borderRadius: "10%",
              transition: "width 0.7s ease-in-out",
              "&:hover": {
                backgroundColor:
                  activeIcon === "dashboard"
                    ? "#CDE1F5"
                    : "rgba(205, 225, 245, 0.4)",
                cursor: "pointer",
                width: 200,
                "& .textNextToIcons": {
                  position: "absolute",
                  color: activeIcon === "dashboard" ? "#012d5a" : "#FFFFFF",
                  top: "50%",
                  left: "35%",
                  transform: "translateY(-50%)",
                  fontSize: 22,
                  visibility: "visible",
                  opacity: 1,
                  transition: "visibility 0s, opacity 0.7s linear",
                },
                "& .icon": {
                  position: "absolute",
                  top: "50%",
                  left: "15%",
                  transform: "translate(-50%, -50%)",
                  transition: "left 0.7s ease-in-out",
                },
              },
              "& .icon": {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: activeIcon === "dashboard" ? "#012d5a" : "#FFFFFF",
                zIndex: 1,
                opacity: 1,
              },
              "& .textNextToIcons": {
                position: "absolute",
                color: "transparent",
                visibility: "hidden",
                opacity: 0,
                transition: "visibility 0s 0.3s, opacity 0.3s linear",
              },
            }}
            onClick={() => handleIconClick("dashboard")}
          >
            <Link to="/gift-request">
              <DashboardIcon className="icon" sx={{ fontSize: 55 }} />
              <p className="textNextToIcons">Dashboard</p>
            </Link>
          </Box>
        </div>
        <div className="navBarIcons">
          <Box
            sx={{
              display: "inline-block",
              position: "relative",
              width: 60,
              height: 60,
              backgroundColor:
                activeIcon === "listAlt" ? "#CDE1F5" : "transparent",
              borderRadius: "10%",
              transition: "width 0.7s ease-in-out",
              "&:hover": {
                backgroundColor:
                  activeIcon === "listAlt"
                    ? "#CDE1F5"
                    : "rgba(205, 225, 245, 0.4)",
                cursor: "pointer",
                width: 200,
                "& .textNextToIcons": {
                  position: "absolute",
                  color: activeIcon === "listAlt" ? "#012d5a" : "#FFFFFF",
                  top: "50%",
                  left: "35%",
                  transform: "translateY(-50%)",
                  fontSize: 22,
                  visibility: "visible",
                  opacity: 1,
                  transition: "visibility 0s, opacity 0.7s linear",
                },
                "& .icon": {
                  position: "absolute",
                  top: "50%",
                  left: "15%",
                  transform: "translate(-50%, -50%)",
                  transition: "left 0.7s ease-in-out",
                },
              },
              "& .icon": {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: activeIcon === "listAlt" ? "#012d5a" : "#FFFFFF",
                zIndex: 1,
                opacity: 1,
              },
              "& .textNextToIcons": {
                position: "absolute",
                color: "transparent",
                visibility: "hidden",
                opacity: 0,
                transition: "visibility 0s 0.3s, opacity 0.3s linear",
              },
            }}
            onClick={() => handleIconClick("listAlt")}
          >
            <Link to="/csv-page">
              <ListAltIcon className="icon" sx={{ fontSize: 55 }} />
              <p className="textNextToIcons">File Viewer</p>
            </Link>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default NewSideNavBar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import TranslateIcon from "@mui/icons-material/Translate";

function Header() {
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const theme = useTheme();
  const isTabletOrLaptopScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (route) => {
    navigate(route);
    handleMenuClose();
  };

  const handleTitleClick = () => {
    navigate("/");
  };

  const handleLanguageMenuOpen = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorElLang(null);
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    handleLanguageMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Title (Tekno Alümil) */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              paddingTop: 1,
            }}
            onClick={handleTitleClick}
          >
            <Typography
              variant="inherit"
              component="span"
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.75rem" },
              }}
            >
              Tekno
            </Typography>
            <Typography
              variant="inherit"
              component="span"
              color="secondary"
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.75rem" },
              }}
            >
              Alümil
            </Typography>
          </Typography>

          {/* Icons Group (Aligned to Right) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1, // Controlled spacing between icons
            }}
          >
            {/* Phone Icon */}
            <IconButton
              size="large"
              color="inherit"
              aria-label="phone"
              component="a"
              href="tel:+905338388585"
              sx={{
                ":hover": { color: "secondary.main" },
              }}
            >
              <PhoneIcon />
            </IconButton>

            {/* Map Icon (Tablet and Larger Screens Only) */}
            {isTabletOrLaptopScreen && (
              <IconButton
                size="large"
                color="inherit"
                aria-label="map"
                component="a"
                href="https://www.google.com/maps?q=Tekno+Alümil"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  ":hover": { color: "secondary.main" },
                }}
              >
                <MapIcon />
              </IconButton>
            )}

            {/* Translate Icon */}
            <IconButton
              size="large"
              color="inherit"
              onClick={handleLanguageMenuOpen}
              sx={{
                ":hover": { color: "secondary.main" },
              }}
            >
              <TranslateIcon />
            </IconButton>
          </Box>

          {/* Language Menu */}
          <Menu
            anchorEl={anchorElLang}
            open={Boolean(anchorElLang)}
            onClose={handleLanguageMenuClose}
          >
            <MenuItem onClick={() => handleLanguageChange("en")}>
              English
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange("tr")}>
              Turkish
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange("el")}>
              Greek
            </MenuItem>
          </Menu>

          {/* Menu Items */}
          {isTabletOrLaptopScreen ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                color="inherit"
                onClick={() => handleMenuClick("/about")}
                sx={{
                  ":hover": {
                    backgroundColor: "secondary.main",
                  },
                  textTransform: "none",
                }}
              >
                {t("header.about")}
              </Button>
              <Button
                color="inherit"
                onClick={() => handleMenuClick("/services")}
                sx={{
                  ":hover": {
                    backgroundColor: "secondary.main",
                  },
                  textTransform: "none",
                }}
              >
                {t("header.services")}
              </Button>
              <Button
                color="inherit"
                onClick={() => handleMenuClick("/contact")}
                sx={{
                  ":hover": {
                    backgroundColor: "secondary.main",
                  },
                  textTransform: "none",
                }}
              >
                {t("header.contact")}
              </Button>
            </Box>
          ) : (
            <>
              <IconButton
                size="large"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{
                  ":hover": { color: "secondary.main" },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleMenuClick("/about")}>
                  {t("header.about")}
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/services")}>
                  {t("header.services")}
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/contact")}>
                  {t("header.contact")}
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
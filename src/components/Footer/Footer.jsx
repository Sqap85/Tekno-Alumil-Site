import React from "react";
import { Box, Typography, Link as MuiLink, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

function Footer() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">{t("footer.address")}</Typography>
        <Typography variant="body2">
          {t("footer.phone")}{" "}
          <MuiLink href="tel:+905338388585" color="secondary" underline="hover">
            0533 838 85 85
          </MuiLink>
          {" - "}
          <MuiLink href="tel:+905488488585" color="secondary" underline="hover">
            0548 848 85 85
          </MuiLink>
        </Typography>
        <Typography variant="body2">
          {t("footer.email")}{" "}
          <MuiLink
            href="mailto:teknoalumil85@gmail.com"
            color="secondary"
            underline="hover"
          >
            teknoalumil85@gmail.com
          </MuiLink>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <MuiLink
          component={Link}
          to="/about"
          sx={{
            color: theme.palette.secondary.main,
            textDecoration: "none",
            ":hover": {
              color: theme.palette.primary.main,
              textDecoration: "none",
            },
          }}
        >
          {t("footer.links.about")}
        </MuiLink>
        <MuiLink
          component={Link}
          to="/products"
          sx={{
            color: theme.palette.secondary.main,
            textDecoration: "none",
            ":hover": {
              color: theme.palette.primary.main,
              textDecoration: "none",
            },
          }}
        >
          {t("footer.links.products")}
        </MuiLink>
        <MuiLink
          component={Link}
          to="/contact"
          sx={{
            color: theme.palette.secondary.main,
            textDecoration: "none",
            ":hover": {
              color: theme.palette.primary.main,
              textDecoration: "none",
            },
          }}
        >
          {t("footer.links.contact")}
        </MuiLink>
      </Box>

      <Divider sx={{ backgroundColor: "gray", my: 2 }} />

      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography variant="body1" gutterBottom>
          85 Company © {new Date().getFullYear()} - MIT License
        </Typography>
        <MuiLink
          href="https://github.com/Sqap85/Tekno-Alumil-Site"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon
            sx={{
              color: "white",
              marginLeft: "10px",
              ":hover": { color: theme.palette.secondary.main },
            }}
          />
        </MuiLink>
      </Box>
    </Box>
  );
}

export default Footer;

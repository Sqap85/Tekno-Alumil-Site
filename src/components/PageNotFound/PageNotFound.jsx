import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import gif from "../../assets/images/godfather.webp";

function PageNotFound() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("notfound.seo.title")}</title>
        <meta name="description" content={t("notfound.seo.description")} />
      </Helmet>
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.default", // Theme-based background color
        flexDirection: "column",
        zIndex: 1,
        p: 2,
      }}
    >
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        {/* GIF Section */}
        <Grid item xs={12} display="flex" justifyContent="center">
          <img
            src={gif}
            alt="404 Page Not Found"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
            }}
          />
        </Grid>
        {/* Text Section */}
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Typography variant="h2" color="error" gutterBottom>
            404
          </Typography>
          <Typography variant="h6" color="text.primary" paragraph>
            {t("notfound.message")}
          </Typography>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="error" size="large">
              {t("notfound.go_home")}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}

export default PageNotFound;

import React, { memo, lazy, Suspense } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Lazy load AboutCard
const AboutCard = lazy(() => import("./AboutCard"));

import qualityImage from "../../assets/images/quality.webp";
import customerFocusImage from "../../assets/images/customer-focus.webp";
import teamImage from "../../assets/images/team.webp";
import designImage from "../../assets/images/design.webp";
import selcukImage from "../../assets/images/selcuk.webp";

const aboutCards = [
  {
    titleKey: "about.qualities.0.title",
    descriptionKey: "about.qualities.0.description",
    image: qualityImage,
  },
  {
    titleKey: "about.qualities.1.title",
    descriptionKey: "about.qualities.1.description",
    image: teamImage,
  },
  {
    titleKey: "about.qualities.2.title",
    descriptionKey: "about.qualities.2.description",
    image: customerFocusImage,
  },
  {
    titleKey: "about.qualities.3.title",
    descriptionKey: "about.qualities.3.description",
    image: designImage,
  },
];

function About() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        padding: isSmallScreen ? "1rem" : "2rem",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Header Section */}
      <Paper
        elevation={3}
        sx={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "2rem",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: "8px",
        }}
      >
        <Typography
          variant={isSmallScreen ? "h4" : "h3"}
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", letterSpacing: "0.05em" }}
        >
          Tekno Alümil
        </Typography>
        <Typography variant="h6" component="p" sx={{ opacity: 0.9 }}>
          {t("about.header_subtitle")}
        </Typography>
      </Paper>

      {/* About Section */}
      <Paper
        elevation={1}
        sx={{
          padding: isSmallScreen ? "1rem" : "2rem",
          marginBottom: "3rem",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          color="primary"
          textAlign="center"
        >
          {t("about.title")}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}
        >
          {t("about.description")}
        </Typography>
      </Paper>

      {/* About Cards */}
      <Grid
        container
        spacing={isSmallScreen ? 2 : 4}
        justifyContent="center"
        sx={{ marginBottom: "3rem" }}
      >
        {aboutCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Suspense
              fallback={
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={isSmallScreen ? 200 : 250}
                />
              }
            >
              <AboutCard
                title={t(card.titleKey)}
                description={t(card.descriptionKey)}
                image={card.image}
              />
            </Suspense>
          </Grid>
        ))}
      </Grid>

      {/* Patron Section */}
      <Paper
        elevation={3}
        sx={{
          marginBottom: "3rem",
          padding: "2rem",
          borderRadius: "8px",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          gap: "2rem",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <img
          src={selcukImage}
          alt={t("about.founder_section.title")}
          loading="lazy"
          style={{
            width: isSmallScreen ? "100px" : "150px",
            height: isSmallScreen ? "100px" : "150px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Box>
          <Typography variant="h5" component="h3" gutterBottom>
            {t("about.founder_section.title")}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {t("about.founder_section.description")}
          </Typography>
        </Box>
      </Paper>

      {/* Services Section */}
      <Box sx={{ textAlign: "center", marginTop: "2rem", marginBottom: "2rem" }}>
        <Link to="/services" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            {t("about.services_section.button_text")}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default memo(About);

import React, { Suspense, lazy } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Lazy load ServiceCard
const LazyServiceCard = lazy(() => import("../ServiceCard/ServiceCard"));

// Import görseller
import havuzImage from "../../assets/images/havuz.webp";
import kapiImage from "../../assets/images/kapi.webp";
import pencereImage from "../../assets/images/surme.webp";
import garajImage from "../../assets/images/garaj.webp";
import rollingShutterImage from "../../assets/images/rollingShutter.webp";
import balconyClosureImage from "../../assets/images/balconyClosure.webp";
import flyScreenImage from "../../assets/images/flyScreen.webp";
import automaticDoorImage from "../../assets/images/automaticDoor.webp";
import compositePanelImage from "../../assets/images/compositePanel.webp";
import fenceImage from "../../assets/images/fence.webp";
import pergolaImage from "../../assets/images/pergola.webp";
import railingImage from "../../assets/images/railing.webp";

// Service data
const services = [
  { titleKey: "services.cards.0.title", descKey: "services.cards.0.description", image: havuzImage },
  { titleKey: "services.cards.1.title", descKey: "services.cards.1.description", image: kapiImage },
  { titleKey: "services.cards.2.title", descKey: "services.cards.2.description", image: pencereImage },
  { titleKey: "services.cards.3.title", descKey: "services.cards.3.description", image: garajImage },
  { titleKey: "services.cards.4.title", descKey: "services.cards.4.description", image: rollingShutterImage },
  { titleKey: "services.cards.5.title", descKey: "services.cards.5.description", image: balconyClosureImage },
  { titleKey: "services.cards.6.title", descKey: "services.cards.6.description", image: flyScreenImage },
  { titleKey: "services.cards.7.title", descKey: "services.cards.7.description", image: automaticDoorImage },
  { titleKey: "services.cards.8.title", descKey: "services.cards.8.description", image: compositePanelImage },
  { titleKey: "services.cards.9.title", descKey: "services.cards.9.description", image: fenceImage },
  { titleKey: "services.cards.10.title", descKey: "services.cards.10.description", image: pergolaImage },
  { titleKey: "services.cards.11.title", descKey: "services.cards.11.description", image: railingImage },
];

function Services() {
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
        }}
      >
        <Typography
          variant={isSmallScreen ? "h4" : "h3"}
          component="h1"
          sx={{ fontWeight: "bold", letterSpacing: "0.05em" }}
        >
          {t("services.header_title")}
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          {t("services.header_subtitle")}
        </Typography>
      </Paper>

      {/* Services Section */}
      <Suspense
        fallback={
          <Grid container spacing={isSmallScreen ? 2 : 4} justifyContent="center">
            {[...Array(8)].map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  sx={{ borderRadius: "4px" }}
                />
              </Grid>
            ))}
          </Grid>
        }
      >
        <Grid container spacing={isSmallScreen ? 2 : 4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <LazyServiceCard
                title={t(service.titleKey)}
                description={t(service.descKey)}
                image={service.image}
              />
            </Grid>
          ))}
        </Grid>
      </Suspense>

      {/* Contact Section */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary" size="large">
            {t("services.contact_section.button_text")}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Services;

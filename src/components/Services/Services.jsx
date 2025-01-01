import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CardMedia,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import aluminumImage from "../../assets/images/havuz.webp";
import doorsImage from "../../assets/images/kapi.webp";
import windowsImage from "../../assets/images/surme.webp";
import garageDoorsImage from "../../assets/images/garaj.webp";
import rollingShutterImage from "../../assets/images/rollingShutter.webp";
import balconyClosureImage from "../../assets/images/balconyClosure.webp";
import flyScreenImage from "../../assets/images/flyScreen.webp";
import automaticDoorImage from "../../assets/images/automaticDoor.webp";
import compositePanelImage from "../../assets/images/compositePanel.webp";
import fenceImage from "../../assets/images/fence.webp";
import pergolaImage from "../../assets/images/pergola.webp";
import railingImage from "../../assets/images/railing.webp";

function Services() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const services = [
    {
      title: t("services.cards.0.title"),
      description: t("services.cards.0.description"),
      image: aluminumImage,
    },
    {
      title: t("services.cards.1.title"),
      description: t("services.cards.1.description"),
      image: doorsImage,
    },
    {
      title: t("services.cards.2.title"),
      description: t("services.cards.2.description"),
      image: windowsImage,
    },
    {
      title: t("services.cards.3.title"),
      description: t("services.cards.3.description"),
      image: garageDoorsImage,
    },
    {
      title: t("services.cards.4.title"),
      description: t("services.cards.4.description"),
      image: rollingShutterImage,
    },
    {
      title: t("services.cards.5.title"),
      description: t("services.cards.5.description"),
      image: balconyClosureImage,
    },
    {
      title: t("services.cards.6.title"),
      description: t("services.cards.6.description"),
      image: flyScreenImage,
    },
    {
      title: t("services.cards.7.title"),
      description: t("services.cards.7.description"),
      image: automaticDoorImage,
    },
    {
      title: t("services.cards.8.title"),
      description: t("services.cards.8.description"),
      image: compositePanelImage,
    },
    {
      title: t("services.cards.9.title"),
      description: t("services.cards.9.description"),
      image: fenceImage,
    },
    {
      title: t("services.cards.10.title"),
      description: t("services.cards.10.description"),
      image: pergolaImage,
    },
    {
      title: t("services.cards.11.title"),
      description: t("services.cards.11.description"),
      image: railingImage,
    },
  ];

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
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography
          variant={isSmallScreen ? "h4" : "h3"}
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            letterSpacing: "0.05em",
          }}
        >
          {t("services.header_title")}
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            opacity: 0.9,
          }}
        >
          {t("services.header_subtitle")}
        </Typography>
      </Paper>

      {/* Services Cards */}
      <Grid
        container
        spacing={isSmallScreen ? 2 : 4}
        justifyContent="center"
        sx={{ marginBottom: "3rem" }}
      >
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: "100%", textAlign: "center", boxShadow: 3 }}>
              <CardMedia
                component="img"
                image={service.image}
                alt={service.title}
                sx={{
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  color="primary"
                >
                  {service.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contact Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
          marginBottom: "2rem",
          padding: "1rem",
        }}
      >
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

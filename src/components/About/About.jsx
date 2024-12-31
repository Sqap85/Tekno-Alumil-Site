import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  CardMedia,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import qualityImage from "../../assets/images/quality.webp";
import customerFocusImage from "../../assets/images/customer-focus.webp";
import teamImage from "../../assets/images/team.webp";
import designImage from "../../assets/images/design.webp";
import selcukImage from "../../assets/images/selcuk.webp";
import havuzImage from "../../assets/images/havuz.webp";
import kapiImage from "../../assets/images/kapi.webp";
import surmeImage from "../../assets/images/surme.webp";
import garajImage from "../../assets/images/garaj.webp";

function About() {
  const { t } = useTranslation(); // Hook for translation
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
          Tekno Alümil
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            opacity: 0.9,
          }}
        >
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
          sx={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
          }}
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
        {[
          {
            title: t("about.qualities.0.title"),
            description: t("about.qualities.0.description"),
            image: qualityImage,
          },
          {
            title: t("about.qualities.1.title"),
            description: t("about.qualities.1.description"),
            image: teamImage,
          },
          {
            title: t("about.qualities.2.title"),
            description: t("about.qualities.2.description"),
            image: customerFocusImage,
          },
          {
            title: t("about.qualities.3.title"),
            description: t("about.qualities.3.description"),
            image: designImage,
          },
        ].map((about, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: "100%", textAlign: "center", boxShadow: 3 }}>
              <CardMedia
                component="img"
                image={about.image}
                alt={about.title}
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
                  {about.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {about.description}
                </Typography>
              </CardContent>
            </Card>
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
        <CardMedia
          component="img"
          image={selcukImage}
          alt={t("about.founder_section.title")}
          sx={{
            width: isSmallScreen ? "100px" : "150px",
            height: isSmallScreen ? "100px" : "150px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: theme.shadows[3],
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
      <Box>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            marginBottom: "2rem",
            color: theme.palette.secondary.main,
          }}
        >
          {t("about.services_section.title")}
        </Typography>
        <Grid container spacing={isSmallScreen ? 2 : 4} justifyContent="center">
          {[
            {
              title: t("about.services_section.services.0.title"),
              description: t("about.services_section.services.0.description"),
              image: havuzImage,
            },
            {
              title: t("about.services_section.services.1.title"),
              description: t("about.services_section.services.1.description"),
              image: kapiImage,
            },
            {
              title: t("about.services_section.services.2.title"),
              description: t("about.services_section.services.2.description"),
              image: surmeImage,
            },
            {
              title: t("about.services_section.services.3.title"),
              description: t("about.services_section.services.3.description"),
              image: garajImage,
            },
          ].map((service, index) => (
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
        <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary">
              {t("about.services_section.button_text")}
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default About;

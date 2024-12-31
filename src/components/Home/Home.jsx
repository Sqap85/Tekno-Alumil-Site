import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Avatar, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next"; // Çeviri için import

import image1 from "../../assets/images/1-small.webp";
import image2 from "../../assets/images/2-small.webp";
import image3 from "../../assets/images/3-small.webp";

const images = [image1, image2, image3];

function Home() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState([true, false, false]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nextImageIndex = (currentImage + 1) % images.length;
    if (!loadedImages[nextImageIndex]) {
      const img = new Image();
      img.src = images[nextImageIndex];
      img.onload = () => {
        setLoadedImages((prev) => {
          const updated = [...prev];
          updated[nextImageIndex] = true;
          return updated;
        });
      };
    }
  }, [currentImage]);

  return (
    <>
      <link rel="preload" as="image" href={images[0]} />

      <Box
        component="main"
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.6s ease-in-out",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            textShadow: `2px 2px 8px ${alpha("#000", 0.7)}`,
            width: { xs: "90%", sm: "70%", md: "50%" },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            {t("home.welcome_message")}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
            }}
          >
            {t("home.service_description")}
          </Typography>
          <Link
            to="/about"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Button variant="contained" color="secondary">
              {t("home.about_button")}
            </Button>
          </Link>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 70,
            left: "50%",
            transform: "translateX(-50%)",
            width: { xs: "90%", sm: "75%", md: "60%", lg: "40%" },
            padding: { xs: "10px", sm: "15px" },
            backgroundColor: alpha(theme.palette.background.default, 0.8),
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: 2,
            boxShadow: theme.shadows[5],
          }}
        >
          <Avatar
            sx={{
              backgroundColor: theme.palette.primary.main,
              width: { xs: 40, sm: 50 },
              height: { xs: 40, sm: 50 },
            }}
          >
            <AccessTimeIcon
              sx={{
                fontSize: { xs: 24, sm: 30 },
                color: theme.palette.primary.contrastText,
              }}
            />
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                lineHeight: "1.2",
                color: theme.palette.text.primary,
              }}
            >
              {t("home.working_hours_title")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                lineHeight: "1.2",
                color: theme.palette.text.secondary,
              }}
            >
              {t("home.working_hours_detail")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;

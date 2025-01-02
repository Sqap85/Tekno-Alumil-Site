import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import image1 from "../../assets/images/1-small.webp";
import image2 from "../../assets/images/2-small.webp";
import image3 from "../../assets/images/3-small.webp";

const images = [
  { src: image1, alt: "Image 1 Description" },
  { src: image2, alt: "Image 2 Description" },
  { src: image3, alt: "Image 3 Description" },
];

function Home() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const preloadImages = () => {
      images.forEach((image) => {
        const img = new Image();
        img.src = image.src;
      });
    };
    preloadImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Kıbrıs Alüminyum Kapı ve Pencere Çözümleri - Tekno Alümil</title>
        <meta
          name="description"
          content="Tekno Alümil, Kıbrıs'ta alüminyum kapı, pencere, garaj kapısı ve balkon kapatma çözümleri sunar. Şimdi kaliteli ve estetik ürünlerimizi keşfedin!"
        />
      </Helmet>

      <Box
        component="main"
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundImage: `url(${images[currentImage].src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.6s ease-in-out",
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
            {t("home.welcome_message", "Welcome to Tekno Alümil")}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
            }}
          >
            {t("home.service_description", "We offer high-quality aluminum solutions.")}
          </Typography>
          <Box sx={{ marginTop: "2rem" }}>
            <Link
              to="/about"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Button variant="contained" color="secondary">
                {t("home.about_button", "Learn More About Us")}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;

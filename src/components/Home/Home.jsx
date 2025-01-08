import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Box, Typography, Button, Avatar, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import image1 from "../../assets/images/1-small.avif";
import image2 from "../../assets/images/2-small.avif";
import image3 from "../../assets/images/3-small.avif";

// Lazy loading component for better performance
const LazyImage = ({ src, alt }) => (
  <img src={src} alt={alt} loading="lazy" style={{ display: "none" }} />
);

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
    // Preload critical images
    const preloadImages = () => {
      const img = new Image();
      img.src = images[0].src; // Preload first image for LCP
    };
    preloadImages();
  }, []);

  useEffect(() => {
    // Change the image every 5 seconds
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Tekno Alümil - Kıbrıs Alüminyum Çözümleri</title>
        <meta
          name="description"
          content="Tekno Alümil, Kıbrıs'ta alüminyum kapı, pencere, garaj kapısı ve balkon kapatma çözümleri sunar. Şimdi kaliteli ve estetik ürünlerimizi keşfedin!"
        />
        {/* Preload critical hero images */}
        <link rel="preload" href={image1} as="image" />
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
          transition: "transform 0.6s ease-in-out, opacity 0.6s ease-in-out",
        }}
      >
        {/* Inline lazy loading for non-critical images */}
        {images.map(({ src, alt }, index) => (
          <LazyImage key={index} src={src} alt={alt} />
        ))}

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
          <Box sx={{ marginTop: "2rem" }}>
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
        </Box>

        {/* Working Hours Section */}
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

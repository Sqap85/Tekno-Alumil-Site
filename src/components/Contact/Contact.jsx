import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import ContactInfo from "./ContactInfo";
import GoogleMaps from "./GoogleMaps";
import ContactForm from "./ContactForm";

const Contact = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en"; // Varsayılan İngilizce olsun

  const phoneNumbers = useMemo(() => ["05338388585", "05488488585"], []);
  const email = useMemo(() => "teknoalumil85@gmail.com", []);

  const googleMapsEmbedUrl = useMemo(() => {
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.971742487271!2d33.867924699999996!3d35.1323787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dfcb4508dc81d5%3A0xd48bdf1c89f2c4ca!2sTekno%20Al%C3%BCmil!5e0&hl=${currentLanguage}`;
  }, [currentLanguage]);

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
        gap: 4,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h4" textAlign="center">
        {t("contact.page.title")}
      </Typography>
      <ContactInfo phoneNumbers={phoneNumbers} email={email} />
      <GoogleMaps googleMapsEmbedUrl={googleMapsEmbedUrl} />
      <ContactForm />
    </Box>
  );
};

export default React.memo(Contact);